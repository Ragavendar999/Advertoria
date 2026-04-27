'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Sparkles, TrendingUp, Activity, Zap } from 'lucide-react'

/* ─── Data ─── */
const VERTICALS = [
  'Real Estate Agents',
  'E-Commerce Brands',
  'Coaching Businesses',
  'SaaS Founders',
  'Healthcare Brands',
  'Restaurant Chains',
]

const LIVE_FEED = [
  { name: 'Priya S.', action: 'booked a strategy call', time: '2s ago' },
  { name: 'TechFlow Co.', action: 'hit 4.2× ROAS on Meta', time: '47s ago' },
  { name: 'Neha R.', action: 'closed ₹2.8L from Instagram', time: '2m ago' },
  { name: 'VisionMax', action: 'reduced CPL by 52%', time: '5m ago' },
  { name: 'DriveScale', action: 'launched Google campaign', time: '9m ago' },
]

const CAMPAIGNS = [
  { name: 'Meta Ads', roas: '4.2×', pct: 85, color: 'bg-[var(--brand)]' },
  { name: 'Google Ads', roas: '3.8×', pct: 72, color: 'bg-[var(--brand-light)]' },
  { name: 'Organic', roas: '+280%', pct: 55, color: 'bg-[var(--accent)]' },
]

const HEADLINE_1 = ["We", "Don't", "Run", "Ads."]
const HEADLINE_2 = ["We", "Build", "Revenue", "Machines."]

const PROOF = [
  { icon: CheckCircle2, label: '50+ brands scaled' },
  { icon: TrendingUp, label: '₹10Cr+ revenue generated' },
  { icon: Sparkles, label: '45% avg CPL reduction' },
]

/* ─── Typewriter hook ─── */
function useTypewriter(words: string[], typeSpeed = 65, deleteSpeed = 45, pauseMs = 2200) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = words[index % words.length]
    const delay = deleting ? deleteSpeed : text === current ? pauseMs : typeSpeed

    timeout.current = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }
    }, delay)

    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseMs])

  return text
}

/* ─── Animated counter ─── */
function useCounter(end: number, duration = 2200, active = false) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * end))
      if (p < 1) requestAnimationFrame(step)
      else setVal(end)
    }
    requestAnimationFrame(step)
  }, [active, end, duration])
  return val
}

