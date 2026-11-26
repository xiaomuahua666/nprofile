/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 版本号：Vercel 构建时取本次部署的 commit sha 前 7 位。
  // 每次部署都会变化，前端据此判断线上是否已更新并自动刷新。
  // 本地开发没有该变量，回退为 'dev'（此时不做版本检测）。
  env: {
    NEXT_PUBLIC_BUILD_ID: (process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev').slice(0, 7),
  },
};

export default nextConfig;
