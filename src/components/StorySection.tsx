'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  AlertTriangle, Bot, BarChart3, Megaphone,
  Palette, Target, TrendingUp, Zap, ArrowUpRight,
  Layers, RefreshCw, ChevronRight, ChevronLeft,
} from 'lucide-react'

const CHAPTER_DURATION = 8 // seconds

/* ─── Chapter data ─── */
const chapters = [
  {
    number: '01',
    tag: 'The Problem',
    headline: "You're spending on ads. The money feels like it's disappearing.",
    body: "Most businesses throw budget at campaigns without a system behind them — inconsistent leads, poor ROAS, and no clarity on what's actually working or why.",
    accent: '#FF5050',
    accentBg: 'rgba(255,65,65,0.14)',
    accentBorder: 'rgba(255,65,65,0.38)',
    accentGlow: 'rgba(255,65,65,0.12)',
    visual: 'broken',
    items: [
      { icon: AlertTriangle, label: 'High ad spend, low returns' },
      { icon: BarChart3,     label: 'No attribution or tracking' },
      { icon: RefreshCw,     label: 'Campaigns reset every month' },
    ],
  },
  {
    number: '02',
    tag: 'The Gap',
    headline: "Ads alone aren't the answer. Your whole system is broken.",
    body: "When creatives, funnels, follow-up, and analytics aren't connected, every rupee leaks somewhere. Great ads sent to a weak funnel don't convert.",
    accent: '#FFB347',
    accentBg: 'rgba(255,179,71,0.13)',
    accentBorder: 'rgba(255,179,71,0.38)',
    accentGlow: 'rgba(255,179,71,0.1)',
    visual: 'gap',
    items: [
      { icon: Target,   label: 'Clicks but no conversions' },
      { icon: Zap,      label: 'Leads going cold instantly' },
      { icon: Megaphone,label: 'No creative direction' },
    ],
  },
  {
    number: '03',
    tag: 'The Solution',
    headline: 'A connected revenue machine — not just campaigns.',
    body: 'Advertoria connects performance marketing, creative production, funnels, AI automation, and analytics into one system that compounds over time. Every part feeds the next.',
    accent: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.13)',
    accentBorder: 'rgba(167,139,250,0.38)',
    accentGlow: 'rgba(167,139,250,0.12)',
    visual: 'machine',
    items: [
      { icon: Palette, label: 'Creative that converts' },
      { icon: Bot,     label: 'AI automation that closes' },
      { icon: Layers,  label: 'Full funnel ownership' },
    ],
  },
  {
    number: '04',
    tag: 'The Outcome',
    headline: 'Real businesses. Real revenue. Proven results.',
    body: '50+ brands have trusted Advertoria to build their revenue machine. Not projections — actual CPL reductions, ROAS improvements, and scalable lead pipelines.',
    accent: '#34D399',
    accentBg: 'rgba(52,211,153,0.13)',
    accentBorder: 'rgba(52,211,153,0.38)',
    accentGlow: 'rgba(52,211,153,0.1)',
    visual: 'results',
    items: [
      { icon: TrendingUp, label: '3× avg lead flow increase' },
      { icon: BarChart3,  label: '45% average CPL drop' },
      { icon: Zap,        label: '4.2× ROAS on Meta campaigns' },
    ],
  },
]

type Chapter = typeof chapters[number]

