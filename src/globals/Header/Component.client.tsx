'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { getLinkUrl } from '@/utilities/getNavigationLink'
import { Logo } from '@/components/Logo/Logo'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

/** Approximates GSAP `power4.inOut` for parity with the previous animation. */
const easeInOutStrong: [number, number, number, number] = [0.76, 0, 0.24, 1]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  const menuLinks = data?.navItems || []

  // Ensure component only hydrates on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    if (!isClient) return

    const threshold = 24
    const onScroll = () => setIsScrolled(window.scrollY > threshold)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const { overflow, touchAction } = document.body.style

    if (menuIsOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = overflow
      document.body.style.touchAction = touchAction
    }

    return () => {
      document.body.style.overflow = overflow
      document.body.style.touchAction = touchAction
    }
  }, [isClient, menuIsOpen])

  useEffect(() => {
    setMenuIsOpen(false)
  }, [pathname])

  const linksContainerVariants = useMemo(
    () => ({
      open: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.1,
          delayChildren: reduceMotion ? 0 : 0.25,
        },
      },
      closed: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.05,
          staggerDirection: -1 as const,
        },
      },
    }),
    [reduceMotion],
  )

  const linkItemVariants = useMemo((): Variants => {
    const transition = reduceMotion ? { duration: 0 } : { duration: 1, ease: easeInOutStrong }
    return {
      open: { y: 0, transition },
      closed: { y: 75, transition },
    }
  }, [reduceMotion])

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen)
  const closeMenu = () => {
    setPendingHref(null)
    setMenuIsOpen(false)
  }

  const handleMenuLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setPendingHref(href)
    setMenuIsOpen(false)
  }

  const useLightSurface = menuIsOpen || isScrolled
  const activeTheme = useLightSurface ? null : theme
  const headerTextClass = useLightSurface ? 'text-[#524636]' : 'text-[#524636] dark:text-white'
  const logoClassName = useLightSurface ? 'invert' : 'dark:invert-0'

  // Prevent hydration mismatch by rendering minimal version on server
  if (!isClient) {
    return (
      <header className="container fixed z-10 p-4 top-0 right-0 left-0">
        <div className="py-6 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className={logoClassName} />
          </Link>
          <div className="cursor-pointer flex items-center justify-center">
            <p
              className={`uppercase font-light tracking-wide transition-colors duration-300 ${headerTextClass}`}
            >
              Menu
            </p>
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      className={`fixed z-10 top-0 right-0 left-0 transition-colors duration-500 ${
        useLightSurface ? 'bg-[#E6E3D9] supports-backdrop-filter:bg-[#E6E3D9]' : ''
      }`}
      animate={{ y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
      {...(activeTheme ? { 'data-theme': activeTheme } : {})}
    >
      <div className="container p-4">
        <div className="py-6 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" className={logoClassName} />
          </Link>
          <div onClick={toggleMenu} className="cursor-pointer flex items-center justify-center">
            <p
              className={`uppercase font-light tracking-wide transition-colors duration-300 ${headerTextClass}`}
            >
              Menu
            </p>
          </div>
        </div>
      </div>

      {/* MenuOverlay */}
      <motion.div
        id="menu-overlay"
        className="fixed top-0 left-0 w-screen h-screen p-[2em] flex z-20 bg-[#E6E3D9] text-[#524636]"
        initial={false}
        animate={{
          clipPath: menuIsOpen
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: easeInOutStrong }}
        onAnimationComplete={() => {
          if (!menuIsOpen && pendingHref) {
            router.push(pendingHref)
            setPendingHref(null)
          }
        }}
      >
        <div className="flex container">
          <div id="menu-overlay-bar" className="fixed top-0 right-0 left-0 z-30">
            <div className="container p-4">
              <div className="py-6 flex justify-between">
                <div id="menu-logo" className="text-xl font-bold">
                  <Link href="/">
                    <Logo loading="eager" priority="high" className={logoClassName} />
                  </Link>
                </div>
                <div
                  onClick={closeMenu}
                  className="cursor-pointer flex items-center justify-center"
                >
                  <p className="uppercase font-light tracking-wide transition-colors duration-300 dark:text-white text-[#524636]">
                    Close
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden flex-2 md:flex cursor-pointer items-end" onClick={closeMenu}>
            <p className="text-8xl/[70%]">&#x2715;</p>
          </div>

          <div
            id="menu-copy"
            className="flex-4 flex flex-col justify-between pt-[8em] md:pt-[2em] md:ml-12"
          >
            <motion.div
              id="menu-links"
              className="md:mt-12"
              initial={false}
              animate={menuIsOpen ? 'open' : 'closed'}
              variants={linksContainerVariants}
            >
              {menuLinks.map((link, index) => {
                const href = getLinkUrl(link.link)

                return (
                  <motion.div
                    key={index}
                    className="relative w-max overflow-hidden"
                    variants={linkItemVariants}
                  >
                    <Link
                      href={href}
                      onClick={(event) => handleMenuLinkClick(event, href)}
                      className="uppercase text-6xl/[85%] md:text-8xl/[85%] tracking-tight"
                    >
                      {link.link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}
