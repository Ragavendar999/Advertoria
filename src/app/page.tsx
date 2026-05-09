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
import SeoBlock from '@/components/SeoBlock'
import Footer from '@/components/Footer'
import AnimatedCursor from '@/components/AnimatedCursor'
import FloatingActions from '@/components/FloatingActions'
import WelcomeVoice from '@/components/WelcomeVoice'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  '@id': 'https://www.advertoria.in/#organization',
  name: 'Advertoria',
  alternateName: 'Advertoria Digital Marketing Agency Chennai',
  url: 'https://www.advertoria.in',
  logo: 'https://www.advertoria.in/Advertoria-Logo.png.png',
  image: 'https://www.advertoria.in/Advertoria-Logo.png.png',
  description:
    'Advertoria is a full-service digital marketing agency in Chennai, Tamil Nadu. We are a leading marketing company in Chennai specialising in performance marketing, Google Ads, Meta Ads, social media marketing, SEO, content marketing, web development, logo design, graphic design, and branding for startups and businesses looking to achieve their business goals and strengthen their online presence.',
  telephone: '+917358116929',
  email: 'hello@advertoria.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'State', name: 'Tamil Nadu' },
  ],
  priceRange: '₹₹',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '3',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/advertoria.in',
    'https://www.linkedin.com/company/advertoria',
    'https://www.youtube.com/@advertoria',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services in Chennai',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing', description: 'Meta Ads and Google Ads campaigns optimised for ROAS and lead generation in Chennai.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management', description: 'Search, Display, and Shopping campaigns for businesses across Tamil Nadu.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management', description: 'Facebook and Instagram advertising to reach your target audience in Chennai.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services', description: 'Search engine optimisation to improve your online presence in Google rankings.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing', description: 'Content marketing and community management across Instagram, Facebook, and LinkedIn.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', description: 'High-performance website development using Next.js for Chennai businesses.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logo Design', description: 'Brand identity and logo design for startups and businesses in Chennai.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design', description: 'Visual design, social media creatives, and marketing collateral.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Identity', description: 'Brand positioning, naming, and visual system for Chennai companies.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Automation', description: 'AI-powered WhatsApp bots and CRM automation for lead nurturing.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lead Generation', description: 'End-to-end lead generation strategies to grow your business in Tamil Nadu.' } },
    ],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.advertoria.in/#organization',
  name: 'Advertoria',
  alternateName: ['Advertoria Chennai', 'Advertoria Digital Marketing', 'Advertoria Marketing Agency in Chennai'],
  url: 'https://www.advertoria.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.advertoria.in/Advertoria-Logo.png.png',
    width: 280,
    height: 80,
  },
  description:
    'Advertoria is Chennai\'s top digital marketing agency. We are a full-service marketing company in Chennai helping startups and businesses achieve measurable results through digital marketing strategies, performance marketing, SEO, content marketing, website development, and branding.',
  foundingDate: '2022',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+917358116929',
      contactType: 'customer service',
      availableLanguage: ['English', 'Tamil'],
      contactOption: 'TollFree',
    },
    {
      '@type': 'ContactPoint',
      email: 'hello@advertoria.in',
      contactType: 'customer support',
    },
  ],
  knowsAbout: [
    'Digital Marketing',
    'Performance Marketing',
    'Search Engine Optimization',
    'Pay Per Click Advertising',
    'Social Media Marketing',
    'Google Ads',
    'Meta Ads',
    'Content Marketing',
    'Web Development',
    'Graphic Design',
    'Logo Design',
    'Branding',
    'Marketing Automation',
    'CRM',
    'Lead Generation',
    'Marketing Analytics',
    'OTT Advertising',
    'Hotstar Ads',
    'JioCinema Advertising',
    'WhatsApp Marketing',
    'Digital Marketing Strategies',
    'Online Presence Management',
    'Target Audience Research',
  ],
  sameAs: [
    'https://www.instagram.com/advertoria.in',
    'https://www.linkedin.com/company/advertoria',
    'https://www.youtube.com/@advertoria',
  ],
  areaServed: {
    '@type': 'City',
    name: 'Chennai',
    containedIn: {
      '@type': 'State',
      name: 'Tamil Nadu',
      containedIn: { '@type': 'Country', name: 'India' },
    },
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.advertoria.in/#webpage',
  url: 'https://www.advertoria.in',
  name: 'Best Digital Marketing Agency in Chennai | Advertoria',
  description:
    'Advertoria is Chennai\'s leading digital marketing agency offering performance marketing, SEO, Google Ads, Meta Ads, social media marketing, web development, and branding for businesses across Tamil Nadu.',
  inLanguage: 'en-IN',
  isPartOf: { '@id': 'https://www.advertoria.in/#website' },
  about: { '@id': 'https://www.advertoria.in/#organization' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '#about p', '#services p', '#faq'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.advertoria.in' },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.advertoria.in/#website',
  name: 'Advertoria',
  url: 'https://www.advertoria.in',
  description: 'Best Digital Marketing Agency in Chennai — Advertoria helps brands achieve measurable results through performance marketing, SEO, web development, and branding.',
  publisher: { '@id': 'https://www.advertoria.in/#organization' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Advertoria Builds a Digital Marketing Revenue System for Chennai Businesses',
  description:
    'Advertoria, Chennai\'s leading digital marketing agency, follows a 5-step connected process to build performance-driven digital marketing systems that generate measurable results for businesses across Tamil Nadu.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Brand & Offer Audit',
      text: 'We start with a deep audit of your brand, offer, and competitive position in the Chennai market to identify the highest-leverage digital marketing strategies.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Creative System Build',
      text: 'Our creative team builds a content marketing and ad creative system — visuals, copy, and scripts — tailored to your target audience.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Media Launch & Testing',
      text: 'We launch performance marketing campaigns across Google Ads, Meta Ads, and OTT platforms (Hotstar, JioCinema) while running rapid A/B tests to find winning angles.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Funnel Optimisation',
      text: 'We continuously optimise the landing pages, lead journey, and offer positioning to improve conversion rates and reduce cost per lead.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Automation & Reporting',
      text: 'We connect CRM automation, WhatsApp follow-up sequences, and real-time analytics dashboards so every rupee spent is tracked to business goals.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Advertoria?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advertoria is a full-service digital marketing agency in Chennai, Tamil Nadu, India. Founded to help startups and businesses achieve measurable results, Advertoria offers performance marketing, Google Ads, Meta Ads, SEO, social media marketing, web development, logo design, graphic design, content marketing, and branding — all under one roof.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you a Chennai-based digital marketing agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Advertoria is a leading digital marketing agency in Chennai, Tamil Nadu. We work with local businesses, startups, and scaling brands across Chennai and the rest of India — handling everything from performance marketing and Google Ads to branding and web development under one roof.',
      },
    },
    {
      '@type': 'Question',
      name: 'What digital marketing services do you offer in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advertoria offers a full suite of digital marketing services in Chennai: performance marketing (Meta Ads, Google Ads, OTT advertising on Hotstar and JioCinema), social media marketing, SEO (search engine optimisation), content marketing, lead generation, web development, logo design, graphic design, branding, UI/UX, and marketing automation. Whether you need a single service or the entire growth system, we plug in where it matters most.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does digital marketing cost in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advertoria offers flexible digital marketing packages in Chennai starting from affordable monthly retainers suitable for small businesses and startups. Our pricing is structured to deliver maximum ROI — every rupee is tied to measurable results. Contact us for a custom quote based on your business goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with small businesses and startups in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. As a digital marketing agency in Chennai, we work with both early-stage startups and established brands. For small businesses, we prioritise affordable, high-impact digital marketing strategies — the right channels, tight creative, and clear reporting — so every rupee is accountable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build websites for businesses in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Advertoria builds high-performance websites and handles complete website development using Next.js and modern web technologies — fast, SEO-ready, and conversion-focused. From landing pages and business websites to e-commerce stores and SaaS platforms, we handle design, development, and launch end to end.',
      },
    },
    {
      '@type': 'Question',
      name: 'What ad platforms do you manage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advertoria manages advertising across Google Ads, Meta Ads (Facebook and Instagram), OTT platforms including Hotstar and JioCinema, WhatsApp marketing journeys, and CRM-linked follow-up systems. We pick the right channel mix based on your target audience and offer — not based on what is easiest for us to run.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is the best digital marketing agency in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advertoria is recognised as one of the top digital marketing agencies in Chennai. We have helped 50+ brands across Tamil Nadu generate over ₹10 crore in revenue through performance-driven digital marketing strategies, achieving an average 45% reduction in cost per lead and 3x improvement in lead quality.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
        <SeoBlock />
        <Footer />
      </main>
    </>
  )
}
