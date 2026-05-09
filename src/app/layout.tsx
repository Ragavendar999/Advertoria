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

export const metadata: Metadata = {
  title: 'Advertoria — Digital Marketing Agency in Chennai | Performance Marketing & Web Development',
  description:
    'Advertoria is a full-service digital marketing agency in Chennai. We specialise in performance marketing, Google Ads, Meta Ads, social media marketing, SEO, web development, logo design, graphic design, and branding for startups and businesses across Tamil Nadu.',
  keywords: [
    'digital marketing agency Chennai',
    'digital marketing company in Chennai',
    'best digital marketing agency Chennai',
    'digital marketing services Chennai',
    'performance marketing Chennai',
    'Google Ads agency Chennai',
    'Meta Ads agency Chennai',
    'social media marketing Chennai',
    'SEO company in Chennai',
    'lead generation company in Chennai',
    'web development company in Chennai',
    'website design agency Chennai',
    'logo design company in Chennai',
    'graphic design company in Chennai',
    'branding agency Chennai',
    'creative agency in Chennai',
    'full service digital agency Chennai',
    'affordable digital marketing Chennai',
    'digital marketing for small business Chennai',
    'design and marketing company in Chennai',
  ],
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
