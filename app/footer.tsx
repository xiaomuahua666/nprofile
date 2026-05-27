'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
      defaultValue={theme}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={`Switch to ${theme.label} theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

// 访问计数器组件
function VisitorCounter() {
  const [count, setCount] = useState<string>('...')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const checkCount = () => {
      const el = document.getElementById('busuanzi_value_page_pv')
      if (el && el.innerText && el.innerText !== '...') {
        setCount(el.innerText)
        if (interval) clearInterval(interval)
      }
    }

    interval = setInterval(checkCount, 500)

    // 10秒后如果还没加载成功，停止轮询并显示暂无数据
    const timeout = setTimeout(() => {
      if (interval) {
        clearInterval(interval)
        setCount('?')
      }
    }, 10000)

    return () => {
      if (interval) clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <span className="text-zinc-500 text-xs">
      访问量: {count} 次
    </span>
  )
}

function SiteUptimeSpan() {
  const [uptime, setUptime] = useState('')

  useEffect(() => {
    const calculateUptime = () => {
      const launchDate = new Date('2026-01-25').getTime()
      const now = Date.now() + (new Date().getTimezoneOffset() + 480) * 60 * 1000
      const diff = now - launchDate

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setUptime(`${days}天${hours}小时${minutes}分${String(seconds).padStart(2, '0')}秒`)
    }

    calculateUptime()
    const interval = setInterval(calculateUptime, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span>本站运行: {uptime}</span>
}

export function Footer() {
  return (
    <footer className="mt-16 md:mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a href="https://github.com/xiaomuahua666/nprofile" target="_blank" rel="noopener noreferrer">
            <TextLoop className="text-xs text-zinc-500">
              <span>© {new Date().getFullYear()} Mahua</span>
              <SiteUptimeSpan />
            </TextLoop>
          </a>
          <VisitorCounter />
        </div>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}