/* ─── Visual panels ─── */
function BrokenVisual() {
  const parts = [
    { label: 'Strategy',  note: 'No direction' },
    { label: 'Creative',  note: 'Off-brand' },
    { label: 'Ads',       note: 'Poor ROAS' },
    { label: 'Follow-up', note: 'Non-existent' },
  ]
  return (
    <div className="space-y-2.5">
      {parts.map(({ label, note }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: i % 2 === 0 ? -18 : 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 240 }}
          className="flex items-center gap-3 rounded-xl border px-4 py-3"
          style={{ borderColor: 'rgba(255,65,65,0.35)', background: 'rgba(255,65,65,0.12)' }}
        >
          <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#FF5050]" />
          <span className="flex-1 text-sm font-semibold text-white/85">{label}</span>
          <span className="text-xs font-bold text-[#FF7070]">{note}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        className="rounded-xl border border-[rgba(255,65,65,0.5)] bg-[rgba(255,65,65,0.18)] px-4 py-3 text-center"
      >
        <span className="text-xs font-extrabold tracking-wide text-[#FF8080]">
          ₹ leaking at every disconnected step
        </span>
      </motion.div>
    </div>
  )
}

function GapVisual() {
  const steps = [
    { label: 'Ad Click',         lost: false },
    { label: 'Weak Landing Page',lost: true  },
    { label: 'No Follow-up',     lost: true  },
    { label: 'Lost Lead',        lost: true  },
  ]
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {steps.map(({ label, lost }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09 }}
            className="flex items-center gap-3"
          >
            <div
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black"
              style={
                lost
                  ? { background: 'rgba(255,65,65,0.22)', color: '#FF6060', border: '1px solid rgba(255,65,65,0.45)' }
                  : { background: 'rgba(255,179,71,0.22)', color: '#FFB347', border: '1px solid rgba(255,179,71,0.45)' }
              }
            >
              {i + 1}
            </div>
            <span className="flex-1 text-sm font-semibold" style={{ color: lost ? '#FF8080' : 'rgba(255,255,255,0.8)' }}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <span className="text-[10px] text-white/25">↓</span>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        className="rounded-xl border px-4 py-3"
        style={{ borderColor: 'rgba(255,179,71,0.42)', background: 'rgba(255,179,71,0.14)' }}
      >
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFB347]">Hidden Cost</p>
        <p className="mt-1 text-xs leading-5 text-white/70">
          60–80% of qualified leads lost between click and sale.
        </p>
      </motion.div>
    </div>
  )
}

