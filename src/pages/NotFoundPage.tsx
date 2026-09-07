import React from 'react';
import { Home, Search, Headphones, BookOpen } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div
      className="container"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        textAlign: 'center',
        maxWidth: '560px',
      }}
    >
      <div
        className="card"
        style={{
          padding: '3rem 2rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '5rem',
            fontWeight: 900,
            color: 'var(--brand-primary)',
            lineHeight: 1,
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          404
        </span>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          The practice section or resource you requested could not be located. You can navigate back to the homepage or explore our core practice studios.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('/')} className="btn btn-primary btn-sm">
            <Home size={16} />
            <span>Go to Homepage</span>
          </button>
          <button onClick={() => onNavigate('/practice')} className="btn btn-secondary btn-sm">
            <span>Practice Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
