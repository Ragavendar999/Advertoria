'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  BarChart3, Bot, ChevronRight, Globe, Instagram,
  Megaphone, Palette, Sparkles, Target, Workflow, X,
} from 'lucide-react'

const services = [
  { icon: Megaphone, title: 'Performance Marketing', tagline: 'Meta, Google & TikTok campaigns built around CPL, ROAS, and revenue.', desc: 'Funnel-based campaigns from TOF to BOF — every rupee tied to outcomes.', bg: 'bg-[rgba(78,47,168,0.07)]', iconBg: 'bg-[var(--brand)]', iconColor: 'text-white', accent: 'text-[var(--brand)]', points: ['Offer and positioning alignment before any spend', 'Audience ladders for cold, warm, and retargeting', 'A/B creative testing tied to real conversion data', 'Daily optimisation with funnel feedback loops'] },
  { icon: Palette, title: 'Creative Engine', tagline: 'High-conversion ad creatives, Reels, UGC videos, and scripts that stop the scroll.', desc: 'Performance-focused creatives built for attention and action, not aesthetics.', bg: 'bg-[rgba(201,232,76,0.12)]', iconBg: 'bg-[var(--accent)]', iconColor: 'text-[var(--brand-strong)]', accent: 'text-[var(--accent-dark)]', points: ['30-60 creatives/month via content factory model', 'Hook to Story to CTA scriptwriting framework', 'Cinematic brand ads and UGC-style Reels', 'Rapid iteration from winning creative angles'] },
  { icon: Target, title: 'Funnels & Conversion', tagline: 'Landing pages, offer engineering, and CRO so every click has a reason to convert.', desc: 'Full journey from click to closed sale — landing pages, proof, offer ladders.', bg: 'bg-[rgba(155,127,224,0.1)]', iconBg: 'bg-[var(--brand-light)]', iconColor: 'text-white', accent: 'text-[var(--brand-light)]', points: ['Offer ladder engineering', 'High-conversion landing page UI/UX design', 'Heatmaps and behaviour tracking for CRO', 'Funnel insights fed back into campaign decisions'] },
  { icon: Bot, title: 'AI Automation & CRM', tagline: 'AI WhatsApp bot, auto follow-up, CRM automation, and sales sequences.', desc: 'Leads qualified, nurtured, and closed automatically — without manual effort.', bg: 'bg-[rgba(78,47,168,0.07)]', iconBg: 'bg-[var(--brand-strong)]', iconColor: 'text-white', accent: 'text-[var(--brand-strong)]', points: ['AI WhatsApp bot for qualification and closing', 'Auto follow-up email and WhatsApp sequences', 'CRM hygiene and lead routing automation', 'Remarketing audiences from live lead behaviour'] },
  { icon: Instagram, title: 'Social Media Growth', tagline: 'Organic growth strategy, 30-90 day content calendar, viral hooks, personal branding.', desc: 'Founder-led content, community building, and a repeatable content machine.', bg: 'bg-[rgba(242,196,222,0.18)]', iconBg: 'bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]', iconColor: 'text-white', accent: 'text-[var(--brand)]', points: ['Viral hook framework for Reels and carousels', '30-90 day content calendar per platform', 'Personal branding for founders', 'Community building and engagement strategy'] },
  { icon: Globe, title: 'Web Development', tagline: 'High-performance Next.js websites, e-commerce stores, and SaaS platforms.', desc: 'Conversion-focused websites that look premium, load fast, and generate leads.', bg: 'bg-[rgba(78,47,168,0.07)]', iconBg: 'bg-[var(--brand)]', iconColor: 'text-white', accent: 'text-[var(--brand)]', points: ['Next.js and Tailwind — fast, SEO-ready, modern', 'Conversion-first UI/UX to reduce friction', 'E-commerce stores and admin dashboards', 'SaaS platforms and custom web applications'] },
  { icon: BarChart3, title: 'Data & Analytics', tagline: 'KPI dashboards, attribution tracking, and AI insights — every decision data-driven.', desc: 'Campaign data connected to business metrics so scaling stays confident.', bg: 'bg-[rgba(242,196,222,0.18)]', iconBg: 'bg-[var(--pink)]', iconColor: 'text-[var(--brand-strong)]', accent: 'text-[rgba(160,60,120,0.9)]', points: ['Pixel, GA4, conversion event setup for attribution', 'Real-time KPI dashboards (CAC, ROAS, LTV)', 'Predictive analytics with AI for trend forecasting', 'Weekly plain-language reporting'] },
  { icon: Sparkles, title: 'Branding & Strategy', tagline: 'Brand positioning, visual identity, messaging framework, and storytelling strategy.', desc: 'Strategic and visual foundation that makes every other service work harder.', bg: 'bg-[rgba(201,232,76,0.12)]', iconBg: 'bg-[var(--accent)]', iconColor: 'text-[var(--brand-strong)]', accent: 'text-[var(--accent-dark)]', points: ['Brand positioning and competitive differentiation', 'Naming, visual system, and premium identity', 'Messaging framework and storytelling strategy', 'Brand voice, tone, and communication guidelines'] },
]

