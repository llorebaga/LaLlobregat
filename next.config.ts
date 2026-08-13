import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  basePath: "",
  // Keep generated files at the export root. The Pages preparation step adds
  // the repository prefix to public URLs without nesting the actual assets.
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
