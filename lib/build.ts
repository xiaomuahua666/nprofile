// 构建版本标识：Vercel 构建时用 commit sha 前 7 位，本地开发回退为 'dev'。
// 每次部署都会变，前端用它判断线上代码是否已更新。
export const BUILD_ID =
  (process.env.NEXT_PUBLIC_BUILD_ID as string | undefined) ?? 'dev'
