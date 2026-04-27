'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Karthik M.',
    role: 'CEO, JR Agencies',
    text: 'Advertoria helped us scale qualified enquiries quickly because the creative, campaign structure, and follow-up all started working together.',
  },
  {
    name: 'Priya S.',
    role: 'Director, TSDC',
    text: 'Their team made the brand feel sharper and the numbers stronger at the same time. That combination is rare.',
  },
  {
    name: 'Vishnu T.',
    role: 'Founder, TechStartup',
    text: 'What stood out most was the clarity. Every part of the user journey felt more intentional after they rebuilt the system.',
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="testimonials" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            Clients notice the difference when the whole experience feels more intentional.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map(({ name, role, text }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className="surface-panel bento-card rounded-[32px] px-6 py-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[var(--gold)]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-[rgba(50,74,159,0.26)]" />
              </div>
              <p className="mt-5 text-sm leading-8 text-[var(--fg)]">&ldquo;{text}&rdquo;</p>
              <div className="mt-6 border-t border-[rgba(50,74,159,0.1)] pt-5">
                <p className="text-sm font-extrabold text-[var(--fg)]">{name}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">{role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
