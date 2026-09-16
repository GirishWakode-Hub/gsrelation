import React from 'react';
import { usePR } from '../../context/PRContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  Quote,
  Sparkles
} from 'lucide-react';

export const BlogPostDetailPage: React.FC = () => {
  const { selectedBlogPostSlug, blogPosts = [], navigateTo, showToast, theme } = usePR();
  const isDark = theme === 'midnight';

  const safePosts = blogPosts || [];
  const post = safePosts.find(
    (b) => b.slug === selectedBlogPostSlug || b.id === selectedBlogPostSlug
  ) || safePosts[0];

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0B101D] text-white' : 'bg-[#FAF8F5] text-[#1C1917]'
        }`}
      >
        <div className="text-center space-y-4">
          <p className={isDark ? 'text-white/50' : 'text-[#8C8273]'}>Article not found.</p>
          <button
            onClick={() => navigateTo('insights')}
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider text-white ${
              isDark ? 'bg-emerald-600' : 'bg-[#1C473A]'
            }`}
          >
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article Link Copied', 'Shareable link copied to clipboard.');
    }
  };

  return (
    <div
      id="blog-post-detail-page"
      className={`min-h-screen py-12 transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0B101D] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1C1917]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Navigation */}
        <div
          className={`flex items-center justify-between border-b pb-6 ${
            isDark ? 'border-white/10' : 'border-[#E5DECE]'
          }`}
        >
          <button
            onClick={() => navigateTo('insights')}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-[#7A5E2E] hover:text-[#1C473A]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <button
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border shadow-xs ${
              isDark
                ? 'bg-[#151F33] border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-[#DDD4C0] text-[#1C1917] hover:bg-[#FAF8F5]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Essay</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
                isDark
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-[#9B783E]/15 text-[#7A5E2E] border-[#9B783E]/30'
              }`}
            >
              {post.category}
            </span>
            <span className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-[#DDD4C0]'}>•</span>
            <span className={`flex items-center gap-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-serif tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#1C1917]'
            }`}
          >
            {post.title}
          </h1>

          <p
            className={`text-lg font-light leading-relaxed ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}
          >
            {post.summary}
          </p>

          {/* Author Byline */}
          <div
            className={`flex items-center gap-4 pt-4 border-t ${
              isDark ? 'border-white/10' : 'border-[#E5DECE]'
            }`}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border border-[#DDD4C0]"
            />
            <div>
              <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>
                {post.author.name}
              </div>
              <div className={`text-xs font-light ${isDark ? 'text-slate-400' : 'text-[#8C8273]'}`}>
                {post.author.title}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className={`rounded-xl overflow-hidden border shadow-md ${
            isDark ? 'border-[#1E293B]' : 'border-[#E5DECE]'
          }`}
        >
          <img
            src={post.heroImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Article Body */}
        <div
          className={`rounded-xl p-6 sm:p-10 space-y-8 border shadow-sm ${
            isDark
              ? 'bg-[#151F33] border-[#1E293B] text-slate-200'
              : 'bg-white border-[#E5DECE] text-[#1C1917]'
          }`}
        >
          <div className="max-w-none text-base leading-relaxed space-y-6 font-serif font-light">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className={`text-xl font-serif pt-4 pb-1 font-normal ${
                      isDark ? 'text-white' : 'text-[#1C473A]'
                    }`}
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#3E3832]'}`}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Article Footer & Author Bio */}
          <div
            className={`p-6 sm:p-8 rounded-xl border flex flex-col sm:flex-row items-center gap-6 shadow-md ${
              isDark
                ? 'bg-[#0B101D] text-white border-slate-800'
                : 'bg-[#1C473A] text-white border-[#9B783E]/40'
            }`}
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#E0C078] shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-emerald-400' : 'text-[#E0C078]'
                }`}
              >
                Written by
              </div>
              <div className="text-lg font-serif text-white">{post.author.name}</div>
              <div className="text-xs text-white/80 font-light leading-relaxed">
                Senior Partner leading strategic messaging and tier-1 media relations at GSRelation PR. Advises Fortune 500 boards and innovation founders on high-stakes communications.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
