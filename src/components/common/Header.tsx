import React, { useState, useEffect, useCallback } from 'react';
import { usePR, PageRoute } from '../../context/PRContext';
import { Logo } from './Logo';
import { AiModLogo } from './AiModLogo';
import {
  Search,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  BarChart2,
  BookOpen,
  ShieldCheck,
  Moon,
  Sun,
  MessageSquareQuote
} from 'lucide-react';

interface NavItem {
  label: string;
  route: PageRoute;
  description?: string;
}

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    currentPage,
    navigateTo,
    setIsSearchOpen,
    setIsConsultationModalOpen,
    setIsConciergeOpen,
    setCurrentRole,
  } = usePR();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection for sticky header height & background transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & Escape key listener for the full-screen menu overlay
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isMobileMenuOpen]);

  // Primary horizontal desktop navigation matching image preview: About, Services, Insights, Newsroom, Contact
  const primaryDesktopNav: NavItem[] = [
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Insights', route: 'insights' },
    { label: 'Newsroom', route: 'newsroom' },
    { label: 'Contact', route: 'contact' },
  ];

  // Full-screen overlay structured navigation
  const fullOverlayNav: NavItem[] = [
    { label: 'Home', route: 'home', description: 'Overview & editorial marquee' },
    { label: 'About', route: 'about', description: 'Leadership, methodology & pedigree' },
    { label: 'Services', route: 'services', description: 'Strategic PR & reputation advisory' },
    { label: 'Our Work', route: 'work', description: 'Selected mandates & impact dossiers' },
    { label: 'Insights', route: 'insights', description: 'Strategic communications intelligence' },
    { label: 'Newsroom', route: 'newsroom', description: 'Syndicated releases & announcements' },
    { label: 'Media Gallery', route: 'media-gallery', description: 'Brand assets, press kits & photography' },
    { label: 'Contact', route: 'contact', description: 'Global desk & inquiry channels' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setIsMobileMenuOpen(false);
  };

  const handleStartConversation = () => {
    setIsConsultationModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? theme === 'midnight'
              ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-[#1E293B] py-2.5 sm:py-3 shadow-md shadow-black/50'
              : 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DECE] py-2.5 sm:py-3 shadow-xs shadow-[#9B783E]/5'
            : theme === 'midnight'
              ? 'bg-[#090D16] border-b border-[#1E293B]/70 py-3.5 sm:py-4.5 shadow-none'
              : 'bg-[#FAF8F5] border-b border-[#E5DECE]/80 py-3.5 sm:py-4.5 shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: GS • Relation Logo */}
          <button
            id="header-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] focus-visible:ring-offset-2 rounded-sm group transition-opacity hover:opacity-95 py-1"
            aria-label="GS • Relation Home"
          >
            <Logo
              size="md"
              showTagline={false}
              theme={theme === 'midnight' ? 'dark' : 'light'}
            />
          </button>

          {/* Center: Desktop Horizontal Navigation */}
          <nav
            id="desktop-primary-nav"
            className="hidden lg:flex items-center gap-7 xl:gap-9 text-xs xl:text-sm font-medium tracking-wide"
            aria-label="Primary Navigation"
          >
            {primaryDesktopNav.map((link) => {
              const isActive = currentPage === link.route;
              return (
                <button
                  key={link.route}
                  id={`desktop-nav-${link.route}`}
                  onClick={() => handleNavClick(link.route)}
                  className={`relative py-1.5 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9B783E] rounded-sm group ${
                    isActive
                      ? theme === 'midnight'
                        ? 'text-emerald-400 font-semibold'
                        : 'text-[#1C473A] font-semibold'
                      : theme === 'midnight'
                        ? 'text-slate-300 hover:text-emerald-400'
                        : 'text-[#4A453E] hover:text-[#1C473A]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Active / hover underline indicator matching luxury palette */}
                  {isActive ? (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        theme === 'midnight' ? 'bg-emerald-400' : 'bg-[#9B783E]'
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full transition-all duration-200 group-hover:w-full ${
                        theme === 'midnight' ? 'bg-emerald-400' : 'bg-[#9B783E]'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Toggle, Search, Compact CTA & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle (Light <-> Midnight Dark Theme) */}
            <button
              id="header-theme-toggle"
              onClick={toggleTheme}
              className={`flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] ${
                theme === 'midnight'
                  ? 'text-amber-300 bg-[#1E293B] border border-white/10 hover:border-amber-400/50'
                  : 'text-[#7A5E2E] bg-[#F4EFE6] hover:bg-[#EFE7D4] border border-[#DDD4C0] hover:border-[#9B783E]'
              }`}
              title={theme === 'midnight' ? "Switch to Light Theme" : "Switch to Midnight Dark Theme"}
              aria-label={theme === 'midnight' ? "Switch to Light Theme" : "Switch to Midnight Dark Theme"}
            >
              {theme === 'midnight' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#7A5E2E] transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Minimal Search Trigger */}
            <button
              id="header-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] ${
                theme === 'midnight'
                  ? 'text-slate-300 hover:text-white bg-[#1E293B] border border-white/10 hover:border-emerald-400/40'
                  : 'text-[#7A5E2E] hover:text-[#1C1917] bg-[#F4EFE6] hover:bg-[#EFE7D4] border border-[#DDD4C0] hover:border-[#9B783E]'
              }`}
              title="Search GS • Relation intelligence, releases, and archives (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compact Primary CTA: "Let's Talk" */}
            <button
              id="header-cta-start-conversation"
              onClick={handleStartConversation}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md font-semibold text-xs tracking-normal transition-all duration-200 shadow-xs group active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] ${
                theme === 'midnight'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#B8934C]/40 shadow-xs'
              }`}
              title="Start a conversation with GS • Relation"
              aria-label="Let's Talk"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#B8934C] group-hover:text-amber-200 transition-colors" />
              <span>Let's Talk</span>
            </button>

            {/* Hamburger Button */}
            <button
              id="header-hamburger-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex lg:hidden items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[38px] sm:min-h-[38px] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] ${
                theme === 'midnight'
                  ? 'text-slate-300 hover:text-white bg-[#1E293B] border border-white/10'
                  : 'text-[#1C1917] bg-[#F4EFE6] hover:bg-[#EFE7D4] border border-[#DDD4C0]'
              }`}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="fullscreen-navigation-overlay"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          id="fullscreen-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className={`fixed inset-0 z-50 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] ${
            theme === 'midnight'
              ? 'bg-[#090D16]/98 text-white'
              : 'bg-[#FAF8F5]/98 text-[#1C1917]'
          }`}
        >
          {/* Overlay Top Bar */}
          <div
            className={`sticky top-0 z-10 backdrop-blur-md border-b ${
              theme === 'midnight'
                ? 'border-[#1E293B] bg-[#090D16]/95'
                : 'border-[#E5DECE] bg-[#FAF8F5]/95'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
              <div onClick={() => handleNavClick('home')} className="cursor-pointer">
                <Logo
                  size="md"
                  showTagline={false}
                  theme={theme === 'midnight' ? 'dark' : 'light'}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Theme Toggle in Overlay */}
                <button
                  id="overlay-theme-toggle"
                  onClick={toggleTheme}
                  className={`flex items-center justify-center p-2 min-w-[38px] min-h-[38px] rounded-md transition-colors ${
                    theme === 'midnight'
                      ? 'bg-[#1E293B] border border-white/10 text-amber-300'
                      : 'bg-[#F4EFE6] border border-[#DDD4C0] text-[#7A5E2E]'
                  }`}
                  title={theme === 'midnight' ? "Switch to Light Theme" : "Switch to Midnight Dark Theme"}
                  aria-label="Toggle theme"
                >
                  {theme === 'midnight' ? (
                    <Sun className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#7A5E2E]" />
                  )}
                </button>

                <button
                  id="overlay-search-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-md text-xs transition-colors ${
                    theme === 'midnight'
                      ? 'bg-[#1E293B] border border-white/10 text-slate-300 hover:text-white'
                      : 'bg-[#F4EFE6] border border-[#DDD4C0] text-[#4A453E] hover:text-[#1C1917]'
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-[#9B783E]" />
                  <span className="hidden sm:inline">Search (⌘K)</span>
                </button>

                <button
                  id="close-navigation-overlay-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B783E] ${
                    theme === 'midnight'
                      ? 'text-slate-400 hover:text-white bg-[#1E293B] border border-white/10'
                      : 'text-[#4A453E] hover:text-[#1C1917] bg-[#F4EFE6] border border-[#DDD4C0]'
                  }`}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Overlay Main Content Body */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Primary Public Navigation */}
              <div className="lg:col-span-6 space-y-6">
                <div
                  className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] pb-2 border-b ${
                    theme === 'midnight'
                      ? 'text-emerald-400 border-[#1E293B]'
                      : 'text-[#9B783E] border-[#E5DECE]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme === 'midnight' ? 'bg-emerald-400' : 'bg-[#9B783E]'}`} />
                  <span>Navigation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fullOverlayNav.map((link) => {
                    const isActive = currentPage === link.route;
                    return (
                      <button
                        key={link.route}
                        id={`overlay-nav-${link.route}`}
                        onClick={() => handleNavClick(link.route)}
                        className={`text-left p-3.5 rounded-md transition-all duration-200 group flex flex-col justify-center ${
                          isActive
                            ? theme === 'midnight'
                              ? 'bg-[#1E293B] border-l-2 border-emerald-400 pl-4'
                              : 'bg-[#F4EFE6] border-l-2 border-[#1C473A] pl-4'
                            : theme === 'midnight'
                              ? 'hover:bg-[#1E293B]/60 border-l-2 border-transparent hover:border-emerald-400/60'
                              : 'hover:bg-[#F4EFE6]/80 border-l-2 border-transparent hover:border-[#9B783E]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-base sm:text-lg font-serif tracking-tight transition-colors ${
                              isActive
                                ? theme === 'midnight'
                                  ? 'text-emerald-400 font-semibold'
                                  : 'text-[#1C473A] font-semibold'
                                : theme === 'midnight'
                                  ? 'text-slate-200 group-hover:text-white'
                                  : 'text-[#1C1917] group-hover:text-[#1C473A]'
                            }`}
                          >
                            {link.label}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                            theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'
                          }`} />
                        </div>
                        {link.description && (
                          <span className={`text-[11px] font-normal mt-0.5 line-clamp-1 ${
                            theme === 'midnight' ? 'text-slate-400' : 'text-[#6B6357]'
                          }`}>
                            {link.description}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Middle Column: Portals & Intelligence (including Admin Command Center) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div
                      className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] pb-2 border-b ${
                        theme === 'midnight'
                          ? 'text-slate-400 border-[#1E293B]'
                          : 'text-[#8C8273] border-[#E5DECE]'
                      }`}
                    >
                      <Briefcase className={`w-3 h-3 ${theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
                      <span>Portals & Intelligence</span>
                    </div>

                    <button
                      id="overlay-nav-ai-concierge"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsConciergeOpen(true);
                      }}
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-200 group ${
                        theme === 'midnight'
                          ? 'bg-[#1E293B]/70 hover:bg-[#1E293B] border-emerald-400/30'
                          : 'bg-white hover:bg-[#F9F6F0] border-[#E5DECE] hover:border-[#9B783E]'
                      }`}
                    >
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AiModLogo size="xs" animated={true} />
                          <span className={theme === 'midnight' ? 'text-white' : 'text-[#1C1917]'}>AI PR Moderator & Guide</span>
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ${
                          theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'
                        }`} />
                      </div>
                      <p className={`text-[11px] mt-1 font-light ${theme === 'midnight' ? 'text-slate-400' : 'text-[#6B6357]'}`}>
                        Dual Gemini + ChatGPT trained concierge for guidance & strategy
                      </p>
                    </button>

                    <button
                      id="overlay-nav-client-portal"
                      onClick={() => {
                        setCurrentRole('CLIENT');
                        handleNavClick('client-portal');
                      }}
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-200 group ${
                        theme === 'midnight'
                          ? 'bg-[#1E293B]/50 hover:bg-[#1E293B] border-white/10 hover:border-emerald-400/40'
                          : 'bg-white hover:bg-[#F9F6F0] border-[#E5DECE] hover:border-[#9B783E]'
                      }`}
                    >
                      <div className={`text-xs font-semibold flex items-center justify-between ${
                        theme === 'midnight' ? 'text-white group-hover:text-emerald-400' : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}>
                        <span>Client Campaign Portal</span>
                        <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className={`text-[11px] mt-1 font-light ${theme === 'midnight' ? 'text-slate-400' : 'text-[#6B6357]'}`}>
                        Live deliverables, media wire monitoring & coverage reports
                      </p>
                    </button>

                    <button
                      id="overlay-nav-reports-analytics"
                      onClick={() => {
                        handleNavClick('reports-analytics');
                      }}
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-200 group ${
                        theme === 'midnight'
                          ? 'bg-[#1E293B]/50 hover:bg-[#1E293B] border-white/10 hover:border-emerald-400/40'
                          : 'bg-white hover:bg-[#F9F6F0] border-[#E5DECE] hover:border-[#9B783E]'
                      }`}
                    >
                      <div className={`text-xs font-semibold flex items-center justify-between ${
                        theme === 'midnight' ? 'text-white group-hover:text-emerald-400' : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <BarChart2 className={`w-3.5 h-3.5 ${theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
                          <span>Reports & Analytics</span>
                        </div>
                        <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className={`text-[11px] mt-1 font-light ${theme === 'midnight' ? 'text-slate-400' : 'text-[#6B6357]'}`}>
                        Earned media value, sentiment analysis & reach metrics
                      </p>
                    </button>

                    <button
                      id="overlay-nav-admin-portal"
                      onClick={() => {
                        handleNavClick('admin');
                      }}
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-200 group ${
                        theme === 'midnight'
                          ? 'bg-[#1E293B]/50 hover:bg-[#1E293B] border-white/10 hover:border-emerald-400/40'
                          : 'bg-white hover:bg-[#F9F6F0] border-[#E5DECE] hover:border-[#9B783E]'
                      }`}
                    >
                      <div className={`text-xs font-semibold flex items-center justify-between ${
                        theme === 'midnight' ? 'text-slate-200 group-hover:text-white' : 'text-[#1C1917] group-hover:text-[#1C473A]'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className={`w-3.5 h-3.5 ${theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
                          <span>Admin Control Center</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className={`text-[11px] mt-1 font-light ${theme === 'midnight' ? 'text-slate-400' : 'text-[#6B6357]'}`}>
                        Executive suite with ID & Password authentication
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Featured Story Card */}
              <div
                className={`hidden lg:flex lg:col-span-3 flex-col justify-between p-6 rounded-md border relative overflow-hidden ${
                  theme === 'midnight'
                    ? 'bg-[#1E293B] border-emerald-400/30 text-white'
                    : 'bg-[#F4EFE6] border-[#DDD4C0] text-[#1C1917]'
                }`}
              >
                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] ${
                      theme === 'midnight' ? 'text-emerald-400' : 'text-[#9B783E]'
                    }`}
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Featured Insight</span>
                  </div>

                  <blockquote className="text-lg font-serif italic leading-snug">
                    "How strategic storytelling changes brand perception."
                  </blockquote>

                  <p className={`text-xs font-light leading-relaxed ${theme === 'midnight' ? 'text-slate-300' : 'text-[#5C564E]'}`}>
                    Analyzing how category leaders shift from reaction to narrative architecture in complex global markets.
                  </p>
                </div>

                <div className={`pt-6 border-t mt-6 ${theme === 'midnight' ? 'border-white/10' : 'border-[#DDD4C0]'}`}>
                  <button
                    id="overlay-read-featured-story-btn"
                    onClick={() => {
                      navigateTo('blog-post', 'anatomy-tier-1-tech-embargo');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 group ${
                      theme === 'midnight' ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#1C473A] hover:text-[#14352B]'
                    }`}
                  >
                    <span>Read the story</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Bottom Bar: Primary CTA */}
          <div
            className={`border-t py-5 sm:py-6 px-4 sm:px-6 lg:px-8 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] ${
              theme === 'midnight'
                ? 'border-[#1E293B] bg-[#090D16]/95'
                : 'border-[#E5DECE] bg-[#FAF8F5]/95'
            }`}
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                id="overlay-cta-start-conversation"
                onClick={handleStartConversation}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md font-medium text-xs sm:text-sm tracking-normal transition-all duration-200 shadow-sm group active:scale-[0.98] ${
                  theme === 'midnight'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#B8934C]/40'
                }`}
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className={`text-xs font-medium tracking-[0.2em] uppercase text-center sm:text-right ${
                theme === 'midnight' ? 'text-slate-400' : 'text-[#8C8273]'
              }`}>
                <span>Amravati</span>
                <span className="mx-2 text-[#B8934C]">·</span>
                <span>Akola</span>
                <span className="mx-2 text-[#B8934C]">·</span>
                <span>Pune</span>
                <span className="mx-2 text-[#B8934C]">·</span>
                <span>Nashik</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
