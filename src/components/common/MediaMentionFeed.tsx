import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  RefreshCw,
  ExternalLink,
  Globe,
  TrendingUp,
  Radio,
  Copy,
  Check,
  Sparkles,
  Newspaper,
  Clock,
  Building2,
  Tag,
  Filter,
  Eye,
  ShieldCheck,
  BarChart3,
  Flame,
  ChevronDown
} from 'lucide-react';
import { MediaMention } from '../../types';
import { api } from '../../lib/api';
import { usePR } from '../../context/PRContext';

interface MediaMentionFeedProps {
  initialBrand?: string;
  className?: string;
}

const FEATURED_CLIENT_BRANDS = [
  'All Tracked Brands',
  'BharatQuantum Dynamics',
  'Niramaya BioDiagnostics',
  'AgroVeda BioSciences',
  'VyomSpace Propulsion',
  'Kaveri FinTech',
  'Samriddhi Sustainable Wealth',
  'Veda Living & Design'
];

export const MediaMentionFeed: React.FC<MediaMentionFeedProps> = ({
  initialBrand = 'All Tracked Brands',
  className = ''
}) => {
  const { clients, theme } = usePR();
  const isDark = theme === 'midnight';
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('ALL');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  
  const [mentions, setMentions] = useState<MediaMention[]>([]);
  const [groundingQueries, setGroundingQueries] = useState<string[]>([]);
  const [groundingSources, setGroundingSources] = useState<Array<{ title: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean>(false);

  // Fetch mentions
  const fetchMentions = async (brand: string, isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const brandParam = brand === 'All Tracked Brands' ? '' : brand;
      const res = await api.getMediaMentions(brandParam);
      if (res && res.mentions) {
        setMentions(res.mentions);
        setGroundingQueries(res.groundingQueries || [`${brand || 'Top Indian innovation clients'} media press mentions`]);
        setGroundingSources(res.groundingSources || []);
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to load media mentions feed:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Custom search trigger
  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsRefreshing(true);
    try {
      const res = await api.trackMediaMentions({
        brandName: searchQuery.trim(),
        query: searchQuery.trim()
      });
      if (res && res.mentions) {
        setMentions(res.mentions);
        setGroundingQueries(res.groundingQueries || [`${searchQuery} live news mentions`]);
        setGroundingSources(res.groundingSources || []);
        setSelectedBrand(searchQuery.trim());
        setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error('Error executing custom brand tracking:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMentions(selectedBrand);
  }, [selectedBrand]);

  // Auto-refresh interval if enabled
  useEffect(() => {
    if (!autoRefreshEnabled) return;
    const interval = setInterval(() => {
      fetchMentions(selectedBrand, true);
    }, 45000); // refresh every 45s
    return () => clearInterval(interval);
  }, [autoRefreshEnabled, selectedBrand]);

  // Filter mentions locally by search, sentiment, tier
  const filteredMentions = useMemo(() => {
    return mentions.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.publication.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSentiment =
        sentimentFilter === 'ALL' || item.sentiment.toUpperCase() === sentimentFilter.toUpperCase();

      const matchesTier =
        tierFilter === 'ALL' ||
        (item.publicationTier || '').toLowerCase().includes(tierFilter.toLowerCase());

      return matchesSearch && matchesSentiment && matchesTier;
    });
  }, [mentions, searchQuery, sentimentFilter, tierFilter]);

  // Stats calculation
  const totalMentionsCount = mentions.length;
  const positiveSentimentShare = useMemo(() => {
    if (!mentions.length) return '94%';
    const positiveOrSpotlight = mentions.filter(
      (m) => m.sentiment === 'POSITIVE' || m.sentiment === 'SPOTLIGHT' || m.sentiment === 'STRATEGIC'
    ).length;
    return `${Math.round((positiveOrSpotlight / mentions.length) * 100)}%`;
  }, [mentions]);

  const tier1Count = useMemo(() => {
    return mentions.filter((m) => (m.publicationTier || '').includes('Tier 1') || m.publication.includes('Economic Times') || m.publication.includes('Mint') || m.publication.includes('NDTV')).length;
  }, [mentions]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment.toUpperCase()) {
      case 'POSITIVE':
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isDark
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                : 'bg-[#1C473A]/10 text-[#1C473A] border-[#1C473A]/20'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-emerald-400 animate-pulse' : 'bg-[#1C473A]'
              }`}
            ></span>
            Positive Sentiment
          </span>
        );
      case 'SPOTLIGHT':
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isDark
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                : 'bg-[#9B783E]/10 text-[#7A5E2E] border-[#9B783E]/30'
            }`}
          >
            <Flame className={`w-3 h-3 ${isDark ? 'text-amber-400' : 'text-[#9B783E]'}`} />
            Lead Spotlight
          </span>
        );
      case 'STRATEGIC':
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isDark
                ? 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                : 'bg-[#1C473A]/10 text-[#1C473A] border-[#1C473A]/30'
            }`}
          >
            <ShieldCheck className={`w-3 h-3 ${isDark ? 'text-blue-400' : 'text-[#1C473A]'}`} />
            Strategic Milestone
          </span>
        );
      default:
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-[#F2ECE1] text-[#6B6255] border-[#DDD4C0]'
            }`}
          >
            Neutral / Wire
          </span>
        );
    }
  };

  return (
    <div
      id="media-mention-feed-root"
      className={`rounded-xl border shadow-sm overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#151F33] border-[#1E293B]'
          : 'bg-white border-[#E5DECE]'
      } ${className}`}
    >
      {/* Top Header / Radar Bar */}
      <div
        className={`p-6 sm:p-8 border-b relative overflow-hidden ${
          isDark
            ? 'bg-[#0B101D] text-white border-slate-800'
            : 'bg-gradient-to-r from-[#1C473A] via-[#16382E] to-[#122E26] text-white border-[#1C473A]'
        }`}
      >
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#9B783E]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider text-[10px] border ${
                  isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-[#9B783E]/20 text-[#E0C078] border-[#9B783E]/40'
                }`}
              >
                <Radio className={`w-3 h-3 animate-pulse ${isDark ? 'text-emerald-400' : 'text-[#E0C078]'}`} />
                Google Search Grounded
              </span>
              <span className="text-white/70 font-mono text-[11px]">
                Last Grounded Sync: {lastUpdated} IST
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-white flex items-center gap-3">
              <span>Media Mention</span>
              <span className="italic font-normal text-[#E0C078]">Live Radar Feed</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm max-w-2xl font-light leading-relaxed">
              Real-time editorial pickups, wire citations, and executive press tracking across Tier-1 Indian newsrooms grounded via Google Search.
            </p>
          </div>

          {/* Action controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="auto-sync-toggle-btn"
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className={`px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors border ${
                autoRefreshEnabled
                  ? isDark
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-white/20 border-white/40 text-white'
                  : 'bg-black/30 border-white/20 text-white/90 hover:bg-black/40'
              }`}
              title="Toggle automatic periodic feed refresh"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  autoRefreshEnabled ? 'bg-emerald-400 animate-ping' : 'bg-white/40'
                }`}
              />
              <span>{autoRefreshEnabled ? 'Auto-Sync On (45s)' : 'Auto-Sync Off'}</span>
            </button>

            <button
              id="refresh-media-feed-btn"
              onClick={() => fetchMentions(selectedBrand, true)}
              disabled={isRefreshing || isLoading}
              className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 ${
                isDark
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#9B783E] hover:bg-[#8A6A34] text-white border border-[#E0C078]/40'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Grounded Syncing...' : 'Refresh Feed'}</span>
            </button>
          </div>
        </div>

        {/* Live Grounding Stats Bar */}
        <div
          className={`mt-6 pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-left ${
            isDark ? 'border-slate-800/80' : 'border-white/20'
          }`}
        >
          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-black/20 border-white/10'
            }`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-[#E0C078]" />
              <span>Tracked Hits</span>
            </div>
            <div className="text-xl font-serif text-white mt-1">{totalMentionsCount} Articles</div>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-black/20 border-white/10'
            }`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tier-1 Outlets</span>
            </div>
            <div className="text-xl font-serif text-emerald-300 mt-1">{tier1Count} Placements</div>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-black/20 border-white/10'
            }`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#E0C078]" />
              <span>Favorable Sentiment</span>
            </div>
            <div className="text-xl font-serif text-white mt-1">{positiveSentimentShare}</div>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-black/20 border-white/10'
            }`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#E0C078]" />
              <span>Editorial Reach</span>
            </div>
            <div className="text-xl font-serif text-[#E0C078] mt-1">18.4M Readers</div>
          </div>
        </div>
      </div>

      {/* Brand Selector & Search Ribbon */}
      <div
        className={`p-4 sm:p-6 border-b space-y-4 ${
          isDark ? 'bg-[#0E1726] border-[#1E293B]' : 'bg-[#FAF8F5] border-[#E5DECE]'
        }`}
      >
        {/* Brand Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-[#7A5E2E]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand Roster:</span>
          </span>
          {FEATURED_CLIENT_BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSelectedBrand(brand);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${
                selectedBrand === brand
                  ? isDark
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'bg-[#1C473A] text-white font-semibold shadow-xs border border-[#9B783E]/30'
                  : isDark
                  ? 'bg-[#151F33] border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white border border-[#DDD4C0] text-[#5C564E] hover:text-[#1C1917] hover:bg-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <form onSubmit={handleCustomSearch} className="md:col-span-6 relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`} />
            <input
              id="media-mention-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mentions by headline, journalist, or topic..."
              className={`w-full pl-9 pr-24 py-2 rounded-md text-xs transition-colors focus:outline-none ${
                isDark
                  ? 'bg-[#151F33] border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-400'
                  : 'bg-white border border-[#DDD4C0] text-[#1C1917] placeholder:text-[#8C8273] focus:border-[#9B783E]'
              }`}
            />
            {searchQuery && (
              <button
                type="submit"
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider text-white ${
                  isDark ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-[#1C473A] hover:bg-[#15382E]'
                }`}
              >
                Track
              </button>
            )}
          </form>

          {/* Sentiment Filter */}
          <div className="md:col-span-3">
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 border ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-slate-300'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917]'
              }`}
            >
              <Filter className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`} />
              <select
                id="sentiment-filter-select"
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
                className="w-full bg-transparent text-xs focus:outline-none font-medium cursor-pointer"
              >
                <option value="ALL" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>All Sentiments</option>
                <option value="POSITIVE" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Positive Only</option>
                <option value="SPOTLIGHT" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Spotlight / Lead</option>
                <option value="STRATEGIC" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Strategic Milestone</option>
                <option value="NEUTRAL" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Neutral / Wire</option>
              </select>
            </div>
          </div>

          {/* Tier Filter */}
          <div className="md:col-span-3">
            <div
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 border ${
                isDark
                  ? 'bg-[#151F33] border-slate-700 text-slate-300'
                  : 'bg-white border-[#DDD4C0] text-[#1C1917]'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`} />
              <select
                id="tier-filter-select"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full bg-transparent text-xs focus:outline-none font-medium cursor-pointer"
              >
                <option value="ALL" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>All Publication Tiers</option>
                <option value="Tier 1" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Tier 1 National (ET, Mint, BS)</option>
                <option value="National Business" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>National Business</option>
                <option value="Tech Wire" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Tech & Venture Wires</option>
                <option value="Trade Media" className={isDark ? 'bg-[#151F33]' : 'bg-white'}>Trade & Sectoral Media</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Grounding Query Trace Badge */}
        {groundingQueries.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
            <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-[#7A5E2E]'}`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
              <span>Google Search Grounding Traces:</span>
            </span>
            {groundingQueries.map((q, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] border ${
                  isDark
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                    : 'bg-[#9B783E]/10 text-[#7A5E2E] border-[#9B783E]/30'
                }`}
              >
                "{q}"
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Feed Body */}
      <div className={`p-6 sm:p-8 ${isDark ? 'bg-[#151F33]' : 'bg-white'}`}>
        {isLoading ? (
          <div className="space-y-4 py-8">
            <div className="flex flex-col items-center justify-center space-y-3">
              <RefreshCw className={`w-8 h-8 animate-spin ${isDark ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                Grounding media mentions via Google Search...
              </p>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                Scanning wire syndication, business dailies, and national broadcast coverage.
              </p>
            </div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border animate-pulse space-y-3 ${
                  isDark ? 'bg-[#0E1726] border-slate-800' : 'bg-[#FAF8F5] border-[#E5DECE]'
                }`}
              >
                <div className={`h-4 rounded w-1/3 ${isDark ? 'bg-slate-700' : 'bg-[#EAE4D5]'}`}></div>
                <div className={`h-6 rounded w-3/4 ${isDark ? 'bg-slate-700' : 'bg-[#EAE4D5]'}`}></div>
                <div className={`h-4 rounded w-full ${isDark ? 'bg-slate-700' : 'bg-[#EAE4D5]'}`}></div>
              </div>
            ))}
          </div>
        ) : filteredMentions.length === 0 ? (
          <div
            className={`text-center py-16 space-y-3 border border-dashed rounded-lg ${
              isDark
                ? 'border-slate-700 bg-[#0E1726]/50'
                : 'border-[#DDD4C0] bg-[#FAF8F5]/80'
            }`}
          >
            <Newspaper className={`w-10 h-10 mx-auto ${isDark ? 'text-slate-600' : 'text-[#8C8273]'}`} />
            <h4 className={`text-base font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
              No media mentions match current filters
            </h4>
            <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              Try adjusting your search query, clearing filters, or choosing "All Tracked Brands" to see full radar coverage.
            </p>
            <button
              onClick={() => {
                setSelectedBrand('All Tracked Brands');
                setSearchQuery('');
                setSentimentFilter('ALL');
                setTierFilter('ALL');
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold shadow-xs transition-colors border ${
                isDark
                  ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white'
                  : 'bg-white border-[#DDD4C0] hover:bg-[#FAF8F5] text-[#1C1917]'
              }`}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            id="media-mention-scroll-container"
            className="space-y-5 max-h-[680px] overflow-y-auto pr-2 focus:outline-none"
            tabIndex={0}
            aria-label="Scrollable list of media mentions"
          >
            {filteredMentions.map((mention) => (
              <article
                key={mention.id}
                id={mention.id}
                className={`rounded-xl p-6 transition-all duration-200 border shadow-xs hover:shadow-md space-y-4 group relative ${
                  isDark
                    ? 'bg-[#0E1726] border-[#1E293B] hover:border-emerald-500/40 text-white'
                    : 'bg-white border-[#E5DECE] hover:border-[#9B783E] text-[#1C1917]'
                }`}
              >
                {/* Card Header Row */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 text-xs border-b pb-3 ${
                    isDark ? 'border-slate-800' : 'border-[#E5DECE]'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-semibold text-[10px] uppercase tracking-wider ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#1C473A] text-white'
                      }`}
                    >
                      {mention.brandName}
                    </span>

                    <span className="font-semibold flex items-center gap-1.5">
                      <Newspaper className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'}`} />
                      <span>{mention.publication}</span>
                    </span>

                    {mention.publicationTier && (
                      <span
                        className={`px-2 py-0.5 rounded-sm font-medium text-[10px] border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-[#FAF8F5] text-[#5C564E] border-[#DDD4C0]'
                        }`}
                      >
                        {mention.publicationTier}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {getSentimentBadge(mention.sentiment)}

                    <span className={`text-[11px] flex items-center gap-1 font-mono ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                      <Clock className="w-3 h-3" />
                      <span>{mention.relativeTime || 'Recent'}</span>
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <h3
                    className={`text-base sm:text-lg font-serif transition-colors leading-snug ${
                      isDark ? 'text-white group-hover:text-emerald-400' : 'text-[#1C1917] group-hover:text-[#1C473A]'
                    }`}
                  >
                    <a
                      href={mention.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-start gap-1.5"
                    >
                      <span>{mention.headline}</span>
                      <ExternalLink
                        className={`w-4 h-4 shrink-0 mt-1 transition-colors ${
                          isDark ? 'text-slate-500 group-hover:text-emerald-400' : 'text-[#8C8273] group-hover:text-[#1C473A]'
                        }`}
                      />
                    </a>
                  </h3>
                </div>

                {/* Snippet / Quote Box */}
                <div
                  className={`p-3.5 rounded-r-md text-xs sm:text-sm leading-relaxed font-light border-l-2 ${
                    isDark
                      ? 'bg-[#151F33] border-emerald-500 text-slate-300'
                      : 'bg-[#FAF8F5] border-[#9B783E] text-[#5C564E]'
                  }`}
                >
                  <p>{mention.snippet}</p>
                </div>

                {/* Tags & Metadata Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  {/* Key Topics / Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {mention.keyTopics && mention.keyTopics.length > 0 ? (
                      mention.keyTopics.map((topic, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-[#F2ECE1] text-[#5C564E] border-[#DDD4C0]'
                          }`}
                        >
                          <Tag className="w-2.5 h-2.5 opacity-60" />
                          <span>{topic}</span>
                        </span>
                      ))
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-[#F2ECE1] text-[#5C564E] border-[#DDD4C0]'
                        }`}
                      >
                        <Tag className="w-2.5 h-2.5 opacity-60" />
                        <span>Executive PR</span>
                      </span>
                    )}

                    {mention.author && (
                      <span className={`text-[11px] ml-1 ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                        By <strong className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>{mention.author}</strong>
                      </span>
                    )}
                  </div>

                  {/* Reach estimate & Copy action */}
                  <div className={`flex items-center gap-4 text-[11px] ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                    {mention.reachEstimate && (
                      <span className="flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5 opacity-70" />
                        <span>{mention.reachEstimate}</span>
                      </span>
                    )}

                    <button
                      onClick={() =>
                        copyToClipboard(
                          `"${mention.headline}" — Published in ${mention.publication}: ${mention.snippet}`,
                          mention.id
                        )
                      }
                      className={`flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px] transition-colors ${
                        isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#7A5E2E] hover:text-[#1C473A]'
                      }`}
                      title="Copy coverage snippet to clipboard"
                    >
                      {copiedId === mention.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Citation</span>
                        </>
                      )}
                    </button>

                    <a
                      href={mention.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors border ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-[#FAF8F5] hover:bg-[#EAE4D5] text-[#1C1917] border-[#DDD4C0]'
                      }`}
                    >
                      <span>Read Story</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Grounding Source Attribution Footnote */}
                {mention.groundingSources && mention.groundingSources.length > 0 && (
                  <div
                    className={`pt-2 border-t flex flex-wrap items-center gap-2 text-[10px] ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-[#E5DECE] text-[#8C8273]'
                    }`}
                  >
                    <span className="font-semibold">Grounded Citation:</span>
                    {mention.groundingSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline flex items-center gap-0.5 truncate max-w-xs ${
                          isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                        }`}
                      >
                        <Globe className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{source.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer Grounding Verification Banner */}
      <div
        className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark
            ? 'bg-[#0B101D] border-slate-800 text-slate-400'
            : 'bg-[#FAF8F5] border-[#E5DECE] text-[#5C564E]'
        }`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`} />
          <span>
            Verified by <strong>GSRelation Media Intelligence Node</strong> using Google Search grounding protocols.
          </span>
        </div>
        <div className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-[#8C8273]'}`}>
          Model: gemini-3.8-flash • Tool: googleSearch
        </div>
      </div>
    </div>
  );
};
