import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getStoredTestResults } from '../services/progressService';
import { getStoredMistakes } from '../services/mistakeService';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { TestResultRecord, SkillType } from '../types';
import {
  TrendingUp,
  Target,
  Flame,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Settings,
  Sparkles
} from 'lucide-react';

interface ProgressPageProps {
  onNavigate: (route: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onNavigate }) => {
  const { profile, updateProfile } = useUser();
  const [testResults, setTestResults] = useState<TestResultRecord[]>([]);
  const [mistakeCount, setMistakeCount] = useState<number>(0);

  // Edit settings modal state
  const [isEditingGoals, setIsEditingGoals] = useState<boolean>(false);
  const [targetBandInput, setTargetBandInput] = useState<number>(profile.targetBand);
  const [examTypeInput, setExamTypeInput] = useState(profile.examType);
  const [testDateInput, setTestDateInput] = useState(profile.testDate || '');

  useEffect(() => {
    setTestResults(getStoredTestResults());
    setMistakeCount(getStoredMistakes().filter(m => m.status === 'active').length);
  }, []);

  const handleSaveGoals = () => {
    updateProfile({
      targetBand: targetBandInput,
      examType: examTypeInput,
      testDate: testDateInput
    });
    setIsEditingGoals(false);
  };

  // Calculate skill progress from test results
  const calculateSkillScore = (skill: SkillType) => {
    const matching = testResults.filter(r => r.testType === skill);
    if (!matching.length) return profile.currentEstimatedBand;
    const sum = matching.reduce((acc, curr) => acc + curr.estimatedBand, 0);
    return Math.round((sum / matching.length) * 2) / 2;
  };

  const listeningScore = calculateSkillScore('listening');
  const readingScore = calculateSkillScore('reading');
  const writingScore = calculateSkillScore('writing');
  const speakingScore = calculateSkillScore('speaking');

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
            Learner Analytics Dashboard
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Preparation Progress
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Live performance trends calculated from your completed tests and practice sessions.
          </p>
        </div>

        <button
          onClick={() => setIsEditingGoals(true)}
          className="btn btn-secondary btn-sm"
          style={{ gap: '0.4rem' }}
        >
          <Settings size={16} />
          <span>Adjust Band Goal & Date</span>
        </button>
      </div>

      {/* Primary KPI Cards Row */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {/* Estimated Practice Band */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Estimated Band</span>
            <Award size={18} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-primary)', lineHeight: 1 }}>
            Band {profile.currentEstimatedBand.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Based on completed tests
          </div>
        </div>

        {/* Target Band */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Band</span>
            <Target size={18} style={{ color: 'var(--brand-accent)' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--brand-accent)', lineHeight: 1 }}>
            Band {profile.targetBand.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Goal: {profile.examType.toUpperCase()}
          </div>
        </div>

        {/* Study Streak */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Study Streak</span>
            <Flame size={18} style={{ color: '#EF4444' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#EF4444', lineHeight: 1 }}>
            {profile.studyStreakDays} Days
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Daily practice consistency
          </div>
        </div>

        {/* Active Mistakes */}
        <div
          className="card card-interactive"
          style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}
          onClick={() => onNavigate('/mistakes')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mistake Book</span>
            <span className="badge badge-warning">{mistakeCount}</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#D97706', lineHeight: 1 }}>
            {mistakeCount} Items
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', marginTop: '0.5rem', fontWeight: 600 }}>
            Click to review & retest →
          </div>
        </div>
      </div>

      {/* Recommended Next Practice Strategy Banner */}
      <div
        className="card"
        style={{
          padding: '1.75rem 2rem',
          backgroundColor: 'var(--status-info-bg)',
          borderColor: 'var(--status-info-border)',
          marginBottom: '2.5rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Sparkles size={20} style={{ color: 'var(--brand-primary)' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--status-info-text)' }}>
                Recommended Next Practice Action
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              "Focus on <strong>Listening Section 3 signposts</strong> and <strong>Writing Task 2 coherence</strong>. Practice transition words in our Grammar Lab to boost grammatical range."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => onNavigate('/writing')} className="btn btn-primary btn-sm">
              Practice Writing Task 2
            </button>
            <button onClick={() => onNavigate('/listening')} className="btn btn-secondary btn-sm">
              Listening Section 3
            </button>
          </div>
        </div>
      </div>

      {/* 4 Skill Performance Bars */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem', backgroundColor: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Skill Mastery Overview (Target: Band {profile.targetBand.toFixed(1)})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { skill: 'Listening', score: listeningScore, icon: <Headphones size={18} style={{ color: 'var(--brand-primary)' }} />, route: '/listening' },
            { skill: 'Reading', score: readingScore, icon: <BookOpen size={18} style={{ color: '#059669' }} />, route: '/reading' },
            { skill: 'Writing', score: writingScore, icon: <PenTool size={18} style={{ color: '#D97706' }} />, route: '/writing' },
            { skill: 'Speaking', score: speakingScore, icon: <Mic size={18} style={{ color: '#DC2626' }} />, route: '/speaking' },
          ].map((item) => {
            const percentage = Math.min(100, Math.round((item.score / 9.0) * 100));

            return (
              <div key={item.skill}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.icon}
                    <span>{item.skill} Practice</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Band {item.score.toFixed(1)}</span>
                    <button
                      onClick={() => onNavigate(item.route)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      Practice
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    height: '10px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      backgroundColor: 'var(--brand-primary)',
                      borderRadius: '5px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Test History Table */}
      <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Recent Practice History ({testResults.length})
        </h3>

        {testResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>No tests completed yet.</p>
            <button onClick={() => onNavigate('/practice')} className="btn btn-primary btn-sm">
              Start Your First Test
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Test Name</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Raw Score</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Accuracy</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Estimated Band</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((tr) => (
                  <tr key={tr.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600 }}>{tr.testTitle}</td>
                    <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-secondary)' }}>{tr.date}</td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>{tr.rawScore} / {tr.totalQuestions}</td>
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <span className={`badge ${tr.accuracyPercentage >= 70 ? 'badge-success' : 'badge-warning'}`}>
                        {tr.accuracyPercentage}%
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.5rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                      Band {tr.estimatedBand.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Adjust Goals Modal */}
      {isEditingGoals && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Update Preparation Goals
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Target Band Score (5.0 - 9.0):
                </label>
                <select
                  value={targetBandInput}
                  onChange={(e) => setTargetBandInput(parseFloat(e.target.value))}
                  className="form-select"
                >
                  {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                    <option key={b} value={b}>Band {b.toFixed(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Exam Module:
                </label>
                <select
                  value={examTypeInput}
                  onChange={(e) => setExamTypeInput(e.target.value as any)}
                  className="form-select"
                >
                  <option value="academic">IELTS Academic</option>
                  <option value="general">IELTS General Training</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Test Date (Optional):
                </label>
                <input
                  type="date"
                  value={testDateInput}
                  onChange={(e) => setTestDateInput(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsEditingGoals(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleSaveGoals} className="btn btn-primary btn-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
