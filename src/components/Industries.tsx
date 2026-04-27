'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const industries = [
  { name: 'FMCG & pet brands', desc: 'Launch support, retail awareness, and repeat-purchase systems.', accent: 'bg-[rgba(255,122,89,0.12)] text-[var(--accent)]' },
  { name: 'E-commerce', desc: 'Performance-led campaigns paired with stronger product storytelling.', accent: 'bg-[rgba(50,74,159,0.12)] text-[var(--brand)]' },
  { name: 'Local businesses', desc: 'Sharper trust signals, local targeting, and faster enquiry conversion.', accent: 'bg-[rgba(53,197,161,0.12)] text-[var(--mint)]' },
  { name: 'Education', desc: 'Intent-led funnels for admissions, counselling, and student follow-up.', accent: 'bg-[rgba(246,181,62,0.14)] text-[var(--gold)]' },
  { name: 'Personal brands', desc: 'Thought leadership, authority design, and more memorable offers.', accent: 'bg-[rgba(73,100,215,0.12)] text-[var(--brand-strong)]' },
  { name: 'Real estate', desc: 'High-clarity lead generation with cleaner qualification journeys.', accent: 'bg-[rgba(255,255,255,0.72)] text-[var(--fg)]' },
]

export default function Industries() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="industries" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="surface-panel overflow-hidden rounded-[38px] px-6 py-8 md:px-8 md:py-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Industries</span>
            <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
              The system adapts to different sectors without losing brand consistency.
            </h2>
            <p className="body-copy mt-4 text-base">
              We work across brands that need cleaner messaging, better creative, and more dependable lead flow.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07 }}
                className="rounded-[28px] border border-[rgba(50,74,159,0.1)] bg-white px-5 py-6"
              >
                <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${item.accent}`}>
                  Sector fit
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[var(--fg)]">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
