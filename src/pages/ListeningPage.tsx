import React, { useState } from 'react';
import { LISTENING_EXERCISES } from '../data/listeningData';
import { AudioPlayer } from '../components/practice/AudioPlayer';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { calculateListeningBand } from '../services/scoringEngine';
import { saveMistake } from '../services/mistakeService';
import { saveTestResult } from '../services/progressService';
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  AlertCircle,
  ArrowRight,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ListeningPageProps {
  onNavigate: (route: string) => void;
}

export const ListeningPage: React.FC<ListeningPageProps> = ({ onNavigate }) => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const exercise = LISTENING_EXERCISES[selectedExerciseIndex];

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    total: number;
    band: number;
  } | null>(null);

  const handleAnswerChange = (questionId: string, value: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitTest = () => {
    let correct = 0;
    const questions = exercise.questions;

    questions.forEach(q => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      const isCorrect = userAns === correctAns;

      if (isCorrect) {
        correct += 1;
      } else {
        // Save to Mistake Book
        saveMistake({
          skill: 'listening',
          category: `Section ${exercise.sectionNumber}`,
          question: q.question,
          userAnswer: userAnswers[q.id] || '(No response)',
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        });
      }
    });

    const band = calculateListeningBand(correct, questions.length);
    setScoreResult({
      correctCount: correct,
      total: questions.length,
      band,
    });
    setIsSubmitted(true);

    // Save test result to learner progress history
    saveTestResult({
      testTitle: `Listening: ${exercise.title}`,
      testType: 'listening',
      rawScore: correct,
      totalQuestions: questions.length,
      accuracyPercentage: Math.round((correct / questions.length) * 100),
      estimatedBand: band,
      timeSpentSeconds: exercise.durationSeconds,
      breakdown: [{ skill: 'Listening', score: correct, total: questions.length }],
      strengths: correct >= 3 ? ['Solid comprehension of specific details and figures.'] : [],
      weaknesses: correct < questions.length ? ['Watch out for speaker self-corrections and rapid signposts.'] : [],
      recommendation: 'Review incorrect answers below and practice identifying distractor signals in audio transcripts.'
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
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
            Listening Practice Studio
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {exercise.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {exercise.context}
          </p>
        </div>

        {/* Exercise Selector Switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {LISTENING_EXERCISES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedExerciseIndex(idx);
                handleReset();
              }}
              className="btn btn-sm"
              style={{
                backgroundColor: selectedExerciseIndex === idx ? 'var(--brand-primary)' : 'var(--bg-surface)',
                color: selectedExerciseIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
              }}
            >
              Sec {item.sectionNumber} ({item.speakerAccent})
            </button>
          ))}
        </div>
      </div>

      {/* Audio Notice */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--status-info-bg)',
          color: 'var(--status-info-text)',
          border: '1px solid var(--status-info-border)',
          fontSize: '0.82rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <Info size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Synthetic Audio Notice:</strong> Audio is synthesized in your browser to keep the platform ultra-lightweight and accessible with selectable regional accents (British, American, Australian, Canadian).
        </span>
      </div>

      {/* Audio Player Component */}
      <AudioPlayer
        script={exercise.audioTranscript}
        defaultAccent={exercise.speakerAccent}
        title={`Listening Track: ${exercise.title}`}
      />

      {/* Score Results Card if Submitted */}
      {isSubmitted && scoreResult && (
        <div
          className="card"
          style={{
            padding: '1.75rem',
            marginBottom: '2rem',
            border: '2px solid var(--brand-primary)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <CheckCircle size={22} style={{ color: '#10B981' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                  Practice Assessment Complete
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Raw Score: <strong>{scoreResult.correctCount} / {scoreResult.total}</strong> ({Math.round((scoreResult.correctCount / scoreResult.total) * 100)}% Accuracy)
              </p>
            </div>

            <BandScoreBadge band={scoreResult.band} size="lg" />
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
              How to Improve from this Test:
            </strong>
            {scoreResult.correctCount === scoreResult.total ? (
              <p>Outstanding accuracy! You successfully tracked speaker self-corrections and exact spelling details.</p>
            ) : (
              <p>
                Any incorrect responses have been automatically added to your <strong>My Mistake Book</strong> for targeted revision. Inspect the explanations below to spot speaker transitions.
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              <RotateCcw size={15} />
              <span>Retry Exercise</span>
            </button>
            <button onClick={() => onNavigate('/mistakes')} className="btn btn-outline btn-sm">
              <span>View Mistake Book</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Questions Form */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            Questions 1–{exercise.questions.length}
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Listen to the audio track and record your answers.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {exercise.questions.map((q, qIndex) => {
            const userAns = (userAnswers[q.id] || '').trim();
            const isCorrect = isSubmitted && userAns.toLowerCase() === q.correctAnswer.toLowerCase();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div
                key={q.id}
                style={{
                  padding: '1.25rem',
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
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--brand-primary)', marginRight: '0.5rem' }}>
                      Q{qIndex + 1}.
                    </span>
                    {q.question}
                  </div>

                  {isSubmitted && (
                    <div>
                      {isCorrect ? (
                        <span className="badge badge-success">✓ Correct</span>
                      ) : (
                        <span className="badge badge-danger">✕ Needs Review</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Multiple choice options */}
                {q.type === 'multiple-choice' && q.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {q.options.map((opt) => (
                      <label
                        key={opt.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-surface)',
                          border: `1px solid ${userAnswers[q.id] === opt.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                          cursor: isSubmitted ? 'default' : 'pointer',
                          fontSize: '0.9rem',
                        }}
                      >
                        <input
                          type="radio"
                          name={`q_${q.id}`}
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

                {/* Short answer / form text input */}
                {q.type === 'short-answer' && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Write your answer (e.g. word or number)..."
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      disabled={isSubmitted}
                      style={{ maxWidth: '360px' }}
                    />
                  </div>
                )}

                {/* Explanation and Skill Tip when Submitted */}
                {isSubmitted && (
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                    <p style={{ marginBottom: '0.35rem' }}>
                      <strong>Correct Answer:</strong>{' '}
                      <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
                        {q.correctAnswer}
                      </span>
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      <strong>Why:</strong> {q.explanation}
                    </p>
                    {q.skillTip && (
                      <p style={{ color: 'var(--brand-accent)', fontWeight: 500 }}>
                        💡 <strong>Listening Strategy:</strong> {q.skillTip}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSubmitTest}
              className="btn btn-primary btn-lg"
              disabled={Object.keys(userAnswers).length === 0}
            >
              Submit Listening Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
