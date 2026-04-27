'use client'

import Preloader from '@/components/Preloader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import StorySection from '@/components/StorySection'
import About from '@/components/About'
import Services from '@/components/Services'
import Results from '@/components/Results'
import WhyUs from '@/components/WhyUs'
import Process from '@/components/Process'
import ServiceAdvisor from '@/components/ServiceAdvisor'
import InstagramAnalytics from '@/components/InstagramAnalytics'
import Industries from '@/components/Industries'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AnimatedCursor from '@/components/AnimatedCursor'
import FloatingActions from '@/components/FloatingActions'
import WelcomeVoice from '@/components/WelcomeVoice'

export default function HomePage() {
  return (
    <>
      <WelcomeVoice />
      <Preloader />
      <AnimatedCursor />
      <FloatingActions />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Ticker />
        <StorySection />
        <About />
        <Services />
        <Results />
        <WhyUs />
        <Process />
        <ServiceAdvisor />
        <InstagramAnalytics />
        <Industries />
        <Team />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
