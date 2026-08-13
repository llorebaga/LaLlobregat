const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const basePath =
  process.env.GITHUB_ACTIONS === "true" && !process.env.CUSTOM_DOMAIN && repository
    ? `/${repository}`
    : "";

export function sitePath(path: string) {
  if (path === "/") return basePath ? `${basePath}/` : "/";
  return `${basePath}${path}`;
}
