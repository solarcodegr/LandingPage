'use client'

import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Activity, Box, ShoppingBag, Building, Facebook, Twitter, Instagram, Linkedin, Cpu, Globe } from 'lucide-react'
import Image from "next/image"
import emailjs from '@emailjs/browser'
import { enTranslations } from '@/app/translations/en'
import { elTranslations } from '@/app/translations/el'
import { useRouter } from 'next/navigation'

export function LandingPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('')
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const [translation, setTranslation] = useState(
    language === 'en' ? enTranslations : elTranslations
  )

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')
  }, [])

  useEffect(() => {
    setTranslation(language === 'en' ? enTranslations : elTranslations)
    localStorage.setItem('language', language) // Save language to localStorage whenever it changes
  }, [language])

  const router = useRouter()
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const learnMoreRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStarted = () => {
    router.push('/under-construction')
  }

    // Navigation links in the header
    const handleAboutClick = (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToSection(aboutRef)
    }
  
    const handleContactClick = (e: React.MouseEvent) => {
      e.preventDefault()
      scrollToSection(contactRef)
    }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        { name, email, message }
      )
      setSubmitStatus(translation.messageSent)
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      setName('')
      setEmail('')
      setMessage('')
      setSubmitStatus(translation.messageFailed)
    }
  }

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'el' : 'en'
    setLanguage(newLang)
  }

  return (
    <div className="min-h-screen bg-[#06044B] relative overflow-hidden font-geologica">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)
          `,
          backgroundSize: 'calc(100vw / 7) calc(100vw / 7)'
        }}
      />

      {/* Enhanced Central Glow Effect for Hero */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0"
        style={{
          width: '150vw',
          height: '150vh',
          background: `
            radial-gradient(circle at center 30%, 
              rgba(5,244,193,0.5) 0%, 
              rgba(5,244,193,0.3) 5%, 
              rgba(0,134,255,0.2) 10%, 
              rgba(6,4,75,0.8) 30%, 
              rgba(6,4,75,0.95) 50%
            )
          `,
          filter: 'blur(80px)'
        }}
      />

      {/* Scattered Dots for Hero */}
      <div className="absolute inset-0 z-0">
        {[...Array(500)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 2 + 1}s infinite`
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center space-x-2 mt-4">
              <Image
                src="/images/LOGO_solarcode_white_horizontal.png"
                alt={translation.logoAlt}
                width={180}
                height={60}
                className="text-[#05F4C1]"
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <button 
                onClick={handleAboutClick}
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors text-lg font-medium"
              >
                {translation.about}
              </button>
              {/* <Link className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors text-lg font-medium" href="/about">
                {translation.about}
              </Link> */}
              <button
                onClick={handleContactClick}
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors text-lg font-medium"
              >
                {translation.contact}
              </button>
              {/* <Link className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors text-lg font-medium" href="/contact">
                {translation.contact}
              </Link> */}
              <Button 
                className="bg-[#05F4C1] text-[#06044B] hover:bg-[#05F4C1]/90 rounded-md text-lg px-6 py-3"
                onClick={handleGetStarted}
              >
                {translation.getStarted}
              </Button>
              <Button
                onClick={toggleLanguage}
                className="bg-transparent text-[#F1F1F1] hover:text-[#05F4C1] transition-colors"
              >
                <Globe className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-20 pb-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-[#F1F1F1] text-7xl md:text-8xl font-extrabold tracking-tight leading-none">
            <span className="text-[#05F4C1] underline">{translation.cracking}</span> {translation.theCode}
          </h1>
          <p className="text-[#F1F1F1]/80 text-xl md:text-2xl max-w-2xl mx-auto font-light">
            {translation.heroDescription}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-[#F1F1F1] text-[#06044B] hover:bg-[#F1F1F1]/90 text-lg px-8 rounded-md"
              onClick={handleGetStarted}
            >
              {translation.getStarted}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-[#06044B]/40 text-[#F1F1F1] hover:bg-[#06044B]/60 border-none text-lg px-8 rounded-md"
              onClick={() => scrollToSection(learnMoreRef)}
            >
              {translation.learnMore}
            </Button>
          </div>
        </div>
      </main>

      {/* Solutions Section */}
      <section ref={aboutRef} className="relative z-10 bg-[#F1F1F1] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {translation.industryLeading} <span className="text-[#05F4C1]">{translation.aiSolutions}</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              {translation.solutionsDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto border-2 border-[#0086FF] rounded-xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-[#0086FF]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{translation.automotiveAdvancements}</h3>
              <p className="text-gray-600">
                {translation.automotiveDescription}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto border-2 border-[#05F4C1] rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#05F4C1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{translation.securityAndSurveillance}</h3>
              <p className="text-gray-600">
                {translation.securityDescription}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto border-2 border-[#06044B] rounded-xl flex items-center justify-center">
                  <Activity className="w-8 h-8 text-[#06044B]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{translation.healthcareSolutions}</h3>
              <p className="text-gray-600">
                {translation.healthcareDescription}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto border-2 border-[#0086FF] rounded-xl flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-[#0086FF]" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{translation.smartManufacturing}</h3>
              <p className="text-gray-600">
                {translation.manufacturingDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Power of Solarcode Section */}
      <section ref={learnMoreRef} className="relative bg-[#06044B] py-24 overflow-hidden font-geologica">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)
            `,
            backgroundSize: 'calc(100vw / 7) calc(100vw / 7)'
          }}
        />

        {/* Scattered Dots */}
        <div className="absolute inset-0 z-0">
          {[...Array(500)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 2 + 1}s infinite`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {translation.unleashingThe} <span className="text-[#05F4C1]">{translation.power}</span> {translation.ofSolarcode}
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              {translation.solarcodeDescription}
            </p>
          </div>

          <div className="space-y-32">
            {/* Manufacturing Efficiency */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-white">{translation.manufacturingEfficiency}</h3>
                <p className="text-white/70 text-lg">
                  {translation.manufacturingEfficiencyDescription}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-[#05F4C1] hover:text-[#05F4C1]/80 transition-colors"
                >
                  {translation.enhanceProductivity} →
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#05F4C1]/20 to-[#0086FF]/20 rounded-2xl filter blur-xl"></div>
                <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative">
                  <div className="relative h-48 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-[#05F4C1] rounded-xl flex items-center justify-center bg-[#06044B]">
                      <Box className="w-10 h-10 text-[#05F4C1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retail Transformation */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-white">{translation.retailTransformation}</h3>
                <p className="text-white/70 text-lg">
                  {translation.retailTransformationDescription}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-[#05F4C1] hover:text-[#05F4C1]/80 transition-colors"
                >
                  {translation.transformRetail} →
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#05F4C1]/20 to-[#0086FF]/20 rounded-2xl filter blur-xl"></div>
                <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative">
                  <div className="relative h-48 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-[#05F4C1] rounded-xl flex items-center justify-center bg-[#06044B]">
                      <ShoppingBag className="w-10 h-10 text-[#05F4C1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Urban Solutions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-white">{translation.smartUrbanSolutions}</h3>
                <p className="text-white/70 text-lg">
                  {translation.smartUrbanSolutionsDescription}
                </p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-[#05F4C1] hover:text-[#05F4C1]/80 transition-colors"
                >
                  {translation.exploreSolutions} →
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#05F4C1]/20 to-[#0086FF]/20 rounded-2xl filter blur-xl"></div>
                <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative">
                  <div className="relative h-48 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-[#05F4C1] rounded-xl flex items-center justify-center bg-[#06044B]">
                      <Building className="w-10 h-10 text-[#05F4C1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section ref={contactRef} className="relative bg-[#F1F1F1] py-24 overflow-hidden font-geologica">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#06044B] mb-6">
              {translation.getIn} <span className="text-[#05F4C1]">{translation.touch}</span>
            </h2>
            <p className="text-[#06044B]/80 text-lg max-w-3xl mx-auto">
              {translation.contactDescription}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#06044B]">{translation.name}</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#06044B]/20 rounded-md shadow-sm focus:outline-none focus:ring-[#05F4C1] focus:border-[#05F4C1]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#06044B]">{translation.email}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#06044B]/20 rounded-md shadow-sm focus:outline-none focus:ring-[#05F4C1] focus:border-[#05F4C1]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#06044B]">{translation.message}</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-[#06044B]/20 rounded-md shadow-sm focus:outline-none focus:ring-[#05F4C1] focus:border-[#05F4C1]"
                ></textarea>
              </div>
              <div>
                <Button 
                  type="submit"
                  className="w-full bg-[#05F4C1] text-[#06044B] hover:bg-[#05F4C1]/90 rounded-md py-2 px-4"
                >
                  {translation.sendMessage}
                </Button>
              </div>
            </form>
            {submitStatus && (
              <p className="mt-4 text-center text-[#06044B]">{submitStatus}</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-[#06044B] py-16 overflow-hidden font-geologica">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)
            `,
            backgroundSize: 'calc(100vw / 7) calc(100vw / 7)'
          }}
        />

      <div className="absolute inset-0 z-0">
        {[...Array(300)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 2 + 1}s infinite`
            }}
          />
        ))}
      </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8">
            <Image
              src="/images/LOGO_solarcode_white_vertical.png"
              alt={translation.logoAlt}
              width={150}
              height={50}
              className="text-[#05F4C1]"
            />
            
            <p className="text-[#F1F1F1]/80 text-sm">
              {'© ' + new Date().getFullYear() + ' ' + translation.copyright }
            </p>
            
            <div className="flex items-center justify-center space-x-6">
              <Link 
                href="#" 
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors"
                aria-label={translation.facebookAria}
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors"
                aria-label={translation.twitterAria}
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors"
                aria-label={translation.instagramAria}
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link 
                href="#" 
                className="text-[#F1F1F1] hover:text-[#05F4C1] transition-colors"
                aria-label={translation.linkedinAria}
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Glow Effect for Footer */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0"
          style={{
            width: '800px',
            height: '800px',
            background: `
              radial-gradient(circle, 
                rgba(5,244,193,0.2) 0%, 
                rgba(6,4,75,0.95) 50%
              )
            `,
            filter: 'blur(100px)'
          }}
        />
      </footer>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}