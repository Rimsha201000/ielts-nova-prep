import React from 'react';
import { Award, Info } from 'lucide-react';
import { getBandPerformanceDescriptor } from '../../services/scoringEngine';

interface BandScoreBadgeProps {
  band: number;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BandScoreBadge: React.FC<BandScoreBadgeProps> = ({
  band,
  showDescription = false,
  size = 'md',
}) => {
  const descriptor = getBandPerformanceDescriptor(band);
  const pillPadding = size === 'sm' ? '0.2rem 0.55rem' : size === 'lg' ? '0.5rem 1rem' : '0.3rem 0.75rem';
  const fontSize = size === 'sm' ? '0.8rem' : size === 'lg' ? '1.25rem' : '0.95rem';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.35rem' }}>
      <div
        className={`badge ${descriptor.badgeClass}`}
        style={{
          padding: pillPadding,
          fontSize: fontSize,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <Award size={size === 'lg' ? 20 : 15} />
        <span>Band {band.toFixed(1)}</span>
        <span style={{ fontSize: '0.75em', opacity: 0.85, fontWeight: 500 }}>
          ({descriptor.title})
        </span>
      </div>

      <div
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <Info size={12} />
        <span>Estimated practice indicator · Not an official IELTS score</span>
      </div>

      {showDescription && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          {descriptor.description}
        </p>
      )}
    </div>
  );
};
