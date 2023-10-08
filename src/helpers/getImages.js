const fs = require("node:fs/promises");
const path = require("node:path");

async function getImages(dirPath) {
  const formats = [".png", ".git", ".jpg", ".jpeg", ".webp", ".svg"];

  // leer el diretorio donde estan las imagenes
  const imagesPath = path.join(__dirname, "..", dirPath);

  const images = await fs.readdir(imagesPath); // el readdir nos permite hacer un mapeo de la ruta que se paso en el join

  const filtered = images.filter((img) => formats.includes(path.extname(img)));

  return filtered.map((img) => ({
    filename: img,
    path: `${imagesPath}/${img}`,
    cid: img.split(".")[0],
  }));
}

module.exports = getImages;
