'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Instagram, Search, AlertCircle, TrendingUp,
  Users, Eye, Heart, ChevronRight, Star, Zap, ArrowUpRight,
  BarChart3, CheckCircle2,
} from 'lucide-react'

/* ─── Types ─── */
interface AuditResult {
  profile: {
    username: string
    displayName: string
    followers: number
    following: number
    posts: number
    image: string
    limitedData?: boolean
  }
  metrics: {
    engagementRate: number
    avgLikes: number
    avgComments: number
    estimatedReach: number
    storyCompletion: number
    followerGrowthRate: number
  }
  ai: {
    overallScore: number
    profileStrength?: number
    contentScore?: number
    growthScore?: number
    monetisationScore?: number
    opportunities: string[]
    warnings: string[]
    topRecommendedServices: { service: string; reason: string; priority: string }[]
    summary: string
  }
  analyzedAt?: string
}

/* ─── Score Ring ─── */
function ScoreRing({ score, size = 100, label }: { score: number; size?: number; label: string }) {
  const r = size / 2 - 10
  const circ = 2 * Math.PI * r
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(t)
  }, [score])

  const color = score >= 75 ? '#C9E84C' : score >= 50 ? '#9B7FE0' : '#f87171'

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={color} strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (animated / 100) * circ}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-white">{animated}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">{label}</span>
    </div>
  )
}

/* ─── Metric Bar ─── */
function MetricBar({ label, value, max, color, suffix = '' }: {
  label: string; value: number; max: number; color: string; suffix?: string
}) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="text-white/60">{label}</span>
        <span className="font-bold text-white">{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

/* ─── Analysing Steps ─── */
function AnalysingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <div className="relative">
        <div className="h-20 w-20 rounded-[28px] bg-gradient-to-br from-[var(--brand)] to-[var(--brand-light)] p-5">
          <Instagram className="h-full w-full text-white" />
        </div>
        <motion.div
          animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2 rounded-[36px] border-2 border-transparent border-t-[var(--accent)] border-r-[var(--brand-light)]"
        />
      </div>
      <div className="space-y-1 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-base font-semibold text-white"
          >
            {message}
          </motion.p>
        </AnimatePresence>
        <p className="text-sm text-white/40">Running a live audit on the latest public profile data</p>
      </div>
      <motion.div
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="h-1.5 w-28 rounded-full bg-[var(--accent)]/70"
      />
    </div>
  )
}

