import React from 'react';
import { useUser } from '../context/UserContext';
import {
  Calendar,
  Clock,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Award,
  ArrowRight,
  CheckCircle,
  Target
} from 'lucide-react';

interface StudyPlanPageProps {
  onNavigate: (route: string) => void;
}

export const StudyPlanPage: React.FC<StudyPlanPageProps> = ({ onNavigate }) => {
  const { profile } = useUser();

  const weeklySchedule = [
    {
      day: 'Monday',
      skill: 'Listening Studio',
      duration: '35 mins',
      focus: 'Section 1 & 2 Focus: Social dialogues, numbers, names, and note-taking.',
      route: '/listening',
      icon: <Headphones size={20} style={{ color: 'var(--brand-primary)' }} />
    },
    {
      day: 'Tuesday',
      skill: 'Writing Task 2',
      duration: '45 mins',
      focus: 'Draft an argumentative 260-word essay with clear 4-paragraph structure.',
      route: '/writing',
      icon: <PenTool size={20} style={{ color: '#D97706' }} />
    },
    {
      day: 'Wednesday',
      skill: 'Speaking Studio',
      duration: '25 mins',
      focus: 'Part 2 Cue Card: Practice sustained 2-minute speaking without hesitation.',
      route: '/speaking',
      icon: <Mic size={20} style={{ color: '#DC2626' }} />
    },
    {
      day: 'Thursday',
      skill: 'Reading Studio',
      duration: '40 mins',
      focus: 'Academic Passage: Master True / False / Not Given and heading matching.',
      route: '/reading',
      icon: <BookOpen size={20} style={{ color: '#059669' }} />
    },
    {
      day: 'Friday',
      skill: 'Vocabulary & Grammar Lab',
      duration: '30 mins',
      focus: 'Review 15 Academic Flashcards & practice conditional clauses.',
      route: '/vocabulary',
      icon: <Target size={20} style={{ color: '#7C3AED' }} />
    },
    {
      day: 'Saturday',
      skill: 'Full Timed Mock Exam',
      duration: '90 mins',
      focus: 'Simulate examination endurance and log all missed questions.',
      route: '/mock-tests',
      icon: <Award size={20} style={{ color: 'var(--brand-accent)' }} />
    },
    {
      day: 'Sunday',
      skill: 'My Mistake Book Revision',
      duration: '30 mins',
      focus: 'Retest active mistakes and review strategic guidance articles.',
      route: '/mistakes',
      icon: <CheckCircle size={20} style={{ color: '#10B981' }} />
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Personalized Routine
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Your Weekly Preparation Plan
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Calibrated specifically for your target goal of <strong>Band {profile.targetBand.toFixed(1)}</strong> ({profile.examType.toUpperCase()}).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {weeklySchedule.map((item) => (
          <div
            key={item.day}
            className="card card-interactive"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
            onClick={() => onNavigate(item.route)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  minWidth: '95px',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: 'var(--brand-primary)',
                }}
              >
                {item.day}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {item.skill}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {item.focus}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={15} /> {item.duration}
              </span>
              <button className="btn btn-outline btn-sm">
                <span>Start Session</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
