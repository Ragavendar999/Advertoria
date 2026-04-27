'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { CalendarCheck, Mail, MapPin, Phone, Send } from 'lucide-react'

const contactDetails = [
  { icon: Phone, label: 'Call or WhatsApp', value: '+91 73581 16929', href: 'https://wa.me/917358116929' },
  { icon: Mail, label: 'Email us', value: 'hello@advertoria.in', href: 'mailto:hello@advertoria.in' },
  { icon: MapPin, label: 'Based in', value: 'Chennai, Tamil Nadu', href: null },
]

const services = [
  'Performance Marketing',
  'Design Solutions',
  'Creative Production',
  'Funnels & Conversion',
  'Analytics & Reporting',
  'Automation & CRM',
  'Full Growth System',
  'Not sure - need advice',
]

type Form = {
  name: string
  mobile: string
  email: string
  service: string
}

const empty: Form = { name: '', mobile: '', email: '', service: '' }

export default function Contact() {
  const [form, setForm] = useState<Form>(empty)
  const [submitting, setSubmitting] = useState(false)

  const set = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const raw = await response.text()
      const data = raw ? JSON.parse(raw) : {}

      if (response.ok && data.success) {
        toast.success('Appointment request sent! We will reach out shortly.')
        setForm(empty)
      } else {
        toast.error(data.error || 'Unable to send right now.')
      }
    } catch {
      toast.error('Unable to submit right now. Please try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding pt-10">
      <div className="section-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="dark-panel flex flex-col justify-between rounded-[36px] p-7 md:p-10"
        >
          <div>
            <span className="inline-flex rounded-full border border-white/16 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/72">
              Book an appointment
            </span>

            <h2 className="display-title mt-6 text-4xl font-black leading-[0.95] text-white md:text-5xl">
              Let&apos;s turn your brand into a
              <span className="text-gradient-warm"> revenue engine.</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-[rgba(255,255,255,0.68)]">
              Fill the quick form and we will reach out within 24 hours to schedule your free strategy session.
              Every detail goes directly to <span className="font-bold text-white">hello@advertoria.in</span>.
            </p>

            <div className="mt-8 grid gap-3">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 transition hover:bg-white/10">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/44">{label}</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
                    </div>
                  </div>
                )

                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}
            </div>
          </div>

          <a
            href="https://wa.me/917358116929?text=Hi%20Advertoria!%20I%20want%20to%20book%20a%20strategy%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: '#25D366', boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp instead
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="surface-panel rounded-[36px] p-7 md:p-10"
        >
          <div className="mb-8">
            <span className="eyebrow">
              <CalendarCheck className="h-3.5 w-3.5" />
              Quick appointment form
            </span>
            <h3 className="display-title mt-5 text-3xl font-black text-[var(--fg)] md:text-4xl">
              Book your free strategy session in 30 seconds.
            </h3>
            <p className="body-copy mt-3 text-sm">
              No lengthy forms. Just the essentials - we will handle the rest on the call.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-[var(--fg)]">
              Full name <span className="text-[var(--accent)]">*</span>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={set}
                placeholder="Your name"
                className="rounded-[18px] border border-[rgba(50,74,159,0.13)] bg-white px-4 py-4 text-base outline-none transition focus:border-[var(--brand)] focus:shadow-[0_0_0_3px_rgba(201,232,76,0.35)]"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[var(--fg)]">
                Mobile number <span className="text-[var(--accent)]">*</span>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={set}
                  placeholder="+91 XXXXX XXXXX"
                  className="rounded-[18px] border border-[rgba(50,74,159,0.13)] bg-white px-4 py-4 text-base outline-none transition focus:border-[var(--brand)] focus:shadow-[0_0_0_3px_rgba(201,232,76,0.35)]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[var(--fg)]">
                Email address <span className="text-[var(--accent)]">*</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={set}
                  placeholder="you@company.com"
                  className="rounded-[18px] border border-[rgba(50,74,159,0.13)] bg-white px-4 py-4 text-base outline-none transition focus:border-[var(--brand)] focus:shadow-[0_0_0_3px_rgba(201,232,76,0.35)]"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-[var(--fg)]">
              Service needed <span className="text-[var(--accent)]">*</span>
              <select
                name="service"
                required
                value={form.service}
                onChange={set}
                className="rounded-[18px] border border-[rgba(50,74,159,0.13)] bg-white px-4 py-4 text-base outline-none transition focus:border-[var(--brand)] focus:shadow-[0_0_0_3px_rgba(201,232,76,0.35)]"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="button-primary btn-shimmer mt-1 w-full gap-3 px-6 py-5 text-base disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CalendarCheck className="h-5 w-5" />
              {submitting ? 'Booking appointment...' : 'Fix appointment'}
              {!submitting && <Send className="h-4 w-4" />}
            </button>

            <p className="text-center text-xs text-[var(--muted)]">
              We respond within 24 hours · No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
