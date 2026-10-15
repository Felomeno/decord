// Checks the GSAP scroll layer in a real browser: scrolls each page the way a visitor does,
// saves viewport screenshots at key moments and fails if anything is left hidden, if the
// console reports errors, or if reduced motion still animates.
// Usage: node scripts/motion-check.mjs [baseUrl]
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3200";
const OUT = "qa-output/motion";
const ROUTES = ["/", "/servicios", "/proyectos/bano-las-aguilas", "/nosotros"];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
];

const browserPath = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: browserPath });
const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log("FAIL", msg);
};

const slug = (route) => (route === "/" ? "home" : route.slice(1).replaceAll("/", "_"));

/** Anything in <main> still invisible, clipped or offset once the whole page has been scrolled. */
const leftovers = () =>
  [...document.querySelectorAll("main *")]
    .filter((el) => {
      if (el.closest(".ba, .hero")) return false; // driven by scroll position on purpose
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      return parseFloat(cs.opacity) < 0.99 || (cs.clipPath !== "none" && !el.closest(".sec--pale, .cta-final") && !el.matches(".sec--pale, .cta-final"));
    })
    .slice(0, 5)
    .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join(".")} opacity=${getComputedStyle(el).opacity} clip=${getComputedStyle(el).clipPath}`);

async function scrollThrough(page, onStep) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = 260;
  for (let y = 0; y < height; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(90);
    if (onStep) await onStep(y);
  }
  await page.waitForTimeout(1800);
}

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const on = await page.evaluate(() => document.documentElement.classList.contains("gsap-on"));
    if (!on) fail(`${vp.name} ${route}: GSAP layer did not start`);

    // Screenshot the before/after while it is held, at three points of its progress.
    const shots = new Set();
    await scrollThrough(page, async () => {
      if (route !== "/" || vp.name !== "desktop") return;
      const p = await page.evaluate(() => {
        const ba = document.querySelector(".ba");
        if (ba.getBoundingClientRect().top > window.innerHeight * 0.5) return -1; // not on screen yet
        return parseFloat(getComputedStyle(ba).getPropertyValue("--ba-p") || "1");
      });
      for (const mark of [0, 0.5, 1]) {
        if (!shots.has(mark) && Math.abs(p - mark) < 0.2) {
          shots.add(mark);
          await page.waitForTimeout(700);
          await page.screenshot({ path: `${OUT}/${slug(route)}-${vp.name}-ba-${mark}.jpg`, quality: 70 });
        }
      }
    });
    await page.screenshot({ path: `${OUT}/${slug(route)}-${vp.name}-end.jpg`, quality: 70 });

    const left = await page.evaluate(leftovers);
    if (left.length) fail(`${vp.name} ${route}: still hidden after scrolling: ${left.join(" | ")}`);
    if (route === "/" && vp.name === "desktop") {
      const p = await page.evaluate(() => getComputedStyle(document.querySelector(".ba")).getPropertyValue("--ba-p"));
      if (parseFloat(p) !== 1) fail(`desktop /: before/after did not finish (--ba-p=${p})`);
      if (shots.size < 3) fail(`desktop /: before/after captured at ${[...shots].join(", ")} only`);
    }
  }

  // Client-side navigation must rebuild the layer on the new page.
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click(".hdr .nav a[href='/servicios']").catch(() => page.goto(BASE + "/servicios"));
  await page.waitForURL("**/servicios");
  await page.waitForTimeout(600);
  await scrollThrough(page);
  const left = await page.evaluate(leftovers);
  if (left.length) fail(`${vp.name} client nav /servicios: still hidden: ${left.join(" | ")}`);

  if (errors.length) fail(`${vp.name}: console errors: ${[...new Set(errors)].slice(0, 3).join(" | ")}`);
  await context.close();
}

// Reduced motion: no GSAP layer, CSS fallback only.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const on = await page.evaluate(() => document.documentElement.classList.contains("gsap-on"));
  if (on) fail("reduced motion: GSAP layer still running");
  const pos = await page.evaluate(() => getComputedStyle(document.querySelector(".ba")).position);
  if (pos === "sticky") fail("reduced motion: before/after still held");
  await context.close();
}

// No JavaScript: everything visible.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await page.evaluate(() => [...document.querySelectorAll("main h2, main .frame")].filter((el) => getComputedStyle(el).opacity !== "1").length);
  if (hidden) fail(`no JS: ${hidden} headings or photos hidden`);
  await context.close();
}

await browser.close();
console.log(`\n${failures.length} failure(s). Screenshots in ${OUT}/`);
process.exit(failures.length ? 1 : 0);
