import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type LeadForm = {
  name: string
  mobile: string
  email: string
  service: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadForm
    const { name, mobile, email, service } = body

    if (!name?.trim() || !mobile?.trim() || !email?.trim() || !service?.trim()) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    const user = process.env.EMAIL_USER?.trim()
    const pass = process.env.EMAIL_PASS?.replace(/\s/g, '')
    const to = (process.env.EMAIL_TO || 'hello@advertoria.in').trim()

    if (!user || !pass) {
      return NextResponse.json(
        { error: 'Email service is not configured. Set EMAIL_USER and EMAIL_PASS in .env.local.' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    const safeName = escapeHtml(name.trim())
    const safeMobile = escapeHtml(mobile.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeService = escapeHtml(service.trim())

    await transporter.sendMail({
      from: `"Advertoria Website" <${user}>`,
      to,
      replyTo: email.trim(),
      subject: `New Appointment Request - ${name.trim()} (${service.trim()})`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#eef2ff;padding:32px;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #d8def2;">
            <div style="padding:24px 28px;background:linear-gradient(135deg,#2d1b69 0%,#4e2fa8 60%,#ff8a3d 100%);color:#ffffff;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;opacity:0.8;">New appointment request</p>
              <h2 style="margin:0;font-size:24px;font-weight:900;">Advertoria Lead</h2>
            </div>
            <div style="padding:24px 28px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;background:#f5f7ff;font-weight:700;color:#091224;width:38%;">Name</td>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;color:#23314f;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;background:#f5f7ff;font-weight:700;color:#091224;">Mobile</td>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;color:#23314f;">${safeMobile}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;background:#f5f7ff;font-weight:700;color:#091224;">Email</td>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;color:#23314f;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;background:#f5f7ff;font-weight:700;color:#091224;">Service needed</td>
                  <td style="padding:12px 14px;border:1px solid #e2e8ff;color:#23314f;font-weight:700;">${safeService}</td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:12px;color:#8a9abf;">Submitted via Advertoria website. Reply to this email to respond directly to the lead.</p>
            </div>
          </div>
        </div>
      `,
      text: `New appointment request\n\nName: ${name.trim()}\nMobile: ${mobile.trim()}\nEmail: ${email.trim()}\nService: ${service.trim()}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { error: 'Unable to send your request right now. Please try WhatsApp or email us directly.' },
      { status: 500 }
    )
  }
}
