'use client'

const items = [
  { text: 'Performance Marketing' },
  { text: '50+ Brands Scaled', highlight: true },
  { text: 'Creative Production' },
  { text: '3X Lead Flow', highlight: true },
  { text: 'Funnels & CRO' },
  { text: '-45% Cost Per Lead', highlight: true },
  { text: 'Automation & CRM' },
  { text: 'Analytics & Reporting' },
  { text: 'ROI-Led Strategy', highlight: true },
  { text: 'Chennai, India' },
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-[rgba(78,47,168,0.12)] bg-[rgba(78,47,168,0.04)] py-3.5 backdrop-blur-sm">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-6">
            <span className={`text-[0.68rem] font-extrabold uppercase tracking-[0.22em] ${item.highlight ? 'text-[var(--brand)]' : 'text-[var(--muted)]'}`}>
              {item.text}
            </span>
            <span className={`h-1.5 w-1.5 rounded-full ${item.highlight ? 'bg-[var(--accent)]' : 'bg-[rgba(78,47,168,0.25)]'}`} />
          </span>
        ))}
      </div>
    </div>
  )
}
