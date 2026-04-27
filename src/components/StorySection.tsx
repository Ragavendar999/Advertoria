'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  AlertTriangle, Bot, BarChart3, Megaphone,
  Palette, Target, TrendingUp, Zap, ArrowUpRight,
  Layers, RefreshCw,
} from 'lucide-react'

/* ─── Chapter data ─── */
const chapters = [
  {
    number: '01',
    tag: 'The Problem',
    headline: "You're spending on ads. The money feels like it's disappearing.",
    body: 'Most businesses throw budget at campaigns without a system behind them — inconsistent leads, poor ROAS, and no clarity on what\'s actually working or why.',
    color: 'text-[var(--accent)]',
    visual: 'broken',
    items: [
      { icon: AlertTriangle, label: 'High ad spend, low returns' },
      { icon: BarChart3, label: 'No attribution or tracking' },
      { icon: RefreshCw, label: 'Campaigns reset every month' },
    ],
  },
  {
    number: '02',
    tag: 'The Gap',
    headline: "Ads alone aren't the answer. Your whole system is broken.",
    body: 'When creatives, funnels, follow-up, and analytics aren\'t connected, every rupee leaks somewhere. Great ads sent to a weak funnel don\'t convert. Leads with no follow-up go cold.',
    color: 'text-[#FFB347]',
    visual: 'gap',
    items: [
      { icon: Target, label: 'Clicks but no conversions' },
      { icon: Zap, label: 'Leads going cold instantly' },
      { icon: Megaphone, label: 'No creative direction' },
    ],
  },
  {
    number: '03',
    tag: 'The Solution',
    headline: 'A connected revenue machine — not just campaigns.',
    body: 'Advertoria connects performance marketing, creative production, funnels, AI automation, and analytics into one system that compounds over time. Every part feeds the next.',
    color: 'text-[var(--brand-light)]',
    visual: 'machine',
    items: [
      { icon: Palette, label: 'Creative that converts' },
      { icon: Bot, label: 'AI automation that closes' },
      { icon: Layers, label: 'Full funnel ownership' },
    ],
  },
  {
    number: '04',
    tag: 'The Outcome',
    headline: 'Real businesses. Real revenue. Proven results.',
    body: '50+ brands have trusted Advertoria to build their revenue machine. Not projections — actual CPL reductions, ROAS improvements, and scalable lead pipelines.',
    color: 'text-[#22C55E]',
    visual: 'results',
    items: [
      { icon: TrendingUp, label: '3× avg lead flow increase' },
      { icon: BarChart3, label: '45% average CPL drop' },
      { icon: Zap, label: '4.2× ROAS on Meta campaigns' },
    ],
  },
]

/* ─── Chapter opacity from scroll ─── */
function useChapterOpacity(scrollY: MotionValue<number>, enter: number, peak: number, exit: number, end: number) {
  return useTransform(scrollY, [enter, peak, exit, end], [0, 1, 1, 0])
}
function useChapterY(scrollY: MotionValue<number>, enter: number, peak: number, exit: number, end: number) {
  return useTransform(scrollY, [enter, peak, exit, end], [36, 0, 0, -36])
}

