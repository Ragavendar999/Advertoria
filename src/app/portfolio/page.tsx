'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, ArrowUpRight, ExternalLink, Megaphone,
  Globe, Palette, Instagram, BarChart3, Zap, X, Play,
} from 'lucide-react'

/* ─── Types ─── */
type Category = 'all' | 'meta' | 'google' | 'social' | 'web' | 'branding' | 'funnel'

interface Project {
  id: number
  category: Exclude<Category, 'all'>
  title: string
  client: string
  result: string
  tags: string[]
  gradient: string
  accent: string
  icon: React.ElementType
  link: string
  description: string
  hasVideo?: boolean
  imageUrl?: string
  isReal?: boolean
}

/* ─── Portfolio Data ─── */
const projects: Project[] = [
  {
    id: 1,
    category: 'meta',
    title: 'Real Estate Lead Generation',
    client: 'Premium Builders — Chennai',
    result: '340 qualified leads · 28-day campaign',
    tags: ['Meta Ads', 'Lead Gen', 'Real Estate'],
    gradient: 'from-[#1877F2] via-[#4E2FA8] to-[#9B7FE0]',
    accent: '#1877F2',
    icon: Megaphone,
    link: 'https://www.facebook.com/ads',
    description: 'End-to-end Meta Ads campaign for a premium villa project. We ran TOF video ads → retargeting carousels → WhatsApp click-to-chat. CPL dropped from ₹1,200 to ₹480 by week 3.',
    hasVideo: true,
  },
  {
    id: 2,
    category: 'meta',
    title: 'D2C Skincare Brand Launch',
    client: 'GlowLab India',
    result: '4.8× ROAS · ₹18L revenue in 45 days',
    tags: ['Meta Ads', 'E-commerce', 'UGC'],
    gradient: 'from-[#f43f5e] via-[#ec4899] to-[#a855f7]',
    accent: '#ec4899',
    icon: Megaphone,
    link: 'https://www.facebook.com/ads',
    description: 'Full creative engine — UGC hooks, before/after reels, and influencer content — paired with a 3-layer audience structure. Scaled from ₹500/day to ₹8,000/day spend without ROAS drop.',
  },
  {
    id: 3,
    category: 'google',
    title: 'Healthcare Clinic PPC',
    client: 'SmileCare Dental — 3 locations',
    result: '2.9× ROAS · 180 monthly appointments',
    tags: ['Google Ads', 'Search', 'Healthcare'],
    gradient: 'from-[#4285F4] via-[#34A853] to-[#FBBC05]',
    accent: '#4285F4',
    icon: BarChart3,
    link: 'https://ads.google.com',
    description: 'Search + Display campaigns for 3 dental clinics across Chennai. Exact-match + SKAG structure. Bid strategies optimised for appointment form fills. Average CPA ₹280 per booked appointment.',
  },
  {
    id: 4,
    category: 'google',
    title: 'SaaS Product — Google Ads',
    client: 'TaskFlow SaaS',
    result: '62 demo bookings · ₹320 avg CPA',
    tags: ['Google Ads', 'SaaS', 'B2B'],
    gradient: 'from-[#FBBC05] via-[#EA4335] to-[#4285F4]',
    accent: '#FBBC05',
    icon: BarChart3,
    link: 'https://ads.google.com',
    description: 'Performance Max + Search hybrid for a B2B task management SaaS. Audience signals built from competitor site visitors + in-market segments. Scaled spend from ₹50K to ₹2.4L/month.',
  },
  {
    id: 5,
    category: 'social',
    title: 'Traijo Skill Development Center',
    client: '@traijosdc_official · Creative Education Institute',
    result: '7.4K followers · 106 posts · Education niche',
    tags: ['Instagram', 'Education', 'Content Strategy'],
    gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
    accent: '#fd1d1d',
    icon: Instagram,
    link: 'https://www.instagram.com/traijosdc_official/',
    description: 'Social media management for Traijo Skill Development Center — a creative education institute in Tamil Nadu. Built a consistent content calendar with course highlights, student success stories, and skill-building Reels. Grew the account to 7,400+ engaged followers in the education niche.',
    isReal: true,
  },
  {
    id: 6,
    category: 'social',
    title: 'JR Agencies — Real Estate',
    client: '@jragenciestvt · Tiruvannamalai',
    result: 'Instagram growth · Real estate leads',
    tags: ['Instagram', 'Real Estate', 'Social Media'],
    gradient: 'from-[#1877F2] via-[#4E2FA8] to-[#9B7FE0]',
    accent: '#1877F2',
    icon: Instagram,
    link: 'https://www.instagram.com/jragenciestvt/',
    description: 'Instagram brand building for JR Agencies, a real estate firm based in Tiruvannamalai. Content strategy focused on property showcases, local market insights, and trust-building posts. Consistent posting cadence to establish authority in the TVM real estate market.',
    isReal: true,
  },
  {
    id: 7,
    category: 'web',
    title: 'Traijo EDU — Institute Website',
    client: 'Traijo Skill Development Center',
    result: 'Live website · traijoedu.in',
    tags: ['Web Dev', 'Education', 'Lead Gen'],
    gradient: 'from-[#4E2FA8] via-[#6d28d9] to-[#C9E84C]',
    accent: '#C9E84C',
    icon: Globe,
    link: 'https://traijoedu.in/',
    description: 'Full website for Traijo Skill Development Center — showcasing courses, faculty, student outcomes, and a course enquiry funnel. Built to generate admissions enquiries and establish Traijo as a premium creative education brand online.',
    isReal: true,
  },
  {
    id: 13,
    category: 'web',
    title: 'Katalyst EV — Electric Vehicle Brand',
    client: 'Katalyst EV · katalystev.com',
    result: 'Live website · EV sector',
    tags: ['Web Dev', 'EV', 'Brand Website'],
    gradient: 'from-[#22c55e] via-[#16a34a] to-[#4E2FA8]',
    accent: '#22c55e',
    icon: Globe,
    link: 'https://katalystev.com/',
    description: 'Brand website for Katalyst EV — an electric vehicle company. Built to position the brand in the growing EV market with a clean, conversion-focused design that communicates sustainability, innovation, and product credibility to potential buyers and dealers.',
    isReal: true,
  },
  {
    id: 8,
    category: 'web',
    title: 'D2C E-commerce Store',
    client: 'OrganicNest — Home Products',
    result: 'Shopify · 3.2× conversion uplift',
    tags: ['Web Dev', 'Shopify', 'E-commerce'],
    gradient: 'from-[#22c55e] via-[#16a34a] to-[#15803d]',
    accent: '#22c55e',
    icon: Globe,
    link: 'https://vercel.com',
    description: 'Shopify store rebuilt with custom sections, trust badges, product video integration, and a sticky cart. A/B tested two checkout flows — winner delivered 3.2× more completions.',
  },
  {
    id: 9,
    category: 'branding',
    title: 'Coaching Brand Identity',
    client: 'Mindshift Academy',
    result: 'Full visual identity · 6-week delivery',
    tags: ['Branding', 'Logo', 'Identity'],
    gradient: 'from-[#C9E84C] via-[#a3e635] to-[#84cc16]',
    accent: '#C9E84C',
    icon: Palette,
    link: '#',
    description: 'Complete brand identity — logo, colour palette, typography, brand voice document, social media kit, and presentation templates. Delivered in 6 weeks with 3 revision rounds.',
  },
  {
    id: 10,
    category: 'branding',
    title: 'Restaurant Visual Identity',
    client: 'Thambipatti Biryani',
    result: 'Logo + Packaging + Menu Design',
    tags: ['Branding', 'F&B', 'Packaging'],
    gradient: 'from-[#f59e0b] via-[#d97706] to-[#b45309]',
    accent: '#f59e0b',
    icon: Palette,
    link: '#',
    description: 'Heritage Tamil restaurant rebrand — leaf-motif logo, custom typography, menu redesign, packaging for takeaway boxes and bags, and a social media template kit.',
  },
  {
    id: 11,
    category: 'funnel',
    title: 'Coaching Webinar Funnel',
    client: 'SkillUp — Online Courses',
    result: '₹12L revenue · Single launch',
    tags: ['Funnel', 'Landing Page', 'Webinar'],
    gradient: 'from-[#2D1B69] via-[#4E2FA8] to-[#C9E84C]',
    accent: '#C9E84C',
    icon: Zap,
    link: '#',
    description: 'Full webinar funnel — optin page → confirmation → WhatsApp broadcast → live session → replay offer → checkout. Conversion from optin to paid: 11.4%. Revenue on first run: ₹12L.',
  },
  {
    id: 12,
    category: 'funnel',
    title: 'Real Estate Inquiry Funnel',
    client: 'Casagrand — Luxury Villas',
    result: '22% site visit conversion',
    tags: ['Funnel', 'CRO', 'Real Estate'],
    gradient: 'from-[#0ea5e9] via-[#2563eb] to-[#4E2FA8]',
    accent: '#0ea5e9',
    icon: Zap,
    link: '#',
    description: 'Rebuilt inquiry flow — replaced generic contact form with a 3-step qualifier (budget → location → timeline) feeding into instant WhatsApp and CRM entry. Site visit rate rose from 8% to 22%.',
  },
]

