import React, { useState, useEffect } from 'react';
import { getStoredMistakes, markMistakeMastered, removeMistake } from '../services/mistakeService';
import { MistakeRecord, SkillType } from '../types';
import {
  RotateCcw,
  CheckCircle,
  Trash2,
  Filter,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Sparkles,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface MistakeBookPageProps {
  onNavigate: (route: string) => void;
}

export const MistakeBookPage: React.FC<MistakeBookPageProps> = ({ onNavigate }) => {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>('');
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  useEffect(() => {
    setMistakes(getStoredMistakes());
  }, []);

  const handleMarkMastered = (id: string) => {
    markMistakeMastered(id);
    setMistakes(getStoredMistakes());
  };

  const handleRemove = (id: string) => {
    removeMistake(id);
    setMistakes(getStoredMistakes());
  };

  const filteredMistakes = selectedFilter === 'all'
    ? mistakes
    : selectedFilter === 'active'
    ? mistakes.filter(m => m.status === 'active')
    : selectedFilter === 'mastered'
    ? mistakes.filter(m => m.status === 'mastered')
    : mistakes.filter(m => m.skill === selectedFilter);

  const activeMistakes = mistakes.filter(m => m.status === 'active');

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'listening': return <Headphones size={16} style={{ color: 'var(--brand-primary)' }} />;
      case 'reading': return <BookOpen size={16} style={{ color: '#059669' }} />;
      case 'writing': return <PenTool size={16} style={{ color: '#D97706' }} />;
      case 'speaking': return <Mic size={16} style={{ color: '#DC2626' }} />;
      default: return <HelpCircle size={16} />;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span className="badge badge-warning" style={{ marginBottom: '0.4rem' }}>
            Adaptive Learning Ledger
          </span>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800 }}>
            My Mistake Book
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Questions you missed during practice tests are automatically cataloged here for deliberate review.
          </p>
        </div>

        {activeMistakes.length > 0 && !quizMode && (
          <button
            onClick={() => {
              setQuizMode(true);
              setQuizIndex(0);
              setShowQuizResult(false);
              setQuizUserAnswer('');
            }}
            className="btn btn-primary"
            style={{ gap: '0.4rem' }}
          >
            <Sparkles size={16} />
            <span>Practice My Active Mistakes ({activeMistakes.length})</span>
          </button>
        )}
      </div>

      {/* Interactive Mistake Quiz Mode */}
      {quizMode && activeMistakes.length > 0 ? (
        <div className="card" style={{ padding: '2.5rem', marginBottom: '2.5rem', border: '2px solid var(--brand-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className="badge badge-brand">
              Mistake Retest: Question {quizIndex + 1} of {activeMistakes.length}
            </span>
            <button
              onClick={() => setQuizMode(false)}
              className="btn btn-secondary btn-sm"
            >
              Exit Quiz
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-warning" style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>
              {activeMistakes[quizIndex].skill} · {activeMistakes[quizIndex].category}
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.6, marginTop: '0.4rem' }}>
              {activeMistakes[quizIndex].question}
            </h3>
          </div>

          {!showQuizResult ? (
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Type the corrected answer here..."
                value={quizUserAnswer}
                onChange={(e) => setQuizUserAnswer(e.target.value)}
                style={{ maxWidth: '480px', marginBottom: '1.25rem' }}
              />
              <div>
                <button
                  onClick={() => setShowQuizResult(true)}
                  className="btn btn-primary btn-sm"
                  disabled={!quizUserAnswer.trim()}
                >
                  Verify Answer
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {quizUserAnswer.trim().toLowerCase() === activeMistakes[quizIndex].correctAnswer.toLowerCase() ? (
                  <span className="badge badge-success">✓ Correct Answer!</span>
                ) : (
                  <span className="badge badge-danger">✕ Not quite right yet</span>
                )}
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                <strong>Correct Answer:</strong> <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{activeMistakes[quizIndex].correctAnswer}</span>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Explanation:</strong> {activeMistakes[quizIndex].explanation}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  onClick={() => {
                    handleMarkMastered(activeMistakes[quizIndex].id);
                    if (quizIndex + 1 < activeMistakes.length) {
                      setQuizIndex(prev => prev + 1);
                      setShowQuizResult(false);
                      setQuizUserAnswer('');
                    } else {
                      setQuizMode(false);
                    }
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <CheckCircle size={15} />
                  <span>Mark as Mastered & Next</span>
                </button>

                <button
                  onClick={() => {
                    if (quizIndex + 1 < activeMistakes.length) {
                      setQuizIndex(prev => prev + 1);
                      setShowQuizResult(false);
                      setQuizUserAnswer('');
                    } else {
                      setQuizMode(false);
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Skip to Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

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
          { id: 'all', label: `All (${mistakes.length})` },
          { id: 'active', label: `Needs Practice (${activeMistakes.length})` },
          { id: 'mastered', label: `Mastered (${mistakes.filter(m => m.status === 'mastered').length})` },
          { id: 'listening', label: 'Listening' },
          { id: 'reading', label: 'Reading' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              backgroundColor: selectedFilter === tab.id ? 'var(--brand-primary)' : 'var(--bg-surface)',
              color: selectedFilter === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${selectedFilter === tab.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <div className="card" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            <CheckCircle size={28} style={{ color: '#10B981' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Mistakes in this View!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.5rem auto' }}>
            As you take Listening, Reading, and Grammar practice exercises, any incorrect responses will be logged here automatically.
          </p>
          <button onClick={() => onNavigate('/practice')} className="btn btn-primary btn-sm">
            Launch a Practice Test
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredMistakes.map((m) => (
            <div
              key={m.id}
              className="card"
              style={{
                padding: '1.5rem',
                borderLeft: `4px solid ${m.status === 'mastered' ? '#10B981' : '#F59E0B'}`,
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getSkillIcon(m.skill)}
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                    {m.skill} · {m.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ({new Date(m.timestamp).toLocaleDateString()})
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${m.status === 'mastered' ? 'badge-success' : 'badge-warning'}`}>
                    {m.status === 'mastered' ? '✓ Mastered' : '⚠ Needs Practice'}
                  </span>
                  <button
                    onClick={() => handleRemove(m.id)}
                    style={{ color: 'var(--text-muted)', padding: '0.2rem' }}
                    title="Delete mistake"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.5 }}>
                {m.question}
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Your Submitted Answer:</span>
                  <span style={{ color: '#DC2626', fontWeight: 600 }}>{m.userAnswer}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Correct Answer:</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>{m.correctAnswer}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                <strong>Why:</strong> {m.explanation}
              </p>

              {m.status !== 'mastered' && (
                <button
                  onClick={() => handleMarkMastered(m.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.35rem', fontSize: '0.8rem' }}
                >
                  <CheckCircle size={14} style={{ color: '#10B981' }} />
                  <span>Mark as Mastered</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
