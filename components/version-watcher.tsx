'use client'
import { useEffect } from 'react'
import { BUILD_ID } from '@/lib/build'

// 版本更新检测器：
// 每次部署 Vercel 会生成新的 BUILD_ID（commit sha 前 7 位）。
// 本组件在页面可见时向后端询问当前线上版本，一旦发现与页面加载时的版本不同，
// 说明站点已更新，直接自动刷新页面，用户无需手动清缓存。
//
// 只在这两种情况下检查：
//   1. 标签页重新变为可见（用户切回来，最可能遇到"内容还是旧的"）
//   2. 页面停留超过 5 分钟后每分钟一次（长驻页面）
export function VersionWatcher() {
  useEffect(() => {
    // 本地开发（dev）不做检测
    if (!BUILD_ID || BUILD_ID === 'dev') return

    let cancelled = false

    const checkVersion = async () => {
      try {
        const res = await fetch('/api/version', { cache: 'no-store' })
        if (!res.ok) return
        const { buildId } = (await res.json()) as { buildId?: string }
        if (!cancelled && buildId && buildId !== BUILD_ID) {
          // 线上已是新版本，用 router.refresh 无法更新已缓存的 HTML，
          // 直接整页重载最稳妥
          window.location.reload()
        }
      } catch {
        // 网络错误静默忽略，不影响页面使用
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void checkVersion()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    const interval = setInterval(onVisibilityChange, 60 * 1000)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearInterval(interval)
    }
  }, [])

  return null
}
