import React, { useState } from 'react';
import { usePR } from '../../context/PRContext';
import { Logo } from './Logo';
import {
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
  Award,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setCurrentRole, showToast, theme } = usePR();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isDark = theme === 'midnight';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to Vantage Point', 'You will receive our bi-weekly executive communications briefing.');
    setEmail('');
  };

  return (
    <footer
      id="agency-footer"
      className={`border-t pt-12 sm:pt-16 pb-[max(3rem,calc(env(safe-area-inset-bottom)+2.5rem))] transition-colors duration-300 ${
        isDark
          ? 'bg-[#090D16] text-white/70 border-[#1E293B]'
          : 'bg-[#F4EFE6] text-[#5C564E] border-[#E2D9C8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
            isDark ? 'border-[#1E293B]' : 'border-[#DDD4C0]'
          }`}
        >
          {/* Col 1 & 2: Agency Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Logo
              size="lg"
              showTagline={true}
              taglineText="Strategic Communications for a Brighter Tomorrow."
              taglineClassName={`normal-case tracking-normal text-xs font-normal ${
                isDark ? 'text-[#D4D7CC]/70' : 'text-[#8C8273]'
              }`}
              theme={isDark ? 'dark' : 'light'}
            />
            <p className={`text-sm leading-relaxed max-w-md font-light ${
              isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'
            }`}>
              Strategic communications, elite media relations, and reputation architecture for category leaders, high-growth technology pioneers, and market-shaping institutions.
            </p>

            <div className="flex items-center gap-4 text-xs pt-2">
              <span className={`flex items-center gap-1.5 font-medium ${
                isDark ? 'text-[#D4D7CC]' : 'text-[#1C473A]'
              }`}>
                <Award className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#9B783E]'}`} />
                PRovoke Strategic Agency of the Year Recognition
              </span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${
                isDark ? 'text-[#D4D7CC]' : 'text-[#7A5E2E]'
              }`}>
                Subscribe to Executive Communications Briefing
              </div>
              {isSubscribed ? (
                <div className={`flex items-center gap-2 text-xs p-2.5 rounded-md border ${
                  isDark
                    ? 'text-emerald-400 bg-[#151F33] border-emerald-500/40'
                    : 'text-[#1C473A] bg-[#E8F0EC] border-[#1C473A]/30'
                }`}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Subscribed! You will receive our next PR intelligence dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter executive email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`flex-1 rounded-md px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isDark
                        ? 'bg-[#151F33] border-white/10 text-white placeholder-[#64748B] focus:border-emerald-400'
                        : 'bg-white border-[#DDD4C0] text-[#1C1917] placeholder-[#8C8273] focus:border-[#9B783E] shadow-2xs'
                    }`}
                    required
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md text-xs font-medium tracking-normal flex items-center gap-1.5 transition-colors shadow-xs ${
                      isDark
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1C473A] hover:bg-[#14352B] text-white border border-[#B8934C]/40'
                    }`}
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3 text-[#B8934C]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-[#D4D7CC]' : 'text-[#7A5E2E]'
            }`}>
              PR Capabilities
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  Media Relations & Tier-1 Placement
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  Crisis & Issue Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  Executive Thought Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  Global Product & Funding Launches
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  Digital PR & Brand Amplification
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  M&A and Financial Communications
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Explore & Portals */}
          <div className="space-y-3">
            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-[#D4D7CC]' : 'text-[#7A5E2E]'
            }`}>
              Explore & Portals
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-[#94A3B8]' : 'text-[#5C564E]'}`}>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className={`transition-colors flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  <span>About GS • Relation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('work')}
                  className={`transition-colors flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  <span>Client Case Studies</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('newsroom')}
                  className={`transition-colors flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  <span>Official Newsroom</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('insights')}
                  className={`transition-colors flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-[#1C473A]'}`}
                >
                  <span>PR Strategic Insights</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRole('CLIENT');
                    navigateTo('client-portal');
                  }}
                  className={`font-semibold transition-colors flex items-center gap-1 ${
                    isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#1C473A] hover:text-[#14352B]'
                  }`}
                >
                  <span>Client Campaign Portal →</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-admin-link"
                  onClick={() => navigateTo('admin')}
                  className={`font-semibold transition-colors flex items-center gap-1 ${
                    isDark ? 'text-[#D4D7CC] hover:text-white' : 'text-[#7A5E2E] hover:text-[#1C1917]'
                  }`}
                >
                  <span>Admin Control Center →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: National & Global Bureaus */}
          <div className="space-y-3 text-xs">
            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
              isDark ? 'text-[#D4D7CC]' : 'text-[#7A5E2E]'
            }`}>
              National Bureaus
            </div>
            <div className="space-y-3">
              <div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>Amravati (HQ)</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#6B6357]'}>Camp Road, Amravati, Maharashtra</div>
                <a href="tel:8805915047" className={`font-mono text-[11px] hover:underline block ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>+91 88059 15047</a>
              </div>
              <div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>Akola Bureau</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#6B6357]'}>Civil Lines, Akola, Maharashtra</div>
                <a href="tel:9373831640" className={`font-mono text-[11px] hover:underline block ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>+91 93738 31640</a>
              </div>
              <div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>Pune Bureau</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#6B6357]'}>Senapati Bapat Road, Shivaji Nagar, Pune</div>
                <a href="tel:9527447529" className={`font-mono text-[11px] hover:underline block ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>+91 95274 47529</a>
              </div>
              <div>
                <div className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1917]'}`}>Nashik Bureau</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#6B6357]'}>College Road, Gangapur, Nashik</div>
                <a href="tel:9421832623" className={`font-mono text-[11px] hover:underline block ${isDark ? 'text-emerald-400' : 'text-[#1C473A]'}`}>+91 94218 32623</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'text-[#94A3B8]' : 'text-[#6B6357]'
        }`}>
          <div>
            © {new Date().getFullYear()} GS • Relation. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('about')} className={isDark ? 'hover:text-white' : 'hover:text-[#1C1917]'}>
              Agency Governance
            </button>
            <button onClick={() => navigateTo('contact')} className={isDark ? 'hover:text-white' : 'hover:text-[#1C1917]'}>
              Press Desk
            </button>
            <span className="opacity-30">|</span>
            <span className={`flex items-center gap-1.5 font-medium ${
              isDark ? 'text-emerald-400' : 'text-[#1C473A]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${
                isDark ? 'bg-emerald-400' : 'bg-[#1C473A]'
              }`}></span>
              All Media Wire Feeds Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
