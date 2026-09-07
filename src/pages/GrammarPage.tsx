import React, { useState } from 'react';
import { GRAMMAR_MODULES } from '../data/grammarData';
import { saveMistake } from '../services/mistakeService';
import {
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrammarPageProps {
  onNavigate: (route: string) => void;
}

export const GrammarPage: React.FC<GrammarPageProps> = ({ onNavigate }) => {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const activeModule = GRAMMAR_MODULES[selectedModuleIndex];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, option: string) => {
    if (submitted[questionId]) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleCheckQuestion = (questionId: string, correctAnswer: string, explanation: string, promptText: string) => {
    setSubmitted(prev => ({ ...prev, [questionId]: true }));
    const isCorrect = answers[questionId] === correctAnswer;

    if (isCorrect) {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      saveMistake({
        skill: 'grammar',
        category: activeModule.title,
        question: promptText,
        userAnswer: answers[questionId] || '(Blank)',
        correctAnswer,
        explanation
      });
    }
  };

  const handleResetQuestion = (questionId: string) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSubmitted(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Grammatical Range & Accuracy Lab
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          IELTS Grammar Studio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Master the complex syntactic structures, academic passive forms, and connector patterns required for Band 7.5+ in Writing and Speaking.
        </p>
      </div>

      {/* Module Selector Tabs */}
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
        {GRAMMAR_MODULES.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedModuleIndex(idx);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              backgroundColor: selectedModuleIndex === idx ? 'var(--brand-primary)' : 'var(--bg-surface)',
              color: selectedModuleIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${selectedModuleIndex === idx ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
            }}
          >
            {m.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Module Guide & Rule Card */}
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2.5rem', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>
            {activeModule.category}
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {activeModule.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {activeModule.explanation}
          </p>
        </div>

        {/* Rule Formula Box */}
        {activeModule.ruleFormula && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              borderLeft: '4px solid var(--brand-primary)',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
            }}
          >
            <strong>Grammar Rule:</strong> {activeModule.ruleFormula}
          </div>
        )}

        {/* High-Band Examples */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            High-Band Academic Examples:
          </h4>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
            {activeModule.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Exercises for this module */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
          Interactive Practice Challenges
        </h3>

        {activeModule.questions.map((q, idx) => {
          const isSubmitted = !!submitted[q.id];
          const userChoice = answers[q.id];
          const isCorrect = isSubmitted && userChoice === q.correctAnswer;
          const isWrong = isSubmitted && userChoice !== q.correctAnswer;

          return (
            <div
              key={q.id}
              className="card"
              style={{
                padding: '1.75rem',
                backgroundColor: isWrong
                  ? 'var(--status-danger-bg)'
                  : isCorrect
                  ? 'var(--status-success-bg)'
                  : 'var(--bg-surface)',
                border: `1.5px solid ${
                  isWrong
                    ? 'var(--status-danger-border)'
                    : isCorrect
                    ? 'var(--status-success-border)'
                    : 'var(--border-subtle)'
                }`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-brand">Exercise {idx + 1}</span>
                {isSubmitted && (
                  <span className={`badge ${isCorrect ? 'badge-success' : 'badge-danger'}`}>
                    {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                  </span>
                )}
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {q.prompt}
              </h4>

              {/* Options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(q.id, opt)}
                    disabled={isSubmitted}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      backgroundColor: userChoice === opt ? 'var(--brand-primary-light)' : 'var(--bg-surface)',
                      color: userChoice === opt ? 'var(--brand-primary)' : 'var(--text-primary)',
                      border: `1.5px solid ${userChoice === opt ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                      cursor: isSubmitted ? 'default' : 'pointer',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Action and Explanation */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                {!isSubmitted ? (
                  <button
                    onClick={() => handleCheckQuestion(q.id, q.correctAnswer, q.explanation, q.prompt)}
                    className="btn btn-primary btn-sm"
                    disabled={!userChoice}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetQuestion(q.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.35rem' }}
                  >
                    <RotateCcw size={14} />
                    <span>Try Again</span>
                  </button>
                )}

                {isSubmitted && (
                  <div style={{ flex: 1, paddingLeft: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
