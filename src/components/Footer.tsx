'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'

const navGroups = [
  {
    title: 'Navigate',
    links: [
      { label: 'About', id: 'about' },
      { label: 'Services', id: 'services' },
      { label: 'Results', id: 'results' },
      { label: 'Contact', id: 'contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Performance marketing', id: 'services' },
      { label: 'Creative production', id: 'services' },
      { label: 'Funnels & CRO', id: 'services' },
      { label: 'Automation & CRM', id: 'services' },
    ],
  },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-8 overflow-hidden bg-[var(--bg-deep)] px-4 py-14 text-white md:px-6">
      <div className="pointer-events-none absolute left-[16%] top-0 h-64 w-64 rounded-full bg-[rgba(50,74,159,0.28)] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-[10%] h-56 w-56 rounded-full bg-[rgba(255,122,89,0.16)] blur-[110px]" />

      <div className="section-shell relative z-10">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <button onClick={() => scrollTo('hero')} className="flex items-center">
              <div className="relative h-16 w-[220px] md:h-20 md:w-[280px]">
                <Image
                  src="/Advertoria-Logo.png.png"
                  alt="Advertoria logo"
                  fill
                  className="object-contain object-left"
                  sizes="280px"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </button>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
              A more colourful, consistent brand experience only matters if it also moves people toward action.
              That is the standard we build to.
            </p>

            <div className="mt-6 space-y-3">
              <a href="https://wa.me/917358116929" className="flex items-center gap-3 text-sm text-white/72">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                +91 73581 16929
              </a>
              <a href="mailto:hello@advertoria.in" className="flex items-center gap-3 text-sm text-white/72">
                <Mail className="h-4 w-4 text-[var(--gold)]" />
                hello@advertoria.in
              </a>
              <div className="flex items-center gap-3 text-sm text-white/72">
                <MapPin className="h-4 w-4 text-[var(--gold)]" />
                Chennai, Tamil Nadu
              </div>
            </div>
          </div>

          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/44">{group.title}</p>
              <div className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-sm font-medium text-white/72 transition hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[30px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/44">Next step</p>
            <h3 className="mt-3 text-xl font-black">Book a focused growth session.</h3>
            <p className="mt-3 text-sm leading-7 text-white/68">
              We&apos;ll look at the brand, the campaigns, and the user journey together.
            </p>
            <motion.a
              href="https://wa.me/917358116929?text=Hi%20Advertoria!%20I%20want%20to%20book%20a%20strategy%20call."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="button-primary btn-shimmer mt-5 px-5 py-3 text-sm"
            >
              Book free call
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/44">&copy; {new Date().getFullYear()} Advertoria. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 transition hover:bg-white/12 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
