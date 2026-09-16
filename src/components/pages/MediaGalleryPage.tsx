import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  Download,
  Filter,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  ExternalLink,
  Shield,
  Search
} from 'lucide-react';

export const MediaGalleryPage: React.FC = () => {
  const { mediaAssets = [], showToast, theme } = usePR();
  const isDark = theme === 'midnight';
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['ALL', 'LOGOS', 'EXECUTIVE_HEADSHOTS', 'PRODUCT_IMAGES', 'FACTSHEETS', 'BRAND_GUIDELINES'];

  const filteredAssets = (mediaAssets || []).filter((asset) => {
    const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
    const matchesSearch =
      (asset.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.format || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    showToast('Asset Downloaded', `${title} has been downloaded in original high-resolution format.`);
  };

  const handleDownloadAll = () => {
    showToast('Master Press Pack Downloaded', 'Downloading all high-res assets, vector logos, and executive bios (.ZIP, 142MB).');
  };

  return (
    <div
      id="media-gallery-page"
      className={`min-h-screen py-16 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b ${
            isDark ? 'border-white/10' : 'border-[#E5DECE]'
          }`}
        >
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 font-semibold tracking-widest text-xs uppercase">
              <span className={`w-8 h-[2px] ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`}></span>
              <span className={isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}>
                Approved Press &amp; Editorial Assets
              </span>
            </div>
            <h1
              className={`text-4xl sm:text-6xl font-serif tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-[#1C1917]'
              }`}
            >
              Media Kit &amp; <br />
              <span className={`italic font-serif font-normal ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                High-Resolution Asset Gallery
              </span>
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed font-light ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              Official press photography, 4K b-roll stills, vector logomarks, executive headshots, and corporate factsheets cleared for editorial publication.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-md transition-all self-start lg:self-auto ${
              isDark
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                : 'bg-[#1C473A] hover:bg-[#15382E] text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download Master Asset Pack (ZIP)</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`} />
            <input
              type="text"
              placeholder="Search assets by client, format..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-md pl-9 pr-3 py-2 text-xs transition-colors border shadow-xs focus:outline-none ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E]'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-xs'
                      : 'bg-[#1C473A] text-white border-[#1C473A] shadow-xs'
                    : isDark
                    ? 'bg-[#151F33] border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border-[#DDD4C0] text-[#5C564E] hover:text-[#1C1917] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className={`rounded-xl overflow-hidden group flex flex-col justify-between transition-all duration-300 border shadow-xs hover:shadow-md ${
                isDark
                  ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/50'
                  : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
              }`}
            >
              <div className={`relative h-44 flex items-center justify-center overflow-hidden ${isDark ? 'bg-[#0E1726]' : 'bg-[#FAF8F5]'}`}>
                {asset.previewUrl ? (
                  <img
                    src={asset.previewUrl}
                    alt={asset.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className={`flex flex-col items-center gap-2 ${isDark ? 'text-slate-500' : 'text-[#8C8273]'}`}>
                    <FileText className="w-10 h-10" />
                    <span className="text-[11px] font-mono">{asset.format}</span>
                  </div>
                )}
                <div
                  className={`absolute top-2.5 right-2.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-mono font-semibold shadow-xs ${
                    isDark
                      ? 'bg-[#0B101D]/90 text-slate-200 border border-slate-700'
                      : 'bg-[#1C473A] text-white border border-[#9B783E]/30'
                  }`}
                >
                  {asset.fileSize}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}`}>
                    {asset.clientName}
                  </div>
                  <h3 className={`text-sm font-serif leading-snug mt-1 ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                    {asset.title}
                  </h3>
                </div>

                <div className={`pt-3 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>{asset.format}</span>
                  <button
                    onClick={() => handleDownload(asset.title)}
                    className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#1C473A] hover:text-[#9B783E]'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Usage Rights Disclaimer */}
        <div
          className={`rounded-xl p-6 flex items-start gap-4 text-xs leading-relaxed font-light border shadow-md ${
            isDark
              ? 'bg-[#151F33] text-white border-slate-800'
              : 'bg-[#1C473A] text-white border-[#9B783E]/40'
          }`}
        >
          <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
          <div>
            <strong className="text-white font-medium block mb-1">Editorial Usage Guidelines</strong>
            <p className="text-white/85">
              All photographic stills, b-roll packages, and vector marks contained in this gallery are authorized solely for accredited news, editorial, and journalistic coverage of GSRelation PR and its verified clients. Commercial alteration, unauthorized merchandising, or third-party endorsements are strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
