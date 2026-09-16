import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  Building,
  Award
} from 'lucide-react';

export const OurWorkPage: React.FC = () => {
  const { caseStudies = [], navigateTo, theme } = usePR();
  const isDark = theme === 'midnight';
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');

  const industries = ['ALL', 'Technology', 'Healthcare', 'Finance', 'Consumer', 'Startups', 'Corporate'];

  const safeCaseStudies = caseStudies || [];
  const filteredCases = selectedIndustry === 'ALL'
    ? safeCaseStudies
    : safeCaseStudies.filter((cs) => {
        if (!cs.industry) return false;
        const ind = cs.industry.toLowerCase();
        const sel = selectedIndustry.toLowerCase();
        if (sel === 'healthcare') return ind.includes('health') || ind.includes('bio') || ind.includes('medical');
        if (sel === 'technology') return ind.includes('tech') || ind.includes('quantum') || ind.includes('autonomous') || ind.includes('software');
        if (sel === 'finance') return ind.includes('finance') || ind.includes('wealth') || ind.includes('capital') || ind.includes('fintech');
        if (sel === 'consumer') return ind.includes('consumer') || ind.includes('home') || ind.includes('retail') || ind.includes('design');
        if (sel === 'corporate') return ind.includes('corporate') || ind.includes('aerospace') || ind.includes('industrial');
        if (sel === 'startups') return ind.includes('startup') || ind.includes('series') || ind.includes('venture');
        return ind.includes(sel);
      });

  return (
    <div
      id="our-work-page"
      className={`min-h-screen py-16 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
              }`}
            >
              Case Studies & Portfolio
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            Transformative PR Campaigns with <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
              Measurable Alpha
            </span>
            .
          </h1>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            Every campaign we engineer is tethered to tangible business outcomes: valuation inflection, institutional trust, customer pipeline, and category authority.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          className={`flex flex-wrap items-center gap-2 border-b pb-5 ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2D9C8]'
          }`}
        >
          <span
            className={`text-[10px] uppercase tracking-[0.2em] mr-2 flex items-center gap-1.5 font-semibold ${
              isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
            }`}
          >
            <Filter className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`} />
            <span>Filter Industry:</span>
          </span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all ${
                selectedIndustry === ind
                  ? isDark
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'bg-[#1C473A] text-white border border-[#9B783E]/40 shadow-xs font-semibold'
                  : isDark
                  ? 'bg-[#151F33] border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white border border-[#DDD4C0] text-[#5C564E] hover:text-[#1C1917] hover:bg-[#F2ECE0]/60'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => navigateTo('case-study', cs.slug || cs.id)}
              className={`rounded-md overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-300 border shadow-2xs hover:shadow-md ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                  : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
              }`}
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#0F172A]">
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

                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      className={`text-lg font-serif font-normal transition-colors leading-snug ${
                        isDark
                          ? 'text-white group-hover:text-emerald-400'
                          : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}
                    >
                      {cs.title}
                    </h3>
                    <p
                      className={`text-xs mt-2.5 line-clamp-3 leading-relaxed font-light ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                      }`}
                    >
                      {cs.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div
                      className={`text-[10px] uppercase tracking-[0.2em] mb-2 font-semibold ${
                        isDark ? 'text-[#64748B]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Secured Media Outlets:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tier1Outlets.map((outlet, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded-sm text-[10px] font-medium border ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-200'
                              : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#2B2723]'
                          }`}
                        >
                          {outlet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
                }`}
              >
                <span
                  className={`text-[11px] uppercase tracking-wider font-medium ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#8C8273]'
                  }`}
                >
                  {cs.serviceType}
                </span>
                <span
                  className={`font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs ${
                    isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                  }`}
                >
                  <span>Read Dossier</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
