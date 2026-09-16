import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  ArrowRight,
  ChevronRight,
  Radio,
  Share2,
  Mail,
  Phone
} from 'lucide-react';

export const NewsroomPage: React.FC = () => {
  const { pressReleases = [], navigateTo, showToast, theme } = usePR();
  const isDark = theme === 'midnight';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Clinical & Research',
    'Funding & Capital',
    'Commercial Aviation & Space',
    'Autonomous Robotics',
    'Enterprise AI',
    'Clean Technology'
  ];

  const filteredReleases = (pressReleases || []).filter((pr) => {
    const matchesSearch =
      (pr.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pr.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || (pr.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleDownloadKit = () => {
    showToast('Media Kit Downloaded', 'The GSRelation Executive Media Kit ZIP has commenced download.');
  };

  return (
    <div
      id="newsroom-page"
      className={`min-h-screen py-16 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Press Desk Contact */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2D9C8]'
          }`}
        >
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-[1.5px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <Radio className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`} />
              <span
                className={`text-xs font-semibold tracking-widest uppercase ${
                  isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                }`}
              >
                Official Press & Wire Hub
              </span>
            </div>
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight font-serif leading-tight ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}
            >
              Newsroom & <br />
              <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                Verified Wire Releases
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg leading-relaxed font-light ${
                isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
              }`}
            >
              Official press announcements, embargoed disclosures, executive appointments, and verifiable media advisories distributed by GSRelation.
            </p>
          </div>

          <div
            className={`lg:col-span-4 rounded-xl p-6 space-y-3 shadow-md border ${
              isDark
                ? 'bg-[#151F33] border-emerald-500/30 text-white'
                : 'bg-gradient-to-br from-[#13221E] to-[#0E1815] text-white border-[#B8934C]/40'
            }`}
          >
            <div
              className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${
                isDark ? 'text-emerald-400' : 'text-[#E0C078]'
              }`}
            >
              Media Desk & Press Inquiries
            </div>
            <div className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed">
              Accredited journalists may request embargoed assets, executive interview slots, and high-res broadcast assets.
            </div>
            <div className="pt-2 space-y-2 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                <a href="mailto:press@gsrelation.com" className="hover:text-[#E0C078] transition-colors">
                  press@gsrelation.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                <span className="text-white/80">+91 (11) 4567-8900 (24/7 Desk)</span>
              </div>
            </div>
            <button
              onClick={handleDownloadKit}
              className={`w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs ${
                isDark
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#9B783E] hover:bg-[#856530] text-white border border-[#E0C078]/40'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download Master Media Kit (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#8C8273]" />
            <input
              type="text"
              placeholder="Search wire releases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-md pl-9 pr-3 py-2 text-xs shadow-2xs focus:outline-none transition-colors border ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-white placeholder-slate-400 focus:border-emerald-400'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-[#1C473A] text-white border-[#9B783E]/40 shadow-xs'
                    : isDark
                    ? 'bg-[#151F33] border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-[#DDD4C0] text-[#5C564E] hover:text-[#1C1917] hover:bg-[#F2ECE0]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Releases List */}
        <div className="space-y-3">
          {filteredReleases.length === 0 ? (
            <div
              className={`text-center py-16 rounded-md border text-sm shadow-2xs ${
                isDark
                  ? 'bg-[#151F33] border-slate-800 text-slate-400'
                  : 'bg-white border-[#E2D9C8] text-[#8C8273]'
              }`}
            >
              No press releases matched your query. Try adjusting your search term.
            </div>
          ) : (
            filteredReleases.map((pr) => (
              <div
                key={pr.id}
                onClick={() => navigateTo('press-release', pr.slug || pr.id)}
                className={`rounded-md p-6 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border shadow-2xs hover:shadow-md ${
                  isDark
                    ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                    : 'bg-white border-[#E2D9C8] hover:border-[#9B783E]'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span
                      className={`font-semibold uppercase tracking-wider ${
                        isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                      }`}
                    >
                      {pr.company}
                    </span>
                    <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
                    <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>{pr.date}</span>
                    <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider font-medium border ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#2B2723]'
                      }`}
                    >
                      {pr.category}
                    </span>
                  </div>

                  <h3
                    className={`text-base sm:text-xl font-serif font-normal transition-colors leading-snug ${
                      isDark
                        ? 'text-white group-hover:text-emerald-400'
                        : 'text-[#1C1917] group-hover:text-[#1C473A]'
                    }`}
                  >
                    {pr.title}
                  </h3>

                  <p
                    className={`text-xs line-clamp-2 leading-relaxed font-light ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                    }`}
                  >
                    {pr.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1 transition-colors ${
                      isDark
                        ? 'text-emerald-400 group-hover:text-white'
                        : 'text-[#1C473A] group-hover:text-[#7A5E2E]'
                    }`}
                  >
                    <span>Read Release</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