/* ─── Live Revenue Dashboard ─── */
function LiveDashboard() {
  const [ready, setReady] = useState(false)
  const [feedIdx, setFeedIdx] = useState(0)
  const revenue = useCounter(247832, 2400, ready)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setFeedIdx((i) => (i + 1) % LIVE_FEED.length), 2600)
    return () => clearInterval(id)
  }, [ready])

  return (
    <div className="surface-panel bento-card relative overflow-hidden rounded-[38px] p-5 md:p-6">
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[rgba(201,232,76,0.07)] blur-[60px]" />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#22C55E]">Live</span>
        </div>
        <span className="rounded-full border border-[var(--border)] bg-[rgba(78,47,168,0.05)] px-3 py-1 text-[10px] font-bold text-[var(--muted)]">
          This Month
        </span>
      </div>

      {/* Revenue counter */}
      <div className="mb-4 rounded-[22px] bg-[rgba(78,47,168,0.05)] px-4 py-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">Total Revenue Generated</p>
        <div className="display-title mt-1.5 text-3xl font-black text-[var(--brand)]">
          ₹{revenue.toLocaleString('en-IN')}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs font-bold text-[#22C55E]">
          <TrendingUp className="h-3 w-3" />
          +34% vs last month
        </div>
      </div>

      {/* Campaign bars */}
      <div className="mb-4 space-y-3">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--brand)]">Active Campaigns</p>
        {CAMPAIGNS.map(({ name, roas, pct, color }, i) => (
          <div key={name}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--fg)]">{name}</span>
              <span className="font-black text-[var(--brand)]">{roas}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[rgba(78,47,168,0.08)]">
              <motion.div
                className={`h-full rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={ready ? { width: `${pct}%` } : { width: 0 }}
                transition={{ duration: 1.1, delay: i * 0.15 + 0.3, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live feed */}
      <div className="rounded-[18px] border border-[var(--border)] bg-[rgba(78,47,168,0.03)] p-3">
        <div className="mb-2 flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-[var(--brand)]" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--brand)]">Live Activity</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={feedIdx}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.28 }}
            className="flex items-center justify-between gap-2"
          >
            <p className="text-xs text-[var(--fg)]">
              <span className="font-bold">{LIVE_FEED[feedIdx].name}</span>
              {' '}<span className="text-[var(--muted)]">{LIVE_FEED[feedIdx].action}</span>
            </p>
            <span className="flex-shrink-0 text-[10px] font-bold text-[var(--muted)]">{LIVE_FEED[feedIdx].time}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stat row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { v: '50+', l: 'Brands' },
          { v: '3×', l: 'Avg Lead Lift' },
          { v: '-45%', l: 'Avg CPL' },
        ].map(({ v, l }) => (
          <div key={l} className="rounded-[16px] bg-[rgba(78,47,168,0.05)] px-3 py-3 text-center">
            <div className="display-title text-xl font-black text-[var(--brand)]">{v}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-[var(--muted)]">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const typedText = useTypewriter(VERTICALS)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section id="hero" className="hero-section relative overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Dark gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #0A0518 0%, #160B3A 40%, #2D1B69 80%, #160B3A 100%)' }}
      />
      <div className="pointer-events-none absolute inset-0 brand-grid opacity-20" />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute left-[4%] top-16 h-[420px] w-[420px] rounded-full bg-[rgba(201,232,76,0.08)] blur-[130px] animate-aurora" />
      <div className="pointer-events-none absolute right-[6%] top-24 h-[500px] w-[500px] rounded-full bg-[rgba(78,47,168,0.4)] blur-[160px] animate-blob" />
      <div className="pointer-events-none absolute bottom-16 left-[38%] h-[300px] w-[300px] rounded-full bg-[rgba(155,127,224,0.18)] blur-[110px] animate-float" />

      <div className="relative section-shell grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.15fr_0.85fr]">

        {/* Left: story copy */}
        <div className="space-y-7">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap gap-3"
          >
            <span className="eyebrow-lime">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Revenue Agency
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              50+ Brands Scaled
            </span>
          </motion.div>

          {/* Word-by-word headline */}
          <h1 className="display-title text-[clamp(2.6rem,7vw,4.8rem)] font-black leading-[0.88]">
            <span className="block">
              {HEADLINE_1.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="mr-[0.25em] inline-block text-white"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-gradient-lime">
              {HEADLINE_2.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="mr-[0.25em] inline-block"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.55 + i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Typewriter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="text-lg font-semibold text-white/55"
          >
            Built for{' '}
            <span className="text-white font-bold">
              {mounted ? typedText : VERTICALS[0]}
              <span className="ml-0.5 inline-block h-5 w-[2px] bg-[var(--accent)] align-middle animate-pulse" />
            </span>
          </motion.p>

          {/* Story body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12, duration: 0.5 }}
            className="max-w-[520px] text-base leading-[1.85] text-white/50"
          >
            Most agencies send a PDF. We build the entire revenue system — creatives that stop
            the scroll, funnels that close, automation that follows up, and data that shows you
            exactly what to scale next.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.22, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#contact" className="button-primary btn-shimmer glow-lime px-7 py-4 text-sm md:text-base">
              Build My Revenue Machine
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#results" className="button-white px-7 py-4 text-sm md:text-base">
              See Real Results
              <Zap className="h-4 w-4 text-[var(--brand)]" />
            </a>
          </motion.div>

          {/* Proof pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.38, duration: 0.5 }}
            className="flex flex-wrap gap-2.5"
          >
            {PROOF.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-bold text-white/65">
                <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* Platform logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.5 }}
            className="flex items-center gap-4 pt-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Certified on</span>
            {/* Meta */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Meta">
                <path fill="#1877F2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path fill="white" d="M16.7 9.5c-.4-.7-1-1.1-1.7-1.1-.5 0-.9.2-1.3.5L12 10.6l-1.7-1.7c-.4-.3-.8-.5-1.3-.5-.7 0-1.3.4-1.7 1.1-.6 1.1-.3 2.8 1 4.2l3.7 3.8 3.7-3.8c1.3-1.4 1.6-3.1 1-4.2z"/>
              </svg>
              <span className="text-[11px] font-bold text-white/70">Meta Ads</span>
            </div>
            {/* Google */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google Ads">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[11px] font-bold text-white/70">Google Ads</span>
            </div>
            {/* TikTok */}
            <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 sm:flex">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white" aria-label="TikTok">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.97a8.27 8.27 0 004.84 1.55V7.08a4.85 4.85 0 01-1.07-.39z"/>
              </svg>
              <span className="text-[11px] font-bold text-white/70">TikTok</span>
            </div>
          </motion.div>
        </div>

        {/* Right: live dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, type: 'spring', stiffness: 75, damping: 18 }}
        >
          <LiveDashboard />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/28">Scroll to explore</span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/18 pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  )
}
