import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnosticData';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { AnimatedLogo } from '../components/common/AnimatedLogo';
import { calculateOverallBand } from '../services/scoringEngine';
import { saveTestResult, saveUserProfile, getUserProfile } from '../services/progressService';
import {
  Compass,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosticPageProps {
  onNavigate: (route: string) => void;
}

export const DiagnosticPage: React.FC<DiagnosticPageProps> = ({ onNavigate }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [result, setResult] = useState<{
    correctCount: number;
    total: number;
    estimatedBand: number;
    skillBreakdown: Record<string, { correct: number; total: number }>;
    strengths: string[];
    weaknesses: string[];
  } | null>(null);

  const handleSelect = (qId: string, optId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const breakdown: Record<string, { correct: number; total: number }> = {};

    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (!breakdown[q.skill]) {
        breakdown[q.skill] = { correct: 0, total: 0 };
      }
      breakdown[q.skill].total += 1;

      if (answers[q.id] === q.correctAnswer) {
        correct += 1;
        breakdown[q.skill].correct += 1;
      }
    });

    // Compute estimated practice band (scaled 4.5 to 8.5)
    const ratio = correct / DIAGNOSTIC_QUESTIONS.length;
    let band = 5.0;
    if (ratio >= 0.85) band = 8.0;
    else if (ratio >= 0.7) band = 7.0;
    else if (ratio >= 0.5) band = 6.0;
    else band = 5.0;

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(breakdown).forEach(([skill, data]) => {
      const pct = data.correct / data.total;
      const capSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
      if (pct >= 0.75) {
        strengths.push(`${capSkill}: Demonstrated strong conceptual competence (${data.correct}/${data.total}).`);
      } else {
        weaknesses.push(`${capSkill}: Requires targeted practice to eliminate frequent traps (${data.correct}/${data.total}).`);
      }
    });

    const res = {
      correctCount: correct,
      total: DIAGNOSTIC_QUESTIONS.length,
      estimatedBand: band,
      skillBreakdown: breakdown,
      strengths,
      weaknesses
    };

    setResult(res);
    setIsSubmitted(true);

    // Update user profile estimated band
    const profile = getUserProfile();
    profile.currentEstimatedBand = band;
    saveUserProfile(profile);

    // Save test result
    saveTestResult({
      testTitle: 'Multi-Skill Diagnostic Assessment',
      testType: 'diagnostic',
      rawScore: correct,
      totalQuestions: DIAGNOSTIC_QUESTIONS.length,
      accuracyPercentage: Math.round(ratio * 100),
      estimatedBand: band,
      timeSpentSeconds: 900,
      breakdown: Object.entries(breakdown).map(([skill, d]) => ({
        skill: skill.toUpperCase(),
        score: d.correct,
        total: d.total
      })),
      strengths,
      weaknesses,
      recommendation: weaknesses[0] || 'Continue regular full-length mock tests.'
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setResult(null);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
            Initial Benchmark Evaluation
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            IELTS Diagnostic Assessment
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
            Assess your baseline performance across Listening, Reading, Grammar, Vocabulary, and Writing strategy in 15 minutes.
          </p>
        </div>

        <div style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <AnimatedLogo size="md" />
        </div>
      </div>

      {/* Results View if Submitted */}
      {isSubmitted && result && (
        <div
          className="card"
          style={{
            padding: '2.5rem',
            marginBottom: '3rem',
            border: '2px solid var(--brand-primary)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
                Estimated Practice Performance
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                Diagnostic Performance Overview
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Score: <strong>{result.correctCount} / {result.total}</strong> ({Math.round((result.correctCount / result.total) * 100)}% Accuracy)
              </p>
            </div>

            <BandScoreBadge band={result.estimatedBand} size="lg" showDescription />
          </div>

          {/* Breakdown Grid */}
          <div className="grid-3" style={{ marginBottom: '2rem' }}>
            {Object.entries(result.skillBreakdown).map(([skill, data]) => (
              <div key={skill} className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                  {skill} Module
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-primary)', margin: '0.2rem 0' }}>
                  {data.correct} / {data.total}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {Math.round((data.correct / data.total) * 100)}% accuracy
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid-2" style={{ marginBottom: '2rem' }}>
            <div className="card" style={{ backgroundColor: 'var(--status-success-bg)', borderColor: 'var(--status-success-border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--status-success-text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={16} />
                <span>Identified Strengths:</span>
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--status-success-text)' }}>
                {result.strengths.length > 0 ? (
                  result.strengths.map((s, i) => <li key={i}>{s}</li>)
                ) : (
                  <li>Consistent regular practice will build solid foundation skills.</li>
                )}
              </ul>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--status-warning-bg)', borderColor: 'var(--status-warning-border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--status-warning-text)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={16} />
                <span>Recommended Study Focus:</span>
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--status-warning-text)' }}>
                {result.weaknesses.length > 0 ? (
                  result.weaknesses.map((w, i) => <li key={i}>{w}</li>)
                ) : (
                  <li>Maintain test pace and stamina with full-length timed exams.</li>
                )}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('/study-plan')} className="btn btn-primary">
              <Target size={16} />
              <span>Generate My Study Plan</span>
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              <RotateCcw size={16} />
              <span>Retake Diagnostic</span>
            </button>
          </div>
        </div>
      )}

      {/* Question Form */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Diagnostic Assessment Questions (1–{DIAGNOSTIC_QUESTIONS.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
            const userChoice = answers[q.id];
            const isCorrect = isSubmitted && userChoice === q.correctAnswer;
            const isWrong = isSubmitted && userChoice && userChoice !== q.correctAnswer;

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
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-brand" style={{ textTransform: 'capitalize', fontSize: '0.75rem' }}>
                    {q.skill} · {q.difficulty}
                  </span>
                  {isSubmitted && (
                    <span className={`badge ${isCorrect ? 'badge-success' : 'badge-danger'}`}>
                      {isCorrect ? '✓ Correct' : '✕ Needs Practice'}
                    </span>
                  )}
                </div>

                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--brand-primary)', marginRight: '0.4rem' }}>{idx + 1}.</span>
                  {q.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.65rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface)',
                        border: `1px solid ${answers[q.id] === opt.id ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                        cursor: isSubmitted ? 'default' : 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      <input
                        type="radio"
                        name={`diag_${q.id}`}
                        value={opt.id}
                        checked={answers[q.id] === opt.id}
                        onChange={() => handleSelect(q.id, opt.id)}
                        disabled={isSubmitted}
                      />
                      <span style={{ fontWeight: 600 }}>{opt.id}.</span>
                      <span>{opt.text}</span>
                    </label>
                  ))}
                </div>

                {isSubmitted && (
                  <div style={{ marginTop: '0.9rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isSubmitted && (
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSubmit}
              className="btn btn-primary btn-lg"
              disabled={Object.keys(answers).length === 0}
            >
              Submit Diagnostic Evaluation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
