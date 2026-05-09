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
  title: 'Advertoria - Wherever. Forever.',
  description:
    'Advertoria blends performance marketing, creative production, conversion systems, and automation to build revenue engines that scale with clarity.',
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
        {children}
        <Toaster position="top-right" reverseOrder={false} />
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
