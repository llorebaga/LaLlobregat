import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const files = await readdir(outputDirectory);

for (const file of files) {
  if (!file.endsWith(".html") || ["index.html", "404.html"].includes(file)) continue;
  const route = file.slice(0, -".html".length);
  const routeDirectory = path.join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(path.join(outputDirectory, file), path.join(routeDirectory, "index.html"));
}