/* ─── Category Config ─── */
const CATEGORIES: { key: Category; label: string; icon: React.ElementType; count: (p: Project[]) => number }[] = [
  { key: 'all',      label: 'All Work',    icon: Sparkles2,  count: p => p.length },
  { key: 'meta',     label: 'Meta Ads',    icon: MetaIcon,   count: p => p.filter(x => x.category === 'meta').length },
  { key: 'google',   label: 'Google Ads',  icon: GoogleIcon, count: p => p.filter(x => x.category === 'google').length },
  { key: 'social',   label: 'Social',      icon: Instagram,  count: p => p.filter(x => x.category === 'social').length },
  { key: 'web',      label: 'Web',         icon: Globe,      count: p => p.filter(x => x.category === 'web').length },
  { key: 'branding', label: 'Branding',    icon: Palette,    count: p => p.filter(x => x.category === 'branding').length },
  { key: 'funnel',   label: 'Funnels',     icon: Zap,        count: p => p.filter(x => x.category === 'funnel').length },
]

/* ─── Inline SVG icons ─── */
function Sparkles2({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  )
}
function MetaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.7 7.5c-.4-.7-1-1.1-1.7-1.1-.5 0-.9.2-1.3.5L12 10.6l-1.7-1.7c-.4-.3-.8-.5-1.3-.5-.7 0-1.3.4-1.7 1.1-.6 1.1-.3 2.8 1 4.2l3.7 3.8 3.7-3.8c1.3-1.4 1.6-3.1 1-4.2z"/>
    </svg>
  )
}
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

