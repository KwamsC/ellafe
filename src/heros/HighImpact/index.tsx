'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FadeIn } from '@/components/animations/FadeIn'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()

  // Parallax effect for the content
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative isolate h-screen -mt-16 flex items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <FadeIn
        vars={{
          initial: { opacity: 0, scale: reduceMotion ? 1 : 1.25 },
          animate: { opacity: 1, scale: 1 },
        }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0">
          {media && typeof media === 'object' && (
            <Media
              resource={media}
              fill
              priority
              videoClassName={`object-cover absolute inset-0 w-full h-full transition-opacity duration-1000`}
              imgClassName="-z-10 object-cover"
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/60" />
      </FadeIn>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full container text-white px-4 text-center"
        style={{ y, opacity }}
      >
        {/* Main Heading */}
        <motion.div
          className="max-w-146"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {richText && <RichText className="mb-6 text-left" data={richText} enableGutter={false} />}
        </motion.div>

        {/* CTA Links */}
        {Array.isArray(links) && links.length > 0 && (
          <motion.ul
            className="flex md:justify-center self-baseline gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink size="lg" {...link} />
              </li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </div>
  )
}
