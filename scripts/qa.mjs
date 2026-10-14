// Browser QA for the demo: full-page screenshots at the audited widths plus automatic checks.
// Usage: node scripts/qa.mjs [baseUrl]   (default http://localhost:3100)
// Uses an installed Chrome or Edge through playwright-core; no browser download.
import { chromium } from "playwright-core";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = "qa-output";
const WIDTHS = [360, 390, 768, 1024, 1440];
const ROUTES = [
  "/",
  "/proyectos",
  "/proyectos/bano-las-aguilas",
  "/proyectos/cocina-antes-despues",
  "/proyectos/bano-gris-espejo-led",
  "/servicios",
  "/servicios/reformas-de-banos",
  "/servicios/reformas-de-cocinas",
  "/servicios/reformas-integrales",
  "/nosotros",
  "/contacto",
  "/aviso-legal",
  "/privacidad",
  "/cookies",
  "/no-existe",
];

const browserPath = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: browserPath });
const results = [];
let failures = 0;
const fail = (route, width, msg) => {
  failures++;
  results.push({ route, width, level: "FAIL", msg });
};
const note = (route, width, msg) => results.push({ route, width, level: "INFO", msg });

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 800 : 900 },
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    const status = res?.status() ?? 0;
    if (route === "/no-existe" ? status !== 404 : status !== 200) fail(route, width, `HTTP ${status}`);

    // Load every lazy image before measuring and capturing.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");

    const checks = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const scrollers = ".scroller, .run__frames, .showcase__run, .marquee, .shelf, .team-strip";
      const overflow = [...document.querySelectorAll("body *")]
        .filter((el) => !el.closest(scrollers) && !el.closest(".contact-band > div:first-child"))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > vw + 1;
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 30)}`);
      const imgsNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
      const brokenImgs = [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0).length;
      const unnamed = [...document.querySelectorAll("a, button")]
        .filter((el) => !(el.getAttribute("aria-label") || el.textContent.trim() || el.querySelector("img[alt]:not([alt=''])")))
        .length;
      const h1 = document.querySelectorAll("h1").length;
      const inputsNoLabel = [...document.querySelectorAll("input, select, textarea")].filter(
        (el) => el.type !== "hidden" && !(el.labels?.length || el.getAttribute("aria-label")),
      ).length;
      const smallTargets = [...document.querySelectorAll("button, .btn, .action-bar a, .icon-btn")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.height < 44 || r.width < 44);
        })
        .length;
      const headlines = [...document.querySelectorAll("h1, h2")]
        .map((h) => {
          // Count rendered lines from the text boxes, not the element box (grid items may stretch).
          const range = document.createRange();
          range.selectNodeContents(h);
          const tops = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top)));
          return { text: h.textContent.trim().slice(0, 40), lines: tops.size };
        })
        .filter((h) => h.lines > 2);
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
      return { overflow, imgsNoAlt, brokenImgs, unnamed, h1, inputsNoLabel, smallTargets, headlines, robots };
    });

    if (checks.overflow.length) fail(route, width, `horizontal overflow: ${checks.overflow.join(", ")}`);
    if (checks.imgsNoAlt) fail(route, width, `${checks.imgsNoAlt} img without alt`);
    if (checks.brokenImgs) fail(route, width, `${checks.brokenImgs} broken img`);
    if (checks.unnamed) fail(route, width, `${checks.unnamed} link/button without accessible name`);
    if (checks.h1 !== 1) fail(route, width, `${checks.h1} h1 elements`);
    if (checks.inputsNoLabel) fail(route, width, `${checks.inputsNoLabel} form fields without label`);
    if (checks.smallTargets) note(route, width, `${checks.smallTargets} controls under 44px`);
    for (const h of checks.headlines) fail(route, width, `headline over 2 lines (${h.lines}): ${h.text}`);
    if (!checks.robots?.includes("noindex")) fail(route, width, "missing noindex on demo");
    for (const e of errors) {
      if (route === "/no-existe" && /404/.test(e)) continue; // the expected 404 response itself
      fail(route, width, `console: ${e}`);
    }

    const name = `${route === "/" ? "home" : route.slice(1).replace(/\//g, "_")}-${width}`;
    await page.screenshot({ path: `${OUT}/${name}.jpg`, fullPage: true, type: "jpeg", quality: 60 });
    await context.close();
  }
  process.stdout.write(`checked ${route}\n`);
}

// Interaction checks at phone width: menu, Escape, focus return, form validation.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const trigger = page.locator('button[aria-controls="menu-sheet"]');
  await trigger.click();
  const open = await page.locator("dialog#menu-sheet").evaluate((d) => d.open);
  if (!open) fail("/", 390, "menu does not open");
  await page.keyboard.press("Escape");
  const closed = await page.locator("dialog#menu-sheet").evaluate((d) => !d.open);
  if (!closed) fail("/", 390, "Escape does not close menu");
  const focusBack = await trigger.evaluate((el) => el === document.activeElement);
  if (!focusBack) fail("/", 390, "focus does not return to menu button");

  await page.goto(BASE + "/contacto", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Abrir WhatsApp/ }).click();
  const errorsShown = await page.locator(".field .error").count();
  if (errorsShown < 4) fail("/contacto", 390, `expected validation errors, got ${errorsShown}`);
  const invalidFocused = await page.evaluate(() => document.activeElement?.tagName);
  if (invalidFocused !== "SELECT") fail("/contacto", 390, `focus not moved to first invalid field (${invalidFocused})`);

  await page.selectOption("select", "Reforma de baño");
  await page.fill('input[placeholder*="Las Águilas"]', "Aluche");
  await page.fill("textarea", "Cambiar la bañera por un plato de ducha.");
  await page.fill('input[autocomplete="given-name"]', "Prueba");
  await page.getByRole("radio", { name: "Por WhatsApp" }).check();
  await page.locator('input[type="checkbox"]').check();
  const [popup] = await Promise.all([
    context.waitForEvent("page", { timeout: 5000 }).catch(() => null),
    page.getByRole("button", { name: /Abrir WhatsApp/ }).click(),
  ]);
  const url = popup?.url() ?? "";
  if (!/(wa\.me|api\.whatsapp\.com|whatsapp)/.test(url)) fail("/contacto", 390, `WhatsApp not opened (got "${url}")`);
  else note("/contacto", 390, `opens ${decodeURIComponent(url).slice(0, 140)}`);
  const status = await page.locator('[role="status"]').first().textContent();
  if (/enviad/i.test(status ?? "")) fail("/contacto", 390, "status claims the message was sent");
  await context.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(results, null, 2));
for (const r of results) console.log(`${r.level.padEnd(4)} ${r.route} @${r.width}: ${r.msg}`);
console.log(`\n${failures} failure(s). Screenshots in ${OUT}/`);
process.exit(failures ? 1 : 0);
