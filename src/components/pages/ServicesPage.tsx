import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  Globe,
  Radio,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  HelpCircle,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, setIsConsultationModalOpen, theme } = usePR();
  const isDark = theme === 'midnight';

  // PR Readiness Interactive Tool State
  const [assessment, setAssessment] = useState({
    newsMagnitude: 'high', // 'low' | 'med' | 'high'
    spokespersonReadiness: 'trained', // 'untrained' | 'some' | 'trained'
    proprietaryData: 'yes', // 'no' | 'partial' | 'yes'
    leadTime: 'optimal', // 'rush' | 'moderate' | 'optimal'
  });

  const calculateReadinessScore = () => {
    let score = 50;
    if (assessment.newsMagnitude === 'high') score += 20;
    else if (assessment.newsMagnitude === 'med') score += 10;

    if (assessment.spokespersonReadiness === 'trained') score += 15;
    else if (assessment.spokespersonReadiness === 'some') score += 5;

    if (assessment.proprietaryData === 'yes') score += 10;
    else if (assessment.proprietaryData === 'partial') score += 5;

    if (assessment.leadTime === 'optimal') score += 5;

    return Math.min(score, 100);
  };

  const readinessScore = calculateReadinessScore();

  return (
    <div
      id="services-page"
      className={`min-h-screen py-16 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
              }`}
            >
              Practice Disciplines
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            Strategic PR Services Tailored for <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
              Market Dominance
            </span>
            .
          </h1>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            We don’t blast indiscriminate press wires. We construct bespoke, high-conviction narrative architectures that earn the respect of the world's most discerning journalists and investors.
          </p>
        </div>

        {/* Detailed Service Grid */}
        <div className="space-y-8">
          {services.map((svc, index) => (
            <div
              key={svc.id}
              id={`service-card-${svc.id}`}
              className={`rounded-md p-8 lg:p-10 transition-all duration-300 space-y-8 border shadow-2xs hover:shadow-md ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                  : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center font-bold text-xs tracking-wider shadow-sm ${
                        isDark
                          ? 'bg-[#0E1524] text-emerald-400 border border-slate-700'
                          : 'bg-[#1C473A] text-[#E0C078] border border-[#9B783E]/40'
                      }`}
                    >
                      0{index + 1}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-widest ${
                          isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                        }`}
                      >
                        {svc.category || 'Strategic Practice'}
                      </span>
                      <h2
                        className={`text-2xl font-serif font-normal ${
                          isDark ? 'text-white' : 'text-[#1C1917]'
                        }`}
                      >
                        {svc.title}
                      </h2>
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed font-light ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                    }`}
                  >
                    {svc.description || svc.shortDesc}
                  </p>
                  {svc.fullDesc && (
                    <p
                      className={`text-xs leading-relaxed font-light ${
                        isDark ? 'text-[#64748B]' : 'text-[#8C8273]'
                      }`}
                    >
                      {svc.fullDesc}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-md transition-colors border ${
                        isDark
                          ? 'bg-slate-800/60 text-emerald-400 hover:text-white border-slate-700 hover:bg-emerald-600'
                          : 'bg-[#FAF8F5] text-[#1C473A] hover:text-white border-[#C8BFAD] hover:bg-[#1C473A]'
                      }`}
                    >
                      <span>{svc.ctaText || `Request Briefing for ${svc.title}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Deliverables */}
                  <div
                    className={`rounded-md p-5 border space-y-3 ${
                      isDark
                        ? 'bg-[#0E1524] border-[#1E293B]'
                        : 'bg-[#FAF8F5] border-[#E2D9C8]'
                    }`}
                  >
                    <div
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 ${
                        isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                        }`}
                      />
                      <span>Key Deliverables</span>
                    </div>
                    <div className="space-y-2">
                      {(svc.deliverables || []).map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 text-xs ${
                            isDark ? 'text-slate-300' : 'text-[#2B2723]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              isDark ? 'bg-emerald-400' : 'bg-[#1C473A]'
                            }`}
                          />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Benefits */}
                  <div
                    className={`rounded-md p-5 border space-y-3 ${
                      isDark
                        ? 'bg-[#0E1524] border-[#1E293B]'
                        : 'bg-[#FAF8F5] border-[#E2D9C8]'
                    }`}
                  >
                    <div
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 ${
                        isDark ? 'text-amber-400' : 'text-[#7A5E2E]'
                      }`}
                    >
                      <Sparkles
                        className={`w-3.5 h-3.5 ${
                          isDark ? 'text-amber-400' : 'text-[#9B783E]'
                        }`}
                      />
                      <span>Strategic Benefits</span>
                    </div>
                    <div className="space-y-2">
                      {(svc.benefits || []).map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 text-xs ${
                            isDark ? 'text-slate-300' : 'text-[#2B2723]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              isDark ? 'bg-amber-400' : 'bg-[#9B783E]'
                            }`}
                          />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Step Process Timeline */}
              {svc.process && svc.process.length > 0 && (
                <div
                  className={`pt-4 border-t ${
                    isDark ? 'border-slate-800' : 'border-[#E2D9C8]'
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold ${
                      isDark ? 'text-[#64748B]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Execution Process & Governance
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {svc.process.map((step, stepIdx) => (
                      <div
                        key={stepIdx}
                        className={`rounded-md p-3 space-y-1 relative border ${
                          isDark
                            ? 'bg-[#0E1524] border-[#1E293B]'
                            : 'bg-[#FAF8F5] border-[#E2D9C8]'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-mono font-semibold ${
                            isDark ? 'text-emerald-400' : 'text-[#1C473A]'
                          }`}
                        >
                          Step 0{stepIdx + 1}
                        </span>
                        <p
                          className={`text-xs font-light leading-snug ${
                            isDark ? 'text-slate-300' : 'text-[#2B2723]'
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PR Readiness Assessment Interactive Widget */}
        <div
          className={`rounded-xl p-8 sm:p-10 space-y-8 shadow-xl border ${
            isDark
              ? 'bg-[#0E1524] text-white border-emerald-500/20'
              : 'bg-gradient-to-br from-[#13221E] to-[#0E1815] text-white border-[#B8934C]/40'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center border ${
                isDark
                  ? 'bg-[#151F33] text-emerald-400 border-emerald-500/30'
                  : 'bg-[#1C2C27] text-[#E0C078] border-[#B8934C]/40'
              }`}
            >
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-normal text-white">
                Interactive PR Story Readiness Assessment
              </h3>
              <p className="text-xs text-[#FAF8F5]/70 font-light">
                Evaluate the tier-1 news viability of your upcoming corporate announcement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-medium text-white/90 mb-2">
                1. News Magnitude / Scope
              </label>
              <select
                value={assessment.newsMagnitude}
                onChange={(e) =>
                  setAssessment({ ...assessment, newsMagnitude: e.target.value })
                }
                className="w-full bg-[#162723] border border-[#B8934C]/40 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#E0C078]"
              >
                <option value="high">Major ₹150 Cr+ Funding / Breakthrough Tech</option>
                <option value="med">Product Feature / Strategic Partnership</option>
                <option value="low">Incremental Update / Minor Hire</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/90 mb-2">
                2. Executive Media Readiness
              </label>
              <select
                value={assessment.spokespersonReadiness}
                onChange={(e) =>
                  setAssessment({ ...assessment, spokespersonReadiness: e.target.value })
                }
                className="w-full bg-[#162723] border border-[#B8934C]/40 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#E0C078]"
              >
                <option value="trained">Broadcast-Trained & Available for Live TV</option>
                <option value="some">Experienced in Print / Podcast Interviews</option>
                <option value="untrained">First Time Facing Tier-1 Press</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/90 mb-2">
                3. Proprietary Data & Case Proof
              </label>
              <select
                value={assessment.proprietaryData}
                onChange={(e) =>
                  setAssessment({ ...assessment, proprietaryData: e.target.value })
                }
                className="w-full bg-[#162723] border border-[#B8934C]/40 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#E0C078]"
              >
                <option value="yes">Hard Metrics, Peer Data & Customer References</option>
                <option value="partial">Internal Telemetry (Anonymized)</option>
                <option value="no">Qualitative Vision Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/90 mb-2">
                4. Launch Lead Time
              </label>
              <select
                value={assessment.leadTime}
                onChange={(e) =>
                  setAssessment({ ...assessment, leadTime: e.target.value })
                }
                className="w-full bg-[#162723] border border-[#B8934C]/40 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#E0C078]"
              >
                <option value="optimal">3-4 Weeks Embargo Window (Optimal)</option>
                <option value="moderate">1-2 Weeks (Moderate Pitch Cycle)</option>
                <option value="rush">&lt; 48 Hours (Breaking Rush)</option>
              </select>
            </div>
          </div>

          <div
            className={`p-6 rounded-md flex flex-col sm:flex-row items-center justify-between gap-6 border ${
              isDark
                ? 'bg-[#151F33] border-slate-700'
                : 'bg-[#162723] border-[#B8934C]/30'
            }`}
          >
            <div className="space-y-1 text-center sm:text-left">
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                Tier-1 Media Viability Score
              </div>
              <div className="text-2xl sm:text-3xl font-serif text-white">
                {readinessScore} / 100 —{' '}
                <span
                  className={`italic ${
                    readinessScore >= 80 ? 'text-[#E0C078]' : 'text-amber-400'
                  }`}
                >
                  {readinessScore >= 80 ? 'Prime Tier-1 Candidate' : 'Requires Narrative Calibration'}
                </span>
              </div>
              <p className="text-xs text-[#FAF8F5]/70 max-w-xl font-light">
                {readinessScore >= 80
                  ? 'Your announcement has strong institutional weight. An exclusive embargo strategy across WSJ, Bloomberg, or TechCrunch will yield maximum impact.'
                  : 'We recommend bundling with proprietary benchmark data or an executive thought leadership byline before public wire distribution.'}
              </p>
            </div>

            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className={`px-6 py-3.5 rounded-md text-xs font-semibold uppercase tracking-wider shadow-md whitespace-nowrap transition-all ${
                isDark
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#9B783E] hover:bg-[#856530] text-white border border-[#E0C078]/40 shadow-[#9B783E]/20'
              }`}
            >
              Discuss Score With Partners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
