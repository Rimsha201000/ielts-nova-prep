import React, { useState } from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  BookMarked
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface PracticeHubPageProps {
  onNavigate: (route: string) => void;
}

export const PracticeHubPage: React.FC<PracticeHubPageProps> = ({ onNavigate }) => {
  const { profile } = useUser();
  const [filterSkill, setFilterSkill] = useState<string>('all');

  const practices = [
    {
      id: 'p-listen-1',
      skill: 'listening',
      title: 'Section 1: Homestay Accommodation Inquiry',
      accent: 'British Accent',
      duration: '10 mins',
      questions: 5,
      route: '/listening',
      icon: <Headphones size={22} style={{ color: 'var(--brand-primary)' }} />,
      tag: 'Section 1 (Social)',
      desc: 'Form completion & phone inquiry details regarding homestay preferences and diet.'
    },
    {
      id: 'p-listen-2',
      skill: 'listening',
      title: 'Section 2: Botanical Pavilion Visitor Orientation',
      accent: 'Australian Accent',
      duration: '12 mins',
      questions: 4,
      route: '/listening',
      icon: <Headphones size={22} style={{ color: 'var(--brand-primary)' }} />,
      tag: 'Section 2 (Monologue)',
      desc: 'Map navigation, location identification, and volunteer guidelines.'
    },
    {
      id: 'p-read-1',
      skill: 'reading',
      title: 'Passage 1: Controlled-Environment Vertical Agriculture',
      accent: 'Academic Reading',
      duration: '20 mins',
      questions: 5,
      route: '/reading',
      icon: <BookOpen size={22} style={{ color: '#059669' }} />,
      tag: 'True/False/Not Given',
      desc: 'Modern urban vertical hydroponics, energy constraints, and ecological trade-offs.'
    },
    {
      id: 'p-read-2',
      skill: 'reading',
      title: 'Passage 2: Cognitive Neuroscience of Sleep & Memory',
      accent: 'Academic Reading',
      duration: '20 mins',
      questions: 4,
      route: '/reading',
      icon: <BookOpen size={22} style={{ color: '#059669' }} />,
      tag: 'Multiple Choice & Summary',
      desc: 'Hippocampal consolidation, slow-wave NREM and REM dreaming mechanics.'
    },
    {
      id: 'p-write-1',
      skill: 'writing',
      title: 'Task 2: Generative AI in Higher Education',
      accent: '40 Mins Timed',
      duration: '40 mins',
      questions: 1,
      route: '/writing',
      icon: <PenTool size={22} style={{ color: '#D97706' }} />,
      tag: 'Task 2 Essay',
      desc: 'Discuss both views on AI bans versus academic integration with real-time heuristic feedback.'
    },
    {
      id: 'p-write-2',
      skill: 'writing',
      title: 'Task 1: Global Renewable Energy Generation (2010 - 2024)',
      accent: '20 Mins Timed',
      duration: '20 mins',
      questions: 1,
      route: '/writing',
      icon: <PenTool size={22} style={{ color: '#D97706' }} />,
      tag: 'Task 1 Bar Chart',
      desc: 'Analyze comparative trends between solar, wind, and hydroelectric generation with live word counter.'
    },
    {
      id: 'p-speak-1',
      skill: 'speaking',
      title: 'Speaking Studio: Full 3-Part Interview Simulation',
      accent: 'Live Microphone',
      duration: '14 mins',
      questions: 8,
      route: '/speaking',
      icon: <Mic size={22} style={{ color: '#DC2626' }} />,
      tag: 'Parts 1, 2 & 3',
      desc: 'Speak using your device microphone, receive automated fluency rate and filler word feedback.'
    },
    {
      id: 'p-speak-2',
      skill: 'speaking',
      title: 'Speaking Part 2: Environmental Lifestyle Decision (Cue Card)',
      accent: 'Cue Card Mode',
      duration: '4 mins',
      questions: 1,
      route: '/speaking',
      icon: <Mic size={22} style={{ color: '#DC2626' }} />,
      tag: 'Part 2 Cue Card',
      desc: '1-minute preparation timer and 2-minute sustained speech recording with live transcript.'
    }
  ];

  const filtered = filterSkill === 'all'
    ? practices
    : practices.filter(p => p.skill === filterSkill);

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>
          Interactive Practice Hub
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Targeted Skill Practice
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Select a skill to begin timed practice with realistic exam-style audio, interactive forms, live microphone evaluation, and automated band analysis.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1rem',
        }}
      >
        {[
          { id: 'all', label: 'All Practice Modules' },
          { id: 'listening', label: 'Listening', icon: <Headphones size={15} /> },
          { id: 'reading', label: 'Reading', icon: <BookOpen size={15} /> },
          { id: 'writing', label: 'Writing', icon: <PenTool size={15} /> },
          { id: 'speaking', label: 'Speaking', icon: <Mic size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterSkill(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: filterSkill === tab.id ? 'var(--brand-primary)' : 'var(--bg-surface)',
              color: filterSkill === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${filterSkill === tab.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
              transition: 'all 0.15s ease',
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Grid of Practice Exercises */}
      <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '3.5rem' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card card-interactive"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={() => onNavigate(item.route)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  <span>{item.duration}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {item.desc}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '0.9rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {item.accent}
              </span>
              <button
                className="btn btn-primary btn-sm"
                style={{ gap: '0.35rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(item.route);
                }}
              >
                <span>Launch Exercise</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Fast-Access Tools Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
          border: '1.5px solid var(--brand-primary)',
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ maxWidth: '580px' }}>
            <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>
              Essential Study Labs
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Build Foundation Skills in Vocabulary & Grammar
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              IELTS examiners heavily weigh lexical precision and complex grammatical structures across both Writing and Speaking. Spend 15 minutes reviewing our targeted labs.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('/vocabulary')} className="btn btn-secondary btn-sm">
              <BookMarked size={16} style={{ color: 'var(--brand-accent)' }} />
              <span>Vocabulary Builder</span>
            </button>
            <button onClick={() => onNavigate('/grammar')} className="btn btn-secondary btn-sm">
              <Sparkles size={16} style={{ color: 'var(--brand-primary)' }} />
              <span>Grammar Lab</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
