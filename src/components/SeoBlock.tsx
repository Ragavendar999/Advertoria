const services = [
  {
    heading: 'Performance Marketing',
    description:
      'Result-driven Meta Ads and Google Ads campaigns for businesses in Chennai. We optimise for leads, sales, and ROAS — not just clicks.',
    tags: [
      'Google Ads Agency Chennai',
      'Meta Ads Agency Chennai',
      'PPC Agency in Chennai',
      'PPC Services in Chennai',
      'Performance Marketing Chennai',
    ],
  },
  {
    heading: 'SEO Services',
    description:
      'On-page, off-page, and technical SEO to rank your Chennai business on Google. We build sustainable organic traffic that compounds over time.',
    tags: [
      'SEO Agency in Chennai',
      'SEO Services in Chennai',
      'SEO Company in Chennai',
      'Best SEO Agency Near Me',
    ],
  },
  {
    heading: 'Social Media Marketing',
    description:
      'Content strategy, creative production, and community management across Instagram, Facebook, LinkedIn, and YouTube for brands in Chennai.',
    tags: [
      'Social Media Marketing Agency in Chennai',
      'Social Media Marketing Services in Chennai',
      'Instagram Marketing Chennai',
    ],
  },
  {
    heading: 'Web Development',
    description:
      'Fast, SEO-ready websites and landing pages built on Next.js for Chennai businesses. From design to launch — we handle it all.',
    tags: [
      'Web Development Agency in Chennai',
      'Web Development Company in Chennai',
      'Website Design Agency Chennai',
      'Best Web Development Agency Near Me',
    ],
  },
  {
    heading: 'Branding & Design',
    description:
      'Logo design, brand identity, graphic design, and visual systems that make Chennai businesses instantly recognisable and trustworthy.',
    tags: [
      'Logo Design Company in Chennai',
      'Graphic Design Company in Chennai',
      'Branding Agency Chennai',
      'Creative Agency in Chennai',
    ],
  },
  {
    heading: 'Automation & Lead Generation',
    description:
      'WhatsApp automation, CRM setup, and lead nurturing workflows that turn prospects into paying customers for Chennai brands.',
    tags: [
      'WhatsApp Automation Services in Chennai',
      'CRM Services in Chennai',
      'Lead Generation Company in Chennai',
    ],
  },
]

const locations = [
  'Anna Nagar', 'T. Nagar', 'Adyar', 'Velachery', 'OMR', 'Porur',
  'Ambattur', 'Tambaram', 'Perungudi', 'Nungambakkam', 'Guindy', 'Sholinganallur',
]

export default function SeoBlock() {
  return (
    <section aria-label="Digital marketing services in Chennai" className="border-t border-[var(--border)] bg-[var(--bg-alt)] py-14">
      <div className="section-shell">
        <h2 className="mb-3 text-center text-xl font-black text-[var(--fg)]">
          Digital Marketing Agency in Chennai
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-7 text-[var(--muted)]">
          Advertoria is Chennai&apos;s trusted full-service digital marketing and web development agency — helping startups and
          established businesses across Tamil Nadu grow with performance-driven strategies, creative design, and scalable systems.
        </p>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ heading, description, tags }) => (
            <div key={heading} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="mb-2 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--brand)]">
                {heading}
              </h3>
              <p className="mb-4 text-xs leading-6 text-[var(--muted)]">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg-alt)] px-3 py-1 text-[11px] font-medium text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-8">
          <h3 className="mb-3 text-center text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--brand)]">
            Serving Businesses Across Chennai
          </h3>
          <p className="mb-4 text-center text-xs text-[var(--muted)]">
            We work with clients from every corner of Chennai, delivering digital marketing, web development, and design solutions tailored to local markets.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {locations.map(loc => (
              <span
                key={loc}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
