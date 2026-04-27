'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, GraduationCap, Lightbulb, RefreshCw, Rocket } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Creative and performance in one room',
    desc: 'The visual language and the ad strategy are shaped together, which makes the work more persuasive and more coherent.',
  },
  {
    icon: Brain,
    title: 'Strategy before execution',
    desc: 'We map the offer, user intent, and proof first so the design and campaigns have a stronger point of view.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous optimisation',
    desc: 'What we learn from campaigns feeds back into the site, creatives, and follow-up journeys quickly.',
  },
  {
    icon: Rocket,
    title: 'Fast rollout without visual chaos',
    desc: 'We build speed on top of a system, which keeps the brand experience consistent while things move.',
  },
  {
    icon: GraduationCap,
    title: 'Fresh ideas from a training ecosystem',
    desc: 'The team keeps refining hooks, creative formats, and market understanding instead of repeating old templates.',
  },
]

export default function WhyUs() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="why-us" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Why Advertoria</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            Why brands choose Advertoria when they want the full experience to feel stronger.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {features.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className="surface-panel bento-card rounded-[30px] px-6 py-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[rgba(50,74,159,0.09)] text-[var(--brand)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold leading-7 text-[var(--fg)]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
