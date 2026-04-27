'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Linkedin } from 'lucide-react'

const team = [
  {
    name: 'Ragavendar N.',
    initials: 'RN',
    role: 'Founder & Strategist',
    desc: 'Crafts the overall growth strategy, visual systems, and digital experiences that turn brand ideas into revenue machines.',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    gradientFrom: 'rgba(50,74,159,0.45)',
    gradientTo: 'rgba(73,100,215,0.15)',
    pill: 'bg-[rgba(50,74,159,0.22)] text-[rgba(180,196,255,0.95)]',
  },
  {
    name: 'Rasiya Thabusam',
    initials: 'RT',
    role: 'Graphic Designer',
    desc: 'Translates brand strategy into premium visual identities, ad creatives, and design systems that earn attention instantly.',
    instagram: 'https://instagram.com',
    gradientFrom: 'rgba(242,196,222,0.55)',
    gradientTo: 'rgba(155,127,224,0.2)',
    pill: 'bg-[rgba(242,196,222,0.22)] text-[rgba(255,180,220,0.95)]',
  },
  {
    name: 'Sahaya Berlin',
    initials: 'SB',
    role: 'Digital Marketer',
    desc: 'Architects and runs paid campaigns, audience strategy, and the performance optimisation loop across Meta and Google.',
    instagram: 'https://instagram.com',
    gradientFrom: 'rgba(255,122,89,0.45)',
    gradientTo: 'rgba(246,181,62,0.15)',
    pill: 'bg-[rgba(255,122,89,0.22)] text-[rgba(255,200,180,0.95)]',
  },
  {
    name: 'Gurumurthy',
    initials: 'GM',
    role: 'Video Editor',
    desc: 'Creates high-impact short-form reels, testimonial cuts, and ad creatives that hold attention and tell the brand story.',
    instagram: 'https://instagram.com',
    gradientFrom: 'rgba(53,197,161,0.45)',
    gradientTo: 'rgba(62,169,255,0.15)',
    pill: 'bg-[rgba(53,197,161,0.22)] text-[rgba(150,235,210,0.95)]',
  },
  {
    name: 'Varsha',
    initials: 'VA',
    role: 'Content Writer',
    desc: 'Crafts scroll-stopping copy, scripts, and content strategies that connect emotionally and drive measurable conversions.',
    instagram: 'https://instagram.com',
    gradientFrom: 'rgba(201,232,76,0.45)',
    gradientTo: 'rgba(78,47,168,0.2)',
    pill: 'bg-[rgba(201,232,76,0.22)] text-[rgba(180,220,80,0.95)]',
  },
]

export default function Team() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="team" className="section-padding pt-8" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">The team</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            The people who make the system run.
          </h2>
          <p className="body-copy mt-4 text-base">
            A small, focused team that keeps strategy, creative, and execution inside the same conversation.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {team.map(({ name, initials, role, desc, linkedin, instagram, gradientFrom, gradientTo, pill }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="dark-panel bento-card rounded-[32px] px-6 py-8"
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] text-xl font-black text-white"
                style={{
                  background: `linear-gradient(140deg, ${gradientFrom}, ${gradientTo})`,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {initials}
              </div>

              <span className={`inline-flex rounded-full px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] ${pill}`}>
                {role}
              </span>

              <h3 className="mt-4 text-2xl font-extrabold text-white">{name}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgba(255,255,255,0.62)]">{desc}</p>

              <div className="mt-6 flex gap-3">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/60 transition hover:bg-white/14 hover:text-white"
                    aria-label={`${name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/60 transition hover:bg-white/14 hover:text-white"
                    aria-label={`${name} Instagram`}
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
