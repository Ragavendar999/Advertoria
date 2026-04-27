'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, MessageCircle, Rocket } from 'lucide-react'

export default function CTA() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="book-call" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="dark-panel rounded-[40px] px-6 py-12 text-center md:px-10 md:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/72">
              <Rocket className="h-3.5 w-3.5 text-[var(--gold)]" />
              Ready to turn this into enquiries?
            </span>

            <h2 className="display-title mt-6 text-4xl font-black leading-[0.94] text-white md:text-6xl">
              Let&apos;s turn the brand into something more memorable,
              <span className="text-gradient"> more confident, and more clickable.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.7)]">
              If you want the same joined-up thinking across your campaigns, creatives, landing pages,
              and follow-up systems, we can map the next steps together in one focused strategy session.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/917358116929?text=Hi%20Advertoria!%20I%20want%20to%20book%20a%20strategy%20call."
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary btn-shimmer px-7 py-4 text-sm"
              >
                Book strategy call
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="button-secondary border-white/18 bg-white/10 px-7 py-4 text-sm text-white"
              >
                <MessageCircle className="h-4 w-4 text-[var(--gold)]" />
                Send project details
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
