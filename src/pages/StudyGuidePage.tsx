import React, { useState } from 'react';
import { STUDY_GUIDES, StudyGuideTopic } from '../data/studyGuideData';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  Headphones,
  PenTool,
  Mic,
  Award,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface StudyGuidePageProps {
  onNavigate: (route: string) => void;
}

export const StudyGuidePage: React.FC<StudyGuidePageProps> = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState<StudyGuideTopic>(STUDY_GUIDES[0]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Official Strategic Guides
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          IELTS Master Study Guide
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Comprehensive strategies, band score descriptors, time management protocols, and actionable test-day advice.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Topics Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {STUDY_GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedTopic(guide)}
              className="card"
              style={{
                padding: '1.2rem',
                cursor: 'pointer',
                backgroundColor: selectedTopic.id === guide.id ? 'var(--brand-primary-light)' : 'var(--bg-surface)',
                border: `1.5px solid ${selectedTopic.id === guide.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span className="badge badge-brand" style={{ fontSize: '0.72rem' }}>
                  {guide.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {guide.readTime}
                </span>
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: selectedTopic.id === guide.id ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                {guide.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Right Column: Selected Guide Full Reading View */}
        <div className="card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface)', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className="badge badge-brand">{selectedTopic.category}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedTopic.readTime}</span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
            {selectedTopic.title}
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', fontStyle: 'italic' }}>
            "{selectedTopic.summary}"
          </p>

          {/* Key Takeaways Box */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-info-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--status-info-border)',
              marginBottom: '2rem',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--status-info-text)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={17} />
              Key Strategic Takeaways:
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {selectedTopic.keyTakeaways.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Body paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.96rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
            {selectedTopic.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Ready to apply this strategy?
            </span>
            <button onClick={() => onNavigate('/practice')} className="btn btn-primary btn-sm">
              <span>Go to Practice Hub</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
