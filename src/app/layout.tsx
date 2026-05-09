import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const sora = Sora({
  variable: '--font-display',
  subsets: ['latin'],
})

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
})

const BASE_URL = 'https://www.advertoria.in'
const TITLE = 'Best Digital Marketing Agency in Chennai | Advertoria — Performance Marketing & SEO'
const DESCRIPTION =
  'Advertoria is Chennai\'s best digital marketing agency. We specialise in performance marketing, Google Ads, Meta Ads, OTT advertising, SEO, social media marketing, web development, logo design, and branding for startups and businesses across Tamil Nadu. Get measurable results.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    // General digital marketing
    'best digital marketing agency',
    'digital marketing agency in Chennai',
    'digital marketing company in Chennai',
    'top digital marketing agencies in Chennai',
    'best digital marketing agency in Chennai',
    'digital marketing agency near me',
    'digital agency',
    'marketing agency near me',
    'advertising agency in Chennai',
    'advertising agencies near me',
    'digital marketing services Chennai',
    'performance marketing Chennai',
    'full service digital agency Chennai',
    'affordable digital marketing Chennai',
    'digital marketing for small business Chennai',
    // SEO
    'SEO agency in Chennai',
    'SEO services in Chennai',
    'SEO agency near me',
    'SEO services near me',
    'SEO company in Chennai',
    // PPC
    'PPC services in Chennai',
    'PPC services near me',
    'PPC agency in Chennai',
    'Google Ads agency Chennai',
    'Meta Ads agency Chennai',
    // Social media
    'social media marketing agency in Chennai',
    'social media marketing services in Chennai',
    'social media marketing agency near me',
    // Web development
    'web development agency in Chennai',
    'best web development agency near me',
    'web development services near me',
    'web development services in Chennai',
    'web development company in Chennai',
    'website design agency Chennai',
    // Automation & CRM
    'WhatsApp automation services in Chennai',
    'CRM services in Chennai',
    'lead generation company in Chennai',
    // Design & branding
    'logo design company in Chennai',
    'graphic design company in Chennai',
    'branding agency Chennai',
    'creative agency in Chennai',
    'design and marketing company in Chennai',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Advertoria',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/Advertoria-Logo.png.png',
        width: 1200,
        height: 630,
        alt: 'Advertoria — Digital Marketing Agency in Chennai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/Advertoria-Logo.png.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'HfYq1eK6t7zTSrQoavswTzjLlGcwemqJ6osoylUD8bk',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} antialiased`}>
        {/* GTM noscript — must be first inside <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K49WDHR9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        {/* Google Analytics 4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DECBKQ3SL3" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DECBKQ3SL3');`}
        </Script>
        {/* GTM head script — beforeInteractive injects this into <head> automatically */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K49WDHR9');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1537663924679470');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1537663924679470&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
