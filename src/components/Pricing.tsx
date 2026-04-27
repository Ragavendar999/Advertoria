'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    tone: 'surface-panel',
    description: 'For brands that want a cleaner entry into paid growth without losing brand polish.',
    features: ['One core channel', 'Essential creative support', 'Landing page guidance', 'Monthly reporting'],
    cta: 'Start with a focused plan',
  },
  {
    name: 'Growth',
    tone: 'dark-panel',
    description: 'For brands ready to connect performance campaigns, creative systems, and funnel improvements.',
    features: ['Multi-channel strategy', 'Creative production', 'Funnel optimisation', 'Weekly reporting and strategy'],
    cta: 'Book a growth strategy call',
    featured: true,
  },
  {
    name: 'Scale',
    tone: 'surface-panel',
    description: 'For high-velocity teams that need automation, reporting depth, and faster iteration loops.',
    features: ['Everything in Growth', 'CRM and WhatsApp automation', 'Priority execution', 'Decision-ready analytics'],
    cta: 'Design a custom scale system',
  },
]

export default function Pricing() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="pricing" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Pricing direction</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            Flexible plans, structured around how much of the system you want us to run.
          </h2>
          <p className="body-copy mt-4 text-base">
            Every engagement is custom-scoped, but this gives the shape of how support grows with complexity.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className={`${plan.tone} rounded-[34px] px-6 py-8 ${plan.featured ? 'text-white' : ''}`}
            >
              {plan.featured && (
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/76">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
                  Most balanced
                </div>
              )}

              <h3 className={`display-title text-3xl font-black ${plan.featured ? 'text-white' : 'text-[var(--fg)]'}`}>{plan.name}</h3>
              <p className={`mt-4 text-sm leading-7 ${plan.featured ? 'text-white/72' : 'text-[var(--muted)]'}`}>{plan.description}</p>

              <div className="mt-7 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-[var(--gold)]' : 'text-[var(--brand)]'}`} />
                    <span className={`text-sm leading-7 ${plan.featured ? 'text-white/82' : 'text-[var(--fg)]'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${
                  plan.featured ? 'text-white' : 'text-[var(--brand)]'
                }`}
              >
                {plan.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
