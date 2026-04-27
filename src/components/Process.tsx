'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart3, Megaphone, Palette, Search, Workflow, ArrowUpRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Deep Audit',
    desc: 'We dissect your offer, audience behaviour, existing ads, landing experience, and follow-up so we find exactly where revenue is leaking.',
    color: 'bg-[var(--brand)]',
    glow: 'rgba(78,47,168,0.35)',
    accent: 'text-[var(--brand)]',
    bg: 'bg-[rgba(78,47,168,0.07)]',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Creative Direction',
    desc: 'We build the visual identity, hooks, and messaging framework so the brand feels premium and impossible to ignore across every touchpoint.',
    color: 'bg-[var(--accent)]',
    glow: 'rgba(201,232,76,0.3)',
    accent: 'text-[var(--accent-dark)]',
    bg: 'bg-[rgba(201,232,76,0.1)]',
  },
  {
    number: '03',
    icon: Megaphone,
    title: 'Campaign Launch',
    desc: 'Traffic is structured by objective, buying stage, and creative angle — so testing is clean and winners reveal themselves fast.',
    color: 'bg-[var(--brand-light)]',
    glow: 'rgba(155,127,224,0.35)',
    accent: 'text-[var(--brand-light)]',
    bg: 'bg-[rgba(155,127,224,0.1)]',
  },
  {
    number: '04',
    icon: Workflow,
    title: 'Funnel & Automation',
    desc: 'Landing pages, forms, WhatsApp flows, and CRM journeys are wired together so the handoff from click to closed sale is seamless.',
    color: 'bg-[var(--pink)]',
    glow: 'rgba(242,196,222,0.4)',
    accent: 'text-[rgba(160,60,120,0.9)]',
    bg: 'bg-[rgba(242,196,222,0.15)]',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Scale & Compound',
    desc: 'Performance data flows back into creative decisions, audience refinements, and budget calls — so scaling is confident, not reactive.',
    color: 'bg-[var(--brand-strong)]',
    glow: 'rgba(45,27,105,0.5)',
    accent: 'text-[var(--brand-strong)]',
    bg: 'bg-[rgba(45,27,105,0.08)]',
  },
]

/* ─── Single step card ─── */
function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[0]
  index: number
  inView: boolean
}) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`surface-panel bento-card relative overflow-hidden rounded-[32px] px-6 py-7`}
    >
      {/* Step number watermark */}
      <span
        className="display-title pointer-events-none absolute right-4 top-3 text-6xl font-black opacity-[0.07]"
        style={{ color: 'var(--brand)' }}
      >
        {step.number}
      </span>

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.18, duration: 0.45, type: 'spring', stiffness: 200 }}
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] ${step.color}`}
        style={{ boxShadow: `0 8px 24px ${step.glow}` }}
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>

      {/* Step label */}
      <p className={`mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] ${step.accent}`}>
        Step {step.number}
      </p>

      <h3 className="display-title text-xl font-black text-[var(--fg)]">{step.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.desc}</p>

      {/* Bottom accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'left' }}
        className={`absolute bottom-0 left-0 h-0.5 w-full ${step.color} opacity-40`}
      />
    </motion.div>
  )
}

/* ─── Animated connector line ─── */
function ConnectorLine({ inView }: { inView: boolean }) {
  return (
    <div className="relative hidden h-1 lg:block">
      <div className="absolute inset-y-0 left-0 right-0 h-px top-1/2 bg-[rgba(78,47,168,0.12)]" />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="absolute inset-y-0 left-0 right-0 h-px top-1/2 bg-gradient-to-r from-[var(--brand)] via-[var(--brand-light)] to-[var(--accent)]"
      />
      {/* Arrow dots at each step */}
      {[0, 25, 50, 75, 100].map((pct) => (
        <motion.div
          key={pct}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3 + (pct / 100) * 1.4 + 0.1, duration: 0.3, type: 'spring' }}
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--brand)]"
          style={{ left: `${pct}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        />
      ))}
    </div>
  )
}

/* ─── Journey timeline (mobile vertical) ─── */
function MobileTimeline({ steps: s, inView }: { steps: typeof steps; inView: boolean }) {
  return (
    <div className="relative space-y-4 lg:hidden">
      {/* Vertical line */}
      <div className="absolute left-[27px] top-7 bottom-7 w-px bg-[rgba(78,47,168,0.12)]" />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-[27px] top-7 bottom-7 w-px bg-gradient-to-b from-[var(--brand)] to-[var(--accent)]"
      />

      {s.map((step, i) => {
        const Icon = step.icon
        return (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.15, type: 'spring', stiffness: 240 }}
              className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[18px] ${step.color}`}
              style={{ boxShadow: `0 6px 20px ${step.glow}` }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
            <div className="surface-panel bento-card flex-1 rounded-[24px] px-5 py-5">
              <p className={`mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] ${step.accent}`}>
                Step {step.number}
              </p>
              <h3 className="text-lg font-extrabold text-[var(--fg)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{step.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="section-shell space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="grid gap-8 lg:grid-cols-2 lg:items-end"
        >
          <div className="space-y-5">
            <span className="eyebrow">Your Journey With Us</span>
            <h2 className="display-title text-4xl font-black leading-[0.95] text-[var(--fg)] md:text-5xl">
              5 steps from scattered spend
              <span className="text-[var(--accent)]"> to a compounding revenue machine.</span>
            </h2>
          </div>
          <div className="space-y-4">
            <p className="body-copy text-base">
              This is not a generic agency process. It&apos;s a battle-tested system that connects
              every moving part — so improvements in one layer automatically lift the others.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand)]">
              Start the process
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Desktop: connector line + cards */}
        <div className="hidden flex-col gap-5 lg:flex">
          <ConnectorLine inView={inView} />
          <div className="grid gap-4 lg:grid-cols-5">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <MobileTimeline steps={steps} inView={inView} />

        {/* Bottom CTA dark panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="dark-panel rounded-[36px] p-6 md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/44">
                One system. All five layers.
              </p>
              <h3 className="display-title mt-3 text-2xl font-black text-white md:text-3xl">
                Every step is connected. Improve one, all five get stronger.
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Unlike agencies that hand off between teams, we keep strategy, creative, campaigns,
                automation, and analytics in the same loop — so insights travel instantly.
              </p>
            </div>
            <a
              href="#contact"
              className="button-primary btn-shimmer flex-shrink-0 px-7 py-4 text-sm"
            >
              Begin my journey
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