function MachineVisual() {
  const nodes = [
    { label: 'Performance Ads', dot: '#6366F1' },
    { label: 'Creative Engine', dot: '#FF5050' },
    { label: 'Funnels & CRO',   dot: '#A78BFA' },
    { label: 'AI Automation',   dot: '#34D399' },
    { label: 'Analytics',       dot: '#FFB347' },
  ]
  return (
    <div className="relative">
      {/* connector line */}
      <div
        className="absolute left-[13px] top-3 w-0.5"
        style={{
          height: 'calc(100% - 24px)',
          background: 'linear-gradient(to bottom, #6366F1, #34D399)',
          opacity: 0.55,
        }}
      />
      <div className="space-y-2">
        {nodes.map(({ label, dot }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 260 }}
            className="relative flex items-center gap-3 rounded-xl border border-white/12 px-4 py-2.5"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div className="h-3 w-3 flex-shrink-0 rounded-full ring-2 ring-white/15" style={{ background: dot }} />
            <span className="text-sm font-semibold text-white/85">{label}</span>
            <span className="ml-auto text-[11px] font-bold text-[#A78BFA]">↗ Live</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ResultsVisual() {
  const stats = [
    { label: 'Lead flow',  value: '3×',   color: '#34D399', bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.38)' },
    { label: 'CPL drop',   value: '-45%', color: '#FF6060', bg: 'rgba(255,65,65,0.15)',   border: 'rgba(255,65,65,0.38)'  },
    { label: 'Meta ROAS',  value: '4.2×', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.38)' },
    { label: 'Brands',     value: '50+',  color: '#FFB347', bg: 'rgba(255,179,71,0.15)',  border: 'rgba(255,179,71,0.38)' },
  ]
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map(({ label, value, color, bg, border }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.09, type: 'spring', stiffness: 240 }}
          className="rounded-xl border px-3 py-4 text-center"
          style={{ background: bg, borderColor: border }}
        >
          <div className="display-title text-3xl font-black" style={{ color }}>{value}</div>
          <p className="mt-1 text-[11px] font-semibold text-white/60">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Visual map (rendered inline so AnimatePresence remounts them per chapter) ─── */
function ChapterVisual({ visual }: { visual: string }) {
  if (visual === 'broken')  return <BrokenVisual />
  if (visual === 'gap')     return <GapVisual />
  if (visual === 'machine') return <MachineVisual />
  if (visual === 'results') return <ResultsVisual />
  return null
}

/* ─── Slide variants ─── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -72 : 72, opacity: 0 }),
}

/* ─── Main component ─── */
export default function StorySection() {
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState<number>(1)
  const activeRef                 = useRef(0)
  activeRef.current               = active

  /* INP fix: animate a MotionValue instead of setState every 50ms */
  const progressMv    = useMotionValue(0)
  const progressWidth = useTransform(progressMv, v => `${v}%`)

  const navigate = useCallback((to: number) => {
    setDirection(to >= activeRef.current ? 1 : -1)
    setActive(to)
  }, [])

  /* Progress animation + auto-advance — no setInterval, no React re-renders */
  useEffect(() => {
    progressMv.set(0)
    const controls = animate(progressMv, 100, {
      duration: CHAPTER_DURATION,
      ease: 'linear',
      onComplete: () => {
        setDirection(1)
        setActive(p => (p + 1) % chapters.length)
      },
    })
    return () => controls.stop()
  }, [active, progressMv])

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const next = (activeRef.current + 1) % chapters.length
        setDirection(1); setActive(next)
      } else if (e.key === 'ArrowLeft') {
        const prev = (activeRef.current - 1 + chapters.length) % chapters.length
        setDirection(-1); setActive(prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const chapter = chapters[active]

  return (
    <>
      {/* ── Story section ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0A0518 0%, #160B3A 50%, #0A0518 100%)' }}
      >
        {/* Ambient decorations */}
        <div className="pointer-events-none absolute inset-0 brand-grid opacity-10" />
        <div
          className="pointer-events-none absolute left-[5%] top-[15%] h-96 w-96 rounded-full blur-[120px] animate-blob"
          style={{ background: 'rgba(78,47,168,0.35)' }}
        />
        <div
          className="pointer-events-none absolute right-[8%] bottom-[10%] h-72 w-72 rounded-full blur-[100px] animate-aurora"
          style={{ background: 'rgba(167,139,250,0.1)' }}
        />
        {/* Chapter-tinted glow behind the visual panel */}
        <motion.div
          key={active}
          className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[140px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ background: chapter.accentGlow, filter: 'blur(120px)' }}
        />

        <div className="section-shell relative py-20 lg:py-24">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <span className="eyebrow">
              <Zap className="h-3.5 w-3.5" />
              The Advertoria Story
            </span>
            <h2 className="display-title mx-auto mt-4 max-w-3xl text-4xl font-black leading-[0.95] text-white md:text-5xl">
              Every business has the same story.
              <span className="text-gradient"> Here&apos;s how we rewrite the ending.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/45">
              Click any chapter — or use ← → keys — to explore your story.
            </p>
          </motion.div>

          {/* ── Interactive grid ── */}
          <div className="grid gap-5 lg:grid-cols-[210px_1fr]">

            {/* Desktop chapter nav */}
            <nav className="hidden lg:flex flex-col gap-2" aria-label="Story chapters">
              {chapters.map((ch, i) => (
                <button
                  key={ch.number}
                  onClick={() => navigate(i)}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-250 ${
                    i === active
                      ? 'border-white/20 bg-white/8'
                      : 'border-white/8 bg-white/3 hover:border-white/14 hover:bg-white/6'
                  }`}
                >
                  {/* bottom progress bar — driven by MotionValue, zero React re-renders */}
                  {i === active && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] rounded-full"
                      style={{ background: ch.accent, width: progressWidth }}
                    />
                  )}
                  {/* left accent stripe */}
                  <div
                    className="absolute left-0 top-0 h-full w-[3px] rounded-r-full transition-opacity duration-300"
                    style={{ background: ch.accent, opacity: i === active ? 1 : 0 }}
                  />

                  <span
                    className="pl-1 text-xl font-black transition-colors duration-200"
                    style={{ color: i === active ? ch.accent : 'rgba(255,255,255,0.2)' }}
                  >
                    {ch.number}
                  </span>
                  <p
                    className={`truncate text-sm font-bold transition-colors duration-200 ${
                      i === active ? 'text-white' : 'text-white/35 group-hover:text-white/60'
                    }`}
                  >
                    {ch.tag}
                  </p>
                  {i === active && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-white/30" />
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile chapter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {chapters.map((ch, i) => (
                <button
                  key={ch.number}
                  onClick={() => navigate(i)}
                  className="flex-shrink-0 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all duration-200"
                  style={
                    i === active
                      ? { color: ch.accent, borderColor: ch.accentBorder, background: ch.accentBg }
                      : { color: 'rgba(255,255,255,0.38)', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }
                  }
                >
                  {ch.number} {ch.tag}
                </button>
              ))}
            </div>

            {/* Chapter content card */}
            <div
              className="relative overflow-hidden rounded-[28px] border p-6 md:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            >
              {/* Subtle inner glow matching chapter */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[28px]"
                style={{
                  background: `radial-gradient(ellipse at top right, ${chapter.accentGlow} 0%, transparent 65%)`,
                  transition: 'background 0.5s ease',
                }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative flex flex-col gap-8 lg:flex-row lg:items-center"
                >
                  {/* Text side */}
                  <div className="flex-1 space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="display-title text-7xl font-black opacity-[0.14]"
                        style={{ color: chapter.accent }}
                      >
                        {chapter.number}
                      </span>
                      <span
                        className="rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em]"
                        style={{
                          color: chapter.accent,
                          borderColor: chapter.accentBorder,
                          background: chapter.accentBg,
                        }}
                      >
                        {chapter.tag}
                      </span>
                    </div>

                    <h3 className="display-title text-2xl font-black leading-tight text-white md:text-3xl lg:text-[2.1rem]">
                      {chapter.headline}
                    </h3>

                    <p className="max-w-lg text-base leading-8 text-white/58">{chapter.body}</p>

                    <div className="space-y-2.5">
                      {chapter.items.map(({ icon: Icon, label }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.22 + i * 0.08 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                            style={{ background: chapter.accentBg, border: `1px solid ${chapter.accentBorder}` }}
                          >
                            <Icon className="h-4 w-4" style={{ color: chapter.accent }} />
                          </div>
                          <span className="text-sm font-semibold text-white/75">{label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Visual panel */}
                  <div className="w-full flex-shrink-0 lg:w-[340px]">
                    <div
                      className="rounded-2xl border p-5"
                      style={{
                        background: `linear-gradient(135deg, ${chapter.accentBg} 0%, rgba(0,0,0,0.1) 100%)`,
                        borderColor: chapter.accentBorder,
                        boxShadow: `0 0 48px ${chapter.accentGlow}`,
                      }}
                    >
                      <p
                        className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.22em]"
                        style={{ color: chapter.accent }}
                      >
                        {chapter.tag}
                      </p>
                      <ChapterVisual visual={chapter.visual} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Navigation controls ── */}
          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={() => navigate((active - 1 + chapters.length) % chapters.length)}
              aria-label="Previous chapter"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/7 text-white/55 transition-all duration-200 hover:border-white/30 hover:bg-white/14 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Progress bars — MotionValue-driven, no re-renders */}
            <div className="flex flex-1 items-center gap-2">
              {chapters.map((ch, i) => (
                <button
                  key={ch.number}
                  aria-label={`Go to chapter ${ch.number}: ${ch.tag}`}
                  onClick={() => navigate(i)}
                  className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/18"
                >
                  {i === active ? (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: ch.accent, width: progressWidth }}
                    />
                  ) : i < active ? (
                    <div className="absolute inset-0 rounded-full" style={{ background: ch.accent, opacity: 0.5 }} />
                  ) : null}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate((active + 1) % chapters.length)}
              aria-label="Next chapter"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/7 text-white/55 transition-all duration-200 hover:border-white/30 hover:bg-white/14 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Counter + hint */}
          <div className="mt-4 flex items-center justify-center gap-2.5">
            <span className="text-[11px] font-bold text-white/28">
              Chapter {active + 1} of {chapters.length}
            </span>
            <span className="text-white/15">·</span>
            <span className="hidden text-[11px] font-bold text-white/28 sm:inline">
              ← → to navigate
            </span>
          </div>
        </div>
      </section>

      {/* ── Transition CTA ── */}
      <div
        className="section-padding pt-0"
        style={{ background: 'linear-gradient(180deg, #0A0518 0%, var(--bg) 100%)' }}
      >
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="dark-panel rounded-[40px] p-6 md:p-8 text-center"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/44">
              This is why Advertoria exists
            </p>
            <h3 className="display-title mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight text-white md:text-4xl">
              Stop running campaigns. Start building a machine that turns attention into revenue automatically.
            </h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="button-primary btn-shimmer px-7 py-4 text-sm">
                Start Building My Machine
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="button-secondary border-white/18 bg-white/10 px-7 py-4 text-sm text-white"
              >
                See the full system
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
