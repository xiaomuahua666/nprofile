import { NextResponse } from 'next/server'
import { BUILD_ID } from '@/lib/build'

// 返回当前线上部署的版本号。
// 前端 VersionWatcher 用它和页面加载时的版本比对，发现不一致就自动刷新。
export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(
    { buildId: BUILD_ID },
    { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } },
  )
}