const playbookSteps = [
  { label: 'Brand & offer audit', icon: Sparkles },
  { label: 'Creative system build', icon: Palette },
  { label: 'Media launch & testing', icon: Megaphone },
  { label: 'Funnel optimisation', icon: Workflow },
  { label: 'Automation & reporting', icon: BarChart3 },
]

export default function Services() {
  const [selected, setSelected] = useState<(typeof services)[0] | null>(null)
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="section-shell space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">The Complete System</span>
            <h2 className="display-title text-4xl font-black leading-[0.95] text-[var(--fg)] md:text-5xl">
              8 services. One connected{' '}
              <span className="text-gradient">revenue machine.</span>
            </h2>
          </div>
          <p className="body-copy max-w-xl text-base">Each service connects to the next. Improvements in one layer automatically lift the others — ads, creative, funnels, automation, and analytics all compounding together.</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.button
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                onClick={() => setSelected(service)}
                className={`surface-panel bento-card group rounded-[30px] ${service.bg} p-6 text-left`}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] ${service.iconBg}`}>
                  <Icon className={`h-5 w-5 ${service.iconColor}`} />
                </div>
                <h3 className="display-title text-lg font-black text-[var(--fg)]">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.7] text-[var(--muted)]">{service.tagline}</p>
                <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${service.accent}`}>
                  Explore service <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="dark-panel rounded-[36px] p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">How we work across all 8 services</p>
              <h3 className="display-title mt-3 text-2xl font-black leading-tight text-white md:text-3xl">Strategy, creative, media, funnel, and follow-up — all in one connected loop.</h3>
            </div>
            <a href="#contact" className="button-primary btn-shimmer flex-shrink-0 px-7 py-4 text-sm">
              Build my growth plan <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {playbookSteps.map(({ label, icon: Icon }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 + i * 0.09 }} className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--accent)]">
                  <Icon className="h-5 w-5 text-[var(--brand-strong)]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/44">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,5,24,0.72)] p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              className="surface-panel relative w-full max-w-2xl overflow-y-auto rounded-[36px] p-8" style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute right-5 top-5 rounded-full border border-[var(--border)] bg-white/80 p-2 text-[var(--brand)]">
                <X className="h-4 w-4" />
              </button>
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-[20px] ${selected.iconBg}`}>
                <selected.icon className={`h-6 w-6 ${selected.iconColor}`} />
              </div>
              <h3 className="display-title text-3xl font-black text-[var(--fg)]">{selected.title}</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[var(--fg)]">{selected.tagline}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{selected.desc}</p>
              <div className="mt-8 grid gap-3">
                {selected.points.map((point, idx) => (
                  <motion.div key={point} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} className="flex items-start gap-3 rounded-[20px] border border-[var(--border)] bg-[rgba(78,47,168,0.04)] px-4 py-4">
                    <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${selected.iconBg}`} />
                    <span className="text-sm font-medium leading-7 text-[var(--fg)]">{point}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <a href="#contact" className="button-primary btn-shimmer flex-1 px-6 py-3.5 text-sm text-center">Get this service</a>
                <button onClick={() => setSelected(null)} className="button-secondary px-6 py-3.5 text-sm">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
