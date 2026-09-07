import React, { useState, useEffect } from 'react';
import { WRITING_EXERCISES } from '../data/writingData';
import { analyzeWritingSubmission } from '../services/writingAnalyzer';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { saveTestResult } from '../services/progressService';
import { WritingAnalysisResult } from '../types';
import {
  PenTool,
  Clock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Save,
  Trash2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WritingPageProps {
  onNavigate: (route: string) => void;
}

export const WritingPage: React.FC<WritingPageProps> = ({ onNavigate }) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const exercise = WRITING_EXERCISES[selectedTaskIndex];

  const draftKey = `novaprep_writing_draft_${exercise.id}`;
  const [essayText, setEssayText] = useState<string>(() => {
    try {
      return localStorage.getItem(draftKey) || '';
    } catch {
      return '';
    }
  });

  const [analysisResult, setAnalysisResult] = useState<WritingAnalysisResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSampleModel, setShowSampleModel] = useState<boolean>(false);

  // Timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(exercise.timeLimitMinutes * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    // When switching tasks, load corresponding draft
    try {
      const saved = localStorage.getItem(`novaprep_writing_draft_${WRITING_EXERCISES[selectedTaskIndex].id}`) || '';
      setEssayText(saved);
    } catch {
      setEssayText('');
    }
    setAnalysisResult(null);
    setIsSubmitted(false);
    setShowSampleModel(false);
    setSecondsRemaining(WRITING_EXERCISES[selectedTaskIndex].timeLimitMinutes * 60);
    setIsTimerActive(false);
  }, [selectedTaskIndex]);

  useEffect(() => {
    let interval: number;
    if (isTimerActive && secondsRemaining > 0 && !isSubmitted) {
      interval = window.setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, secondsRemaining, isSubmitted]);

  const words = essayText.trim() ? essayText.trim().split(/\s+/).filter(w => w.length > 0) : [];
  const currentWordCount = words.length;
  const isWordCountMet = currentWordCount >= exercise.minimumWords;

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(draftKey, essayText);
      alert('Draft saved to browser storage.');
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your current writing?')) {
      setEssayText('');
      localStorage.removeItem(draftKey);
      setAnalysisResult(null);
      setIsSubmitted(false);
    }
  };

  const handleSubmitEssay = () => {
    if (currentWordCount < 20) {
      alert('Please write at least 20 words before submitting for analysis.');
      return;
    }

    const result = analyzeWritingSubmission(essayText, exercise.taskType);
    setAnalysisResult(result);
    setIsSubmitted(true);
    setIsTimerActive(false);

    // Save test result
    saveTestResult({
      testTitle: `Writing Task ${exercise.taskType}: ${exercise.title}`,
      testType: 'writing',
      rawScore: Math.round(result.estimatedBand * 10),
      totalQuestions: 90,
      accuracyPercentage: Math.round((result.estimatedBand / 9.0) * 100),
      estimatedBand: result.estimatedBand,
      timeSpentSeconds: exercise.timeLimitMinutes * 60 - secondsRemaining,
      breakdown: [
        { skill: 'Task Response', score: result.taskResponseScore, total: 9 },
        { skill: 'Coherence & Cohesion', score: result.coherenceScore, total: 9 },
        { skill: 'Lexical Resource', score: result.lexicalScore, total: 9 },
        { skill: 'Grammar Accuracy', score: result.grammarScore, total: 9 },
      ],
      strengths: result.feedback.taskResponse.concat(result.feedback.coherence),
      weaknesses: result.suggestions,
      recommendation: result.suggestions[0] || 'Focus on expanding vocabulary and paragraph balance.'
    });

    if (result.estimatedBand >= 7.0) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <span className="badge badge-warning" style={{ marginBottom: '0.4rem' }}>
            Writing Practice Studio
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {exercise.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {exercise.taskType === 1 ? 'Task 1 Report (Minimum 150 words)' : 'Task 2 Essay (Minimum 250 words)'}
          </p>
        </div>

        {/* Task 1 / Task 2 Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {WRITING_EXERCISES.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedTaskIndex(idx)}
              className="btn btn-sm"
              style={{
                backgroundColor: selectedTaskIndex === idx ? 'var(--brand-primary)' : 'var(--bg-surface)',
                color: selectedTaskIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
              }}
            >
              Task {t.taskType} ({t.timeLimitMinutes}m)
            </button>
          ))}
        </div>
      </div>

      {/* Split View: Prompt on Left / Editor on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start',
          marginBottom: '2.5rem',
        }}
      >
        {/* Prompt Card */}
        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Official Writing Prompt</h3>
            <span className="badge badge-brand">
              Time: {exercise.timeLimitMinutes} mins
            </span>
          </div>

          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.92rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              whiteSpace: 'pre-line',
              color: 'var(--text-primary)',
            }}
          >
            {exercise.prompt}
          </div>

          {/* SVG Chart for Task 1 */}
          {exercise.chartSvgType === 'bar' && (
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
                Renewable Electricity Generation (Terawatt-hours):
              </h4>
              <svg viewBox="0 0 400 160" style={{ width: '100%', height: 'auto' }}>
                {/* Axis lines */}
                <line x1="40" y1="130" x2="380" y2="130" stroke="var(--border-strong)" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="130" stroke="var(--border-strong)" strokeWidth="1.5" />
                
                {/* Y Axis labels */}
                <text x="32" y="130" fill="var(--text-muted)" fontSize="9" textAnchor="end">0</text>
                <text x="32" y="80" fill="var(--text-muted)" fontSize="9" textAnchor="end">2500</text>
                <text x="32" y="30" fill="var(--text-muted)" fontSize="9" textAnchor="end">5000</text>

                {/* 2010 Group */}
                <rect x="65" y="62" width="18" height="68" fill="#0056D2" rx="2" /> {/* Hydro */}
                <rect x="85" y="123" width="18" height="7" fill="#10B981" rx="2" />  {/* Wind */}
                <rect x="105" y="129" width="18" height="1" fill="#F59E0B" rx="2" /> {/* Solar */}
                <text x="94" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">2010</text>

                {/* 2015 Group */}
                <rect x="145" y="54" width="18" height="76" fill="#0056D2" rx="2" />
                <rect x="165" y="114" width="18" height="16" fill="#10B981" rx="2" />
                <rect x="185" y="124" width="18" height="6" fill="#F59E0B" rx="2" />
                <text x="174" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">2015</text>

                {/* 2020 Group */}
                <rect x="225" y="48" width="18" height="82" fill="#0056D2" rx="2" />
                <rect x="245" y="98" width="18" height="32" fill="#10B981" rx="2" />
                <rect x="265" y="112" width="18" height="18" fill="#F59E0B" rx="2" />
                <text x="254" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">2020</text>

                {/* 2024 Group */}
                <rect x="305" y="44" width="18" height="86" fill="#0056D2" rx="2" />
                <rect x="325" y="84" width="18" height="46" fill="#10B981" rx="2" />
                <rect x="345" y="97" width="18" height="33" fill="#F59E0B" rx="2" />
                <text x="334" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">2024</text>
              </svg>
              {/* Legend */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#0056D2', borderRadius: '2px' }} /> Hydroelectric
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '2px' }} /> Wind Power
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#F59E0B', borderRadius: '2px' }} /> Solar PV
                </span>
              </div>
            </div>
          )}

          {/* Band 8 Sample Model Toggle */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <button
              onClick={() => setShowSampleModel(prev => !prev)}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <BookOpen size={16} />
              <span>{showSampleModel ? 'Hide Band 8 Model Answer' : 'View Examiner Band 8 Model Answer'}</span>
            </button>

            {showSampleModel && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--status-info-bg)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                  border: '1px solid var(--status-info-border)',
                }}
              >
                <strong style={{ color: 'var(--status-info-text)', display: 'block', marginBottom: '0.5rem' }}>
                  Band 8.5 Model Essay:
                </strong>
                <p style={{ whiteSpace: 'pre-line', marginBottom: '1rem' }}>
                  {exercise.sampleBand8}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong>Examiner Notes:</strong>
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                    {exercise.examinerNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Area Writing Studio */}
        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
          {/* Top Bar with Word Count & Timer */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                className={`badge ${isWordCountMet ? 'badge-success' : 'badge-warning'}`}
                style={{ fontSize: '0.85rem' }}
              >
                {currentWordCount} words
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Target: {exercise.minimumWords}+ words
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setIsTimerActive(prev => !prev)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
              >
                <Clock size={15} style={{ color: isTimerActive ? '#10B981' : 'var(--text-muted)' }} />
                <span>{formatTime(secondsRemaining)}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  ({isTimerActive ? 'Running' : 'Paused'})
                </span>
              </button>
            </div>
          </div>

          {/* Text Editor */}
          <textarea
            className="form-textarea"
            rows={16}
            placeholder="Type your response here. Focus on clear paragraph structure (Introduction, Body Paragraphs, Conclusion). Live word count and analysis will evaluate your submission..."
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '1rem',
              minHeight: '340px',
              fontFamily: 'inherit',
            }}
          />

          {/* Action Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleSaveDraft} className="btn btn-secondary btn-sm">
                <Save size={15} />
                <span>Save Draft</span>
              </button>
              <button onClick={handleClear} className="btn btn-secondary btn-sm" style={{ color: '#EF4444' }}>
                <Trash2 size={15} />
                <span>Clear</span>
              </button>
            </div>

            <button
              onClick={handleSubmitEssay}
              className="btn btn-primary btn-md"
              style={{ gap: '0.4rem' }}
            >
              <Sparkles size={16} />
              <span>Analyze & Evaluate Essay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Heuristic Diagnostic Feedback Results */}
      {isSubmitted && analysisResult && (
        <div
          className="card"
          style={{
            padding: '2.5rem',
            border: '2px solid var(--brand-primary)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
                Objective Performance Report
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                Writing Evaluation Breakdown
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Evaluated against the 4 official IELTS assessment dimensions.
              </p>
            </div>

            <BandScoreBadge band={analysisResult.estimatedBand} size="lg" showDescription />
          </div>

          {/* 4 Assessment Subscores */}
          <div className="grid-4" style={{ marginBottom: '2rem' }}>
            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>1. Task Response</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-primary)', margin: '0.2rem 0' }}>
                {analysisResult.taskResponseScore.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {analysisResult.feedback.taskResponse[0]}
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>2. Coherence & Cohesion</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                {analysisResult.coherenceScore.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {analysisResult.feedback.coherence[0]}
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>3. Lexical Resource</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', margin: '0.2rem 0' }}>
                {analysisResult.lexicalScore.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {analysisResult.feedback.lexicalResource[0]}
              </div>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>4. Grammatical Range</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C3AED', margin: '0.2rem 0' }}>
                {analysisResult.grammarScore.toFixed(1)}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {analysisResult.feedback.grammarAccuracy[0]}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-warning-bg)',
              color: 'var(--status-warning-text)',
              border: '1px solid var(--status-warning-border)',
              marginBottom: '1.5rem',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              Actionable Recommendations to Reach the Next Band:
            </strong>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {analysisResult.suggestions.map((sug, i) => (
                <li key={i}>{sug}</li>
              ))}
            </ul>
          </div>

          {/* Cohesive devices & Repetitive word awareness */}
          <div className="grid-2">
            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Discourse Markers & Transitions Detected
              </h4>
              {analysisResult.detectedTransitions.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {analysisResult.detectedTransitions.map((t) => (
                    <span key={t} className="badge badge-brand" style={{ fontSize: '0.8rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  No advanced linking devices detected. Add transitions like "Furthermore" or "However".
                </p>
              )}
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Word Repetition Frequency
              </h4>
              {analysisResult.repetitiveWords.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {analysisResult.repetitiveWords.map((item) => (
                    <span key={item.word} className="badge badge-warning" style={{ fontSize: '0.8rem' }}>
                      "{item.word}" ({item.count}x)
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  No excessive word repetition detected. Excellent lexical diversity!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
