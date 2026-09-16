import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Building,
  TrendingUp,
  Award,
  ExternalLink,
  Quote,
  CheckCircle2,
  Share2,
  Sparkles
} from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { selectedCaseStudySlug, caseStudies = [], navigateTo, showToast, theme } = usePR();
  const isDark = theme === 'midnight';

  const safeStudies = caseStudies || [];
  const study = safeStudies.find(
    (c) => c.slug === selectedCaseStudySlug || c.id === selectedCaseStudySlug
  ) || safeStudies[0];

  if (!study) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0B101D] text-white' : 'bg-[#FAF8F5] text-[#1C1917]'
        }`}
      >
        <div className="text-center space-y-4">
          <p className={isDark ? 'text-white/50' : 'text-[#8C8273]'}>Case study not found.</p>
          <button
            onClick={() => navigateTo('work')}
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-white ${
              isDark ? 'bg-emerald-600' : 'bg-[#1C473A]'
            }`}
          >
            Back to All Work
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Case study link copied to clipboard.');
    }
  };

  return (
    <div
      id="case-study-detail-page"
      className={`min-h-screen py-12 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation & Share */}
        <div
          className={`flex items-center justify-between border-b pb-6 ${
            isDark ? 'border-white/10' : 'border-[#E5DECE]'
          }`}
        >
          <button
            onClick={() => navigateTo('work')}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-[#7A5E2E] hover:text-[#1C473A]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border shadow-xs ${
              isDark
                ? 'bg-[#151F33] border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-[#DDD4C0] text-[#1C1917] hover:bg-[#FAF8F5]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Case</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-[#9B783E]/15 border-[#9B783E]/30 text-[#7A5E2E]'
              }`}
            >
              {study.industry}
            </span>
            <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              <Building className="w-3.5 h-3.5" />
              <span>{study.clientName}</span>
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
            <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{study.date}</span>
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-serif tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            {study.title}
          </h1>

          <p
            className={`text-lg leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            {study.summary}
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl p-6 sm:p-8 border shadow-md ${
            isDark
              ? 'bg-[#151F33] text-white border-slate-800'
              : 'bg-[#1C473A] text-white border-[#9B783E]/30'
          }`}
        >
          {Array.isArray(study.metrics) ? (
            study.metrics.map((m: any, idx: number) => (
              <div key={idx} className="text-center sm:text-left space-y-1 p-2">
                <div
                  className={`text-2xl sm:text-3xl font-serif ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {m.value}
                </div>
                <div className="text-xs font-semibold text-white">{m.label}</div>
                <div className="text-[11px] text-white/70 font-light">{m.context}</div>
              </div>
            ))
          ) : study.results ? (
            <>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div
                  className={`text-2xl sm:text-3xl font-serif ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {study.results.reach}
                </div>
                <div className="text-xs font-semibold text-white">Audience Reach</div>
                <div className="text-[11px] text-white/70 font-light">Verified syndicated readers</div>
              </div>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div
                  className={`text-2xl sm:text-3xl font-serif ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {study.results.mentions} Placements
                </div>
                <div className="text-xs font-semibold text-white">Tier-1 Features</div>
                <div className="text-[11px] text-white/70 font-light">Including Bloomberg & WSJ</div>
              </div>
              <div className="text-center sm:text-left space-y-1 p-2">
                <div
                  className={`text-2xl sm:text-3xl font-serif ${
                    isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                  }`}
                >
                  {study.results.traffic}
                </div>
                <div className="text-xs font-semibold text-white">Inbound Surge</div>
                <div className="text-[11px] text-white/70 font-light">Commercial conversion alpha</div>
              </div>
            </>
          ) : null}
        </div>

        {/* Hero Image */}
        <div
          className={`rounded-xl overflow-hidden border shadow-md ${
            isDark ? 'border-[#1E293B]' : 'border-[#E5DECE]'
          }`}
        >
          <img
            src={study.heroImage}
            alt={study.title}
            referrerPolicy="no-referrer"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Deep Dive Content (The Challenge & The Strategy) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* The Strategic Challenge */}
            <section
              className={`p-6 sm:p-8 rounded-xl border space-y-4 shadow-sm ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B]'
                  : 'bg-white border-[#E5DECE]'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                01. The Challenge
              </div>
              <h2
                className={`text-2xl font-serif ${
                  isDark ? 'text-white' : 'text-[#1C1917]'
                }`}
              >
                Overcoming Narrative Resistance &amp; <span className="italic font-serif font-normal">Complexity</span>
              </h2>
              <div className={`text-sm leading-relaxed space-y-3 font-light ${isDark ? 'text-slate-300' : 'text-[#5C564E]'}`}>
                <p>{study.challenge}</p>
              </div>
            </section>

            {/* The PR Strategy & Execution */}
            <section
              className={`p-6 sm:p-8 rounded-xl border space-y-4 shadow-sm ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B]'
                  : 'bg-white border-[#E5DECE]'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                02. Narrative Architecture &amp; Execution
              </div>
              <h2
                className={`text-2xl font-serif ${
                  isDark ? 'text-white' : 'text-[#1C1917]'
                }`}
              >
                How GSRelation Engineered the <span className="italic font-serif font-normal">Breakthrough</span>
              </h2>
              <div className={`text-sm leading-relaxed space-y-3 font-light ${isDark ? 'text-slate-300' : 'text-[#5C564E]'}`}>
                <p>{study.strategy}</p>
                {study.execution && <p>{study.execution}</p>}
              </div>
            </section>

            {/* Client Quote */}
            {study.testimonial && (
              <div
                className={`rounded-xl p-6 sm:p-8 space-y-4 border shadow-sm ${
                  isDark
                    ? 'bg-[#0E1726] border-emerald-500/40 border-l-4'
                    : 'bg-[#FAF8F5] border-[#E5DECE] border-l-4 border-l-[#9B783E]'
                }`}
              >
                <Quote className={`w-8 h-8 ${isDark ? 'text-emerald-400/40' : 'text-[#9B783E]/50'}`} />
                <p className={`text-sm sm:text-base italic leading-relaxed font-serif ${isDark ? 'text-slate-200' : 'text-[#1C1917]'}`}>
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                    {study.testimonial.author}
                  </div>
                  <div className={`text-[11px] font-light ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                    {study.testimonial.role}, {study.clientName}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Placed Outlets */}
            <div
              className={`rounded-xl p-6 space-y-4 border shadow-sm ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B]'
                  : 'bg-white border-[#E5DECE]'
              }`}
            >
              <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                Tier-1 Earned Coverage
              </div>
              <div className="space-y-2">
                {study.tier1Outlets.map((outlet, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between text-xs p-2.5 rounded-lg border ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-800 text-slate-200'
                        : 'bg-[#FAF8F5] border-[#E5DECE] text-[#1C1917]'
                    }`}
                  >
                    <span className="font-semibold">{outlet}</span>
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                        isDark
                          ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
                          : 'text-[#1C473A] bg-[#1C473A]/10 border-[#1C473A]/20'
                      }`}
                    >
                      Featured Lede
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Metadata */}
            <div
              className={`rounded-xl p-6 space-y-3 text-xs border shadow-sm ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B]'
                  : 'bg-white border-[#E5DECE]'
              }`}
            >
              <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                Campaign Dossier
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-white/5' : 'border-[#E5DECE]'}`}>
                <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>Service Line</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>{study.serviceType}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-white/5' : 'border-[#E5DECE]'}`}>
                <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>Target Region</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>Global (US, UK, APAC, India)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>Syndication Status</span>
                <span className={`font-semibold uppercase tracking-wider text-[10px] ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                  100% Retained Archive
                </span>
              </div>
            </div>

            {/* Ready to Replicate CTA */}
            <div
              className={`rounded-xl p-6 sm:p-8 space-y-4 text-center border shadow-md ${
                isDark
                  ? 'bg-[#151F33] text-white border-slate-800'
                  : 'bg-[#1C473A] text-white border-[#9B783E]/40'
              }`}
            >
              <div className="text-base font-serif text-white">
                Planning an upcoming funding round or category launch?
              </div>
              <p className="text-xs text-white/80 font-light">
                Our communications strategists specialize in high-impact narrative launches.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className={`w-full py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm ${
                  isDark
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                    : 'bg-[#9B783E] hover:bg-[#856530] text-white'
                }`}
              >
                Inquire With Press Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
