'use client'
import clsx from 'clsx'
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion'

type FadeInProps = {
  children: React.ReactNode
  vars?: {
    initial?: TargetAndTransition
    animate?: TargetAndTransition
    transition?: Transition
  }
  start?: string
  className?: string
}

export const FadeIn = ({ children, start = 'top 80%', vars = {}, className }: FadeInProps) => {
  const reduceMotion = useReducedMotion()

  const getViewportMarginFromStart = (startValue: string): string => {
    const match = /^top\s+(\d+)%$/.exec(startValue.trim())
    if (!match) return '0px 0px -20% 0px'
    const percent = Number(match[1])
    const bottomOffset = Math.max(0, Math.min(100, 100 - percent))
    return `0px 0px -${bottomOffset}% 0px`
  }

  const initial = vars.initial ?? { opacity: 0, y: 16 }
  const animate = vars.animate ?? { opacity: 1, y: 0 }
  const transition = vars.transition ?? {
    duration: reduceMotion ? 0.5 : 0.9,
    ease: reduceMotion ? 'linear' : 'easeOut',
  }

  return (
    <motion.div
      className={clsx(className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: getViewportMarginFromStart(start) }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
