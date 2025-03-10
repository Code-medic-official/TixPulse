import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js const nextConfig = { webpack: (config, { isServer }) => { config.module.rules.push({ test: /.glb$/, use: { loader: 'file-loader', options: { outputPath: 'static/models/', publicPath: '/_next/static/models/', name: '[name].[hash].[ext]', }, }, }); return config; }, };

export default nextConfig;