/* ─── Results View ─── */
function ResultsView({ data, onReset }: { data: AuditResult; onReset: () => void }) {
  const { profile, metrics, ai } = data

  const formatNum = (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : String(n)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-4 rounded-[24px] bg-white/6 px-5 py-4">
        {profile.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.image} alt={profile.displayName} className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-light)] text-lg font-black text-white">
            {profile.displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-black text-white">{profile.displayName}</h3>
          <p className="text-sm text-white/50">@{profile.username}</p>
        </div>
        <div className="flex gap-4 text-center">
          {[
            { label: 'Followers', val: formatNum(profile.followers) },
            { label: 'Posts', val: formatNum(profile.posts) },
            { label: 'Following', val: formatNum(profile.following) },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-base font-extrabold text-white">{val}</p>
              <p className="text-[10px] text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {profile.limitedData && (
        <div className="rounded-[20px] border border-amber-300/20 bg-amber-200/10 px-4 py-3 text-sm text-white/75">
          Live Instagram metrics were partially restricted, so this audit is using a directional fallback model for recommendations.
        </div>
      )}

      {/* Score rings */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { score: ai.overallScore ?? 0, label: 'Overall' },
          { score: ai.profileStrength ?? ai.overallScore ?? 0, label: 'Profile' },
          { score: ai.contentScore ?? ai.overallScore ?? 0, label: 'Content' },
          { score: ai.growthScore ?? ai.overallScore ?? 0, label: 'Growth' },
        ].map(({ score, label }) => (
          <div key={label} className="flex justify-center rounded-[20px] bg-white/4 py-5">
            <ScoreRing score={score} size={100} label={label} />
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="rounded-[24px] bg-white/4 p-5 space-y-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Performance Metrics</p>
        <MetricBar label="Engagement Rate" value={metrics.engagementRate} max={10} color="var(--accent)" suffix="%" />
        <MetricBar label="Avg Likes / Post" value={metrics.avgLikes} max={metrics.avgLikes * 2} color="var(--brand-light)" />
        <MetricBar label="Monthly Reach" value={metrics.estimatedReach} max={profile.followers} color="#9B7FE0" />
        <MetricBar label="Story Completion" value={metrics.storyCompletion} max={100} color="var(--pink)" suffix="%" />
        <MetricBar label="Monthly Growth" value={metrics.followerGrowthRate} max={10} color="#53C5A1" suffix="%" />
      </div>

      {/* AI Summary */}
      <div className="rounded-[24px] border border-[var(--accent)]/20 bg-[rgba(201,232,76,0.06)] p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent-dark)] mb-2">AI Verdict</p>
        <p className="text-sm leading-7 text-white/80">{ai.summary}</p>
      </div>

      {/* Opportunities & Warnings */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] bg-white/4 p-5 space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent-dark)]">Opportunities</p>
          {ai.opportunities.map((o, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]" />
              <span className="text-sm leading-6 text-white/75">{o}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[24px] bg-white/4 p-5 space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-400/80">Gaps to Fix</p>
          {ai.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
              <span className="text-sm leading-6 text-white/75">{w}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Services */}
      <div className="space-y-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Recommended Services</p>
        {ai.topRecommendedServices.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 rounded-[20px] bg-white/4 px-4 py-4"
          >
            <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--accent)]" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{s.service}</span>
                <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${
                  s.priority === 'high'
                    ? 'bg-[var(--accent)]/20 text-[var(--accent-dark)]'
                    : 'bg-white/10 text-white/50'
                }`}>
                  {s.priority}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-white/55">{s.reason}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="#contact" className="button-primary btn-shimmer flex-1 px-6 py-4 text-sm text-center flex items-center justify-center gap-2">
          Get a Real Audit Call
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <button onClick={onReset} className="button-secondary flex-1 px-6 py-4 text-sm">
          Audit Another Account
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function InstagramAnalytics() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [username, setUsername] = useState('')
  const [stage, setStage] = useState<'input' | 'analysing' | 'results' | 'error'>('input')
  const [result, setResult] = useState<AuditResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [analysisMessage, setAnalysisMessage] = useState('Preparing live audit...')
  const inputRef = useRef<HTMLInputElement>(null)

  const runAudit = async () => {
    const clean = username.replace(/^@/, '').trim()
    if (!clean) return
    setStage('analysing')
    setErrorMsg('')
    setResult(null)
    setAnalysisMessage('Preparing live audit...')

    try {
      const res = await fetch('/api/instagram-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: clean }),
      })

      if (!res.ok || !res.body) {
        let message = 'Analysis failed'
        try {
          const data = await res.json()
          message = data.error || message
        } catch {
          // Ignore JSON parse failures on non-SSE fallback responses.
        }
        throw new Error(message)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const chunks = buffer.split('\n\n')
        buffer = chunks.pop() ?? ''

        for (const chunk of chunks) {
          let event = 'message'
          let data = ''

          for (const line of chunk.split('\n')) {
            if (line.startsWith('event: ')) event = line.slice(7).trim()
            if (line.startsWith('data: ')) data += line.slice(6)
          }

          if (!data) continue

          const parsed = JSON.parse(data)

          if (event === 'status') {
            setAnalysisMessage(parsed.message || 'Running live audit...')
            continue
          }

          if (event === 'error') {
            throw new Error(parsed.error || 'Analysis failed')
          }

          if (event === 'result') {
            setResult(parsed as AuditResult)
            setStage('results')
          }
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Analysis failed')
      setStage('error')
    }
  }

  const reset = () => {
    setStage('input')
    setResult(null)
    setUsername('')
    setAnalysisMessage('Preparing live audit...')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <section id="instagram-audit" className="section-padding" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Free Instagram Audit</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            See exactly what&apos;s holding your{' '}
            <span className="text-gradient">Instagram back.</span>
          </h2>
          <p className="body-copy mt-4 text-base">
            Enter any public Instagram handle. Our AI reads your real profile data and tells you
            exactly where growth is leaking — in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="dark-panel rounded-[40px] p-6 md:p-8">
            {/* Stats bar */}
            <div className="mb-6 flex flex-wrap gap-4">
              {[
                { icon: Users, val: '50+', label: 'Profiles audited' },
                { icon: TrendingUp, val: '3\u00d7', label: 'Avg growth lift' },
                { icon: Star, val: '4.9', label: 'Advisor rating' },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--accent)]/15">
                    <Icon className="h-4 w-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-white">{val}</span>
                    <span className="ml-1.5 text-xs text-white/40">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {stage === 'input' && (
                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex gap-3">
                    <div className="flex flex-1 items-center gap-3 rounded-[18px] border border-white/10 bg-white/6 px-4">
                      <Instagram className="h-5 w-5 flex-shrink-0 text-white/40" />
                      <input
                        ref={inputRef}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && runAudit()}
                        placeholder="@yourbrand or yourbrand"
                        className="flex-1 bg-transparent py-4 text-sm text-white placeholder-white/30 outline-none"
                        autoComplete="off"
                      />
                    </div>
                    <button
                      onClick={runAudit}
                      disabled={!username.trim()}
                      className="button-primary btn-shimmer rounded-[18px] px-6 py-4 text-sm disabled:opacity-40 flex items-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Audit
                    </button>
                  </div>
                  <p className="mt-3 text-center text-xs text-white/30">
                    Public profiles only &middot; No login required &middot; Free forever
                  </p>
                </motion.div>
              )}

              {stage === 'analysing' && (
                <motion.div key="analysing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AnalysingState message={analysisMessage} />
                </motion.div>
              )}

              {stage === 'results' && result && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ResultsView data={result} onReset={reset} />
                </motion.div>
              )}

              {stage === 'error' && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-red-500/15">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Could not fetch profile</p>
                    <p className="mt-1 text-sm text-white/50">{errorMsg}</p>
                    <p className="mt-2 text-xs text-white/30">Make sure the account is public and the username is spelled correctly.</p>
                  </div>
                  <button onClick={reset} className="button-secondary px-6 py-3 text-sm">Try Again</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Feature chips */}
          {stage === 'input' && (
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              className="mt-4 flex flex-wrap justify-center gap-2"
            >
              {[
                { icon: BarChart3, label: 'Real follower data' },
                { icon: Eye, label: 'Reach estimate' },
                { icon: Heart, label: 'Engagement benchmarks' },
                { icon: Zap, label: 'AI service match' },
                { icon: ChevronRight, label: 'Growth roadmap' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)]">
                  <Icon className="h-3 w-3" />
                  {label}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
