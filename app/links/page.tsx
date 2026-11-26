import type { Metadata } from 'next'
import Link from 'next/link'
import { FRIEND_LINKS } from '../data'
import { WEBSITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: '友情链接',
  description: '麻花的友情链接，欢迎交换友链。',
}

export default function LinksPage() {
  return (
    <main className="space-y-12 md:space-y-16">
      <section>
        <h1 className="mb-4 text-lg md:text-xl font-medium">友情链接</h1>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          这里是一些我常去的地方。欢迎通过{' '}
          <a
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
            href="mailto:mahua@mahua.uk"
          >
            邮箱
          </a>{' '}
          联系我。咱们交换友链！
        </p>
      </section>

      <section>
        {FRIEND_LINKS.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            还没有添加友链……
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2">
            {FRIEND_LINKS.map((friend) => (
              <a
                key={friend.link}
                href={friend.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={friend.avatar}
                  alt={`${friend.name} 的头像`}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-zinc-200 transition-transform duration-500 group-hover:rotate-[360deg] dark:ring-zinc-700"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-black dark:text-zinc-100">
                    {friend.name}
                  </div>
                  <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {friend.description}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-base md:text-lg font-medium">我的友链信息</h2>
        <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
{`name: 麻花 / Mahua
link: ${WEBSITE_URL}
avatar: ${WEBSITE_URL}/avatar.jpg
descr: 一名学生，喜欢打舞萌，偶尔玩玩 MC`}
        </pre>
      </section>

      <p className="text-sm">
        <Link
          href="/"
          className="text-zinc-500 underline hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          回到主页
        </Link>
      </p>
    </main>
  )
}
