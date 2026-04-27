'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAGLINES = [
  'Performance Marketing',
  'Creative Production',
  'Funnel Systems',
  'AI Automation',
  'Revenue Growth',
]

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [taglineIdx, setTaglineIdx] = useState(0)

  useEffect(() => {
    /* Progress counter */
    const start = performance.now()
    const duration = 2600
    const step = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 100)
      setProgress(Math.floor(p))
      if (p < 100) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)

    /* Tagline cycle */
    const taglineInterval = setInterval(
      () => setTaglineIdx((i) => (i + 1) % TAGLINES.length),
      520,
    )

    const timer = setTimeout(() => setIsLoading(false), 2900)

    return () => {
      clearTimeout(timer)
      clearInterval(taglineInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #040211 0%, #0E0826 55%, #1A0952 100%)' }}
        >
          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(78,47,168,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(78,47,168,0.15) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
              opacity: 0.3,
            }}
          />

          {/* Ambient blobs */}
          <div className="pointer-events-none absolute left-[8%] top-[12%] h-80 w-80 rounded-full bg-[rgba(78,47,168,0.3)] blur-[130px]" />
          <div className="pointer-events-none absolute right-[8%] bottom-[12%] h-72 w-72 rounded-full bg-[rgba(201,232,76,0.1)] blur-[110px]" />
          <div className="pointer-events-none absolute left-[50%] bottom-[20%] h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(155,127,224,0.15)] blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8 px-6 text-center">

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2"
            >
              <h1
                className="text-6xl font-black tracking-[-0.05em] text-white md:text-7xl"
                style={{ fontFamily: 'var(--font-display, sans-serif)' }}
              >
                Advertoria
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/38">
                AI-Powered Revenue Agency
              </p>
            </motion.div>

            {/* Tagline ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-5 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]"
                >
                  {TAGLINES[taglineIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Progress bar + counter */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full space-y-3"
            >
              <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #4E2FA8, #9B7FE0 50%, #C9E84C)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/28">
                  Building your experience
                </p>
                <p className="display-title text-sm font-black text-white/40">{progress}%</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
