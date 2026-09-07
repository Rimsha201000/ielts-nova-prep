import React, { useState, useEffect } from 'react';
import { READING_EXERCISES } from '../data/readingData';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { calculateAcademicReadingBand } from '../services/scoringEngine';
import { saveMistake } from '../services/mistakeService';
import { saveTestResult } from '../services/progressService';
import {
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingPageProps {
  onNavigate: (route: string) => void;
}

export const ReadingPage: React.FC<ReadingPageProps> = ({ onNavigate }) => {
  const [selectedPassageIndex, setSelectedPassageIndex] = useState<number>(0);
  const exercise = READING_EXERCISES[selectedPassageIndex];

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    total: number;
    band: number;
  } | null>(null);

  // Timer state (20 mins per passage standard)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: number;
    if (isTimerRunning && secondsRemaining > 0 && !isSubmitted) {
      interval = window.setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining, isSubmitted]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (qId: string, val: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const questions = exercise.questions;

    questions.forEach(q => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      const isCorrect = userAns === correctAns;

      if (isCorrect) {
        correct += 1;
      } else {
        saveMistake({
          skill: 'reading',
          category: `Passage ${exercise.passageNumber}`,
          question: q.question,
          userAnswer: userAnswers[q.id] || '(Unanswered)',
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        });
      }
    });

    const band = calculateAcademicReadingBand(correct, questions.length);
    setScoreResult({
      correctCount: correct,
      total: questions.length,
      band,
    });
    setIsSubmitted(true);
    setIsTimerRunning(false);

    // Save test result
    saveTestResult({
      testTitle: `Reading: ${exercise.title}`,
      testType: 'reading',
      rawScore: correct,
      totalQuestions: questions.length,
      accuracyPercentage: Math.round((correct / questions.length) * 100),
      estimatedBand: band,
      timeSpentSeconds: 20 * 60 - secondsRemaining,
      breakdown: [{ skill: 'Reading', score: correct, total: questions.length }],
      strengths: correct >= 3 ? ['Accurate text scanning and fact verification.'] : [],
      weaknesses: correct < questions.length ? ['Review subtle differences between FALSE and NOT GIVEN.'] : [],
      recommendation: 'Carefully compare statements against direct passage sentences before guessing.'
    });

    if (correct >= questions.length * 0.75) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setSecondsRemaining(20 * 60);
    setIsTimerRunning(true);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Top Header & Passage Navigator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
            Academic Reading Studio
          </span>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800 }}>
            {exercise.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Topic: <strong>{exercise.topic}</strong> · Word Count: ~{exercise.wordCount} words
          </p>
        </div>

        {/* Timer & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            className="card"
            style={{
              padding: '0.4rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '1rem',
              color: secondsRemaining < 300 ? '#DC2626' : 'var(--text-primary)',
            }}
          >
            <Clock size={18} style={{ color: secondsRemaining < 300 ? '#DC2626' : 'var(--brand-primary)' }} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {READING_EXERCISES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPassageIndex(idx);
                  handleReset();
                }}
                className="btn btn-sm"
                style={{
                  backgroundColor: selectedPassageIndex === idx ? 'var(--brand-primary)' : 'var(--bg-surface)',
                  color: selectedPassageIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  fontWeight: 600,
                }}
              >
                Passage {p.passageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results banner if submitted */}
      {isSubmitted && scoreResult && (
        <div
          className="card"
          style={{
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            border: '2px solid #059669',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <CheckCircle size={22} style={{ color: '#10B981' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                  Reading Assessment Complete
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Raw Score: <strong>{scoreResult.correctCount} / {scoreResult.total}</strong> ({Math.round((scoreResult.correctCount / scoreResult.total) * 100)}% Accuracy)
              </p>
            </div>

            <BandScoreBadge band={scoreResult.band} size="lg" />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              <RotateCcw size={15} />
              <span>Retry Passage</span>
            </button>
            <button onClick={() => onNavigate('/mistakes')} className="btn btn-outline btn-sm">
              <span>Review Mistake Book</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Split-Screen: Passage on Left / Questions on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Reading Passage Text */}
        <div
          className="card"
          style={{
            padding: '2rem',
            maxHeight: '75vh',
            overflowY: 'auto',
            backgroundColor: 'var(--bg-surface)',
            lineHeight: 1.8,
            fontSize: '0.95rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Reading Passage</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scroll to read full text</span>
          </div>

          <div style={{ whiteSpace: 'pre-line', color: 'var(--text-primary)' }}>
            {exercise.passageText}
          </div>
        </div>

        {/* Right Column: Questions */}
        <div
          className="card"
          style={{
            padding: '2rem',
            maxHeight: '75vh',
            overflowY: 'auto',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Questions</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Answer all questions
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {exercise.questions.map((q, idx) => {
              const userAns = (userAnswers[q.id] || '').trim();
              const isCorrect = isSubmitted && userAns.toLowerCase() === q.correctAnswer.toLowerCase();
              const isWrong = isSubmitted && !isCorrect;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isWrong
                      ? 'var(--status-danger-bg)'
                      : isCorrect
                      ? 'var(--status-success-bg)'
                      : 'var(--bg-subtle)',
                    border: `1px solid ${
                      isWrong
                        ? 'var(--status-danger-border)'
                        : isCorrect
                        ? 'var(--status-success-border)'
                        : 'var(--border-subtle)'
                    }`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                      <span style={{ color: '#059669', marginRight: '0.4rem' }}>{idx + 1}.</span>
                      {q.question}
                    </p>
                    {isSubmitted && (
                      <span className={`badge ${isCorrect ? 'badge-success' : 'badge-danger'}`} style={{ flexShrink: 0 }}>
                        {isCorrect ? '✓ Correct' : '✕ Wrong'}
                      </span>
                    )}
                  </div>

                  {/* True / False / Not Given radio group */}
                  {q.type === 'tfng' && (
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
                      {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                        <label
                          key={opt}
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            padding: '0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-surface)',
                            border: `1px solid ${userAnswers[q.id] === opt ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                            cursor: isSubmitted ? 'default' : 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          <input
                            type="radio"
                            name={`rq_${q.id}`}
                            value={opt}
                            checked={userAnswers[q.id] === opt}
                            onChange={() => handleAnswerChange(q.id, opt)}
                            disabled={isSubmitted}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Multiple Choice options */}
                  {q.type === 'multiple-choice' && q.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
                      {q.options.map((opt) => (
                        <label
                          key={opt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-surface)',
                            border: `1px solid ${userAnswers[q.id] === opt.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                            cursor: isSubmitted ? 'default' : 'pointer',
                            fontSize: '0.88rem',
                          }}
                        >
                          <input
                            type="radio"
                            name={`rq_${q.id}`}
                            value={opt.id}
                            checked={userAnswers[q.id] === opt.id}
                            onChange={() => handleAnswerChange(q.id, opt.id)}
                            disabled={isSubmitted}
                          />
                          <span style={{ fontWeight: 600 }}>{opt.label}.</span>
                          <span>{opt.text}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Sentence Completion options */}
                  {q.type === 'sentence-completion' && q.options && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
                      {q.options.map((opt) => (
                        <label
                          key={opt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-surface)',
                            border: `1px solid ${userAnswers[q.id] === opt.text ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                            cursor: isSubmitted ? 'default' : 'pointer',
                            fontSize: '0.88rem',
                          }}
                        >
                          <input
                            type="radio"
                            name={`rq_${q.id}`}
                            value={opt.text}
                            checked={userAnswers[q.id] === opt.text}
                            onChange={() => handleAnswerChange(q.id, opt.text)}
                            disabled={isSubmitted}
                          />
                          <span style={{ fontWeight: 600 }}>{opt.id}.</span>
                          <span>{opt.text}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Short text input */}
                  {q.type === 'short-answer' && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Type answer from passage..."
                        value={userAnswers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        disabled={isSubmitted}
                      />
                    </div>
                  )}

                  {/* Detailed Explanation upon submission */}
                  {isSubmitted && (
                    <div style={{ marginTop: '0.9rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.84rem' }}>
                      <p style={{ marginBottom: '0.35rem' }}>
                        <strong>Correct Answer:</strong>{' '}
                        <span style={{ color: '#059669', fontWeight: 700 }}>
                          {q.correctAnswer}
                        </span>
                      </p>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        <strong>Why:</strong> {q.explanation}
                      </p>
                      {q.skillTip && (
                        <p style={{ color: 'var(--brand-accent)', fontWeight: 500 }}>
                          💡 <strong>Question Strategy:</strong> {q.skillTip}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isSubmitted && (
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleSubmit}
                className="btn btn-primary btn-lg"
                disabled={Object.keys(userAnswers).length === 0}
              >
                Submit Reading Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
