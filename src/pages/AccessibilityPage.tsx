import React from 'react';
import { Eye, Keyboard, Sliders, CheckCircle } from 'lucide-react';

interface AccessibilityPageProps {
  onNavigate: (route: string) => void;
}

export const AccessibilityPage: React.FC<AccessibilityPageProps> = ({ onNavigate }) => {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: '820px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Inclusion Standards
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Accessibility Statement
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Designed to comply with WCAG 2.1 AA/AAA guidelines for learners of all abilities.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={20} style={{ color: 'var(--brand-primary)' }} />
            1. Color-Vision Accessibility (No Color Alone)
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            We adhere strictly to accessible contrast ratios in both Light and Dark modes. Information is never conveyed through color alone: correct answers, errors, warnings, and states are always paired with distinct icons, descriptive text badges, and shape indicators.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Keyboard size={20} style={{ color: '#059669' }} />
            2. Full Keyboard Navigation & Visible Focus
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Every interactive button, form control, navigation link, audio toggle, and modal can be fully reached and operated using the <code>Tab</code>, <code>Enter</code>, and <code>Space</code> keys with a high-contrast 3px focus outline. Press <code>Cmd/Ctrl + K</code> anytime to open the global search modal.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={20} style={{ color: '#D97706' }} />
            3. Respect for Reduced Motion
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            The platform monitors your operating system’s <code>prefers-reduced-motion</code> setting. When enabled, non-essential CSS animations, spinning star trails, and transitions are automatically suppressed.
          </p>
        </div>
      </div>
    </div>
  );
};
