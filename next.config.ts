import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    // App lives in wattshare-calculator/, but a parent package-lock.json causes
    // Turbopack to infer the wrong workspace root and break RSC module resolution.
    root: projectRoot,
  },
};

export default nextConfig;
