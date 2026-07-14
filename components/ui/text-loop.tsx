'use client'
import { cn } from '@/lib/utils'
import {
  motion,
  AnimatePresence,
  Transition,
  Variants,
  AnimatePresenceProps,
} from 'motion/react'
import { useState, useEffect, useRef, useCallback, Children } from 'react'

export type TextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  transition?: Transition
  variants?: Variants
  onIndexChange?: (index: number) => void
  trigger?: boolean
  mode?: AnimatePresenceProps['mode']
  clickToAdvance?: boolean
  autoResumeDelay?: number
}

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
  clickToAdvance = false,
  autoResumeDelay = 3000,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const items = Children.toArray(children)

  const effectiveTrigger = trigger && !isPaused

  useEffect(() => {
    if (!effectiveTrigger) return

    const intervalMs = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange, effectiveTrigger])

  const advanceAndPause = useCallback(() => {
    setCurrentIndex((current) => {
      const next = (current + 1) % items.length
      onIndexChange?.(next)
      return next
    })
    setIsPaused(true)

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, autoResumeDelay)
  }, [items.length, onIndexChange, autoResumeDelay])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <div
      className={cn(
        'relative inline-block whitespace-nowrap',
        clickToAdvance && 'cursor-pointer select-none',
        className,
      )}
      onClick={clickToAdvance ? advanceAndPause : undefined}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
