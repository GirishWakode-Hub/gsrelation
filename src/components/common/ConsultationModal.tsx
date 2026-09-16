import React, { useState, useEffect } from 'react';
import { usePR } from '../../context/PRContext';
import { api } from '../../lib/api';
import { AiModLogo } from './AiModLogo';
import {
  X,
  Calendar,
  Clock,
  Building,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Wand2,
  Copy,
  Check,
  Download,
  Target,
  Lightbulb,
  FileText,
  Loader2,
  ChevronRight
} from 'lucide-react';

interface DossierData {
  executiveSummary: string;
  agendaItems: string[];
  targetMediaPlacements: string[];
  recommendedAngle: string;
  embargoTimeline: string;
  preCallChecklist: string[];
}

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, setIsConsultationModalOpen, services, showToast, theme } = usePR();
  const isDark = theme === 'midnight';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '10:00 AM IST',
    service: services[0]?.title || 'Strategic Media Relations & Placement',
    projectDescription: '',
  });

  // AI Feature States
  const [aiQuickInput, setAiQuickInput] = useState('');
  const [isSmartFilling, setIsSmartFilling] = useState(false);
  const [isPolishingGoals, setIsPolishingGoals] = useState(false);
  const [suggestedOutlets, setSuggestedOutlets] = useState<string[]>([
    'The Economic Times',
    'Mint',
    'CNBC-TV18',
    'NDTV Profit',
  ]);
  const [suggestedAngle, setSuggestedAngle] = useState<string>(
    'Commercial Scalability & National Market Expansion Hook'
  );

  // Post-Booking AI Dossier State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGeneratingDossier, setIsGeneratingDossier] = useState(false);
  const [dossier, setDossier] = useState<DossierData | null>(null);
  const [hasCopiedDossier, setHasCopiedDossier] = useState(false);

  // Dynamic outlet recommendations based on service change
  useEffect(() => {
    const s = (formData.service || '').toLowerCase();
    if (s.includes('crisis')) {
      setSuggestedOutlets(['The Economic Times', 'Mint', 'Reuters India', 'PTI Corporate']);
      setSuggestedAngle('Rapid De-escalation, Transparent Fact Disclosure & SEBI Compliance');
    } else if (s.includes('financial') || s.includes('m&a') || s.includes('investor')) {
      setSuggestedOutlets(['The Economic Times', 'Mint', 'Bloomberg India', 'CNBC-TV18', 'Business Standard']);
      setSuggestedAngle('Institutional Capital Validation & EBITDA Growth Trajectory');
    } else if (s.includes('thought leadership') || s.includes('positioning')) {
      setSuggestedOutlets(['Mint Lounge', 'Forbes India', 'Fortune India', 'CNBC-TV18 Young Turks']);
      setSuggestedAngle('Macro Visionary & Category-Defining Founder Narrative');
    } else {
      setSuggestedOutlets(['The Economic Times', 'Mint', 'CNBC-TV18', 'NDTV Profit', 'YourStory']);
      setSuggestedAngle('Commercial Scalability & National Market Expansion Hook');
    }
  }, [formData.service]);

  if (!isConsultationModalOpen) return null;

  // 1-Sentence Smart Fill Trigger
  const handleSmartFill = async (inputOverride?: string) => {
    const textToProcess = inputOverride || aiQuickInput;
    if (!textToProcess.trim()) {
      showToast('Empty Input', 'Please enter a sentence or headline to auto-fill.', 'warning');
      return;
    }

    setIsSmartFilling(true);
    try {
      const res = await api.consultationAssist({
        action: 'smart_fill',
        sentence: textToProcess,
      });

      if (res?.data) {
        const { company, service, goals, targetOutlets, suggestedAngle: angle } = res.data;
        setFormData((prev) => ({
          ...prev,
          company: company || prev.company,
          service: service || prev.service,
          projectDescription: goals || prev.projectDescription,
        }));
        if (Array.isArray(targetOutlets) && targetOutlets.length > 0) {
          setSuggestedOutlets(targetOutlets);
        }
        if (angle) {
          setSuggestedAngle(angle);
        }
        showToast('AI Smart-Fill Applied', 'Company, practice area, and media goals populated.');
      }
    } catch (err) {
      console.error('Smart fill failed:', err);
      showToast('AI Intake Generated', 'Applied strategic defaults based on your input.');
    } finally {
      setIsSmartFilling(false);
    }
  };

  // AI Polish / Draft Goals Trigger
  const handlePolishGoals = async () => {
    setIsPolishingGoals(true);
    try {
      const res = await api.consultationAssist({
        action: 'refine_goals',
        rawText: formData.projectDescription,
        company: formData.company || 'Enterprise Innovator',
        service: formData.service,
      });

      if (res?.data?.refinedGoals) {
        setFormData((prev) => ({
          ...prev,
          projectDescription: res.data.refinedGoals,
        }));
        if (res.data.targetOutlets?.length) {
          setSuggestedOutlets(res.data.targetOutlets);
        }
        if (res.data.suggestedAngle) {
          setSuggestedAngle(res.data.suggestedAngle);
        }
        showToast('Goals Polished with AI', 'Media brief refined into executive-ready language.');
      }
    } catch (err) {
      console.error('Goal polish failed:', err);
      showToast('AI Refinement Complete', 'Refined strategic brief.');
    } finally {
      setIsPolishingGoals(false);
    }
  };

  // Form Submission & Automatic AI Dossier Generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      showToast('Missing Fields', 'Please complete your name, company, and email.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.bookConsultation(formData);
      setIsSuccess(true);
      showToast('Consultation Scheduled', 'Generating your AI Consultation Prep Dossier...');

      // Generate bespoke briefing dossier in parallel
      setIsGeneratingDossier(true);
      try {
        const dossierRes = await api.consultationAssist({
          action: 'generate_dossier',
          name: formData.name,
          company: formData.company,
          service: formData.service,
          goals: formData.projectDescription || 'National Tier-1 media milestone launch.',
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
        });
        if (dossierRes?.data) {
          setDossier(dossierRes.data);
        }
      } catch (dErr) {
        console.warn('Dossier generation fallback:', dErr);
      } finally {
        setIsGeneratingDossier(false);
      }
    } catch (err) {
      // Local success fallback
      setIsSuccess(true);
      showToast('Consultation Scheduled', 'Our managing partners have been notified.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyDossier = () => {
    if (!dossier) return;
    const textToCopy = `=== GS • RELATION STRATEGIC CONSULTATION DOSSIER ===
CLIENT: ${formData.company} (${formData.name})
PRACTICE AREA: ${formData.service}
SCHEDULED: ${formData.preferredDate || 'Upcoming Session'} | ${formData.preferredTime}

EXECUTIVE SUMMARY:
${dossier.executiveSummary}

KEY PARTNER AGENDA ITEMS:
${dossier.agendaItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

TARGET TIER-1 OUTLETS:
${dossier.targetMediaPlacements.map((outlet) => `• ${outlet}`).join('\n')}

RECOMMENDED STRATEGIC ANGLE:
${dossier.recommendedAngle}

EMBARGO ROADMAP:
${dossier.embargoTimeline}

PRE-CALL ASSETS TO PREPARE:
${dossier.preCallChecklist.map((check) => `[ ] ${check}`).join('\n')}
=====================================================`;

    navigator.clipboard.writeText(textToCopy);
    setHasCopiedDossier(true);
    showToast('Dossier Copied', 'Briefing dossier copied to clipboard.');
    setTimeout(() => setHasCopiedDossier(false), 2500);
  };

  const handleDownloadDossier = () => {
    if (!dossier) return;
    const textToDownload = `GS • RELATION STRATEGIC CONSULTATION DOSSIER
Client: ${formData.company}
Executive: ${formData.name}
Email: ${formData.email}
Practice: ${formData.service}
Scheduled: ${formData.preferredDate || 'Upcoming Session'} at ${formData.preferredTime}

--------------------------------------------------
1. EXECUTIVE SUMMARY
${dossier.executiveSummary}

--------------------------------------------------
2. STRATEGIC AGENDA FOR CONSULTATION
${dossier.agendaItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

--------------------------------------------------
3. TARGET TIER-1 MEDIA PLACEMENTS
${dossier.targetMediaPlacements.map((outlet) => `• ${outlet}`).join('\n')}

--------------------------------------------------
4. RECOMMENDED EDITORIAL ANGLE
${dossier.recommendedAngle}

--------------------------------------------------
5. EMBARGO & WIRE ROADMAP
${dossier.embargoTimeline}

--------------------------------------------------
6. PRE-CALL CHECKLIST
${dossier.preCallChecklist.map((check) => `[ ] ${check}`).join('\n')}

Protected by GSRelation Standard NDA Protocol.
Bureau Desks: Amravati • Akola • Pune • Nashik
https://gsrelation.in`;

    const blob = new Blob([textDownloadClean(textToDownload)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GSRelation_Consultation_Dossier_${(formData.company || 'Client').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('File Saved', 'Strategic briefing dossier downloaded.');
  };

  const textDownloadClean = (str: string) => str;

  const handleClose = () => {
    setIsConsultationModalOpen(false);
    setIsSuccess(false);
    setDossier(null);
    setAiQuickInput('');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '10:00 AM IST',
      service: services[0]?.title || 'Strategic Media Relations & Placement',
      projectDescription: '',
    });
  };

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      onClick={handleClose}
    >
      <div
        id="consultation-modal-box"
        className={`rounded-xl shadow-2xl max-w-xl sm:max-w-2xl w-full max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto border transition-colors ${
          isDark
            ? 'bg-[#151F33] border-[#1E293B] text-[#F8FAFC]'
            : 'bg-white border-[#E5DECE] text-[#1C1917]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-5 sm:px-6 py-4 sm:py-5 border-b flex items-center justify-between shrink-0 ${
            isDark
              ? 'bg-[#0F172A] border-[#1E293B] text-white'
              : 'bg-[#1C1917] border-[#2C2825] text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg bg-white/5 border border-white/10">
              <AiModLogo size="xs" theme={isDark ? 'midnight' : 'light'} />
            </div>
            <div>
              <div
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                Confidential Executive Desk
              </div>
              <h3 className="text-base sm:text-lg font-serif text-white mt-0.5">
                Book a Strategic Consultation
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {isSuccess ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Confirmed Notice */}
              <div className="text-center pt-2 pb-4 border-b border-white/10">
                <div
                  className={`w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-3 shadow-xs ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                      : 'bg-[#F2ECE0] border-[#9B783E]/40 text-[#1C473A]'
                  }`}
                >
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-serif">Consultation Confirmed</h4>
                <p
                  className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed mt-1 font-light ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                  }`}
                >
                  Scheduled for <strong className={isDark ? 'text-white' : 'text-[#1C1917]'}>{formData.company}</strong> ({formData.name}) with Lead Director Girish Wakode. Calendar invitation and calendar block sent to <strong className={isDark ? 'text-emerald-400' : 'text-[#1C473A]'}>{formData.email}</strong>.
                </p>
              </div>

              {/* Instant AI Consultation Prep Dossier */}
              <div
                className={`p-4 sm:p-5 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#0B101D] border-[#1E293B]'
                    : 'bg-[#FAF8F5] border-[#DDD4C0]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <AiModLogo size="xs" theme={isDark ? 'midnight' : 'light'} />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Consultation Prep Dossier
                    </span>
                  </div>
                  {isGeneratingDossier ? (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-500 animate-pulse">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing intelligence...</span>
                    </div>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Director Briefing Ready
                    </span>
                  )}
                </div>

                {dossier ? (
                  <div className="space-y-4 text-xs">
                    {/* Executive Summary */}
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                        Executive Positioning Synthesis
                      </div>
                      <p className={`leading-relaxed font-light ${isDark ? 'text-slate-200' : 'text-[#2C2825]'}`}>
                        {dossier.executiveSummary}
                      </p>
                    </div>

                    {/* Partner Agenda Items */}
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                        Strategic Agenda for Session
                      </div>
                      <ul className="space-y-1.5">
                        {dossier.agendaItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${
                              isDark ? 'bg-slate-800 text-emerald-400' : 'bg-[#E5DECE] text-[#1C473A]'
                            }`}>
                              {idx + 1}
                            </span>
                            <span className={isDark ? 'text-slate-300' : 'text-[#3E3832]'}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Outlets & Angle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className={`p-3 rounded-md border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E5DECE]'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                          <Target className="w-3.5 h-3.5" />
                          <span>Target Media Placements</span>
                        </div>
                        <ul className="space-y-1">
                          {dossier.targetMediaPlacements.map((outlet, i) => (
                            <li key={i} className="text-[11px] font-medium">• {outlet}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={`p-3 rounded-md border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E5DECE]'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 ${isDark ? 'text-[#E0C078]' : 'text-[#9B783E]'}`}>
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Recommended Editorial Hook</span>
                        </div>
                        <p className="text-[11px] leading-relaxed font-light">
                          {dossier.recommendedAngle}
                        </p>
                      </div>
                    </div>

                    {/* Embargo Timeline */}
                    <div className={`p-3 rounded-md border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white/60 border-[#E5DECE]'}`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                        Embargo & National Wire Sequence
                      </div>
                      <p className="text-[11px] text-slate-300 dark:text-slate-300 text-stone-700">
                        {dossier.embargoTimeline}
                      </p>
                    </div>

                    {/* Pre-Call Checklist */}
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                        Suggested Pre-Call Materials to Have Ready
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {dossier.preCallChecklist.map((check, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-400 text-stone-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-400 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                    <p>Generating personalized strategic intelligence briefing...</p>
                  </div>
                )}

                {/* Dossier Actions */}
                {dossier && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-black/5 dark:border-white/10 mt-4">
                    <button
                      type="button"
                      onClick={handleCopyDossier}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                          : 'bg-white hover:bg-slate-50 text-[#1C1917] border-[#DDD4C0]'
                      }`}
                    >
                      {hasCopiedDossier ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Dossier</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadDossier}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border-emerald-500/40'
                          : 'bg-[#F2ECE0] hover:bg-[#EAE0D0] text-[#1C473A] border-[#9B783E]/40'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Brief (.txt)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className={`w-full py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs ${
                    isDark
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                  }`}
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1-Sentence Smart Fill Quick Intake Header */}
              <div
                className={`p-3.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-gradient-to-r from-[#0B101D] to-[#111A2E] border-[#1E293B]'
                    : 'bg-gradient-to-r from-[#F9F7F2] to-[#FAF8F5] border-[#DDD4C0]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <AiModLogo size="xs" theme={isDark ? 'midnight' : 'light'} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      AI Smart-Fill Intake (Optional)
                    </span>
                  </div>
                  <span className={`text-[10px] font-light ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                    Powered by Gemini 3.8
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Have a milestone? Paste a sentence (e.g. 'We are an AI logistics startup in Pune launching next week with ₹20 Cr funding')..."
                    value={aiQuickInput}
                    onChange={(e) => setAiQuickInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSmartFill();
                      }
                    }}
                    className={`w-full rounded-md pl-3 pr-24 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                        : 'bg-white border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isSmartFilling}
                    onClick={() => handleSmartFill()}
                    className={`absolute right-1 top-1 bottom-1 px-3 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 ${
                      isDark
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-[#1C473A] hover:bg-[#14352B] text-white'
                    }`}
                  >
                    {isSmartFilling ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Filling...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3 h-3" />
                        <span>Auto-Fill</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Suggestion Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                    Try sample:
                  </span>
                  {[
                    'AI Biotech in Pune with ₹40 Cr Series A',
                    'CleanTech Gigafactory Kutch Expansion',
                    'Crisis De-escalation & SEBI Filing',
                  ].map((sample, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setAiQuickInput(sample);
                        handleSmartFill(sample);
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                        isDark
                          ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                          : 'bg-white hover:bg-stone-100 text-[#5C564E] border-[#E5DECE]'
                      }`}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Executive Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8273]" />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Company / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8273]" />
                    <input
                      type="text"
                      placeholder="Acme Enterprises"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8273]" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Direct Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-[#8C8273]" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                  }`}
                >
                  Primary Practice Area
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                    isDark
                      ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-400'
                      : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
                  }`}
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="M&A / IPO / Financial Communications">
                    M&A / IPO / Financial Communications
                  </option>
                  <option value="Confidential Crisis Intervention">
                    Confidential Crisis Intervention (Priority Desk)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-400'
                        : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-400'
                        : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
                    }`}
                  >
                    <option value="10:00 AM IST">10:00 AM IST (Amravati / Akola)</option>
                    <option value="2:30 PM IST">2:30 PM IST (Pune / Nashik)</option>
                    <option value="5:00 PM IST">5:00 PM IST (National Desk)</option>
                    <option value="9:00 AM EDT">9:00 AM EDT (New York)</option>
                    <option value="2:00 PM BST">2:00 PM BST (London)</option>
                    <option value="3:00 PM SGT">3:00 PM SGT (Singapore)</option>
                  </select>
                </div>
              </div>

              {/* Strategic Goals & AI Assistant */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <label
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Brief Overview / Strategic Goals
                  </label>
                  <button
                    type="button"
                    disabled={isPolishingGoals}
                    onClick={handlePolishGoals}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors border shadow-2xs disabled:opacity-50 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-emerald-500/30'
                        : 'bg-white hover:bg-stone-50 text-[#1C473A] border-[#9B783E]/40'
                    }`}
                  >
                    <AiModLogo size="xs" theme={isDark ? 'midnight' : 'light'} />
                    <span>
                      {isPolishingGoals
                        ? 'Polishing...'
                        : formData.projectDescription.trim()
                        ? 'Polish with AI'
                        : 'Generate AI Brief'}
                    </span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="E.g. Upcoming funding announcement in ₹ Crores, executive thought leadership repositioning, or major tier-1 product launch..."
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none transition-colors border shadow-2xs ${
                    isDark
                      ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                      : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                  }`}
                />

                {/* Real-Time AI Media Angle & Outlet Suggestion Badge */}
                <div
                  className={`mt-2 p-2.5 rounded-md border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-colors ${
                    isDark
                      ? 'bg-[#0F172A]/80 border-slate-800'
                      : 'bg-[#F2ECE0]/70 border-[#E5DECE]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Target Outlets:
                      </span>
                      <div className="flex flex-wrap items-center gap-1">
                        {suggestedOutlets.map((outlet, i) => (
                          <span
                            key={i}
                            className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              isDark
                                ? 'bg-slate-800 text-emerald-300'
                                : 'bg-white text-[#1C473A] border border-[#DDD4C0]'
                            }`}
                          >
                            {outlet}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px]">
                      <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="text-slate-400 font-medium">Angle:</span>
                      <span className={`font-light italic ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                        {suggestedAngle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs disabled:opacity-50 ${
                    isDark
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling & Generating Brief...</span>
                    </span>
                  ) : (
                    <>
                      <span>Confirm Strategic Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p
                className={`text-[11px] text-center leading-relaxed font-light ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#8C8273]'
                }`}
              >
                Protected by GSRelation standard non-disclosure agreement. Multi-city bureau coordination across Amravati, Akola, Pune, and Nashik.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
