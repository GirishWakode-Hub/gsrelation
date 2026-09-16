import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Share2,
  Sparkles
} from 'lucide-react';
import { MediaMentionFeed } from '../common/MediaMentionFeed';

export const InsightsPage: React.FC = () => {
  const { blogPosts = [], navigateTo, theme } = usePR();
  const isDark = theme === 'midnight';
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Crisis Communications',
    'Media Relations & Pitching',
    'Deeptech & Science PR',
    'Executive Positioning'
  ];

  const safePosts = blogPosts || [];
  const filteredPosts =
    selectedCategory === 'ALL'
      ? safePosts
      : safePosts.filter((p) => (p.category || '').toLowerCase().includes(selectedCategory.toLowerCase()));

  const featuredPost = safePosts[0];

  return (
    <div
      id="insights-page"
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
              Vantage Point Journal
            </span>
          </div>
          <h1
            className={`text-4xl sm:text-6xl font-normal tracking-tight font-serif leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            Strategic PR Intelligence & <br />
            <span className={`italic ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>
              Executive Commentary
            </span>
          </h1>
          <p
            className={`text-base leading-relaxed font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            Analytical essays on media dynamics, crisis playbooks, tier-1 newsroom economics, and narrative design authored by our senior strategists.
          </p>
        </div>

        {/* Featured Essay Card */}
        {featuredPost && (
          <div
            onClick={() => navigateTo('blog-post', featuredPost.slug || featuredPost.id)}
            className={`rounded-xl overflow-hidden cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 border shadow-xs hover:shadow-md ${
              isDark
                ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
            }`}
          >
            <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-full overflow-hidden">
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                className={`absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-md border shadow-sm ${
                  isDark
                    ? 'bg-[#0B101D]/90 text-emerald-400 border-emerald-500/30'
                    : 'bg-[#1C1917]/90 text-[#E0C078] border-[#9B783E]/40'
                }`}
              >
                Lead Strategic Essay
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={`font-semibold uppercase tracking-wider ${
                      isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                    }`}
                  >
                    {featuredPost.category}
                  </span>
                  <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
                  <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>{featuredPost.date}</span>
                  <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
                  <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>{featuredPost.readTime}</span>
                </div>

                <h2
                  className={`text-2xl sm:text-3xl font-serif leading-tight transition-colors ${
                    isDark
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-[#1C1917] group-hover:text-[#1C473A]'
                  }`}
                >
                  {featuredPost.title}
                </h2>

                <p
                  className={`text-sm leading-relaxed font-light ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                  }`}
                >
                  {featuredPost.summary}
                </p>
              </div>

              <div
                className={`pt-6 border-t flex items-center justify-between ${
                  isDark ? 'border-white/10' : 'border-[#E5DECE]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-[#DDD4C0]"
                  />
                  <div>
                    <div
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-white' : 'text-[#1C1917]'
                      }`}
                    >
                      {featuredPost.author.name}
                    </div>
                    <div
                      className={`text-[11px] ${
                        isDark ? 'text-slate-400' : 'text-[#8C8273]'
                      }`}
                    >
                      {featuredPost.author.title}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1 transition-colors ${
                    isDark
                      ? 'text-emerald-400 group-hover:text-emerald-300'
                      : 'text-[#7A5E2E] group-hover:text-[#1C473A]'
                  }`}
                >
                  <span>Read Essay</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Real-Time Media Mention Feed Section */}
        <section id="media-mentions-section" className="space-y-6">
          <MediaMentionFeed />
        </section>

        {/* Strategic Articles Directory */}
        <div
          className={`space-y-8 pt-6 border-t ${
            isDark ? 'border-white/10' : 'border-[#E5DECE]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                Strategic Essays & Editorial Archive
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                Explore deep dives, newsroom analyses, and PR frameworks.
              </p>
            </div>
          </div>

          {/* Category Filters */}
          <div
            className={`flex flex-wrap items-center gap-2 border-b pb-5 ${
              isDark ? 'border-white/10' : 'border-[#E5DECE]'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#1C473A] text-white shadow-xs border border-[#9B783E]/40'
                    : isDark
                    ? 'bg-[#151F33] border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border border-[#DDD4C0] text-[#5C564E] hover:text-[#1C1917] hover:bg-[#FAF8F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigateTo('blog-post', post.slug || post.id)}
                className={`rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all border shadow-xs hover:shadow-md ${
                  isDark
                    ? 'bg-[#151F33] border-[#1E293B] hover:border-emerald-500/40'
                    : 'bg-white border-[#E5DECE] hover:border-[#9B783E]'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border font-semibold ${
                        isDark
                          ? 'bg-[#0B101D]/90 text-emerald-400 border-emerald-500/30'
                          : 'bg-[#1C1917]/90 text-[#E0C078] border-[#9B783E]/40'
                      }`}
                    >
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>{post.date}</span>
                      <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
                      <span className={isDark ? 'text-slate-400' : 'text-[#8C8273]'}>{post.readTime}</span>
                    </div>

                    <h3
                      className={`text-base font-serif leading-snug transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-emerald-400'
                          : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}
                    >
                      {post.title}
                    </h3>

                    <p
                      className={`text-xs line-clamp-2 leading-relaxed font-light ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
                      }`}
                    >
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-6 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-white/10' : 'border-[#E5DECE]'
                  }`}
                >
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                    By {post.author.name}
                  </span>
                  <span
                    className={`font-semibold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs ${
                      isDark ? 'text-emerald-400' : 'text-[#7A5E2E]'
                    }`}
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
