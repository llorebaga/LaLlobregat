import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const hasCustomDomain = Boolean(process.env.CUSTOM_DOMAIN);
const isProjectPage =
  process.env.GITHUB_ACTIONS === "true" &&
  !hasCustomDomain &&
  repository !== "" &&
  !repository.endsWith(".github.io");
const assetPrefix = isProjectPage ? `/${repository}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  basePath: "",
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
