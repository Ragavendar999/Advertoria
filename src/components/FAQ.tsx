'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Are you a Chennai-based digital marketing agency?',
    a: 'Yes. Advertoria is headquartered in Chennai, Tamil Nadu. We work with local businesses, startups, and scaling brands across Chennai and the rest of India — handling everything from performance marketing and Google Ads to branding and web development under one roof.',
  },
  {
    q: 'What digital marketing services do you offer in Chennai?',
    a: 'We offer a full suite: performance marketing (Meta Ads, Google Ads), social media marketing, SEO, lead generation, web development, logo design, graphic design, branding, UI/UX, and marketing automation. Whether you need a single service or the entire growth system, we can plug in where it matters most.',
  },
  {
    q: 'Do you work with small businesses and startups in Chennai?',
    a: 'Absolutely. The system flexes to both early-stage startups and established brands. For small businesses, we prioritise affordable, high-impact work — the right channels, tight creative, and clear reporting — so every rupee is accountable.',
  },
  {
    q: 'Do you offer logo design and graphic design services?',
    a: 'Yes. Our creative team handles logo design, brand identity, packaging, social media design, motion graphics, and complete visual systems. We approach design commercially — every visual choice is made to build trust and drive action, not just look good.',
  },
  {
    q: 'Can you build websites for businesses in Chennai?',
    a: 'Yes. We build high-performance websites using Next.js and modern web technologies — fast, SEO-ready, and conversion-focused. From landing pages and business websites to e-commerce stores and SaaS platforms, we handle design, development, and launch end to end.',
  },
  {
    q: 'How quickly can this kind of work affect results?',
    a: 'Creative and campaign changes typically show stronger performance signals within the first two to four weeks. Website and funnel improvements can lift conversion rates almost immediately once live.',
  },
  {
    q: 'What ad platforms do you manage?',
    a: 'We mainly work across Meta Ads, Google Ads, landing page experiences, WhatsApp journeys, and CRM-linked follow-up systems. We pick the right channel mix based on your audience and offer — not based on what is easiest for us to run.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="faq" className="section-padding pt-8" ref={ref}>
      <div className="section-shell max-w-4xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            A few useful questions before we start.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(({ q, a }, index) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.07 }}
              className="surface-panel overflow-hidden rounded-[28px]"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 rounded-[28px] px-6 py-5 text-left transition hover:bg-[rgba(78,47,168,0.04)]"
              >
                <span className="text-base font-extrabold text-[var(--fg)]">{q}</span>
                <motion.span
                  animate={{ rotate: open === index ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(50,74,159,0.08)] text-[var(--brand)]"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="border-t border-[rgba(50,74,159,0.08)] px-6 pb-5 pt-4 text-sm leading-7 text-[var(--muted)]">
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
