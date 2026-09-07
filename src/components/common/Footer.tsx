import React from 'react';
import { AnimatedLogo } from './AnimatedLogo';
import { ShieldCheck, Globe, Heart, BookOpen, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: 'auto',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        <div className="site-footer-grid">
          {/* Column 1: Brand & Mission */}
          <div style={{ maxWidth: '340px' }}>
            <div
              onClick={() => onNavigate('/')}
              style={{ cursor: 'pointer', marginBottom: '0.75rem', display: 'inline-block' }}
            >
              <AnimatedLogo size="md" showTagline={false} />
            </div>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: '0.85rem', letterSpacing: '0.01em' }}>
              Practice Smarter · Improve Faster · Achieve Your Goal
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              International EdTech platform empowering candidates worldwide with realistic practice tests, automated writing & speaking feedback, and personalized improvement pathways.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Globe size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
              <span>Built for global IELTS learners</span>
            </div>
          </div>

          {/* Column 2: Core Practice */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Practice Modules
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>
                <button onClick={() => onNavigate('/listening')} style={{ textAlign: 'left' }}>
                  Listening Studio (4 Accents)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/reading')} style={{ textAlign: 'left' }}>
                  Reading Studio (Academic & GT)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/writing')} style={{ textAlign: 'left' }}>
                  Writing Studio (Task 1 & 2)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/speaking')} style={{ textAlign: 'left' }}>
                  Speaking Studio (Live Mic)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mock-tests')} style={{ textAlign: 'left' }}>
                  Full Timed Mock Exams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/diagnostic')} style={{ textAlign: 'left' }}>
                  Diagnostic Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Learning Labs */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Knowledge & Tools
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>
                <button onClick={() => onNavigate('/vocabulary')} style={{ textAlign: 'left' }}>
                  IELTS Vocabulary Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/grammar')} style={{ textAlign: 'left' }}>
                  Interactive Grammar Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mistakes')} style={{ textAlign: 'left' }}>
                  My Mistake Book
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/progress')} style={{ textAlign: 'left' }}>
                  Learner Dashboard & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/study-guide')} style={{ textAlign: 'left' }}>
                  Strategy & Band Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/study-plan')} style={{ textAlign: 'left' }}>
                  Personalized Study Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Legal */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Platform & Standards
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>
                <button onClick={() => onNavigate('/about')} style={{ textAlign: 'left' }}>
                  About NovaPrep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} style={{ textAlign: 'left' }}>
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/accessibility')} style={{ textAlign: 'left' }}>
                  Accessibility Statement (WCAG)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about#disclaimer')} style={{ textAlign: 'left' }}>
                  Official Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Independent IELTS Disclaimer Box */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <ShieldCheck size={24} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '0.15rem' }} />
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
              Important IELTS Disclaimer:
            </strong>
            IELTS NovaPrep is an independent IELTS preparation and practice platform. It is not affiliated with or endorsed by IELTS, British Council, IDP Education or Cambridge. All practice materials, questions, diagnostic assessments, and reading texts on this platform are original educational works crafted specifically for self-improvement and mock practice. Automated evaluations represent estimated practice indicators and not official examiner certifications.
          </div>
        </div>

        {/* Copyright and Bottom Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} IELTS NovaPrep. Practice Smarter. Improve Faster. Achieve Your IELTS Goal.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={() => onNavigate('/privacy')} style={{ color: 'var(--text-muted)' }}>Privacy</button>
            <button onClick={() => onNavigate('/accessibility')} style={{ color: 'var(--text-muted)' }}>Accessibility</button>
            <button onClick={() => onNavigate('/about')} style={{ color: 'var(--text-muted)' }}>About</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
