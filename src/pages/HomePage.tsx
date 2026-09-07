import React, { useState } from 'react';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Compass,
  CheckCircle,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  RotateCcw,
  Target
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { ExamType } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { profile, updateProfile } = useUser();
  const [selectedGoal, setSelectedGoal] = useState<ExamType>(profile.examType);

  const handleGoalChange = (goal: ExamType) => {
    setSelectedGoal(goal);
    updateProfile({ examType: goal });
  };

  const skillCards = [
    {
      title: 'Listening Studio',
      subtitle: 'Section 1 to 4 Full Simulations',
      desc: 'Authentic accents (British, American, Australian, Canadian), real audio player, and instant question review.',
      route: '/listening',
      icon: <Headphones size={28} style={{ color: 'var(--brand-primary)' }} />,
      badge: '4 Accents',
      badgeClass: 'badge-brand',
      cta: 'Practice Listening'
    },
    {
      title: 'Reading Studio',
      subtitle: 'Academic & General Passages',
      desc: 'Master True/False/Not Given, matching headings, summary completion, and learn why wrong answers were traps.',
      route: '/reading',
      icon: <BookOpen size={28} style={{ color: '#059669' }} />,
      badge: 'Split Screen',
      badgeClass: 'badge-success',
      cta: 'Practice Reading'
    },
    {
      title: 'Writing Studio',
      subtitle: 'Task 1 Charts & Task 2 Essays',
      desc: 'Live word counter, countdown timer, and automated analysis for cohesion, vocabulary variety, and task achievement.',
      route: '/writing',
      icon: <PenTool size={28} style={{ color: '#D97706' }} />,
      badge: 'Band Analyzer',
      badgeClass: 'badge-warning',
      cta: 'Practice Writing'
    },
    {
      title: 'Speaking Studio',
      subtitle: 'Parts 1, 2 & 3 Interactive Mic',
      desc: 'Live microphone recording, real-time speech transcription, filler word counter, and words-per-minute fluency metrics.',
      route: '/speaking',
      icon: <Mic size={28} style={{ color: '#DC2626' }} />,
      badge: 'Speech Analysis',
      badgeClass: 'badge-danger',
      cta: 'Practice Speaking'
    }
  ];

  const steps = [
    {
      num: '1',
      title: 'Practice',
      desc: 'Work through authentic original IELTS question sets across all 4 core modules.',
      icon: <Layers size={20} />
    },
    {
      num: '2',
      title: 'Get Feedback',
      desc: 'Instant, rule-based diagnostic evaluation of your grammar, fluency, and answers.',
      icon: <Sparkles size={20} />
    },
    {
      num: '3',
      title: 'Understand Mistakes',
      desc: 'Automated error logging in "My Mistake Book" with clear explanations for every trap.',
      icon: <RotateCcw size={20} />
    },
    {
      num: '4',
      title: 'Improve',
      desc: 'Target weak areas using structured Vocabulary Flashcards and the Grammar Lab.',
      icon: <TrendingUp size={20} />
    },
    {
      num: '5',
      title: 'Track Progress',
      desc: 'Monitor your estimated practice band, study streak, and readiness for test day.',
      icon: <Target size={20} />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          paddingTop: '4.5rem',
          paddingBottom: '5rem',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at top, var(--brand-primary-light) 0%, var(--bg-primary) 70%)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '940px' }}>
          {/* Tagline Badge */}
          <div
            className="badge badge-brand"
            style={{
              marginBottom: '1.5rem',
              padding: '0.45rem 1.25rem',
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Sparkles size={16} />
            <span>Practice Smarter. Improve Faster. Achieve Your IELTS Goal.</span>
          </div>

          {/* Hero Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: 'var(--text-primary)',
            }}
          >
            Your Smarter IELTS <span style={{ color: 'var(--brand-primary)' }}>Practice Partner</span>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '760px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            Master <strong>Listening</strong>, <strong>Reading</strong>, <strong>Writing</strong>, and <strong>Speaking</strong> on an international EdTech platform. Receive instant objective feedback, identify your weaknesses in a personalized mistake book, and build test-day confidence.
          </p>

          {/* Primary & Secondary Call To Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
            }}
          >
            <button
              onClick={() => onNavigate('/practice')}
              className="btn btn-primary btn-lg"
              style={{ gap: '0.6rem' }}
            >
              <span>Start Practicing</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('/diagnostic')}
              className="btn btn-secondary btn-lg"
              style={{ gap: '0.6rem' }}
            >
              <Compass size={18} style={{ color: 'var(--brand-primary)' }} />
              <span>Take a Diagnostic Test</span>
            </button>
          </div>

          {/* Feature Badges Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} style={{ color: '#10B981' }} />
              100% Original Practice Content
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} style={{ color: '#10B981' }} />
              Real Audio & Microphone Engine
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} style={{ color: '#10B981' }} />
              Private & Local (No Cloud Uploads)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} style={{ color: '#10B981' }} />
              Light & Dark Mode Accessible
            </span>
          </div>
        </div>
      </section>

      {/* 4 Skill Cards Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Complete Four-Skill IELTS Preparation
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Deliberately designed practice environments reflecting the rigor and timing of real examination modules.
            </p>
          </div>

          <div className="grid-4">
            {skillCards.map((card) => (
              <div
                key={card.title}
                className="card card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
                onClick={() => onNavigate(card.route)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.icon}
                    </div>
                    <span className={`badge ${card.badgeClass}`}>{card.badge}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {card.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {card.subtitle}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {card.desc}
                  </p>
                </div>

                <button
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>{card.cta}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How NovaPrep Helps: 5-Step Learning Loop */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.75rem' }}>
              Pedagogical Methodology
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              How NovaPrep Accelerates Your Band Score
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Unlike passive study platforms, IELTS NovaPrep operates on an active feedback loop proven to build test confidence.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                className="card"
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-subtle)',
                  padding: '1.5rem',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'var(--brand-primary)',
                    opacity: 0.15,
                    lineHeight: 1,
                  }}
                >
                  0{step.num}
                </div>

                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--brand-primary-light)',
                    color: 'var(--brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {step.icon}
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal Selector Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Choose Your IELTS Goal
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Select your examination module. We will customize your reading passages and writing task prompts accordingly.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              {/* Academic Option */}
              <div
                onClick={() => handleGoalChange('academic')}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedGoal === 'academic' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedGoal === 'academic' ? 'var(--brand-primary-light)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: selectedGoal === 'academic' ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                    IELTS Academic
                  </h4>
                  {selectedGoal === 'academic' && <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Tailored for higher education admissions, postgraduate degrees, and professional registration in English-speaking institutions worldwide.
                </p>
              </div>

              {/* General Training Option */}
              <div
                onClick={() => handleGoalChange('general')}
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedGoal === 'general' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: selectedGoal === 'general' ? 'var(--brand-primary-light)' : 'var(--bg-surface)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: selectedGoal === 'general' ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                    IELTS General Training
                  </h4>
                  {selectedGoal === 'general' && <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Optimized for migration, secondary education, or vocational training in Australia, Canada, New Zealand, and the UK.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => onNavigate('/practice')} className="btn btn-primary">
                Confirm & Explore Practice Hub
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