/* ─── Visual panels for each chapter ─── */
function BrokenVisual() {
  return (
    <div className="flex flex-col gap-3">
      {['Strategy', 'Creative', 'Ads', 'Follow-up'].map((label, i) => (
        <motion.div
          key={label}
          initial={{ x: i % 2 === 0 ? -20 : 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-[18px] border border-[rgba(255,80,80,0.2)] bg-[rgba(255,80,80,0.06)] px-4 py-3"
        >
          <div className="h-2 w-2 rounded-full bg-[rgba(255,80,80,0.6)]" />
          <span className="text-sm font-semibold text-white/70">{label}</span>
          <span className="ml-auto text-xs font-bold text-[rgba(255,100,100,0.8)]">Disconnected</span>
        </motion.div>
      ))}
      <div className="mt-2 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-center text-xs font-bold text-white/40">
        Result: ₹ leaking at every step
      </div>
    </div>
  )
}

function GapVisual() {
  const flow = ['Ad Click', '→', 'Weak Landing Page', '→', 'No Follow-up', '→', 'Lost Lead']
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {flow.map((item, i) => (
          <span
            key={i}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              item === '→'
                ? 'text-white/30'
                : i > 2
                ? 'border border-[rgba(255,80,80,0.3)] bg-[rgba(255,80,80,0.08)] text-[rgba(255,100,100,0.8)]'
                : 'border border-white/14 bg-white/8 text-white/70'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="rounded-[22px] border border-[rgba(255,179,71,0.25)] bg-[rgba(255,179,71,0.06)] p-4 space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFB347]">The Hidden Cost</p>
        <p className="text-sm leading-7 text-white/60">
          Every broken handoff kills a conversion. Most businesses lose 60–80% of their
          qualified leads between the ad click and the sale.
        </p>
      </div>
    </div>
  )
}

function MachineVisual() {
  const nodes = [
    { label: 'Performance Ads', color: 'bg-[var(--brand)]' },
    { label: 'Creative Engine', color: 'bg-[var(--accent)]' },
    { label: 'Funnels & CRO', color: 'bg-[var(--brand-light)]' },
    { label: 'AI Automation', color: 'bg-[#22C55E]' },
    { label: 'Analytics', color: 'bg-[#FFB347]' },
  ]
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-[22px] top-6 h-[calc(100%-24px)] w-0.5 bg-gradient-to-b from-[var(--brand)] to-[var(--accent)] opacity-40" />
        {nodes.map(({ label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative mb-2 flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 last:mb-0"
          >
            <div className={`h-3 w-3 flex-shrink-0 rounded-full ${color}`} />
            <span className="text-sm font-semibold text-white/80">{label}</span>
            <span className="ml-auto text-xs font-bold text-[var(--accent)]">Connected ↗</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ResultsVisual() {
  const stats = [
    { label: 'Lead flow increase', value: '3×', color: 'text-[#22C55E]' },
    { label: 'Avg CPL reduction', value: '-45%', color: 'text-[var(--accent)]' },
    { label: 'Meta ROAS', value: '4.2×', color: 'text-[var(--brand-light)]' },
    { label: 'Brands scaled', value: '50+', color: 'text-white' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ label, value, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-5 text-center"
        >
          <div className={`display-title text-3xl font-black ${color}`}>{value}</div>
          <p className="mt-1.5 text-xs font-medium text-white/50">{label}</p>
        </motion.div>
      ))}
    </div>
  )
}

const visuals: Record<string, React.ReactNode> = {
  broken: <BrokenVisual />,
  gap: <GapVisual />,
  machine: <MachineVisual />,
  results: <ResultsVisual />,
}

/* ─── Chapter card (absolutely positioned, transitions on scroll) ─── */
function ChapterCard({
  chapter,
  opacity,
  y,
}: {
  chapter: (typeof chapters)[0]
  opacity: MotionValue<number>
  y: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ opacity, y, pointerEvents: 'none' }}
      className="absolute inset-0 flex flex-col justify-center gap-8 lg:flex-row lg:items-center"
    >
      {/* Text */}
      <div className="flex-1 space-y-5">
        <div className="flex items-center gap-3">
          <span className={`display-title text-7xl font-black opacity-10 ${chapter.color}`}>{chapter.number}</span>
          <span className={`eyebrow ${chapter.number === '01' ? '' : ''}`}>{chapter.tag}</span>
        </div>
        <h2 className="display-title text-3xl font-black leading-[0.95] text-white md:text-4xl lg:text-[2.6rem]">
          {chapter.headline}
        </h2>
        <p className="max-w-lg text-base leading-8 text-white/55">{chapter.body}</p>
        <div className="space-y-2.5">
          {chapter.items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[12px] bg-white/8">
                <Icon className={`h-4 w-4 ${chapter.color}`} />
              </div>
              <span className="text-sm font-semibold text-white/70">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div className="w-full flex-shrink-0 lg:w-[400px]">
        <div className="dark-panel rounded-[36px] p-6">
          <p className={`mb-4 text-[10px] font-extrabold uppercase tracking-[0.22em] ${chapter.color}`}>
            {chapter.tag}
          </p>
          {visuals[chapter.visual]}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main component ─── */
export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [introRef, introInView] = useInView({ threshold: 0.3, triggerOnce: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* Each chapter covers 25% of the scroll range */
  const op1 = useChapterOpacity(scrollYProgress, 0,    0.05, 0.22, 0.28)
  const op2 = useChapterOpacity(scrollYProgress, 0.22, 0.30, 0.47, 0.53)
  const op3 = useChapterOpacity(scrollYProgress, 0.47, 0.55, 0.72, 0.78)
  const op4 = useChapterOpacity(scrollYProgress, 0.72, 0.80, 1.0,  1.0)

  const y1 = useChapterY(scrollYProgress, 0,    0.05, 0.22, 0.28)
  const y2 = useChapterY(scrollYProgress, 0.22, 0.30, 0.47, 0.53)
  const y3 = useChapterY(scrollYProgress, 0.47, 0.55, 0.72, 0.78)
  const y4 = useChapterY(scrollYProgress, 0.72, 0.80, 1.0,  1.0)

  /* Progress dots */
  const dot1 = useTransform(scrollYProgress, [0, 0.22], [1, 0.3])
  const dot2 = useTransform(scrollYProgress, [0.22, 0.28, 0.47], [0.3, 1, 0.3])
  const dot3 = useTransform(scrollYProgress, [0.47, 0.53, 0.72], [0.3, 1, 0.3])
  const dot4 = useTransform(scrollYProgress, [0.72, 0.80], [0.3, 1])

  const chapterOps = [op1, op2, op3, op4]
  const chapterYs  = [y1,  y2,  y3,  y4]
  const dotOps     = [dot1, dot2, dot3, dot4]

  return (
    <>
      {/* ── Section intro (scrolls normally) ── */}
      <div
        ref={introRef}
        className="section-padding pb-0"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, transparent 100%)' }}
      >
        <div className="section-shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-3xl space-y-5"
          >
            <span className="eyebrow">
              <Zap className="h-3.5 w-3.5" />
              The Advertoria Story
            </span>
            <h2 className="display-title text-4xl font-black leading-[0.95] text-[var(--fg)] md:text-5xl">
              Every business has the same story.
              <span className="text-gradient"> Here&apos;s how we rewrite the ending.</span>
            </h2>
            <p className="body-copy text-base">
              Scroll through the story that brought 50+ businesses from scattered campaigns to a
              connected revenue machine.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky scroll story ── */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: '400vh' }}
      >
        <div
          className="sticky top-0 overflow-hidden"
          style={{
            height: '100svh',
            background: 'linear-gradient(160deg, #0A0518 0%, #160B3A 50%, #0A0518 100%)',
          }}
        >
          {/* Grid overlay */}
          <div className="pointer-events-none absolute inset-0 brand-grid opacity-15" />

          {/* Ambient blobs */}
          <div className="pointer-events-none absolute left-[5%] top-[20%] h-72 w-72 rounded-full bg-[rgba(78,47,168,0.3)] blur-[100px] animate-blob" />
          <div className="pointer-events-none absolute right-[5%] bottom-[20%] h-64 w-64 rounded-full bg-[rgba(201,232,76,0.07)] blur-[90px] animate-aurora" />

          {/* Chapter cards container */}
          <div className="relative section-shell" style={{ height: '100svh' }}>
            {chapters.map((ch, i) => (
              <ChapterCard
                key={ch.number}
                chapter={ch}
                opacity={chapterOps[i]}
                y={chapterYs[i]}
              />
            ))}
          </div>

          {/* Progress dots + chapter label */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.number}
                  style={{ opacity: dotOps[i] }}
                  className="relative"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
                </motion.div>
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
              Scroll to continue the story
            </span>
          </div>
        </div>
      </div>

      {/* ── Transition to next section ── */}
      <div className="section-padding pt-0">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="dark-panel rounded-[40px] p-6 md:p-8 text-center"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/44">
              This is why Advertoria exists
            </p>
            <h3 className="display-title mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight text-white md:text-4xl">
              Stop running campaigns. Start building a machine that turns attention into revenue automatically.
            </h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="button-primary btn-shimmer px-7 py-4 text-sm"
              >
                Start Building My Machine
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#services" className="button-secondary border-white/18 bg-white/10 px-7 py-4 text-sm text-white">
                See the full system
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
