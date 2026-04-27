'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, BarChart3, Award, TrendingUp, Users } from 'lucide-react'

function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 1600
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }

    requestAnimationFrame(step)
  }, [end, inView])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { label: 'Brands scaled', value: 50, suffix: '+', icon: Users, tone: 'text-[var(--brand)]' },
  { label: 'Average lead lift', value: 3, suffix: 'X', icon: TrendingUp, tone: 'text-[var(--accent)]' },
  { label: 'Average CPL improvement', value: 45, suffix: '%', prefix: '-', icon: BarChart3, tone: 'text-[var(--mint)]' },
  { label: 'Retention strength', value: 98, suffix: '%', icon: Award, tone: 'text-[var(--gold)]' },
]

const caseStudies = [
  {
    name: 'Consumer Brand Campaign',
    summary: 'Scaled product discovery campaigns with stronger creative hooks and a cleaner lead path.',
    outcome: '3X lead generation in 30 days',
  },
  {
    name: 'TSDC Education',
    summary: 'Rebuilt campaign structure and messaging around intent-led student acquisition.',
    outcome: '45% reduction in cost per lead',
  },
  {
    name: 'JR Agencies',
    summary: 'Connected paid campaigns to faster follow-up and clearer reporting for decision-making.',
    outcome: 'Positive ROI while expanding ad spend',
  },
]

export default function Results() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="results" className="section-padding" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="dark-panel overflow-hidden rounded-[40px] px-6 py-8 md:px-8 md:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/72">
                Results that feel real
              </span>
              <div>
                <h2 className="display-title text-4xl font-black leading-[0.95] text-white md:text-5xl">
                  Stronger numbers come from a more connected growth system.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-[rgba(255,255,255,0.72)]">
                  We do not improve performance by changing one ad in isolation. We improve the whole
                  experience: positioning, visual language, landing clarity, follow-up speed, and campaign
                  optimisation all together.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map(({ label, value, suffix, prefix, icon: Icon, tone }) => (
                  <div key={label} className="rounded-[28px] border border-white/10 bg-white/6 px-5 py-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={`display-title text-4xl font-black ${tone}`}>
                      <Counter end={value} suffix={suffix} prefix={prefix} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-[rgba(255,255,255,0.66)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-4">
                <Image
                  src="/hero-growth-illustration.svg"
                  alt="Advertoria analytics illustration"
                  width={960}
                  height={760}
                  className="h-auto w-full rounded-[24px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {caseStudies.map((item) => (
                  <div key={item.name} className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">Case study</p>
                    <h3 className="mt-3 text-lg font-extrabold text-white">{item.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.66)]">{item.summary}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold)]">
                      {item.outcome}
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
