import React from 'react';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  variant?: 'inline' | 'emblem-only' | 'full-badge';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  variant = 'inline',
}) => {
  // Balanced professional dimensions
  const dimensions = {
    sm: { icon: 38, title: '1.2rem', tagline: '0.7rem' },
    md: { icon: 46, title: '1.4rem', tagline: '0.78rem' },
    lg: { icon: 56, title: '1.65rem', tagline: '0.85rem' },
  }[size];

  // If full-badge variant (e.g. for About page or official seal)
  if (variant === 'full-badge') {
    return (
      <div
        className={`animated-logo-full select-none ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '220px',
        }}
      >
        <div
          className="animate-float"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0, 86, 210, 0.15)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <img
            src="/assets/logo.jpg"
            alt="IELTS NovaPrep"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`animated-logo-lockup inline-flex items-center select-none ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        cursor: 'pointer',
        maxWidth: '100%',
      }}
      aria-label="IELTS NovaPrep Home"
    >
      {/* 3D Emblem Container (Cleanly focused on the 3D Ribbon 'N', Mortarboard & Star) */}
      <div
        className="logo-emblem-frame animate-float"
        style={{
          width: `${dimensions.icon}px`,
          height: `${dimensions.icon}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 3px 10px rgba(0, 86, 210, 0.15)',
          border: '1.5px solid rgba(0, 86, 210, 0.12)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <img
          src="/assets/emblem.png"
          alt="IELTS NovaPrep Emblem"
          style={{
            width: '94%',
            height: '94%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 4px rgba(0, 86, 210, 0.08))',
          }}
        />

        {/* Subtle glowing star accent on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            pointerEvents: 'none',
            border: '1px solid rgba(255, 170, 0, 0.3)',
          }}
        />
      </div>

      {/* Crisp, Proportionate Brand Typography (No double text!) */}
      {variant !== 'emblem-only' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.15,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading), 'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: dimensions.title,
              letterSpacing: '-0.025em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--brand-navy)' }}>IELTS</span>
            <span
              style={{
                color: 'var(--brand-primary)',
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              N
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                o
                {/* Play triangle inside 'o' as seen in the official logo design */}
                <span
                  style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    borderTop: '2.5px solid transparent',
                    borderBottom: '2.5px solid transparent',
                    borderLeft: '4px solid #FFFFFF',
                    transform: 'translateX(0.5px)',
                  }}
                />
              </span>
              va
            </span>
            <span
              style={{
                color: 'var(--brand-accent)',
                textShadow: '0 1px 2px rgba(230, 138, 0, 0.2)',
              }}
            >
              Prep
            </span>
          </div>

          {showTagline && (
            <div
              style={{
                fontSize: dimensions.tagline,
                color: 'var(--text-muted)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '0.15rem',
              }}
            >
              Practice Smarter · Improve Faster
            </div>
          )}
        </div>
      )}
    </div>
  );
};
