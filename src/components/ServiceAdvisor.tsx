'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, Bot, CheckCircle2, RotateCcw, Sparkles, User } from 'lucide-react'

type BusinessType = 'real-estate' | 'ecommerce' | 'coach' | 'local-business'
type ProblemKey = 'lead-quality' | 'conversion' | 'follow-up' | 'branding' | 'sales'

type ProblemOption = {
  key: ProblemKey
  label: string
}

type AdvisorPlan = {
  problemTitle: string
  solutionTitle: string
  solutionPoints: string[]
  convinceCopy: string
}

const BUSINESS_OPTIONS: { key: BusinessType; label: string; helper: string }[] = [
  { key: 'real-estate', label: 'Real Estate', helper: 'Builders, brokers, plotted development, premium projects' },
  { key: 'ecommerce', label: 'E-commerce', helper: 'D2C brands, Shopify stores, product-led online selling' },
  { key: 'coach', label: 'Coach / Personal Brand', helper: 'Consultants, educators, founders, experts' },
  { key: 'local-business', label: 'Local Business', helper: 'Clinics, salons, studios, retail, service businesses' },
]

const PROBLEMS_BY_BUSINESS: Record<BusinessType, ProblemOption[]> = {
  'real-estate': [
    { key: 'lead-quality', label: 'I get leads, but most are not qualified' },
    { key: 'follow-up', label: 'Leads go cold before my team closes them' },
    { key: 'branding', label: 'My projects do not look premium enough online' },
  ],
  ecommerce: [
    { key: 'sales', label: 'Sales are low and ROAS is unstable' },
    { key: 'conversion', label: 'Traffic is coming, but checkout conversion is weak' },
    { key: 'branding', label: 'My creatives and brand do not stand out' },
  ],
  coach: [
    { key: 'lead-quality', label: 'I need more quality calls and enquiries' },
    { key: 'branding', label: 'My personal brand is not strong enough yet' },
    { key: 'conversion', label: 'People watch my content but do not convert' },
  ],
  'local-business': [
    { key: 'lead-quality', label: 'I need more enquiries and walk-ins' },
    { key: 'follow-up', label: 'My team misses follow-ups and bookings' },
    { key: 'branding', label: 'My business needs a more premium look online' },
  ],
}

