import React from 'react';
import { usePR } from '../../context/PRContext';

export interface AiModLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'icon' | 'badge' | 'avatar' | 'floating';
  className?: string;
  glow?: boolean;
  animated?: boolean;
  theme?: 'light' | 'midnight';
}

const sizeConfig = {
  xs: {
    container: 'w-3 h-3',
    svg: 12,
    ring: 'w-3.5 h-3.5',
  },
  sm: {
    container: 'w-3.5 h-3.5',
    svg: 14,
    ring: 'w-4 h-4',
  },
  md: {
    container: 'w-4.5 h-4.5',
    svg: 18,
    ring: 'w-5 h-5',
  },
  lg: {
    container: 'w-5.5 h-5.5',
    svg: 22,
    ring: 'w-6.5 h-6.5',
  },
  xl: {
    container: 'w-6.5 h-6.5',
    svg: 26,
    ring: 'w-7.5 h-7.5',
  },
  '2xl': {
    container: 'w-8 h-8',
    svg: 30,
    ring: 'w-9 h-9',
  },
};

/**
 * Compact, Theme-Adaptive AI PR Strategic Intelligence Insignia.
 * Molds dynamically with both the Editorial Warm Linen theme (British Green + Heritage Gold)
 * and the Midnight Dark theme (Deep Navy + Electric Emerald).
 */
