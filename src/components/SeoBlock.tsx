const serviceGroups = [
  {
    heading: 'Digital Marketing',
    tags: [
      'Best Digital Marketing Agency',
      'Digital Marketing Agency in Chennai',
      'Digital Marketing Company in Chennai',
      'Top Digital Marketing Agencies in Chennai',
      'Digital Marketing Agency Near Me',
      'Digital Agency',
      'Marketing Agency Near Me',
      'Advertising Agency in Chennai',
      'Advertising Agencies Near Me',
    ],
  },
  {
    heading: 'SEO Services',
    tags: [
      'SEO Agency in Chennai',
      'SEO Services in Chennai',
      'SEO Agency Near Me',
      'SEO Services Near Me',
    ],
  },
  {
    heading: 'PPC & Paid Ads',
    tags: [
      'PPC Services in Chennai',
      'PPC Agency in Chennai',
      'PPC Services Near Me',
      'Google Ads Agency Chennai',
      'Meta Ads Agency Chennai',
    ],
  },
  {
    heading: 'Social Media Marketing',
    tags: [
      'Social Media Marketing Agency in Chennai',
      'Social Media Marketing Services in Chennai',
      'Social Media Marketing Agency Near Me',
    ],
  },
  {
    heading: 'Web Development',
    tags: [
      'Web Development Agency in Chennai',
      'Web Development Services in Chennai',
      'Best Web Development Agency Near Me',
      'Web Development Services Near Me',
    ],
  },
  {
    heading: 'Automation & CRM',
    tags: [
      'WhatsApp Automation Services in Chennai',
      'CRM Services in Chennai',
    ],
  },
]

export default function SeoBlock() {
  return (
    <section aria-label="Our services and locations" className="border-t border-[var(--border)] bg-[var(--bg-alt)] py-12">
      <div className="section-shell">
        <h2 className="mb-2 text-center text-lg font-black text-[var(--fg)]">
          Digital Marketing Services in Chennai
        </h2>
        <p className="mb-8 text-center text-sm text-[var(--muted)]">
          Advertoria is Chennai&apos;s trusted digital marketing and web development agency — helping businesses
          across Tamil Nadu grow with performance-driven strategies.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map(({ heading, tags }) => (
            <div key={heading}>
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--brand)]">
                {heading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
