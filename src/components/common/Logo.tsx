import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  taglineText?: string;
  taglineClassName?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = true,
  taglineText = 'Strategic Communications',
  taglineClassName = '',
  align = 'left',
  theme = 'dark',
}) => {
  const sizeMap = {
    sm: { mark: 'w-6 h-6 text-xs', text: 'text-sm sm:text-base tracking-tight', dot: 'w-1.5 h-1.5', tagline: 'text-[8.5px]' },
    md: { mark: 'w-8 h-8 text-sm', text: 'text-base sm:text-lg tracking-tight', dot: 'w-1.5 h-1.5', tagline: 'text-[9.5px]' },
    lg: { mark: 'w-10 h-10 text-base', text: 'text-xl tracking-tight', dot: 'w-2 h-2', tagline: 'text-[10.5px]' },
    xl: { mark: 'w-12 h-12 text-lg', text: 'text-2xl sm:text-3xl tracking-tight', dot: 'w-2.5 h-2.5', tagline: 'text-xs' },
  };

  const currentSize = sizeMap[size];
  const isLightMode = theme === 'light';

  return (
    <div
      className={`flex items-center gap-2.5 ${
        align === 'center' ? 'justify-center text-center' : 'text-left'
      } ${className}`}
    >
      {/* Brand Text & Distinctive Sovereign Emerald & Gold Signature: GS • Relation */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-sans tracking-tight font-semibold ${
                isLightMode ? 'text-[#1C1917]' : 'text-white'
              } ${currentSize.text}`}
            >
              GS
            </span>
            <span
              className={`${currentSize.dot} rounded-full ${
                isLightMode
                  ? 'bg-[#1C473A] ring-1 ring-[#B8934C]/40'
                  : 'bg-[#2E7D68]'
              } inline-block shrink-0 shadow-xs`}
              aria-hidden="true"
            />
            <span
              className={`font-sans tracking-tight font-normal ${
                isLightMode ? 'text-[#1C1917]' : 'text-white'
              } ${currentSize.text}`}
            >
              Relation
            </span>
          </div>
          {showTagline && (
            <span
              className={`tracking-[0.2em] uppercase leading-tight mt-1 font-semibold font-sans ${
                isLightMode ? 'text-[#9B783E]' : 'text-[#D4D7CC]/80'
              } ${currentSize.tagline} ${taglineClassName}`}
            >
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