export const AiModLogo: React.FC<AiModLogoProps> = ({
  size = 'md',
  variant = 'icon',
  className = '',
  glow = true,
  animated = false,
  theme: explicitTheme,
}) => {
  // Detect theme from context or prop override
  let activeTheme: 'light' | 'midnight' = explicitTheme || 'light';
  try {
    const pr = usePR();
    if (!explicitTheme && pr?.theme) {
      activeTheme = pr.theme;
    }
  } catch {
    // fallback if used outside PRProvider
  }

  const isDark = activeTheme === 'midnight';
  const config = sizeConfig[size] || sizeConfig.md;
  const uniqueId = React.useId().replace(/:/g, '');

  // Theme-molded palette
  const colors = isDark
    ? {
        baseStart: '#090D16',
        baseMid: '#162238',
        baseEnd: '#0F1A2C',
        rimStroke: '#34D399',
        rimOpacity: 0.9,
        sparkCore: '#FFFFFF',
        sparkMid: '#6EE7B7',
        sparkEnd: '#059669',
        orbitalStroke: '#34D399',
        orbitalOpacity: 0.75,
        nodeFill: '#A7F3D0',
        glowColor: 'rgba(52, 211, 153, 0.35)',
        badgeBg: 'bg-[#1E293B]',
        badgeBorder: 'border-emerald-400/40',
        pulseGlow: 'from-emerald-500/30 via-teal-400/20 to-emerald-600/30',
      }
    : {
        baseStart: '#14352B',
        baseMid: '#1C473A',
        baseEnd: '#0F2820',
        rimStroke: '#B8934C',
        rimOpacity: 0.95,
        sparkCore: '#FFF9EB',
        sparkMid: '#E0C078',
        sparkEnd: '#9B783E',
        orbitalStroke: '#B8934C',
        orbitalOpacity: 0.8,
        nodeFill: '#F4E5B8',
        glowColor: 'rgba(184, 147, 76, 0.3)',
        badgeBg: 'bg-[#14352B]',
        badgeBorder: 'border-[#B8934C]/45',
        pulseGlow: 'from-[#B8934C]/35 via-[#E0C078]/25 to-[#1C473A]/30',
      };

  const svgContent = (
    <svg
      width={config.svg}
      height={config.svg}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'transition-transform duration-500 hover:rotate-12' : ''}`}
      aria-hidden="true"
    >
      <defs>
        {/* Core Base Hexagon Fill */}
        <linearGradient id={`aiModBase-${uniqueId}`} x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.baseStart} />
          <stop offset="50%" stopColor={colors.baseMid} />
          <stop offset="100%" stopColor={colors.baseEnd} />
        </linearGradient>

        {/* Central Luminous Starburst Spark */}
        <radialGradient id={`aiModSpark-${uniqueId}`} cx="16" cy="16" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.sparkCore} />
          <stop offset="45%" stopColor={colors.sparkMid} />
          <stop offset="85%" stopColor={colors.sparkEnd} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.baseEnd} stopOpacity="0" />
        </radialGradient>

        {/* Outer Glow Filter */}
        <filter id={`aiModGlow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hex-Faceted Diamond Shield */}
      <path
        d="M16 2.5L28 9.5V22.5L16 29.5L4 22.5V9.5L16 2.5Z"
        fill={`url(#aiModBase-${uniqueId})`}
        stroke={colors.rimStroke}
        strokeWidth="1.25"
        strokeOpacity={colors.rimOpacity}
        strokeLinejoin="round"
      />

      {/* Subtle Orbital Intelligence Ring */}
      <circle
        cx="16"
        cy="16"
        r="9.5"
        stroke={colors.orbitalStroke}
        strokeWidth="0.85"
        strokeOpacity={colors.orbitalOpacity * 0.5}
        strokeDasharray="1.5 2"
      />

      {/* Interlocking Media Arcs (Strategic Narrative Waves) */}
      <path
        d="M9.5 13.5C9.5 10 12.5 8 16 8C19.5 8 22.5 10 22.5 13.5"
        stroke={colors.orbitalStroke}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity={colors.orbitalOpacity}
      />
      <path
        d="M22.5 18.5C22.5 22 19.5 24 16 24C12.5 24 9.5 22 9.5 18.5"
        stroke={colors.orbitalStroke}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity={colors.orbitalOpacity}
      />

      {/* Central 4-Point Diamond Intelligence Spark */}
      <path
        d="M16 8.5C16 12.5 13.5 15 9.5 16C13.5 17 16 19.5 16 23.5C16 19.5 18.5 17 22.5 16C18.5 15 16 12.5 16 8.5Z"
        fill={`url(#aiModSpark-${uniqueId})`}
        filter={glow ? `url(#aiModGlow-${uniqueId})` : undefined}
      />

      {/* Cardinal Strategic Nodes */}
      <circle cx="16" cy="8.5" r="0.9" fill={colors.nodeFill} />
      <circle cx="16" cy="23.5" r="0.9" fill={colors.nodeFill} />
      <circle cx="9.5" cy="16" r="0.9" fill={colors.nodeFill} />
      <circle cx="22.5" cy="16" r="0.9" fill={colors.nodeFill} />

      {/* Central Core Singularity */}
      <circle cx="16" cy="16" r="1.4" fill={colors.sparkCore} />
      <circle cx="16" cy="16" r="0.6" fill={colors.baseStart} />
    </svg>
  );

  // Variant 1: Pure Icon
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${config.container} ${className}`}>
        {glow && (
          <div
            className="absolute inset-0 blur-[2px] rounded-full -z-10 pointer-events-none"
            style={{ backgroundColor: colors.glowColor }}
          />
        )}
        {svgContent}
      </div>
    );
  }

  // Variant 2: Avatar for chat messages & status badges
  if (variant === 'avatar') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-md border shadow-xs shrink-0 ${colors.badgeBg} ${colors.badgeBorder} ${config.container} ${className}`}
      >
        {svgContent}
      </div>
    );
  }

  // Variant 3: Floating Action Button Insignia
  if (variant === 'floating') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        {glow && (
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${colors.pulseGlow} blur-[2px] animate-pulse pointer-events-none`}
          />
        )}
        {svgContent}
      </div>
    );
  }

  // Variant 4: Badge with container
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-sm border p-0.5 shadow-xs shrink-0 ${colors.badgeBg} ${colors.badgeBorder} ${className}`}
    >
      {svgContent}
    </div>
  );
};