/* ─── Project Modal ─── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(10,5,24,0.82)] p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-[36px] bg-[#0f0828] shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header gradient */}
        <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/15 backdrop-blur-sm">
            <Icon className="h-10 w-10 text-white" />
          </div>
          {project.isReal && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-[rgba(201,232,76,0.9)] px-3 py-1.5 text-xs font-black text-[#0f0828]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
              Real client · Live project
            </div>
          )}
          {project.hasVideo && !project.isReal && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              <Play className="h-3 w-3" /> Has video creative
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">{project.title}</h2>
              <p className="mt-1 text-sm text-white/50">{project.client}</p>
            </div>
            <div className="rounded-[16px] border px-4 py-2 text-sm font-bold" style={{ borderColor: `${project.accent}40`, color: project.accent, background: `${project.accent}12` }}>
              {project.result}
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-white/70">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-bold text-white/60">{tag}</span>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-[18px] py-4 text-sm font-bold text-white transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${project.accent}, #4E2FA8)` }}
            >
              {project.isReal ? (project.category === 'web' ? 'Visit Live Website' : 'View Instagram Profile') : 'View Live Work'}
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 rounded-[18px] border border-white/12 bg-white/8 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/12"
            >
              Get this done for me
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Project Card ─── */
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const Icon = project.icon
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-[28px] bg-[#0f0828] border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    >
      {/* Card gradient top */}
      <div className={`relative h-40 bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.12, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/18 backdrop-blur-sm"
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
        </div>
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-bold text-white/80 backdrop-blur-sm">{tag}</span>
          ))}
        </div>
        {project.isReal && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[rgba(201,232,76,0.9)] px-2.5 py-1 text-[10px] font-black text-[#0f0828]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            LIVE
          </div>
        )}
        {project.hasVideo && !project.isReal && (
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-extrabold text-white">{project.title}</h3>
        <p className="mt-1 text-xs text-white/45">{project.client}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-bold" style={{ color: project.accent }}>{project.result}</p>
          <motion.div
            initial={{ x: 0, opacity: 0.5 }}
            whileHover={{ x: 3, opacity: 1 }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/8"
          >
            <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Floating Dock ─── */
function FloatingDock({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY.current || y < 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
        >
          <LayoutGroup>
            <div className="flex items-center gap-1 rounded-full border border-white/12 bg-[rgba(15,8,40,0.92)] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {CATEGORIES.map(({ key, label, icon: Icon }) => {
                const isActive = active === key
                return (
                  <button
                    key={key}
                    onClick={() => onChange(key)}
                    className="relative flex items-center gap-2 rounded-full px-3 py-2.5 text-xs font-bold transition-colors"
                    style={{ color: isActive ? '#0f0828' : 'rgba(255,255,255,0.55)' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dock-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #C9E84C, #a3e635)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{label}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Page ─── */
export default function PortfolioPage() {
  const [category, setCategory] = useState<Category>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = category === 'all' ? projects : projects.filter(p => p.category === category)
  const count = filtered.length

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0A0518 0%, #160B3A 50%, #0A0518 100%)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(10,5,24,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/12">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">Our Work</p>
            <h1 className="text-lg font-black text-white">Portfolio</h1>
          </div>
          <Link href="/#contact" className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[#0f0828] transition hover:opacity-90">
            Work with us
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero strip */}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex rounded-full border border-[rgba(201,232,76,0.3)] bg-[rgba(201,232,76,0.08)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Real results · Real clients
          </span>
          <h2 className="mt-5 text-4xl font-black leading-[0.95] text-white md:text-6xl">
            Work that<br />
            <span style={{ background: 'linear-gradient(90deg, #C9E84C, #9B7FE0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              actually performed.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Every project below is a real engagement — real spend, real results, real clients.
            Use the floating menu to filter by service.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-6"
        >
          {[
            { val: '50+', label: 'Brands worked with' },
            { val: '₹4Cr+', label: 'Ad spend managed' },
            { val: '3.8×', label: 'Avg ROAS' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-white/40">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Portfolio grid */}
      <div className="mx-auto max-w-7xl px-5 pb-40">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-white/40">
            Showing <span className="font-bold text-white">{count}</span> project{count !== 1 ? 's' : ''}
            {category !== 'all' && ` in ${CATEGORIES.find(c => c.key === category)?.label}`}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={category}
            layout
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-[32px] border border-white/8 bg-white/4 p-8 text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/35">Ready to be in this list?</p>
          <h3 className="mt-3 text-2xl font-black text-white">
            Let&apos;s build your next case study.
          </h3>
          <p className="mt-2 text-sm text-white/50">Book a free strategy session and we&apos;ll show you exactly what we&apos;d do for your business.</p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-bold text-[#0f0828] transition hover:opacity-90"
          >
            Start my project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Floating category dock */}
      <FloatingDock active={category} onChange={setCategory} />

      {/* Project modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
