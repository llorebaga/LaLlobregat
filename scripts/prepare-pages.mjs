import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const files = await readdir(outputDirectory);
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const hasCustomDomain = Boolean(process.env.CUSTOM_DOMAIN);
const prefix = process.env.GITHUB_ACTIONS === "true" && !hasCustomDomain && repository
  ? `/${repository}`
  : "";

function prefixRootUrls(source) {
  if (!prefix) return source;
  const prefixName = prefix.slice(1);
  const rewrite = (match, attribute, value) => {
    if (value.startsWith(`${prefixName}/`)) return match;
    return `${attribute}="${prefix}/${value}"`;
  };
  const rewriteJson = (match, attribute, value) => {
    if (value.startsWith(`${prefixName}/`)) return match;
    return `${attribute}":"${prefix}/${value}`;
  };
  const rewriteEscapedJson = (match, attribute, value) => {
    if (value.startsWith(`${prefixName}/`)) return match;
    return `${attribute}\\":\\"${prefix}/${value}`;
  };
  return source
    .replace(/\b(href|src|srcset)="\/([^"]*)"/g, rewrite)
    .replace(/\b(href|src|srcSet)":"\/([^"]*)/g, rewriteJson)
    .replace(/\b(href|src|srcSet)\\":\\"\/([^\\"]*)/g, rewriteEscapedJson);
}

for (const file of files) {
  if (!file.endsWith(".html") && !file.endsWith(".rsc")) continue;
  const filePath = path.join(outputDirectory, file);
  const source = await readFile(filePath, "utf8");
  await writeFile(filePath, prefixRootUrls(source), "utf8");
}

for (const file of files) {
  if (!file.endsWith(".html") || ["index.html", "404.html"].includes(file)) continue;
  const route = file.slice(0, -".html".length);
  const routeDirectory = path.join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(path.join(outputDirectory, file), path.join(routeDirectory, "index.html"));
}