const PLANS: Record<BusinessType, Record<ProblemKey, AdvisorPlan>> = {
  'real-estate': {
    'lead-quality': {
      problemTitle: 'Your marketing is probably generating volume, not intent.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Run hyper-targeted Performance Marketing campaigns for the exact location, budget band, and buyer intent.',
        'Build Funnels & Conversion pages that qualify users before your sales team spends time on them.',
        'Add AI Automation & CRM follow-up so serious leads are contacted immediately.',
      ],
      convinceCopy:
        'This works because real estate growth is not about more random leads. It is about fewer but stronger enquiries that actually book visits and close faster.',
    },
    conversion: {
      problemTitle: 'Traffic is arriving, but the journey is not strong enough to convert it.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Redesign the landing-page journey so the value proposition is clear in the first few seconds.',
        'Improve trust elements, project storytelling, and enquiry flow with Funnels & Conversion systems.',
        'Use Data & Analytics to find exactly where prospects are dropping off.',
      ],
      convinceCopy:
        'If the page experience is weak, even the best ad budget gets wasted. Fixing conversion often lowers cost per lead without increasing spend.',
    },
    'follow-up': {
      problemTitle: 'Your team is likely losing deals in the follow-up window.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Set up AI Automation & CRM so new leads get instant acknowledgement and qualification.',
        'Create WhatsApp-first follow-up sequences for site visits, callbacks, and reminders.',
        'Align your campaigns with a proper sales handoff so speed does not depend on manual effort.',
      ],
      convinceCopy:
        'In real estate, follow-up speed changes conversion rates dramatically. Many businesses do not have a lead problem - they have a response-time problem.',
    },
    branding: {
      problemTitle: 'Your digital presence is not reflecting the value of the project.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Upgrade Design Solutions and Creative Production so the brand feels premium, clear, and trustworthy.',
        'Improve project presentation, ad creatives, and landing visuals for higher perceived value.',
        'Support the brand layer with Performance Marketing that speaks to the right buyer profile.',
      ],
      convinceCopy:
        'Premium positioning attracts better buyers, improves ad response, and gives your sales team a stronger first impression before they even speak to the lead.',
    },
    sales: {
      problemTitle: 'Sales are inconsistent because the full funnel is not connected.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Connect Performance Marketing, Funnels & Conversion, and AI Automation into one pipeline.',
        'Track where sales slow down and remove the friction points one by one.',
        'Build a system that creates demand, qualifies leads, and supports closing.',
      ],
      convinceCopy:
        'When media, funnel, and follow-up work together, revenue becomes much more predictable than running campaigns in isolation.',
    },
  },
  ecommerce: {
    'lead-quality': {
      problemTitle: 'Your traffic may be broad, while buyer intent is too weak.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Refocus Performance Marketing around audiences with stronger purchase intent.',
        'Improve product pages and landing flow with Funnels & Conversion work.',
        'Use Analytics to separate attention metrics from actual buying signals.',
      ],
      convinceCopy:
        'Better targeting plus a stronger conversion path usually improves both sales quality and ROAS at the same time.',
    },
    conversion: {
      problemTitle: 'People are interested, but the store is not closing enough of them.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Optimize product page hierarchy, offer communication, and checkout flow.',
        'Create stronger creative-to-landing consistency so ad promises match store experience.',
        'Track user drop-off points and fix them with CRO-driven changes.',
      ],
      convinceCopy:
        'Conversion fixes often outperform simply adding more traffic because they improve the value of every visit you already paid for.',
    },
    'follow-up': {
      problemTitle: 'You are likely losing revenue after the first interaction.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Use AI Automation & CRM for abandoned carts, enquiry follow-ups, and retention messaging.',
        'Segment follow-up flows by buyer intent and product behavior.',
        'Connect paid traffic with post-click nurture instead of relying on one visit to do all the work.',
      ],
      convinceCopy:
        'A lot of e-commerce growth is hidden in the follow-up layer. If that layer is weak, your acquisition cost always feels higher than it should.',
    },
    branding: {
      problemTitle: 'Your brand and creatives are not earning enough attention or trust.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Upgrade Design Solutions and Creative Production to make the brand feel sharper and more memorable.',
        'Create better hooks, offer framing, and product storytelling for ads and the storefront.',
        'Support that brand lift with Performance Marketing designed for scale.',
      ],
      convinceCopy:
        'When the brand looks stronger, creatives perform better, conversion improves, and repeat purchase trust becomes easier to build.',
    },
    sales: {
      problemTitle: 'Sales are unstable because the growth engine is not consistent yet.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Rebuild the paid acquisition structure around profitable campaigns and creatives.',
        'Tighten the conversion path inside the store.',
        'Add reporting so decisions are based on profitability, not only platform metrics.',
      ],
      convinceCopy:
        'Stable growth usually comes from combining traffic quality, store conversion, and disciplined analytics - not from chasing one ad win.',
    },
  },
  coach: {
    'lead-quality': {
      problemTitle: 'You need stronger demand from the right audience, not just more visibility.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Build Social Media Growth around founder-led content that attracts the right people.',
        'Use Funnels & Conversion systems to move viewers into qualified calls or lead forms.',
        'Support everything with Branding & Strategy so the positioning is clear and premium.',
      ],
      convinceCopy:
        'For a coach or consultant, better positioning and better funnels usually matter more than chasing vanity engagement.',
    },
    conversion: {
      problemTitle: 'People are watching, but the content is not turning attention into enquiries.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Fix the bridge between content and offer with stronger CTAs and conversion journeys.',
        'Create dedicated lead capture funnels for calls, webinars, or offers.',
        'Use Design Solutions and Creative Production to make the value proposition easier to trust quickly.',
      ],
      convinceCopy:
        'Content becomes a real business asset only when the audience knows exactly what to do next and why they should trust you.',
    },
    'follow-up': {
      problemTitle: 'You are probably losing warm prospects between interest and conversion.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Automate lead response and nurture through AI Automation & CRM.',
        'Set up follow-up logic for call bookings, no-shows, and warm leads.',
        'Track the movement from content to enquiry to close more clearly.',
      ],
      convinceCopy:
        'A lot of service businesses leave money on the table because the nurture journey is too manual and too slow.',
    },
    branding: {
      problemTitle: 'Your personal brand is not yet carrying enough authority.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Sharpen your Branding & Strategy so the audience immediately understands your positioning.',
        'Use Design Solutions to make your pages, content, and assets feel more premium.',
        'Create a Social Media Growth system around consistent, trust-building content.',
      ],
      convinceCopy:
        'When authority becomes clear, conversion gets easier because people feel the difference before they ever book a call.',
    },
    sales: {
      problemTitle: 'Sales feel inconsistent because attention is not being turned into a repeatable system.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Connect personal brand content, conversion pages, and lead follow-up.',
        'Create a simple offer path that moves people toward enquiry or purchase.',
        'Add reporting so you can see which content and funnels are actually creating revenue.',
      ],
      convinceCopy:
        'The goal is not to post more. It is to create a system that reliably turns attention into calls and clients.',
    },
  },
  'local-business': {
    'lead-quality': {
      problemTitle: 'You likely need more local intent, not just more impressions.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Run local Performance Marketing campaigns focused on nearby buyers and high-intent actions.',
        'Use Funnels & Conversion systems to turn interest into bookings or enquiries.',
        'Improve the design and messaging so trust is built faster.',
      ],
      convinceCopy:
        'Local businesses grow best when the message is clear, the targeting is tight, and the customer knows exactly how to take the next step.',
    },
    conversion: {
      problemTitle: 'People know about you, but too many of them are not taking action.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Improve landing pages, offer presentation, and trust signals.',
        'Reduce friction in enquiry or booking flow.',
        'Use analytics to identify where potential customers hesitate.',
      ],
      convinceCopy:
        'Small conversion gains make a big difference for local businesses because every click and enquiry has a clear revenue value.',
    },
    'follow-up': {
      problemTitle: 'Your business is probably losing opportunities after the first enquiry.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Use AI Automation & CRM for instant response and reminder flows.',
        'Set up WhatsApp-friendly journeys for bookings and repeat touchpoints.',
        'Make sure the handoff between marketing and operations is clear.',
      ],
      convinceCopy:
        'Faster response often feels like a sales superpower in local markets because customers move quickly to whichever business replies first.',
    },
    branding: {
      problemTitle: 'Your online presence is not doing enough to build confidence.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Refresh Design Solutions so the brand feels more polished and credible.',
        'Improve creative consistency across your site, social media, and ads.',
        'Support the stronger brand layer with local acquisition campaigns.',
      ],
      convinceCopy:
        'A stronger brand presentation improves trust, and trust directly impacts enquiries, bookings, and local reputation.',
    },
    sales: {
      problemTitle: 'Sales are not consistent because marketing and conversion are too disconnected.',
      solutionTitle: 'What we would do for you',
      solutionPoints: [
        'Create one connected growth system across ads, landing pages, and follow-up.',
        'Focus the campaigns around actions that actually lead to revenue.',
        'Measure what is working and improve it continuously.',
      ],
      convinceCopy:
        'Consistency comes from systems. Once the full journey is aligned, sales become much easier to predict and improve.',
    },
  },
}

