import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
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
  icons: {
    icon: '/Advertoria-Logo.png.png',
    apple: '/Advertoria-Logo.png.png',
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
      </body>
    </html>
  )
}
