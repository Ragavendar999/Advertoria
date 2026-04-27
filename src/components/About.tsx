'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, BarChart3, Target, Users, Zap } from 'lucide-react'

const highlights = [
  { icon: Target, title: 'ROI-first thinking', desc: 'Every page, ad, and message is judged by clarity, trust, and conversion potential.' },
  { icon: Zap, title: 'Fast creative execution', desc: 'We move quickly but the work still feels considered, branded, and commercially sharp.' },
  { icon: Users, title: 'Real partnership', desc: 'Your strategy, brand feel, and reporting cadence all stay visible and collaborative.' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="about" className="section-padding pt-12" ref={ref}>
      <div className="section-shell grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="surface-panel rounded-[40px] p-7 md:p-10"
        >
          <span className="eyebrow">About Advertoria</span>
          <h2 className="display-title mt-6 max-w-xl text-4xl font-black leading-[0.95] text-[var(--fg)] md:text-5xl">
            Not just an agency.
            <span className="text-gradient"> Your brand-side growth partner.</span>
          </h2>
          <p className="body-copy mt-5 max-w-xl text-base">
            We build around one belief: performance gets stronger when the brand experience gets stronger.
            Strategy, visuals, copy, analytics, and follow-up all need to feel like they belong to the same system.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.15 }}
                className="rounded-[26px] border border-[rgba(78,47,168,0.1)] bg-[rgba(78,47,168,0.04)] p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]">
                  <Icon className="h-5 w-5 text-[var(--brand-strong)]" />
                </div>
                <h3 className="text-base font-extrabold text-[var(--fg)]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Principle card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12 }}
          className="dark-panel rounded-[40px] p-7 md:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--accent)]">
              <BarChart3 className="h-6 w-6 text-[var(--brand-strong)]" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-white/44">Operating principle</p>
            <h3 className="display-title mt-3 text-3xl font-black leading-tight text-white">
              Beautiful work is only useful if it also moves people to act.
            </h3>
            <p className="mt-5 text-base leading-8 text-white/66">
              That is why we keep creative direction, audience insight, landing clarity, reporting,
              and automation inside one loop instead of handing them off between disconnected teams.
            </p>
          </div>
          <a href="#services" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
            See how each service connects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
