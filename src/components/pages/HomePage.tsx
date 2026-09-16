import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { FOUNDER_PROFILE, CO_FOUNDER_PROFILE } from '../../data/mockData';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Globe,
  Radio,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Quote,
  Camera
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    caseStudies = [],
    pressReleases = [],
    mediaCoverage = [],
    services = [],
    testimonials = [],
    blogPosts = [],
    setIsConsultationModalOpen,
    theme,
  } = usePR();

  const isDark = theme === 'midnight';
  const featuredCases = (caseStudies || []).slice(0, 3);
  const latestReleases = (pressReleases || []).slice(0, 4);
  const featuredInsights = (blogPosts || []).slice(0, 3);

  return (
    <div
      id="home-page-container"
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark
          ? 'bg-[#0B101D] text-[#E2E8F0] selection:bg-emerald-600 selection:text-white'
          : 'bg-[#FAF8F5] text-[#1C1917] selection:bg-[#1C473A] selection:text-white'
      }`}
    >
      {/* 1. Hero Section - Signature Luxury Editorial Layout */}
      <section
        id="hero-section"
        className={`border-b transition-colors duration-300 ${
          isDark ? 'border-[#1E293B] bg-[#0B101D]' : 'border-[#E2D9C8] bg-[#FAF8F5]'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Hero Left: Headline, Subtitle, & Primary CTAs */}
          <div
            className={`lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r transition-colors duration-300 ${
              isDark ? 'border-[#1E293B] bg-[#0B101D]' : 'border-[#E2D9C8] bg-[#FAF8F5]'
            }`}
          >
            {/* Subtle Eyebrow */}
            <div className="mb-5 flex items-center gap-2">
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <span
                className={`text-xs font-semibold tracking-widest uppercase ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                Strategic Communications & PR
              </span>
            </div>

            {/* Display Headline in Cormorant / DM Serif Display */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-normal leading-[1.08] mb-6 tracking-tight font-serif ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}
            >
              Transforming brands through{' '}
              <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                strategic PR
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg max-w-lg mb-8 leading-relaxed font-light ${
                isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
              }`}
            >
              Elevate your narrative with data-driven PR strategies designed for high-growth enterprises and market leaders.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                id="hero-get-in-touch-btn"
                onClick={() => setIsConsultationModalOpen(true)}
                className={`px-7 py-3.5 rounded-md font-medium text-sm tracking-normal transition-all duration-200 flex items-center gap-2 group active:scale-[0.98] shadow-xs ${
                  isDark
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/30'
                    : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40 shadow-[#1C473A]/15'
                }`}
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 text-[#B8934C] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                id="hero-our-services-btn"
                onClick={() => navigateTo('services')}
                className={`px-6 py-3.5 rounded-md font-medium text-sm tracking-normal transition-colors border ${
                  isDark
                    ? 'bg-transparent border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800/40'
                    : 'bg-transparent border-[#C8BFAD] hover:border-[#1C473A] text-[#1C1917] hover:bg-[#F2ECE0]/60'
                }`}
              >
                Our Services
              </button>
            </div>

            {/* Trusted Industry Leaders Ticker */}
            <div className={`mt-12 pt-6 border-t ${isDark ? 'border-[#1E293B]' : 'border-[#E2D9C8]'}`}>
              <p
                className={`text-[10px] uppercase tracking-[0.22em] mb-4 font-semibold ${
                  isDark ? 'text-[#64748B]' : 'text-[#7A5E2E]'
                }`}
              >
                Trusted by category-defining pioneers
              </p>
              <div
                className={`flex flex-wrap items-center gap-6 sm:gap-10 transition-opacity font-serif tracking-wider ${
                  isDark ? 'text-white/80' : 'text-[#2B2723]/80'
                }`}
              >
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase">SAVANT</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase">ALTUS</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase">NEXUS</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase">ORBITAL</span>
                <span className="text-base sm:text-lg font-bold tracking-tight uppercase">KINETIX</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Deep Sovereign Folio with PR Intelligence & 4-Cell Stats Card */}
          <div
            className={`lg:col-span-5 flex flex-col text-white justify-between ${
              isDark ? 'bg-[#0E1524]' : 'bg-[#13221E] border-l border-[#E2D9C8]'
            }`}
          >
            {/* PR Insights Column */}
            <div className={`p-6 sm:p-8 lg:p-10 border-b ${isDark ? 'border-[#1E293B]' : 'border-[#1E332C]'}`}>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      isDark ? 'text-emerald-400' : 'text-[#D4AF37]'
                    }`}
                  >
                    Executive Desk
                  </span>
                  <h2 className="text-2xl font-serif text-white mt-1">Strategic Insights</h2>
                </div>
                <button
                  onClick={() => navigateTo('insights')}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#E0C078] hover:text-white'
                  }`}
                >
                  View All →
                </button>
              </div>

              <div className="space-y-5">
                {featuredInsights.length > 0 ? (
                  featuredInsights.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => navigateTo('insights')}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-[#94A3B8] mb-1">
                        <span className={isDark ? 'text-emerald-400 font-medium' : 'text-[#D4AF37] font-medium'}>
                          {item.category}
                        </span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug text-white/90 group-hover:text-[#E0C078] transition-colors">
                        {item.title}
                      </h3>
                    </article>
                  ))
                ) : (
                  <article onClick={() => navigateTo('insights')} className="group cursor-pointer">
                    <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-[#94A3B8] mb-1">
                      <span className={isDark ? 'text-emerald-400 font-medium' : 'text-[#D4AF37] font-medium'}>
                        Tech & Innovation
                      </span>
                      <span>•</span>
                      <span>May 12, 2026</span>
                    </div>
                    <h3 className="text-sm font-medium leading-snug text-white/90 group-hover:text-[#E0C078] transition-colors">
                      The evolution of media outreach in the age of generative AI
                    </h3>
                  </article>
                )}
              </div>
            </div>

            {/* 4-Cell Stats Grid */}
            <div
              className={`p-6 sm:p-8 grid grid-cols-2 gap-3 ${
                isDark ? 'bg-[#0E1524]' : 'bg-[#101C19]'
              }`}
            >
              <div
                className={`p-4 sm:p-5 rounded-md border flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#151F33] border-emerald-500/20'
                    : 'bg-[#162723] border-[#B8934C]/30 shadow-xs'
                }`}
              >
                <span className={`text-2xl sm:text-3xl font-serif ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                  500+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 leading-tight mt-1 font-medium">
                  Media Placements
                </span>
              </div>
              <div
                className={`p-4 sm:p-5 rounded-md border flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#151F33] border-emerald-500/20'
                    : 'bg-[#162723] border-[#B8934C]/30 shadow-xs'
                }`}
              >
                <span className={`text-2xl sm:text-3xl font-serif ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                  12M+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 leading-tight mt-1 font-medium">
                  Audience Reach
                </span>
              </div>
              <div
                className={`p-4 sm:p-5 rounded-md border flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#151F33] border-emerald-500/20'
                    : 'bg-[#162723] border-[#B8934C]/30 shadow-xs'
                }`}
              >
                <span className={`text-2xl sm:text-3xl font-serif ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                  98%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 leading-tight mt-1 font-medium">
                  Retention Rate
                </span>
              </div>
              <div
                className={`p-4 sm:p-5 rounded-md border flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#151F33] border-emerald-500/20'
                    : 'bg-[#162723] border-[#B8934C]/30 shadow-xs'
                }`}
              >
                <span className={`text-2xl sm:text-3xl font-serif ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                  150+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 leading-tight mt-1 font-medium">
                  Global Campaigns
                </span>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div
              onClick={() => setIsConsultationModalOpen(true)}
              className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer group transition-colors ${
                isDark
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-[#1C473A] hover:bg-[#14352B] border-t border-[#B8934C]/30'
              }`}
            >
              <span className="font-medium text-xs text-white">
                Request an Executive Agency Briefing Dossier
              </span>
              <span className="transform group-hover:translate-x-1.5 transition-transform text-[#E0C078] font-bold">
                →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Media Outlets Credibility Ticker */}
      <section
        id="media-ticker"
        className={`py-10 border-b overflow-hidden transition-colors duration-300 ${
          isDark ? 'border-[#1E293B] bg-[#0E1524]' : 'border-[#E2D9C8] bg-[#F4EFE6]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center text-[10px] uppercase tracking-[0.24em] mb-6 font-semibold ${
              isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
            }`}
          >
            Direct Editorial Relationships & Tier-1 Wire Syndication
          </div>
          <div
            className={`flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 hover:opacity-100 transition-all duration-300 ${
              isDark ? 'text-white' : 'text-[#2B2723]'
            }`}
          >
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight">
              THE WALL STREET JOURNAL.
            </span>
            <span className="font-sans font-bold text-lg sm:text-xl tracking-tighter">
              Bloomberg
            </span>
            <span className="font-serif italic font-bold text-lg sm:text-xl">
              FINANCIAL TIMES
            </span>
            <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight">
              TechCrunch
            </span>
            <span className="font-serif font-bold text-lg sm:text-xl">
              Forbes
            </span>
            <span className="font-mono font-bold text-base sm:text-lg">
              WIRED
            </span>
            <span className="font-sans font-bold text-base sm:text-lg">
              CNBC
            </span>
          </div>
        </div>
      </section>

      {/* 3. Core PR Capabilities (Services) */}
      <section
        id="capabilities-section"
        className={`py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b ${
          isDark ? 'border-[#1E293B]' : 'border-[#E2D9C8]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className={`flex items-center gap-2 font-semibold tracking-wider text-xs uppercase ${
              isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
            }`}>
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <span>Full-Spectrum Practice Areas</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight font-serif ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              Engineered for High-Stakes Public Impact.
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}>
              We deploy disciplined narrative construction, investigative media pitching, and data-backed communications to protect and elevate enterprise reputation.
            </p>
          </div>
          <button
            onClick={() => navigateTo('services')}
            className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors self-start md:self-auto px-4 py-2.5 rounded-md border ${
              isDark
                ? 'text-emerald-400 hover:text-emerald-300 bg-slate-800/40 border-slate-700'
                : 'text-[#1C473A] hover:text-[#7A5E2E] bg-white hover:bg-[#F2ECE0]/60 border-[#DDD4C0] shadow-2xs'
            }`}
          >
            <span>View All Practices</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`rounded-md p-7 transition-all duration-300 group flex flex-col justify-between border shadow-2xs ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                  : 'bg-white border-[#E2D9C8] hover:border-[#9B783E] hover:shadow-md'
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-md border flex items-center justify-center mb-5 transition-all ${
                    isDark
                      ? 'bg-[#0E1524] border-slate-700 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white'
                      : 'bg-[#FAF8F5] border-[#E2D9C8] text-[#1C473A] group-hover:bg-[#1C473A] group-hover:text-[#E0C078] group-hover:border-[#9B783E]'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3
                  className={`text-xl font-serif font-normal transition-colors mb-2.5 ${
                    isDark
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-[#1C1917] group-hover:text-[#1C473A]'
                  }`}
                >
                  {svc.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-6 font-light ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                }`}>
                  {svc.description}
                </p>

                <div className={`space-y-2 border-t pt-4 ${isDark ? 'border-slate-800' : 'border-[#E2D9C8]'}`}>
                  <div
                    className={`text-[10px] uppercase tracking-wider font-semibold mb-2 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Key Deliverables:
                  </div>
                  {(svc.deliverables || []).slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs ${
                        isDark ? 'text-slate-300' : 'text-[#2B2723]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-6 mt-6 border-t flex items-center justify-between ${
                isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-medium ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#8C8273]'
                }`}>
                  {svc.caseCount} Case Studies
                </span>
                <button
                  onClick={() => navigateTo('services')}
                  className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                    isDark
                      ? 'text-emerald-400 group-hover:text-white'
                      : 'text-[#7A5E2E] group-hover:text-[#1C473A]'
                  }`}
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Case Studies */}
      <section
        id="case-studies-section"
        className={`py-16 md:py-24 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0E1524]/60 border-[#1E293B]' : 'bg-[#F4EFE6] border-[#E2D9C8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <div className={`flex items-center gap-2 font-semibold tracking-wider text-xs uppercase ${
                isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
              }`}>
                <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
                <span>Proven Editorial Record</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-normal tracking-tight font-serif ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}>
                Stories of Outsized Impact.
              </h2>
              <p className={`text-sm font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                High-stakes campaigns executed for category leaders in synthetic biology, quantum computing, aerospace, and institutional finance.
              </p>
            </div>

            <button
              onClick={() => navigateTo('work')}
              className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors self-start md:self-auto px-4 py-2 rounded-md border shadow-2xs ${
                isDark
                  ? 'text-emerald-400 hover:text-emerald-300 bg-[#151F33] border-slate-700'
                  : 'text-[#1C473A] hover:text-[#7A5E2E] bg-white border-[#DDD4C0]'
              }`}
            >
              <span>See Full Portfolio</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredCases.map((cs) => (
              <div
                key={cs.id}
                onClick={() => navigateTo('case-study', cs.slug || cs.id)}
                className={`rounded-md overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between border shadow-2xs hover:shadow-md ${
                  isDark
                    ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                    : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
                }`}
              >
                <div className="relative h-48 overflow-hidden bg-[#0F172A]">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider text-[#FAF8F5] border border-white/10">
                    {cs.industry}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{cs.clientName}</span>
                    <span className="text-xs font-medium text-[#E0C078] bg-[#0F172A]/90 px-2 py-0.5 rounded-sm border border-[#B8934C]/40">
                      {cs.headlineMetric}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      className={`text-base font-serif font-normal transition-colors leading-snug ${
                        isDark
                          ? 'text-white group-hover:text-emerald-400'
                          : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}
                    >
                      {cs.title}
                    </h3>
                    <p className={`text-xs mt-2 line-clamp-2 leading-relaxed font-light ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                    }`}>
                      {cs.summary}
                    </p>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
                  }`}>
                    <div className="flex gap-1.5">
                      {(cs.tier1Outlets || []).slice(0, 2).map((outlet, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded-sm text-[10px] border ${
                            isDark
                              ? 'bg-slate-800 text-slate-200 border-slate-700'
                              : 'bg-[#FAF8F5] text-[#2B2723] border-[#DDD4C0]'
                          }`}
                        >
                          {outlet}
                        </span>
                      ))}
                    </div>
                    <span
                      className={`font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs uppercase tracking-wider ${
                        isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                      }`}
                    >
                      <span>Read Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live Newsroom Wire Feed */}
      <section
        id="newsroom-wire-section"
        className={`py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b ${
          isDark ? 'border-[#1E293B]' : 'border-[#E2D9C8]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 font-semibold tracking-wider text-xs uppercase ${
              isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
            }`}>
              <Radio className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`} />
              <span>Agency Wire & Press Desk</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-normal tracking-tight font-serif ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              Official Press Releases & Announcements
            </h2>
          </div>
          <button
            onClick={() => navigateTo('newsroom')}
            className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors self-start md:self-auto px-4 py-2 rounded-md border ${
              isDark
                ? 'text-emerald-400 hover:text-emerald-300 bg-slate-800/40 border-slate-700'
                : 'text-[#1C473A] hover:text-[#7A5E2E] bg-white border-[#DDD4C0] shadow-2xs'
            }`}
          >
            <span>Visit Full Newsroom</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestReleases.map((pr) => (
            <div
              key={pr.id}
              onClick={() => navigateTo('press-release', pr.slug || pr.id)}
              className={`p-6 rounded-md cursor-pointer transition-all duration-300 group border shadow-2xs hover:shadow-md ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                  : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8C8273] mb-2">
                <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}`}>
                  {pr.company}
                </span>
                <span>{pr.date}</span>
              </div>
              <h3
                className={`text-base font-serif font-normal transition-colors leading-snug mb-2 ${
                  isDark
                    ? 'text-white group-hover:text-emerald-400'
                    : 'text-[#1C1917] group-hover:text-[#1C473A]'
                }`}
              >
                {pr.title}
              </h3>
              <p className={`text-xs line-clamp-2 leading-relaxed font-light ${
                isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
              }`}>
                {pr.summary}
              </p>
              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
              }`}>
                <span
                  className={`px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider border ${
                    isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-[#FAF8F5] text-[#2B2723] border-[#DDD4C0]'
                  }`}
                >
                  {pr.category}
                </span>
                <span
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isDark
                      ? 'text-[#94A3B8] group-hover:text-emerald-400'
                      : 'text-[#5C564E] group-hover:text-[#1C473A]'
                  }`}
                >
                  <span>View Wire Release</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Leadership & Philosophy Spotlight */}
      <section
        id="founder-quote-section"
        className={`py-16 border-y relative overflow-hidden transition-colors duration-300 ${
          isDark
            ? 'bg-[#0E1524] text-white border-[#1E293B]'
            : 'bg-[#F4EFE6] text-[#1C1917] border-[#E2D9C8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className={`flex items-center justify-center gap-2 font-semibold tracking-wider text-xs uppercase ${
              isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
            }`}>
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <span>Executive Leadership</span>
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              Strategic Stewards of <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>National Reputation</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CEO Spotlight Card */}
            <div
              className={`rounded-xl p-6 sm:p-8 relative shadow-xl border flex flex-col justify-between ${
                isDark
                  ? 'bg-[#151F33] border-emerald-500/30'
                  : 'bg-gradient-to-br from-[#1C2C27] to-[#121E1A] text-white border-[#B8934C]/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative shrink-0">
                  <div
                    className={`w-28 h-36 rounded-xl overflow-hidden border-2 shadow-lg relative ${
                      isDark ? 'border-emerald-400 bg-[#0B0F19]' : 'border-[#B8934C] bg-[#0E1513]'
                    }`}
                  >
                    <img
                      src={typeof window !== 'undefined' ? (localStorage.getItem('gsrelation_founder_photo') || FOUNDER_PROFILE.photo) : FOUNDER_PROFILE.photo}
                      alt={FOUNDER_PROFILE.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[9px] font-semibold tracking-wider uppercase whitespace-nowrap shadow-md ${
                      isDark ? 'bg-emerald-600' : 'bg-[#9B783E]'
                    }`}
                  >
                    CEO & Director
                  </div>
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div
                    className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase ${
                      isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                    }`}
                  >
                    <span>Founder's Philosophy</span>
                  </div>
                  <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
                    "{FOUNDER_PROFILE.philosophy}"
                  </blockquote>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-base font-serif text-white font-medium">{FOUNDER_PROFILE.name}</div>
                  <div className="text-xs text-[#FAF8F5]/80">
                    CEO & Director — GSRelation
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('about')}
                  className={`text-xs flex items-center gap-1 font-semibold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#E0C078] hover:text-white'
                  }`}
                >
                  <span>Executive Bio</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Deputy CEO Spotlight Card */}
            <div
              className={`rounded-xl p-6 sm:p-8 relative shadow-xl border flex flex-col justify-between ${
                isDark
                  ? 'bg-[#151F33] border-emerald-500/30'
                  : 'bg-gradient-to-br from-[#1C2C27] to-[#121E1A] text-white border-[#B8934C]/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative shrink-0">
                  <div
                    className={`w-28 h-36 rounded-xl overflow-hidden border-2 shadow-lg relative ${
                      isDark ? 'border-emerald-400 bg-[#0B0F19]' : 'border-[#B8934C] bg-[#0E1513]'
                    }`}
                  >
                    <img
                      src={typeof window !== 'undefined' ? (localStorage.getItem('gsrelation_aditi_photo') || CO_FOUNDER_PROFILE.photo) : CO_FOUNDER_PROFILE.photo}
                      alt={CO_FOUNDER_PROFILE.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-white text-[9px] font-semibold tracking-wider uppercase whitespace-nowrap shadow-md ${
                      isDark ? 'bg-emerald-600' : 'bg-[#9B783E]'
                    }`}
                  >
                    Deputy CEO & Co-Founder
                  </div>
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div
                    className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase ${
                      isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                    }`}
                  >
                    <span>Strategic Leadership & Vision</span>
                  </div>
                  <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
                    "{CO_FOUNDER_PROFILE.philosophy}"
                  </blockquote>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-base font-serif text-white font-medium">{CO_FOUNDER_PROFILE.name}</div>
                  <div className="text-xs text-[#FAF8F5]/80">
                    Deputy CEO, Vice Managing Director & Co-Founder
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('about')}
                  className={`text-xs flex items-center gap-1 font-semibold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#E0C078] hover:text-white'
                  }`}
                >
                  <span>Executive Bio</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials & Client Endorsements */}
      <section
        id="testimonials-section"
        className={`py-16 md:py-24 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0B101D] border-[#1E293B]' : 'bg-[#FAF8F5] border-[#E2D9C8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className={`flex items-center justify-center gap-2 font-semibold tracking-wider text-xs uppercase ${
              isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
            }`}>
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <span>Client Endorsements</span>
              <span className={`w-6 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-normal tracking-tight font-serif ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}>
              Trusted by Pioneers at the Frontier of Commerce.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={`rounded-md p-7 relative flex flex-col justify-between border shadow-2xs transition-all duration-300 ${
                  isDark
                    ? 'bg-[#151F33] border-[#1E293B]'
                    : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
                }`}
              >
                <div>
                  <Quote
                    className={`w-8 h-8 mb-3 ${isDark ? 'text-emerald-500/30' : 'text-[#9B783E]/40'}`}
                  />
                  <p
                    className={`text-sm leading-relaxed italic mb-6 font-serif ${
                      isDark ? 'text-slate-200' : 'text-[#2C2723]'
                    }`}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div className={`flex items-center gap-3 pt-4 border-t ${
                  isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
                }`}>
                  <img
                    src={t.authorAvatar}
                    alt={t.authorName}
                    referrerPolicy="no-referrer"
                    className={`w-10 h-10 rounded-full object-cover border ${
                      isDark ? 'border-slate-700' : 'border-[#DDD4C0]'
                    }`}
                  />
                  <div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                      {t.authorName}
                    </div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                      {t.authorTitle},{' '}
                      <span className={`font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                        {t.clientName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom Strategic Advisory CTA (Signature Luxury Folio Banner) */}
      <section
        id="cta-banner-section"
        className={`py-20 relative overflow-hidden text-white transition-colors duration-300 ${
          isDark
            ? 'bg-[#0E1524]'
            : 'bg-gradient-to-b from-[#13221E] to-[#0D1815] border-t border-[#B8934C]/30'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div
            className={`w-12 h-12 rounded-md border flex items-center justify-center mx-auto ${
              isDark
                ? 'bg-[#151F33] border-emerald-500/40 text-emerald-400'
                : 'bg-[#1C2C27] border-[#B8934C]/50 text-[#E0C078]'
            }`}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight font-serif">
            Ready to Take Command of Your <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
              Industry Narrative
            </span>
            ?
          </h2>
          <p className="text-[#FAF8F5]/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Schedule a confidential briefing with our senior partners in Amravati, Akola, Pune, or Nashik. We assess positioning, media readiness, and competitive narrative architecture.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-medium text-sm tracking-normal shadow-sm transition-all flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/30'
                  : 'bg-[#9B783E] hover:bg-[#856530] text-white border border-[#E0C078]/40 shadow-[#9B783E]/20'
              }`}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-md text-white font-medium text-sm tracking-normal transition-all border ${
                isDark
                  ? 'bg-[#151F33] hover:bg-[#1E293B] border-white/10'
                  : 'bg-transparent hover:bg-white/10 border-white/20'
              }`}
            >
              <span>Contact Press Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
