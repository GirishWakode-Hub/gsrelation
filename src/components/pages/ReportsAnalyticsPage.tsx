import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  BarChart3,
  TrendingUp,
  Globe2,
  Download,
  Share2,
  Calendar,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  Eye,
  Radio,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  Award,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const ReportsAnalyticsPage: React.FC = () => {
  const {
    clients = [],
    campaigns = [],
    mediaCoverage = [],
    navigateTo,
    setIsConsultationModalOpen,
    showToast,
    theme
  } = usePR();
  const isDark = theme === 'midnight';

  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL'>('ALL');
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('ALL');

  // Syndication & Media Value Trend Data (in INR)
  const performanceTrendData = [
    { month: 'Oct', emv: 35000000, reach: 18.5, placements: 24, tier1: 8 },
    { month: 'Nov', emv: 56000000, reach: 29.2, placements: 38, tier1: 14 },
    { month: 'Dec', emv: 75000000, reach: 41.0, placements: 52, tier1: 21 },
    { month: 'Jan', emv: 104000000, reach: 56.4, placements: 64, tier1: 27 },
    { month: 'Feb', emv: 132000000, reach: 72.8, placements: 81, tier1: 35 },
    { month: 'Mar', emv: 175000000, reach: 98.4, placements: 104, tier1: 46 },
  ];

  // Sentiment Distribution
  const sentimentDistribution = [
    { name: 'Positive / Visionary', value: 74, color: isDark ? '#10B981' : '#1C473A' },
    { name: 'Neutral / Informational', value: 22, color: isDark ? '#64748B' : '#9B783E' },
    { name: 'Adverse / Challenging', value: 4, color: isDark ? '#F43F5E' : '#B91C1C' },
  ];

  // Outlet Tier Breakdown
  const outletTierData = [
    { tier: 'Tier 1 Global (FT, WSJ, Bloomberg, Reuters)', count: 48, emv: '₹11.8 Crore' },
    { tier: 'Tech & Trade Authority (TechCrunch, Wired, Verge)', count: 36, emv: '₹5.6 Crore' },
    { tier: 'Broadcast & Keynotes (CNBC, Bloomberg TV, BBC)', count: 18, emv: '₹7.8 Crore' },
    { tier: 'Syndicated Wire & Industry Portals', count: 112, emv: '₹2.6 Crore' },
  ];

  // Regional Syndication Breakdown
  const regionalData = [
    { region: 'North America (NYC / SF)', percentage: '46%', volume: '142 Placements' },
    { region: 'United Kingdom & EMEA (London / Zurich)', percentage: '32%', volume: '98 Placements' },
    { region: 'India Regional Bureaus (Amravati / Akola / Pune / Nashik)', percentage: '22%', volume: '68 Placements' },
  ];

  const handleExportAudit = (format: 'PDF' | 'CSV') => {
    showToast(
      `Executive PR Report Exported (${format})`,
      `The Q1 2025 Global Media & Sentiment Audit has been compiled and downloaded.`,
      'success'
    );
  };

  return (
    <div
      id="reports-analytics-page"
      className={`space-y-16 pb-24 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      {/* Page Header Marquee */}
      <section
        className={`relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b ${
          isDark
            ? 'bg-[#0B101D] text-white border-white/10'
            : 'bg-[#1C473A] text-white border-[#9B783E]/30'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/15">
            <div className="max-w-3xl space-y-3">
              <div
                className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Media Intelligence &amp; Analytics</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white">
                Reports &amp; <span className={`italic font-serif ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>Media Analytics</span>
              </h1>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-2xl">
                Rigorous measurement of earned media value (EMV), narrative penetration, sentiment attribution, and tier-one press distribution across Amravati, Akola, Pune, and Nashik bureaus.
              </p>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleExportAudit('PDF')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Executive PDF</span>
              </button>

              <button
                onClick={() => handleExportAudit('CSV')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm ${
                  isDark
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                    : 'bg-[#9B783E] hover:bg-[#856530] text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export Dataset (.CSV)</span>
              </button>
            </div>
          </div>

          {/* Key Executive Macro Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1">
                Total Earned Media Value (EMV)
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
                ₹57.8 Crore
              </div>
              <div className={`flex items-center gap-1 text-[11px] mt-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+38.4% vs Previous Cycle</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1">
                Total Audience Reach
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
                316.3M
              </div>
              <div className={`flex items-center gap-1 text-[11px] mt-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                <Globe2 className="w-3.5 h-3.5" />
                <span>Global Syndication Reach</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1">
                Tier-1 Editorial Features
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
                102 Placements
              </div>
              <div className={`flex items-center gap-1 text-[11px] mt-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                <Award className="w-3.5 h-3.5" />
                <span>WSJ, FT, Bloomberg &amp; CNBC</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1">
                Positive Narrative Index
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
                96.2%
              </div>
              <div className={`flex items-center gap-1 text-[11px] mt-2 font-semibold ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>High-Fidelity Resonance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analytics Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Filter & Period Selector Strip */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border shadow-xs ${
            isDark
              ? 'bg-[#151F33] border-[#1E293B]'
              : 'bg-white border-[#E5DECE]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-[#7A5E2E]'}`} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-[#1C1917]'}`}>
              Timeframe:
            </span>
            <div className={`flex items-center gap-1 p-1 rounded-lg border ${isDark ? 'bg-[#0B101D] border-slate-800' : 'bg-[#FAF8F5] border-[#E5DECE]'}`}>
              {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedQuarter === q
                      ? isDark
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-[#1C473A] text-white'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-[#5C564E] hover:text-[#1C1917]'
                  }`}
                >
                  {q === 'ALL' ? 'Trailing 6 Months' : `2025 ${q}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-[#1C1917]'}`}>
              Client Mandate:
            </span>
            <select
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
              className={`text-xs rounded-md p-2 focus:outline-none font-medium border ${
                isDark
                  ? 'bg-[#0B101D] border-slate-700 text-white focus:border-emerald-500'
                  : 'bg-[#FAF8F5] border-[#DDD4C0] text-[#1C1917] focus:border-[#9B783E]'
              }`}
            >
              <option value="ALL">All Active Retainer Accounts</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.industry})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Chart Grid: Velocity & Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Earned Media Value & Growth Curve */}
          <div
            className={`lg:col-span-8 p-6 sm:p-8 rounded-xl border shadow-xs space-y-6 ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B]'
                : 'bg-white border-[#E5DECE]'
            }`}
          >
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
              <div>
                <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  Earned Media Value ($) &amp; Audience Velocity
                </h3>
                <p className={`text-xs font-light mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#5C564E]'}`}>
                  Monthly compounding narrative reach and estimated advertising equivalent equivalence.
                </p>
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  isDark
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-[#9B783E]/15 text-[#7A5E2E] border-[#9B783E]/30'
                }`}
              >
                Audited Metric
              </span>
            </div>

            <div className="h-[320px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrendData}>
                  <defs>
                    <linearGradient id="emvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isDark ? '#10B981' : '#9B783E'}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={isDark ? '#10B981' : '#9B783E'}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#E5DECE'} vertical={false} />
                  <XAxis dataKey="month" stroke={isDark ? '#94A3B8' : '#78716C'} fontSize={12} tickLine={false} />
                  <YAxis
                    stroke={isDark ? '#94A3B8' : '#78716C'}
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(val) => `₹${(val / 10000000).toFixed(0)}Cr`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0B101D' : '#1C473A',
                      border: isDark ? '1px solid #1E293B' : '1px solid #9B783E',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`₹${(val / 10000000).toFixed(2)} Crore`, 'Earned Media Value']}
                  />
                  <Area
                    type="monotone"
                    dataKey="emv"
                    stroke={isDark ? '#10B981' : '#9B783E'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#emvGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className={`grid grid-cols-3 gap-4 pt-4 border-t text-center ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
              <div>
                <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                  Peak Month EMV
                </div>
                <div className={`text-base font-serif font-medium mt-0.5 ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  ₹17.5 Crore
                </div>
              </div>
              <div>
                <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                  Total Placements
                </div>
                <div className={`text-base font-serif font-medium mt-0.5 ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  363 Articles
                </div>
              </div>
              <div>
                <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                  Average Placement EMV
                </div>
                <div className={`text-base font-serif font-medium mt-0.5 ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  ₹15.9 Lakh / feature
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sentiment & Message Resonance */}
          <div
            className={`lg:col-span-4 p-6 sm:p-8 rounded-xl border shadow-xs space-y-6 flex flex-col justify-between ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B]'
                : 'bg-white border-[#E5DECE]'
            }`}
          >
            <div className={`pb-4 border-b ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
              <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                Sentiment Attribution
              </h3>
              <p className={`text-xs font-light mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#5C564E]'}`}>
                AI NLP classification across 450+ global publications.
              </p>
            </div>

            <div className="h-[220px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentDistribution}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0B101D' : '#1C473A',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '12px',
                    }}
                    formatter={(val: number) => [`${val}%`, 'Coverage Volume']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className={`text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>74%</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>Positive</span>
              </div>
            </div>

            <div className={`space-y-2.5 pt-4 border-t ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
              {sentimentDistribution.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-[#5C564E]'}`}>{s.name}</span>
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outlet Tiers & Regional Distribution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Outlet Tier Breakdown Table */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 rounded-xl border shadow-xs space-y-6 ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B]'
                : 'bg-white border-[#E5DECE]'
            }`}
          >
            <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
              <div>
                <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  Media Placement Breakdown by Tier
                </h3>
                <p className={`text-xs font-light mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#5C564E]'}`}>
                  Editorial weight and estimated value by publication classification.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-semibold uppercase tracking-wider ${isDark ? 'border-white/10 text-slate-400' : 'border-[#E5DECE] text-[#7A5E2E]'}`}>
                    <th className="pb-3">Outlet Classification</th>
                    <th className="pb-3 text-center">Volume</th>
                    <th className="pb-3 text-right">Generated EMV</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5 text-slate-300' : 'divide-[#E5DECE] text-[#3E3832]'}`}>
                  {outletTierData.map((tier, idx) => (
                    <tr key={idx} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-[#FAF8F5]'}`}>
                      <td className={`py-3.5 font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#9B783E]'}`} />
                        <span>{tier.tier}</span>
                      </td>
                      <td className="py-3.5 text-center font-semibold">{tier.count}</td>
                      <td className={`py-3.5 text-right font-serif font-medium ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
                        {tier.emv}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Bureau Syndication */}
          <div
            className={`lg:col-span-5 p-6 sm:p-8 rounded-xl border shadow-xs space-y-6 flex flex-col justify-between ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B]'
                : 'bg-white border-[#E5DECE]'
            }`}
          >
            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-white/10' : 'border-[#E5DECE]'}`}>
                <div>
                  <h3 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                    Geographic Syndication
                  </h3>
                  <p className={`text-xs font-light mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#5C564E]'}`}>
                    Distribution across GSRelation's primary bureau networks.
                  </p>
                </div>
                <Globe2 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}`} />
              </div>

              <div className="space-y-4 pt-4">
                {regionalData.map((reg) => (
                  <div
                    key={reg.region}
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'bg-[#0B101D] border-slate-800'
                        : 'bg-[#FAF8F5] border-[#E5DECE]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className={isDark ? 'text-white' : 'text-[#1C1917]'}>{reg.region}</span>
                      <span className={isDark ? 'text-emerald-400 font-bold' : 'text-[#7A5E2E] font-bold'}>
                        {reg.percentage}
                      </span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-[#DDD4C0]'}`}>
                      <div
                        className={`h-full rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#1C473A]'}`}
                        style={{ width: reg.percentage }}
                      />
                    </div>
                    <div className={`text-[10px] mt-1.5 font-light ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                      {reg.volume} syndicated across local &amp; trade press
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Consultation Callout */}
            <div
              className={`p-5 rounded-xl border mt-4 flex items-center justify-between gap-4 ${
                isDark
                  ? 'bg-[#0B101D] border-slate-800'
                  : 'bg-[#FAF8F5] border-[#E5DECE]'
              }`}
            >
              <div className="text-xs">
                <span className={`font-semibold block ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                  Require bespoke reporting?
                </span>
                <p className={`text-[11px] font-light ${isDark ? 'text-slate-400' : 'text-[#5C564E]'}`}>
                  Our analysts build tailored media attribution decks for Board presentations.
                </p>
              </div>
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs shrink-0 ${
                  isDark
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                    : 'bg-[#1C473A] hover:bg-[#15382E] text-white'
                }`}
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
