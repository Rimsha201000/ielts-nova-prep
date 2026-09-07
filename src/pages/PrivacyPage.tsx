import React from 'react';
import { ShieldCheck, Lock, EyeOff, HardDrive } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: '820px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Candidate Protection
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Last updated: September 2026 · Committed to zero unnecessary data collection.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HardDrive size={20} style={{ color: 'var(--brand-primary)' }} />
            1. Local Browser Storage Only
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            IELTS NovaPrep runs primarily in your browser. Your practice scores, mock test results, study streak, target band, and "My Mistake Book" entries are stored locally on your device via HTML5 <code>localStorage</code>. No registration is required for basic practice, and your scores are never sold or shared.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <EyeOff size={20} style={{ color: '#059669' }} />
            2. Audio & Microphone Processing
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            When you use the Speaking Practice Studio, your microphone is accessed solely through standard browser Media APIs. Audio recordings and transcriptions are processed strictly within your local browser session. We do not upload, transmit, or permanently store your voice recordings on remote servers.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} style={{ color: '#D97706' }} />
            3. Writing Submissions
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Essays and reports typed into the Writing Practice Studio are analyzed using client-side heuristic evaluation algorithms. Your drafts remain on your computer.
          </p>
        </div>
      </div>
    </div>
  );
};
