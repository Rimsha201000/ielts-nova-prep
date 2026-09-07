import React, { useState, useEffect } from 'react';
import { MOCK_TESTS_LIST, MockTestItem } from '../data/mockTestsData';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { calculateListeningBand } from '../services/scoringEngine';
import { saveTestResult } from '../services/progressService';
import {
  Clock,
  Award,
  CheckCircle,
  Flag,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Play,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MockTestsPageProps {
  onNavigate: (route: string) => void;
}

export const MockTestsPage: React.FC<MockTestsPageProps> = ({ onNavigate }) => {
  const [activeTest, setActiveTest] = useState<MockTestItem | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ score: number; band: number; total: number } | null>(null);

  // Mock test questions sample bank for live test runner
  const mockQuestions = [
    { q: 'What is the maximum allowed weight for checked luggage on regional express flights?', options: ['20 kg', '23 kg', '30 kg', '32 kg'], correct: '23 kg' },
    { q: 'According to the research briefing, which renewable energy source experienced the fastest percentage growth between 2015 and 2024?', options: ['Hydroelectric', 'Geothermal', 'Solar PV', 'Biomass'], correct: 'Solar PV' },
    { q: 'In IELTS Reading, what condition must be met to mark a statement as FALSE?', options: ['The text does not mention the subject', 'The text directly contradicts the statement', 'The statement is based on personal opinion', 'The statement has more than 10 words'], correct: 'The text directly contradicts the statement' },
    { q: 'Which cohesive device is most appropriate to signal contrast at the start of an academic body paragraph?', options: ['Furthermore', 'Conversely', 'In addition', 'Consequently'], correct: 'Conversely' },
    { q: 'What is the recommended speaking rate range (words per minute) for fluent, clear articulation in IELTS Speaking?', options: ['60 - 80 WPM', '110 - 150 WPM', '180 - 220 WPM', '250 - 300 WPM'], correct: '110 - 150 WPM' },
    { q: 'Which statistical term describes the decoupling of an electrical microgrid during municipal outages?', options: ['Substationing', 'Islanding', 'Capacitating', 'Cascading'], correct: 'Islanding' },
    { q: 'Choose the sentence with correct subject-verb agreement:', options: ['The collection of antique manuscripts were preserved.', 'The collection of antique manuscripts was preserved.', 'The collection of antique manuscripts are preserved.', 'The collection of antique manuscripts being preserved.'], correct: 'The collection of antique manuscripts was preserved.' },
    { q: 'Which academic word means "to make a harmful or unpleasant situation less severe"?', options: ['Exacerbate', 'Mitigate', 'Proliferate', 'Stagnate'], correct: 'Mitigate' },
  ];

  // Timer interval
  useEffect(() => {
    let interval: number;
    if (activeTest && !isTestSubmitted && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTest, isTestSubmitted, secondsLeft]);

  const handleStartTest = (test: MockTestItem) => {
    setActiveTest(test);
    setActiveQuestionIndex(0);
    setAnswers({});
    setFlagged({});
    setSecondsLeft(test.durationMinutes * 60);
    setIsTestSubmitted(false);
    setTestResult(null);
  };

  const handleToggleFlag = (idx: number) => {
    setFlagged(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleFinalSubmit = () => {
    setShowConfirmSubmit(false);
    let correct = 0;
    mockQuestions.forEach((q, idx) => {
      if ((answers[idx] || '').trim() === q.correct) {
        correct += 1;
      }
    });

    const band = calculateListeningBand(correct, mockQuestions.length);
    setTestResult({
      score: correct,
      total: mockQuestions.length,
      band
    });
    setIsTestSubmitted(true);

    saveTestResult({
      testTitle: activeTest?.title || 'Mock Exam',
      testType: 'mock',
      rawScore: correct,
      totalQuestions: mockQuestions.length,
      accuracyPercentage: Math.round((correct / mockQuestions.length) * 100),
      estimatedBand: band,
      timeSpentSeconds: (activeTest?.durationMinutes || 30) * 60 - secondsLeft,
      breakdown: [{ skill: 'Comprehensive', score: correct, total: mockQuestions.length }],
      strengths: ['Effective time management and broad comprehension across test question types.'],
      weaknesses: ['Review flagged questions and re-check grammar agreement.'],
      recommendation: 'Target specific single-skill studios to eliminate identified weak points.'
    });

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // If in active test session
  if (activeTest) {
    const currentQ = mockQuestions[activeQuestionIndex];
    const totalQ = mockQuestions.length;

    return (
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        {/* Test Session Top Navigation Bar */}
        <div
          className="card"
          style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {activeTest.title}
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Question {activeQuestionIndex + 1} of {totalQ}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: secondsLeft < 300 ? '#DC2626' : 'var(--brand-primary)',
              }}
            >
              <Clock size={20} />
              <span>{formatTimer(secondsLeft)}</span>
            </div>

            {!isTestSubmitted && (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="btn btn-primary btn-sm"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>

        {/* Results View if Submitted */}
        {isTestSubmitted && testResult ? (
          <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-success-bg)',
                color: '#10B981',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Mock Examination Completed!
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Raw Score: <strong>{testResult.score} / {testResult.total}</strong> ({Math.round((testResult.score / testResult.total) * 100)}% Accuracy)
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <BandScoreBadge band={testResult.band} size="lg" showDescription />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTest(null)} className="btn btn-primary">
                Return to Mock Catalog
              </button>
              <button onClick={() => onNavigate('/progress')} className="btn btn-secondary">
                View Progress Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Active Question Runner */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {/* Question Card */}
            <div className="card" style={{ padding: '2rem', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="badge badge-brand">Question {activeQuestionIndex + 1}</span>
                <button
                  onClick={() => handleToggleFlag(activeQuestionIndex)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    color: flagged[activeQuestionIndex] ? '#F59E0B' : 'var(--text-muted)',
                    borderColor: flagged[activeQuestionIndex] ? '#F59E0B' : 'var(--border-subtle)',
                  }}
                >
                  <Flag size={15} />
                  <span>{flagged[activeQuestionIndex] ? 'Flagged for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {currentQ.q}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {currentQ.options.map((opt, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: answers[activeQuestionIndex] === opt ? 'var(--brand-primary-light)' : 'var(--bg-subtle)',
                      border: `1.5px solid ${answers[activeQuestionIndex] === opt ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                    }}
                  >
                    <input
                      type="radio"
                      name={`mock_q_${activeQuestionIndex}`}
                      value={opt}
                      checked={answers[activeQuestionIndex] === opt}
                      onChange={() => setAnswers(prev => ({ ...prev, [activeQuestionIndex]: opt }))}
                    />
                    <span style={{ fontWeight: 600 }}>{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              {/* Navigation buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="btn btn-secondary btn-sm"
                >
                  Previous Question
                </button>

                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.min(totalQ - 1, prev + 1))}
                  disabled={activeQuestionIndex === totalQ - 1}
                  className="btn btn-primary btn-sm"
                >
                  Next Question
                </button>
              </div>
            </div>

            {/* Question Matrix Drawer */}
            <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>
                Question Navigator
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {mockQuestions.map((_, idx) => {
                  const isAnswered = !!answers[idx];
                  const isCurrent = activeQuestionIndex === idx;
                  const isFlag = !!flagged[idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveQuestionIndex(idx)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        backgroundColor: isCurrent
                          ? 'var(--brand-primary)'
                          : isAnswered
                          ? 'var(--status-success-bg)'
                          : 'var(--bg-subtle)',
                        color: isCurrent
                          ? '#FFFFFF'
                          : isAnswered
                          ? '#065F46'
                          : 'var(--text-secondary)',
                        border: isFlag
                          ? '2px solid #F59E0B'
                          : `1px solid ${isCurrent ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                        position: 'relative',
                      }}
                    >
                      {idx + 1}
                      {isFlag && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#F59E0B',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--status-success-bg)', border: '1px solid var(--status-success-border)', borderRadius: '2px' }} />
                  <span>Answered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '2px' }} />
                  <span>Unanswered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '10px', height: '10px', border: '2px solid #F59E0B', borderRadius: '2px' }} />
                  <span>Marked for Review</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmSubmit && (
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
            <div className="card" style={{ maxWidth: '440px', padding: '2rem', textAlign: 'center' }}>
              <AlertTriangle size={36} style={{ color: '#F59E0B', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Submit Mock Exam?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                You have answered <strong>{Object.keys(answers).length}</strong> of {totalQ} questions. Are you ready to complete this test session?
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={() => setShowConfirmSubmit(false)} className="btn btn-secondary btn-sm">
                  Continue Testing
                </button>
                <button onClick={handleFinalSubmit} className="btn btn-primary btn-sm">
                  Confirm & Grade
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Catalog View
  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
          Full Examination Simulations
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          IELTS Mock Tests
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
          Experience authentic timed test conditions with our full exam bundles and skill-specific simulations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {MOCK_TESTS_LIST.map((test) => (
          <div
            key={test.id}
            className="card card-interactive"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
            onClick={() => handleStartTest(test)}
          >
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-brand">{test.moduleType}</span>
                <span className="badge badge-warning">{test.difficulty}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {test.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {test.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={15} /> {test.durationMinutes} Minutes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Layers size={15} /> {test.totalQuestions} Questions
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Award size={15} /> Target: {test.recommendedBandTarget}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-md"
              style={{ gap: '0.5rem' }}
              onClick={(e) => {
                e.stopPropagation();
                handleStartTest(test);
              }}
            >
              <Play size={16} />
              <span>Start Timed Test</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
