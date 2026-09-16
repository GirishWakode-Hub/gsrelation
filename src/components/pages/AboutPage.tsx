import React, { useState, useRef } from 'react';
import { usePR } from '../../context/PRContext';
import { LEADERSHIP_TEAM, FOUNDER_PROFILE, CO_FOUNDER_PROFILE } from '../../data/mockData';
import { Logo } from '../common/Logo';
import {
  Award,
  Globe,
  Shield,
  CheckCircle2,
  Users,
  Building,
  ArrowRight,
  Sparkles,
  Quote,
  Target,
  Compass,
  TrendingUp,
  Linkedin,
  Camera,
  Upload,
  X,
  Check,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setIsConsultationModalOpen, showToast, theme } = usePR();
  const isDark = theme === 'midnight';
  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gsrelation_founder_photo') || FOUNDER_PROFILE.photo;
    }
    return FOUNDER_PROFILE.photo;
  });
  const [aditiPhoto, setAditiPhoto] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gsrelation_aditi_photo') || CO_FOUNDER_PROFILE.photo;
    }
    return CO_FOUNDER_PROFILE.photo;
  });
  const [photoModalTarget, setPhotoModalTarget] = useState<'founder' | 'aditi'>('founder');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string>(founderPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const curatedExecutiveOptions = photoModalTarget === 'founder' ? [
    {
      label: 'Mr. Girish Wakode — Executive Portrait (Official)',
      url: '/1000296351.png',
    },
    {
      label: 'Mr. Girish Wakode — Studio Portrait',
      url: '/girish-wakode.jpg',
    },
  ] : [
    {
      label: 'Aditi Wankhade — Executive Portrait (Official)',
      url: '/images/rahi.png',
    },
  ];

  const uploadToServer = async (base64OrUrl: string, target: 'founder' | 'aditi') => {
    setIsUploading(true);
    try {
      const endpoint = target === 'founder' ? '/api/upload-founder-photo' : '/api/upload-aditi-photo';
      const storageKey = target === 'founder' ? 'gsrelation_founder_photo' : 'gsrelation_aditi_photo';
      const defaultUrl = target === 'founder' ? `/girish-wakode.jpg?v=${Date.now()}` : `/images/rahi.png?v=${Date.now()}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64OrUrl }),
      });
      const data = await res.json();
      if (data.success) {
        const freshUrl = data.url || defaultUrl;
        if (target === 'founder') {
          setFounderPhoto(freshUrl);
        } else {
          setAditiPhoto(freshUrl);
        }
        setPreviewPhoto(freshUrl);
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, freshUrl);
        }
        showToast('Photo Updated & Saved Permanently', 'Executive headshot is now live across the website.', 'success');
      } else {
        showToast('Photo Updated', 'Saved locally to your browser session.', 'info');
      }
    } catch {
      showToast('Photo Updated', 'Applied to your browser view.', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (newUrl: string) => {
    if (photoModalTarget === 'founder') {
      setFounderPhoto(newUrl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('gsrelation_founder_photo', newUrl);
      }
    } else {
      setAditiPhoto(newUrl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('gsrelation_aditi_photo', newUrl);
      }
    }

    if (newUrl.startsWith('data:image')) {
      uploadToServer(newUrl, photoModalTarget);
    } else {
      showToast('Photo Applied', 'Executive portrait set successfully.', 'success');
    }
    setIsPhotoModalOpen(false);
  };

  const handleResetDefault = () => {
    if (photoModalTarget === 'founder') {
      setFounderPhoto(FOUNDER_PROFILE.photo);
      setPreviewPhoto(FOUNDER_PROFILE.photo);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gsrelation_founder_photo');
      }
    } else {
      setAditiPhoto(CO_FOUNDER_PROFILE.photo);
      setPreviewPhoto(CO_FOUNDER_PROFILE.photo);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gsrelation_aditi_photo');
      }
    }
    showToast('Reset to Default', 'Executive portrait reset to default image.', 'info');
    setIsPhotoModalOpen(false);
  };

  const openPhotoModal = (target: 'founder' | 'aditi') => {
    setPhotoModalTarget(target);
    setPreviewPhoto(target === 'founder' ? founderPhoto : aditiPhoto);
    setCustomUrl('');
    setIsPhotoModalOpen(true);
  };

  return (
    <div
      id="about-page"
      className={`min-h-screen py-16 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-6">
          <Logo size="lg" theme={isDark ? 'dark' : 'light'} />
          <div className="flex items-center gap-2">
            <span className={`w-8 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
              }`}
            >
              Agency Heritage & Leadership
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-6xl font-normal tracking-tight font-serif leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            We Treat PR as Strategic Leverage, <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
              Not Volume Marketing
            </span>
            .
          </h1>
          <p
            className={`text-lg leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            Headquartered in Amravati with strategic bureaus in Akola, Pune, and Nashik, GSRelation is a modern public relations and strategic communications company built on the conviction that every individual, organisation, and brand has a story worth shaping and a reputation worth building.
          </p>
        </div>

        {/* Founder & Director Spotlight — Mr. Girish Wakode */}
        <section
          id="founder-spotlight"
          className={`rounded-xl overflow-hidden shadow-md border transition-colors ${
            isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E5DECE]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Founder Portrait & Identity Card */}
            <div
              className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r ${
                isDark
                  ? 'bg-[#0F172A] border-[#1E293B] text-white'
                  : 'bg-[#1C1917] border-[#2C2825] text-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-xs ${
                      isDark
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#9B783E] text-white'
                    }`}
                  >
                    <span>CEO & Director</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPhotoModal('founder')}
                    className={`text-xs inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-white/15 hover:bg-white/25 text-white'
                    }`}
                    title="Change or upload Mr. Girish Wakode's photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Headshot</span>
                  </button>
                </div>

                {/* Completely unobstructed, high-resolution portrait in proper size */}
                <div
                  className={`relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 shadow-2xl ${
                    isDark
                      ? 'border-emerald-500/40 bg-[#0B0F19]'
                      : 'border-[#9B783E]/60 bg-[#0B0F19]'
                  }`}
                >
                  <img
                    src={founderPhoto}
                    alt={FOUNDER_PROFILE.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-lg pointer-events-none" />
                </div>
              </div>

              {/* Founder Credentials neatly below portrait */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">{FOUNDER_PROFILE.name}</h2>
                <div
                  className={`text-xs uppercase tracking-widest font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {FOUNDER_PROFILE.position}
                </div>
                <div className="text-xs text-white/70 font-light leading-relaxed">
                  Head of Strategic Communications & Brand Reputation Architecture
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href={FOUNDER_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
                  >
                    <Linkedin className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                    <span>Executive Profile</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Biography & Philosophy */}
            <div
              className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 ${
                isDark ? 'bg-[#151F33]' : 'bg-white'
              }`}
            >
              <div className="space-y-5">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Founder's Vision & Conviction</span>
                </div>

                {/* Key Philosophy Quote */}
                <div
                  className={`border-l-4 p-5 rounded-r-md ${
                    isDark
                      ? 'bg-[#0B101D] border-emerald-400 text-white'
                      : 'bg-[#F8F3EA] border-[#9B783E] text-[#1C1917]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Quote
                      className={`w-6 h-6 shrink-0 mt-0.5 ${
                        isDark ? 'text-emerald-400' : 'text-[#9B783E]'
                      }`}
                    />
                    <p className="text-base sm:text-lg font-serif italic leading-relaxed">
                      "{FOUNDER_PROFILE.philosophy}"
                    </p>
                  </div>
                  <div
                    className={`mt-2 text-right text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                    }`}
                  >
                    — Mr. Girish Wakode, CEO & Director
                  </div>
                </div>

                {/* Full Biography */}
                <div
                  className={`space-y-3.5 text-sm leading-relaxed font-light ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                  }`}
                >
                  <p>
                    <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>{FOUNDER_PROFILE.name}</strong> is a communications strategist and the <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>CEO & Director</strong> of <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>GSRelation</strong>, a modern public relations and strategic communications company built on the belief that every individual, organisation, and brand has a story worth shaping and a reputation worth building.
                  </p>
                  <p>
                    With a strong understanding of communication, branding, media, and public perception, Girish brings together strategic thinking, creativity, relationship building, and a forward-looking approach to create communication that goes beyond visibility—it creates influence.
                  </p>
                  <p>
                    His work spans strategic public relations, media engagement, brand positioning, reputation management, content strategy, public image development, and communication campaigns, with a constant focus on clarity, credibility, and meaningful impact. As the driving force behind GSRelation, he combines entrepreneurial vision with a deep understanding of how people, brands, and audiences connect in a rapidly evolving digital world.
                  </p>
                  <p>
                    Through GSRelation, Girish is committed to creating intelligent, distinctive, and result-oriented communication strategies that help clients not only be seen, but genuinely remembered.
                  </p>
                </div>

                {/* Areas of Practice & Mastery */}
                <div
                  className={`pt-4 border-t space-y-2.5 ${
                    isDark ? 'border-white/10' : 'border-[#E5DECE]'
                  }`}
                >
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-[#1C1917]'
                    }`}
                  >
                    Key Practice Areas & Strategic Focus:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FOUNDER_PROFILE.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
                          isDark
                            ? 'bg-[#0B101D] border-slate-700 text-slate-200'
                            : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Founder CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className={`px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs ${
                    isDark
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                  }`}
                >
                  <span>Consult with Executive Office</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#8C8273]'}`}>
                  Confidential advisory directly reviewed by Mr. Girish Wakode
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Deputy CEO & Co-Founder Spotlight — Aditi Wankhade */}
        <section
          id="co-founder-spotlight"
          className={`rounded-xl overflow-hidden shadow-md border transition-colors ${
            isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E5DECE]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Co-Founder Portrait & Identity Card */}
            <div
              className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r ${
                isDark
                  ? 'bg-[#0F172A] border-[#1E293B] text-white'
                  : 'bg-[#1C1917] border-[#2C2825] text-white'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-xs ${
                      isDark
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#9B783E] text-white'
                    }`}
                  >
                    <span>Deputy CEO & Co-Founder</span>
                  </div>
                </div>

                {/* Completely unobstructed, high-resolution portrait in proper size */}
                <div
                  className={`relative w-full max-w-xs sm:max-w-sm mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 shadow-2xl ${
                    isDark
                      ? 'border-emerald-500/40 bg-[#0B0F19]'
                      : 'border-[#9B783E]/60 bg-[#0B0F19]'
                  }`}
                >
                  <img
                    src={aditiPhoto}
                    alt={CO_FOUNDER_PROFILE.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-lg pointer-events-none" />
                </div>
              </div>

              {/* Co-Founder Credentials neatly below portrait */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">{CO_FOUNDER_PROFILE.name}</h2>
                <div
                  className={`text-xs uppercase tracking-widest font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {CO_FOUNDER_PROFILE.position}
                </div>
                <div className="text-xs text-white/70 font-light leading-relaxed">
                  Head of Strategic Direction, Marketing Initiatives & Business Development
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href={CO_FOUNDER_PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
                  >
                    <Linkedin className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                    <span>Executive Profile</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Comprehensive Biography & Philosophy */}
            <div
              className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 ${
                isDark ? 'bg-[#151F33]' : 'bg-white'
              }`}
            >
              <div className="space-y-5">
                <div
                  className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Strategic Leadership & Market Growth</span>
                </div>

                {/* Key Philosophy Quote */}
                <div
                  className={`border-l-4 p-5 rounded-r-md ${
                    isDark
                      ? 'bg-[#0B101D] border-emerald-400 text-white'
                      : 'bg-[#F8F3EA] border-[#9B783E] text-[#1C1917]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Quote
                      className={`w-6 h-6 shrink-0 mt-0.5 ${
                        isDark ? 'text-emerald-400' : 'text-[#9B783E]'
                      }`}
                    />
                    <p className="text-base sm:text-lg font-serif italic leading-relaxed">
                      "{CO_FOUNDER_PROFILE.philosophy}"
                    </p>
                  </div>
                  <div
                    className={`mt-2 text-right text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                    }`}
                  >
                    — Aditi Wankhade, Deputy CEO & Co-Founder
                  </div>
                </div>

                {/* Full Biography */}
                <div
                  className={`space-y-3.5 text-sm leading-relaxed font-light ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                  }`}
                >
                  <p>
                    <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>{CO_FOUNDER_PROFILE.name}</strong> is the <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>Deputy CEO, Vice Managing Director & Co-Founder</strong> of <strong className={isDark ? 'text-white font-medium' : 'text-[#1C1917] font-medium'}>GSRelation</strong>, where she plays a pivotal role in shaping the company’s strategic direction, marketing initiatives, and overall growth.
                  </p>
                  <p>
                    Specialising in strategic planning, marketing, brand positioning, and business development, she brings a structured, creative, and forward-thinking approach to building impactful strategies.
                  </p>
                  <p>
                    As a Co-Founder and part of the company’s leadership, Aditi is actively involved in strengthening GSRelation’s operations, market presence, and long-term vision. Her expertise in strategy and marketing, combined with her understanding of communication and brand development, complements the company’s work in public relations and strategic communications.
                  </p>
                  <p>
                    With a focus on planning, innovation, and sustainable growth, Aditi contributes to positioning GSRelation as a modern communications company built to create visibility, influence, and lasting impact.
                  </p>
                </div>

                {/* Areas of Practice & Mastery */}
                <div
                  className={`pt-4 border-t space-y-2.5 ${
                    isDark ? 'border-white/10' : 'border-[#E5DECE]'
                  }`}
                >
                  <div
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-[#1C1917]'
                    }`}
                  >
                    Key Practice Areas & Strategic Focus:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CO_FOUNDER_PROFILE.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
                          isDark
                            ? 'bg-[#0B101D] border-slate-700 text-slate-200'
                            : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Co-Founder CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className={`px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs ${
                    isDark
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                  }`}
                >
                  <span>Connect with Co-Founder's Office</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className={`text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#8C8273]'}`}>
                  Strategic partnerships & brand growth reviewed by Aditi Wankhade
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Agency Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`rounded-xl p-8 space-y-4 shadow-sm border transition-colors ${
              isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                isDark
                  ? 'bg-[#0B101D] border-emerald-500/30 text-emerald-400'
                  : 'bg-[#F2ECE0] border-[#9B783E]/40 text-[#1C473A]'
              }`}
            >
              <Shield className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              Uncompromising Editorial Respect
            </h3>
            <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              We never blast mass press releases. Every pitch, embargo, and interview we propose to The Economic Times, Mint, or CNBC-TV18 is backed by factual rigor and verified industry proof.
            </p>
          </div>

          <div
            className={`rounded-xl p-8 space-y-4 shadow-sm border transition-colors ${
              isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                isDark
                  ? 'bg-[#0B101D] border-emerald-500/30 text-emerald-400'
                  : 'bg-[#F2ECE0] border-[#9B783E]/40 text-[#1C473A]'
              }`}
            >
              <Globe className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              Pan-India National Bureau Reach
            </h3>
            <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              With integrated bureaus across Amravati (Camp Road), Akola (Civil Lines), Pune (Senapati Bapat Road), and Nashik (College Road), our communications engine operates seamlessly across regional and national news cycles.
            </p>
          </div>

          <div
            className={`rounded-xl p-8 space-y-4 shadow-sm border transition-colors ${
              isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                isDark
                  ? 'bg-[#0B101D] border-emerald-500/30 text-emerald-400'
                  : 'bg-[#F2ECE0] border-[#9B783E]/40 text-[#1C473A]'
              }`}
            >
              <Award className="w-5 h-5" />
            </div>
            <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              Beyond Visibility — Lasting Influence
            </h3>
            <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              We benchmark success through tier-1 page-one features, broadcast soundbites, executive reputation clarity, and enterprise trust that builds long-term organizational equity.
            </p>
          </div>
        </div>

        {/* Leadership Team Showcase */}
        <div className="space-y-10">
          <div className="space-y-2">
            <div
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
              }`}
            >
              Executive Counsel
            </div>
            <h2 className={`text-3xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              Senior Partners & <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>Practice Directors</span>
            </h2>
            <p className={`text-sm max-w-2xl font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              Directed by CEO & Director Mr. Girish Wakode alongside Deputy CEO & Co-Founder Aditi Wankhade and senior practice partners with extensive national journalism, public affairs, and capital markets experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.filter(m => m.id !== 'ldr-founder' && m.id !== 'ldr-1').map((member) => (
              <div
                key={member.id}
                className={`rounded-xl p-6 flex flex-col justify-between border transition-all shadow-xs ${
                  isDark
                    ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                    : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className={`text-lg font-serif font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                      {member.name}
                    </h3>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                      }`}
                    >
                      {member.position || member.role}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                    {member.bio}
                  </p>

                  <div
                    className={`pt-3 border-t text-[11px] font-normal space-y-1.5 ${
                      isDark ? 'border-white/10 text-[#94A3B8]' : 'border-[#E5DECE] text-[#8C8273]'
                    }`}
                  >
                    <div className={`font-medium uppercase tracking-wider text-[10px] ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                      Expertise:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(member.expertise || member.specialties || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${
                            isDark
                              ? 'bg-white/5 text-slate-300 border border-white/10'
                              : 'bg-[#FAF8F5] text-[#5C564E] border border-[#E5DECE]'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {member.linkedin && (
                  <div className={`pt-4 mt-4 border-t ${isDark ? 'border-white/5' : 'border-[#F0EBE1]'}`}>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#1C473A] hover:text-[#9B783E]'
                      }`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Executive Profile</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* National Bureaus */}
        <div
          className={`rounded-xl p-8 sm:p-12 space-y-8 shadow-xl border ${
            isDark
              ? 'bg-[#151F33] border-[#1E293B] text-white'
              : 'bg-gradient-to-br from-[#182B24] to-[#0E1B16] text-white border-[#9B783E]/40'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                isDark ? 'text-emerald-400' : 'text-[#E0C078]'
              }`}
            >
              National Footprint
            </div>
            <h3 className="text-3xl font-serif text-white">
              Strategic Bureaus <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>Across India</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="bg-black/30 p-6 rounded-md border border-white/10 space-y-2">
              <div className="text-base font-serif font-medium text-white">Amravati (HQ)</div>
              <div className="text-xs text-white/70 font-light">Camp Road, Amravati, Maharashtra</div>
              <div className="text-xs font-mono text-[#E0C078]">
                <a href="tel:8805915047" className="hover:underline">+91 88059 15047</a>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Executive Office &amp; Strategic PR
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-md border border-white/10 space-y-2">
              <div className="text-base font-serif font-medium text-white">Akola Bureau</div>
              <div className="text-xs text-white/70 font-light">Civil Lines, Akola, Maharashtra</div>
              <div className="text-xs font-mono text-[#E0C078]">
                <a href="tel:9373831640" className="hover:underline">+91 93738 31640</a>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Regional Media Relations &amp; Broadcast
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-md border border-white/10 space-y-2">
              <div className="text-base font-serif font-medium text-white">Pune Bureau</div>
              <div className="text-xs text-white/70 font-light">Senapati Bapat Road, Shivaji Nagar, Pune</div>
              <div className="text-xs font-mono text-[#E0C078]">
                <a href="tel:9527447529" className="hover:underline">+91 95274 47529</a>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Tech, Enterprise &amp; Startup PR
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-md border border-white/10 space-y-2">
              <div className="text-base font-serif font-medium text-white">Nashik Bureau</div>
              <div className="text-xs text-white/70 font-light">College Road, Gangapur, Nashik</div>
              <div className="text-xs font-mono text-[#E0C078]">
                <a href="tel:9421832623" className="hover:underline">+91 94218 32623</a>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 pt-3 border-t border-white/10 font-medium">
                Industrial &amp; Corporate Communications
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Executive Portrait Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={`rounded-xl border max-w-lg w-full p-6 space-y-6 shadow-2xl relative transition-colors ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B] text-white'
                : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917]'
            }`}
          >
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-md transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-[#8C8273] hover:text-[#1C1917] hover:bg-[#EAE4D5]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Executive Portrait Settings</span>
              </div>
              <h3 className="text-xl font-serif">
                {photoModalTarget === 'founder'
                  ? 'Update CEO & Director Headshot'
                  : 'Update Deputy CEO & Co-Founder Headshot'}
              </h3>
              <p
                className={`text-xs font-light ${
                  isDark ? 'text-slate-400' : 'text-[#6B6255]'
                }`}
              >
                {photoModalTarget === 'founder'
                  ? "Select a high-resolution executive portrait or upload Mr. Girish Wakode's official headshot photo."
                  : "Select a high-resolution executive portrait or upload Aditi Wankhade's official headshot photo."}
              </p>
            </div>

            {/* Current Preview */}
            <div
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                isDark
                  ? 'bg-[#0B101D] border-slate-800'
                  : 'bg-white border-[#E5DECE]'
              }`}
            >
              <div
                className={`w-20 h-24 rounded-md overflow-hidden shrink-0 border shadow-inner relative ${
                  isDark
                    ? 'bg-[#0B1019] border-emerald-500/40'
                    : 'bg-[#1C1917] border-[#9B783E]'
                }`}
              >
                <img
                  src={previewPhoto}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-xs space-y-1">
                <div className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  Current Portrait Preview
                </div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                  Displays across the Founder Spotlight, Executive Desk, and Quote sections.
                </div>
              </div>
            </div>

            {/* Curated Executive Presets */}
            <div className="space-y-2">
              <label
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-slate-300' : 'text-[#7A5E2E]'
                }`}
              >
                Curated Executive Styles
              </label>
              <div className="grid grid-cols-1 gap-2">
                {curatedExecutiveOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewPhoto(opt.url)}
                    className={`flex items-center justify-between p-2.5 text-xs rounded-md border text-left transition-all ${
                      previewPhoto === opt.url
                        ? isDark
                          ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium ring-1 ring-emerald-500'
                          : 'border-[#9B783E] bg-[#9B783E]/10 text-[#1C1917] font-medium ring-1 ring-[#9B783E]'
                        : isDark
                        ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                        : 'border-[#DDD4C0] hover:bg-white text-[#5C564E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={opt.url}
                        alt={opt.label}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <span>{opt.label}</span>
                    </div>
                    {previewPhoto === opt.url && (
                      <Check
                        className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#9B783E]'}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL or Direct Upload */}
            <div
              className={`space-y-3 pt-2 border-t ${
                isDark ? 'border-white/10' : 'border-[#DDD4C0]'
              }`}
            >
              <div className="space-y-1.5">
                <label
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-[#7A5E2E]'
                  }`}
                >
                  Option A: Enter Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/portrait.jpg"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      if (e.target.value) setPreviewPhoto(e.target.value);
                    }}
                    className={`flex-1 px-3 py-2 text-xs rounded-md border focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-400'
                        : 'bg-white border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrl.trim()) setPreviewPhoto(customUrl.trim());
                    }}
                    className={`px-3 py-2 text-xs rounded-md font-medium transition-colors ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-[#EAE4D5] hover:bg-[#DDD4C0] text-[#1C1917]'
                    }`}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-[#7A5E2E]'
                  }`}
                >
                  Option B: Upload Photo from Device
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-dashed text-xs font-medium rounded-md transition-colors ${
                    isDark
                      ? 'border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400'
                      : 'border-[#9B783E]/50 bg-[#9B783E]/5 hover:bg-[#9B783E]/10 text-[#1C473A]'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File (JPG, PNG, WebP)</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div
              className={`flex items-center justify-between pt-4 border-t ${
                isDark ? 'border-white/10' : 'border-[#DDD4C0]'
              }`}
            >
              <button
                type="button"
                onClick={handleResetDefault}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-[#8C8273] hover:text-[#1C1917]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${
                    isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-[#6B6255] hover:text-[#1C1917]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSavePhoto(previewPhoto)}
                  className={`px-5 py-2 text-xs font-medium rounded-md shadow-xs transition-colors ${
                    isDark
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                  }`}
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

