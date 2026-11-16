'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

import { Cart } from '@/components/Cart'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getLinkUrl } from '@/utilities/getNavigationLink'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [siteTheme, setSiteTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const readTheme = () => setSiteTheme(document.documentElement.getAttribute('data-theme'))

    readTheme()

    const observer = new MutationObserver(readTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const threshold = 24
    const onScroll = () => setIsScrolled(window.scrollY > threshold)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onDarkContent = !isScrolled && (headerTheme === 'dark' || siteTheme === 'dark')

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-10 transition-colors duration-300',
        isScrolled ? 'bg-white text-espresso' : 'bg-transparent',
        onDarkContent ? 'text-paper' : 'text-espresso',
      )}
    >
      <div className="mx-auto flex h-[88px] w-full max-w-[1280px] items-center justify-between px-8">
        <Link
          className="font-display text-[28px] leading-none tracking-[2px] text-current"
          href="/"
        >
          ELLA’FÉ
        </Link>
        <nav className="flex items-center gap-2 lg:gap-8">
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map(({ link }, index) => {
              const href = getLinkUrl(link)
              const isActive = href === '/' ? pathname === '/' : pathname === href

              return (
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-11 items-center border-b font-sans text-sm font-normal leading-[22px] text-current transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze',
                    isActive ? 'border-current' : 'border-transparent',
                  )}
                  href={href}
                  key={index}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          {navItems.length > 0 ? (
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                aria-label="Open menu"
                className="inline-flex size-11 items-center justify-center text-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze lg:hidden"
              >
                <Menu aria-hidden className="size-5" strokeWidth={1.5} />
              </SheetTrigger>
              <SheetContent className="bg-paper text-ink" data-theme="light" side="right">
                <SheetHeader>
                  <SheetTitle className="font-display text-[28px] leading-none font-normal tracking-[2px] text-espresso">
                    ELLA’FÉ
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-4">
                  {navItems.map(({ link }, index) => {
                    const href = getLinkUrl(link)
                    const isActive = href === '/' ? pathname === '/' : pathname === href

                    return (
                      <SheetClose asChild key={index}>
                        <Link
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'inline-flex h-12 items-center border-b font-sans text-base leading-6 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze',
                            isActive ? 'border-espresso' : 'border-subtle',
                          )}
                          href={href}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          ) : null}
          <Link
            aria-label="Account"
            className={cn(
              'inline-flex h-11 items-center border-b text-current transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze',
              pathname.startsWith('/account') || pathname === '/login'
                ? 'border-current'
                : 'border-transparent',
            )}
            href="/account"
          >
            <User aria-hidden className="size-5" strokeWidth={1.5} />
          </Link>
          <Suspense fallback={null}>
            <Cart />
          </Suspense>
        </nav>
      </div>
    </header>
  )
}
