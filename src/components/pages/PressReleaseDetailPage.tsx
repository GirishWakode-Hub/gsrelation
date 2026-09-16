import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Building,
  Download,
  Share2,
  Copy,
  Printer,
  Mail,
  Phone,
  FileText,
  Quote,
  CheckCircle2
} from 'lucide-react';

export const PressReleaseDetailPage: React.FC = () => {
  const { selectedPressReleaseSlug, pressReleases = [], navigateTo, showToast, theme } = usePR();
  const isDark = theme === 'midnight';

  const safeReleases = pressReleases || [];
  const release = safeReleases.find(
    (p) => p.slug === selectedPressReleaseSlug || p.id === selectedPressReleaseSlug
  ) || safeReleases[0];

  if (!release) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0B101D] text-white' : 'bg-[#FAF8F5] text-[#1C1917]'
        }`}
      >
        <div className="text-center space-y-4">
          <p className={isDark ? 'text-white/50' : 'text-[#8C8273]'}>Press release not found.</p>
          <button
            onClick={() => navigateTo('newsroom')}
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-white ${
              isDark ? 'bg-emerald-600' : 'bg-[#1C473A]'
            }`}
          >
            Back to Newsroom
          </button>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Press release URL copied to clipboard.');
    }
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([`${release.title}\n\n${release.content}\n\nMedia Contact:\n${release.mediaContact.name} - ${release.mediaContact.email}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${release.slug || 'press-release'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Release Downloaded', 'Plain text AP release saved.');
  };

  return (
    <div
      id="press-release-detail-page"
      className={`min-h-screen py-12 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation & Action Strip */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 border-b pb-6 ${
            isDark ? 'border-white/10' : 'border-[#E5DECE]'
          }`}
        >
          <button
            onClick={() => navigateTo('newsroom')}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-[#7A5E2E] hover:text-[#1C473A]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Newsroom</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border shadow-xs ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917] hover:bg-[#FAF8F5]'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
            <button
              onClick={handleDownloadText}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border shadow-xs ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917] hover:bg-[#FAF8F5]'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>

        {/* AP Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-md border ${
                isDark
                  ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                  : 'bg-[#9B783E]/15 border-[#9B783E]/30 text-[#7A5E2E]'
              }`}
            >
              FOR IMMEDIATE RELEASE
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              {release.date}
            </span>
          </div>

          <h1
            className={`text-2xl sm:text-5xl font-serif tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            {release.title}
          </h1>

          {release.subtitle && (
            <p
              className={`text-base sm:text-lg font-light leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
              }`}
            >
              {release.subtitle}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs pt-1">
            <span className={`font-semibold uppercase tracking-wider text-[11px] ${isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}`}>
              {release.dateline}
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>—</span>
            <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-[#1C1917]'}`}>
              {release.company}
            </span>
          </div>
        </div>

        {/* Featured Image if present */}
        {release.image && (
          <div
            className={`rounded-xl overflow-hidden border shadow-md ${
              isDark ? 'border-[#1E293B]' : 'border-[#E5DECE]'
            }`}
          >
            <img
              src={release.image}
              alt={release.title}
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Press Release Body Text (Editorial / Newsreader typography) */}
        <div
          className={`rounded-xl p-6 sm:p-10 space-y-8 border shadow-sm ${
            isDark
              ? 'bg-[#151F33] border-[#1E293B] text-slate-200'
              : 'bg-white border-[#E5DECE] text-[#1C1917]'
          }`}
        >
          <div className="max-w-none text-sm sm:text-base leading-relaxed space-y-5 font-serif font-light">
            {release.content.split('\n\n').map((para, i) => (
              <p key={i} className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#3E3832]'}`}>
                {para}
              </p>
            ))}
          </div>

          {/* Quotes highlight */}
          {release.quotes && release.quotes.length > 0 && (
            <div
              className={`pt-6 border-t space-y-4 not-prose ${
                isDark ? 'border-white/10' : 'border-[#E5DECE]'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                Executive Commentary
              </div>
              {release.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border space-y-2 border-l-4 ${
                    isDark
                      ? 'bg-[#0E1726] border-slate-800 border-l-emerald-500'
                      : 'bg-[#FAF8F5] border-[#E5DECE] border-l-[#9B783E]'
                  }`}
                >
                  <p className={`text-xs sm:text-sm italic leading-relaxed font-serif ${isDark ? 'text-slate-200' : 'text-[#1C1917]'}`}>
                    "{q.quote}"
                  </p>
                  <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                    — {q.author},{' '}
                    <span className={`font-light ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                      {(q as any).title || (q as any).role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Boilerplate "About Company" */}
          {release.boilerplate && (
            <div
              className={`pt-6 border-t space-y-2 not-prose ${
                isDark ? 'border-white/10' : 'border-[#E5DECE]'
              }`}
            >
              <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`}>
                About {release.company}
              </div>
              <p className={`text-xs leading-relaxed font-light ${isDark ? 'text-slate-300' : 'text-[#5C564E]'}`}>
                {release.boilerplate}
              </p>
            </div>
          )}

          {/* Media Contact Block */}
          <div
            className={`pt-6 border-t not-prose rounded-xl p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md ${
              isDark
                ? 'bg-[#0B101D] text-white border-slate-800'
                : 'bg-[#1C473A] text-white border-[#9B783E]/40'
            }`}
          >
            <div>
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-1 ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                Authorized Media Contact
              </div>
              <div className="text-base font-serif text-white">{release.mediaContact.name}</div>
              <div className="text-xs text-white/80 font-light">{release.mediaContact.title}</div>
            </div>

            <div className="space-y-1.5 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                <a
                  href={`mailto:${release.mediaContact.email}`}
                  className="hover:underline font-light"
                >
                  {release.mediaContact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                <span className="font-mono text-white/80">{release.mediaContact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
