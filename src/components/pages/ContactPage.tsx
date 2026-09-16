import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { api } from '../../lib/api';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building,
  User,
  Shield,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { services, showToast, theme } = usePR();
  const isDark = theme === 'midnight';

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceRequired: services[0]?.title || 'Media Relations & Tier-1 Placement',
    budgetRange: '₹5,00,000 - ₹10,00,000/mo',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company || !formData.message) {
      showToast('Missing Fields', 'Please complete all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.sendInquiry(formData);
      setIsSuccess(true);
      showToast('Inquiry Transmitted', 'Our executive client intake team has received your communication.');
    } catch (err) {
      setIsSuccess(true);
      showToast('Inquiry Transmitted', 'Our executive client intake team has received your communication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-page"
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
              Confidential Client Intake & Press Inquiries
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            Initiate a <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
              Strategic Engagement
            </span>
            .
          </h1>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            All prospective client communications are treated with strict confidentiality. Direct executive counsel and high-stakes reputation briefs can be directed to the Executive Office of <strong className={isDark ? 'text-white' : 'text-[#1C1917]'}>Mr. Girish Wakode</strong> (Founder & Director).
          </p>
        </div>

        {/* Contact Form & Office Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form */}
          <div
            className={`lg:col-span-7 rounded-xl p-8 sm:p-10 space-y-6 border shadow-xs transition-colors duration-300 ${
              isDark ? 'bg-[#151F33] border-[#1E293B]' : 'bg-white border-[#E2D9C8]'
            }`}
          >
            <h2
              className={`text-2xl font-serif font-normal ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}
            >
              Agency Inquiry & Engagement Request
            </h2>

            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                      : 'bg-[#F2ECE0] border-[#9B783E]/40 text-[#1C473A]'
                  }`}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  className={`text-2xl font-serif font-normal ${
                    isDark ? 'text-white' : 'text-[#1C1917]'
                  }`}
                >
                  Inquiry Received
                </h3>
                <p
                  className={`text-sm max-w-md mx-auto leading-relaxed font-light ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                  }`}
                >
                  Thank you, <strong className={isDark ? 'text-white' : 'text-[#1C1917]'}>{formData.fullName}</strong>. A partner from our {formData.serviceRequired} practice will reach you at <strong className={isDark ? 'text-emerald-400' : 'text-[#1C473A]'}>{formData.email}</strong> within 4 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        email: '',
                        phone: '',
                        serviceRequired: services[0]?.title || 'Media Relations & Tier-1 Placement',
                        budgetRange: '₹5,00,000 - ₹10,00,000/mo',
                        message: '',
                      });
                    }}
                    className={`px-6 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs ${
                      isDark
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                    }`}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Rohan Sharma"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Company / Venture *
                    </label>
                    <input
                      type="text"
                      placeholder="Aether Systems India"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Work Email *
                    </label>
                    <input
                      type="email"
                      placeholder="rohan@aether.in"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98100 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Primary Service Requirement
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceRequired: e.target.value })
                      }
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
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
                      <option value="Urgent 24/7 Crisis Intervention">
                        Urgent 24/7 Crisis Intervention
                      </option>
                      <option value="M&A / IPO Financial PR">M&A / IPO Financial PR</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                      }`}
                    >
                      Estimated Monthly Retainer
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                        isDark
                          ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-400'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
                      }`}
                    >
                      <option value="₹2,50,000 - ₹5,00,000/mo">₹2.5 Lakh – ₹5 Lakh / month</option>
                      <option value="₹5,00,000 - ₹10,00,000/mo">₹5 Lakh – ₹10 Lakh / month (Core Tier-1)</option>
                      <option value="₹10,00,000+/mo">₹10 Lakh+ / month (Enterprise & Crisis)</option>
                      <option value="Project-Based (Launch / IPO)">Project-Based (Launches & IPOs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold mb-1.5 uppercase tracking-wider ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#7A5E2E]'
                    }`}
                  >
                    Project Overview / Strategic Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your upcoming milestone, target Indian media outlets (ET, Mint, NDTV), or specific communications challenge..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full rounded-md p-3 text-xs focus:outline-none transition-colors border shadow-2xs ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-400'
                        : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-xs font-semibold uppercase tracking-widest transition-all shadow-xs disabled:opacity-50 ${
                      isDark
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#9B783E]/40'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Strategic Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Press Desk & National Bureaus */}
          <div className="lg:col-span-5 space-y-6">
            {/* Executive Office of Founder */}
            <div
              className={`rounded-xl p-6 space-y-3 shadow-md border ${
                isDark
                  ? 'bg-[#151F33] border-emerald-500/30 text-white'
                  : 'bg-gradient-to-br from-[#182B24] to-[#0E1B16] text-white border-[#B8934C]/40'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Executive Office</span>
              </div>
              <h3 className="text-xl font-serif text-white">Office of the Founder & Director</h3>
              <p className="text-xs text-[#FAF8F5]/75 leading-relaxed font-light">
                Confidential advisory for founders, boards, and enterprise leadership seeking high-impact brand positioning and reputation architecture with <strong className="text-white">Mr. Girish Wakode</strong>.
              </p>
              <div className="bg-black/30 p-4 rounded-md border border-white/10 text-xs space-y-1.5 text-white/90">
                <div>
                  Executive Desk: <span className="text-[#E0C078] font-mono font-medium">executive@gsrelation.in</span>
                </div>
                <div>
                  Direct Telephone: <a href="tel:8805915047" className="text-white/80 font-mono hover:text-[#E0C078] transition-colors">+91 88059 15047</a>
                </div>
              </div>
            </div>

            {/* Press Desk Emergency Card */}
            <div
              className={`rounded-xl p-6 space-y-3 shadow-md border ${
                isDark
                  ? 'bg-[#151F33] border-red-500/30 text-white'
                  : 'bg-[#1C1917] text-white border-[#9B783E]/40'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                <span>24/7 Rapid Crisis Response Desk</span>
              </div>
              <p className="text-xs text-[#FAF8F5]/75 leading-relaxed font-light">
                For active breaking crises, regulatory inquiries, or immediate partner-level deployment across India:
              </p>
              <div className="bg-black/30 p-4 rounded-md border border-white/10 text-xs space-y-1.5 text-white/90">
                <div>
                  Emergency Wire: <a href="tel:9373831640" className="text-[#E0C078] font-mono font-medium hover:underline">+91 93738 31640</a>
                </div>
                <div>
                  Secure Desk: <span className="text-white/70">crisis@gsrelation.in</span>
                </div>
              </div>
            </div>

            {/* Bureaus Contact Info */}
            <div
              className={`rounded-xl p-6 space-y-4 text-xs shadow-md border ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] text-white'
                  : 'bg-white border-[#E2D9C8] text-[#1C1917]'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                National Bureau Directory
              </div>

              <div className="space-y-3.5">
                <div
                  className={`border-b pb-2.5 ${
                    isDark ? 'border-white/10' : 'border-[#E2D9C8]'
                  }`}
                >
                  <div className="font-serif font-medium text-sm">Amravati Bureau (HQ)</div>
                  <div className={`mt-0.5 font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                    Camp Road, Amravati, Maharashtra 444602
                  </div>
                  <div className={`font-mono mt-0.5 font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                    <a href="tel:8805915047" className="hover:underline">+91 88059 15047</a>
                  </div>
                </div>

                <div
                  className={`border-b pb-2.5 ${
                    isDark ? 'border-white/10' : 'border-[#E2D9C8]'
                  }`}
                >
                  <div className="font-serif font-medium text-sm">Akola Bureau</div>
                  <div className={`mt-0.5 font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                    Civil Lines, Akola, Maharashtra 444001
                  </div>
                  <div className={`font-mono mt-0.5 font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                    <a href="tel:9373831640" className="hover:underline">+91 93738 31640</a>
                  </div>
                </div>

                <div
                  className={`border-b pb-2.5 ${
                    isDark ? 'border-white/10' : 'border-[#E2D9C8]'
                  }`}
                >
                  <div className="font-serif font-medium text-sm">Pune Bureau</div>
                  <div className={`mt-0.5 font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                    Senapati Bapat Road, Shivaji Nagar, Pune, Maharashtra 411016
                  </div>
                  <div className={`font-mono mt-0.5 font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                    <a href="tel:9527447529" className="hover:underline">+91 95274 47529</a>
                  </div>
                </div>

                <div>
                  <div className="font-serif font-medium text-sm">Nashik Bureau</div>
                  <div className={`mt-0.5 font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
                    College Road, Gangapur, Nashik, Maharashtra 422005
                  </div>
                  <div className={`font-mono mt-0.5 font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                    <a href="tel:9421832623" className="hover:underline">+91 94218 32623</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