function getPlan(business: BusinessType, problem: ProblemKey): AdvisorPlan {
  return PLANS[business][problem] ?? PLANS[business].conversion
}

function WhatsappButton({ business, problem }: { business?: BusinessType | null; problem?: ProblemKey | null }) {
  const message = useMemo(() => {
    const pieces = ['Hi Advertoria, I want pricing and more details.']

    if (business) {
      const businessLabel = BUSINESS_OPTIONS.find((item) => item.key === business)?.label
      if (businessLabel) pieces.push(`Business: ${businessLabel}.`)
    }

    if (problem && business) {
      const problemLabel = PROBLEMS_BY_BUSINESS[business].find((item) => item.key === problem)?.label
      if (problemLabel) pieces.push(`Main problem: ${problemLabel}.`)
    }

    return `https://wa.me/917358116929?text=${encodeURIComponent(pieces.join(' '))}`
  }, [business, problem])

  return (
    <a
      href={message}
      target="_blank"
      rel="noopener noreferrer"
      className="button-primary btn-shimmer inline-flex px-5 py-3 text-sm"
    >
      Get pricing on WhatsApp
      <ArrowUpRight className="h-4 w-4" />
    </a>
  )
}

function Bubble({
  role,
  children,
}: {
  role: 'user' | 'assistant'
  children: React.ReactNode
}) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-[var(--brand)]' : 'bg-[var(--accent)]/20'
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-[var(--accent)]" />
        )}
      </div>

      <div
        className={`max-w-[82%] rounded-[20px] px-4 py-3 text-sm leading-7 ${
          isUser
            ? 'rounded-tr-[6px] bg-[var(--brand)] text-white'
            : 'rounded-tl-[6px] bg-white/6 text-white/85'
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function ServiceAdvisor() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null)
  const [selectedProblem, setSelectedProblem] = useState<ProblemKey | null>(null)

  const problemOptions = selectedBusiness ? PROBLEMS_BY_BUSINESS[selectedBusiness] : []
  const plan = selectedBusiness && selectedProblem ? getPlan(selectedBusiness, selectedProblem) : null

  const reset = () => {
    setSelectedBusiness(null)
    setSelectedProblem(null)
  }

  return (
    <section id="advisor" className="section-padding" ref={ref}>
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">AI Service Advisor</span>
          <h2 className="display-title mt-5 text-4xl font-black leading-[0.96] text-[var(--fg)] md:text-5xl">
            Pick your business. Pick your problem.
            <span className="text-gradient"> Get the right growth path.</span>
          </h2>
          <p className="body-copy mt-4 text-base">
            No typing. No awkward chatbot experience. Just a guided Q&amp;A that explains the
            problem, the solution, and the next step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="dark-panel overflow-hidden rounded-[40px]">
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--accent)]/15">
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white">Advi</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span className="text-xs text-white/40">Guided Growth Advisor</span>
                  </div>
                </div>
              </div>

              {(selectedBusiness || selectedProblem) && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50 transition hover:text-white/80"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-5 px-5 py-5">
              <Bubble role="assistant">
                Which type of business are you trying to grow?
              </Bubble>

              <div className="grid gap-3 sm:grid-cols-2">
                {BUSINESS_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSelectedBusiness(option.key)
                      setSelectedProblem(null)
                    }}
                    className={`rounded-[18px] border px-4 py-4 text-left transition ${
                      selectedBusiness === option.key
                        ? 'border-[var(--accent)] bg-white/10'
                        : 'border-white/10 bg-white/5 hover:bg-white/8'
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{option.label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">{option.helper}</p>
                  </button>
                ))}
              </div>

              {selectedBusiness && (
                <>
                  <Bubble role="user">
                    {BUSINESS_OPTIONS.find((item) => item.key === selectedBusiness)?.label}
                  </Bubble>

                  <Bubble role="assistant">
                    What is the biggest problem you want us to solve first?
                  </Bubble>

                  <div className="grid gap-3">
                    {problemOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setSelectedProblem(option.key)}
                        className={`rounded-[18px] border px-4 py-4 text-left text-sm transition ${
                          selectedProblem === option.key
                            ? 'border-[var(--accent)] bg-white/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/78 hover:bg-white/8'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {selectedBusiness && selectedProblem && plan && (
                <>
                  <Bubble role="user">
                    {problemOptions.find((item) => item.key === selectedProblem)?.label}
                  </Bubble>

                  <Bubble role="assistant">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                          1. List down the problem
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white">{plan.problemTitle}</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                          2. Give the solution
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white">{plan.solutionTitle}</p>
                        <div className="mt-3 space-y-2">
                          {plan.solutionPoints.map((point) => (
                            <div key={point} className="flex items-start gap-2.5">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]" />
                              <span className="text-sm leading-6 text-white/82">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                          3. Convince them
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/84">{plan.convinceCopy}</p>
                      </div>

                      <div className="rounded-[18px] border border-white/10 bg-white/6 p-4">
                        <p className="text-sm font-semibold text-white">
                          For pricing and more details, chat with our team directly on WhatsApp.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <WhatsappButton business={selectedBusiness} problem={selectedProblem} />
                          <button
                            onClick={reset}
                            className="button-secondary px-5 py-3 text-sm"
                          >
                            Start over
                          </button>
                        </div>
                      </div>
                    </div>
                  </Bubble>
                </>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center"
          >
            <span className="text-sm text-[var(--muted)]">Need direct pricing or a human response?</span>
            <WhatsappButton business={selectedBusiness} problem={selectedProblem} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
