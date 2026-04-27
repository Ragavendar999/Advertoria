'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X, Briefcase } from 'lucide-react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'advisor', label: 'AI Advisor' },
  { id: 'instagram-audit', label: 'Instagram Audit' },
  { id: 'results', label: 'Results' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const offset = 160

      for (const { id } of links) {
        const element = document.getElementById(id)
        if (!element) continue
        const top = element.offsetTop - offset
        if (window.scrollY >= top && window.scrollY < top + element.offsetHeight) {
          setActive(id)
          return
        }
      }

      setActive('')
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}
    >
      <div
        className={`section-shell flex items-center gap-3 rounded-full px-4 py-3 transition-all duration-300 md:px-5 ${
          scrolled
            ? 'border border-[rgba(255,255,255,0.12)] bg-[rgba(29,14,78,0.9)] backdrop-blur-xl shadow-[0_20px_48px_rgba(29,14,78,0.28)]'
            : 'border border-[rgba(78,47,168,0.1)] bg-white/82 backdrop-blur-xl shadow-[0_16px_40px_rgba(29,14,78,0.1)]'
        }`}
      >
        <button onClick={() => scrollTo('hero')} className="flex flex-shrink-0 items-center">
          <div className="relative h-11 w-[160px] xl:h-12 xl:w-[170px]">
            <Image
              src="/Advertoria-Logo.png.png"
              alt="Advertoria logo"
              fill
              className="object-contain object-left"
              sizes="170px"
              priority
              style={{ filter: scrolled ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.3s ease' }}
            />
          </div>
        </button>

        <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
          <div
            className={`flex items-center gap-0.5 rounded-full p-1 ${
            scrolled
              ? 'border border-white/12 bg-white/8'
              : 'border border-[rgba(78,47,168,0.1)] bg-[rgba(78,47,168,0.06)]'
            }`}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`rounded-full px-3 py-2 text-[0.95rem] font-semibold whitespace-nowrap transition-all ${
                  active === link.id
                    ? 'bg-[var(--accent)] text-[var(--brand-strong)]'
                    : scrolled
                      ? 'text-white/72 hover:bg-white/10 hover:text-white'
                      : 'text-[var(--muted)] hover:bg-[rgba(78,47,168,0.08)] hover:text-[var(--fg)]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/portfolio"
            className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              scrolled
                ? 'border border-white/12 bg-white/8 text-white/70 hover:bg-white/14 hover:text-white'
                : 'border border-[rgba(78,47,168,0.15)] bg-[rgba(78,47,168,0.06)] text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Portfolio
          </Link>
          <button onClick={() => scrollTo('contact')} className="button-primary btn-shimmer px-5 py-3 text-sm whitespace-nowrap">
            Book strategy call
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-full border border-[rgba(78,47,168,0.15)] bg-white/80 p-3 text-[var(--brand)] lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell mt-3 rounded-[28px] border border-[rgba(78,47,168,0.14)] bg-white/96 p-4 shadow-[0_28px_60px_rgba(29,14,78,0.18)] backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1.5">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                    active === link.id
                      ? 'border border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--brand-strong)]'
                      : 'text-[var(--fg)] hover:bg-[rgba(78,47,168,0.06)]'
                  }`}
                >
                  {link.label}
                  {active === link.id && <ArrowUpRight className="h-4 w-4" />}
                </button>
              ))}
              <Link
                href="/portfolio"
                className="flex w-full items-center justify-between rounded-2xl border border-[rgba(78,47,168,0.15)] bg-[rgba(78,47,168,0.06)] px-4 py-3 text-sm font-semibold text-[var(--fg)]"
              >
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Portfolio</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button onClick={() => scrollTo('contact')} className="button-primary btn-shimmer mt-2 w-full px-5 py-3.5 text-sm">
                Book strategy call
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
