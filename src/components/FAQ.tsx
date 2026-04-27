'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How quickly can this kind of refresh affect results?',
    a: 'Visual clarity can improve user confidence almost immediately, while campaign and funnel changes usually show stronger performance signals over the first two to four weeks.',
  },
  {
    q: 'Do you only improve the look, or the whole conversion journey too?',
    a: 'The goal is always the full journey. We improve the visual language, the messaging, the structure of the page, and the follow-up flow so the site feels better and converts better.',
  },
  {
    q: 'Can you work with small businesses as well as scaling brands?',
    a: 'Yes. The system flexes to both. What changes is the depth of campaign structure, reporting, automation, and creative output.',
  },
  {
    q: 'What channels do you typically manage?',
    a: 'We mainly work across Meta, Google, landing page experiences, WhatsApp journeys, and CRM-linked follow-up systems.',
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
