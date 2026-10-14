// Copies the approved source photos from assets-source/ into public/images/,
// capped at 1600px on the long side. next/image produces AVIF/WebP variants at runtime.
// Mapping must stay in sync with docs/decormg/03-asset-manifest.md.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-source";
const OUT = "public/images";

const map = {
  "google-maps/gm-01-bano-marmol-blanco.jpg": "bano-marmol-1.jpg",
  "google-maps/gm-02-salon-papel-pintado.jpg": "salon-1.jpg",
  "google-maps/gm-03-cocina-abierta-comedor.jpg": "cocina-abierta-1.jpg",
  "google-maps/gm-04-bano-laton-espejo-dorado.jpg": "bano-laton-1.jpg",
  "google-maps/gm-05-salon-mueble-tv.jpg": "salon-2.jpg",
  "google-maps/gm-06-cocina-despues.jpg": "cocina-despues.jpg",
  "google-maps/gm-10-cocina-antes.jpg": "cocina-antes.jpg",
  "google-maps/gm-08-local-techo-hexagonal-obra.jpg": "local-led-1.jpg",
  "google-maps/gm-09-cocina-en-obra.jpg": "cocina-obra.jpg",
  "cronoshare/x3m58cy4pnnhzzj.jpg": "bano-laton-obra-1.jpg",
  "cronoshare/xfvip4qjtwj1syx.jpg": "bano-laton-obra-2.jpg",
  "cronoshare/d3s6qvc9qc1xvx8.jpg": "bano-laton-obra-3.jpg",
  "cronoshare/u4opudlrdrhvc67.jpg": "bano-gris-1.jpg",
  "cronoshare/26wcl32vqgfqyxw.jpg": "bano-gris-obra-1.jpg",
  "cronoshare/rtn23yvt1vt47rs.jpg": "bano-gris-obra-2.jpg",
  "instagram/DecjXmOjUAF.jpg": "aguilas-despues.jpg",
  "instagram/DecEkdWNFyu.jpg": "aguilas-antes.jpg",
  "instagram/DdWC44mjRsT.jpg": "lucero-despues.jpg",
  "instagram/DdTnUr8NNcL.jpg": "lucero-antes.jpg",
  "instagram/DdjA8icjZxW.jpg": "villaverde-despues.jpg",
  "instagram/Ddi3oh3tPWl.jpg": "villaverde-antes.jpg",
  "instagram/DdJ6p7KDfyi.jpg": "aluche-1.jpg",
  "instagram/DZe66pGNZ2E.jpg": "equipo-obra.jpg",
};

await mkdir(OUT, { recursive: true });
for (const [from, to] of Object.entries(map)) {
  const info = await sharp(path.join(SRC, from))
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, to));
  console.log(`${to.padEnd(26)} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}
