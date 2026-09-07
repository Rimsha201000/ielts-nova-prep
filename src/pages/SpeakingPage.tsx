import React, { useState, useEffect } from 'react';
import { SPEAKING_EXERCISES } from '../data/speakingData';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { analyzeSpeakingTranscript } from '../services/speakingAnalyzer';
import { BandScoreBadge } from '../components/practice/BandScoreBadge';
import { AudioWaveform } from '../components/practice/AudioWaveform';
import { saveTestResult } from '../services/progressService';
import { SpeakingAnalysisResult } from '../types';
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Volume2,
  Globe,
  Info,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpeakingPageProps {
  onNavigate: (route: string) => void;
}

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ onNavigate }) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(1); // Part 2 by default (Cue Card)
  const exercise = SPEAKING_EXERCISES[selectedPartIndex];

  const [preferredAccentModel, setPreferredAccentModel] = useState<string>('British');
  const [prepSecondsRemaining, setPrepSecondsRemaining] = useState<number>(60);
  const [isPrepTimerRunning, setIsPrepTimerRunning] = useState<boolean>(false);

  const {
    status: recordStatus,
    recordingTime,
    audioUrl,
    audioLevels,
    errorMessage: recordError,
    startRecording,
    stopRecording,
    resetRecording
  } = useAudioRecorder();

  const {
    transcript,
    setTranscript,
    interimTranscript,
    isListening,
    isSupported: isSpeechRecSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  const [analysisResult, setAnalysisResult] = useState<SpeakingAnalysisResult | null>(null);
  const [showSampleAnswers, setShowSampleAnswers] = useState<boolean>(false);

  // Preparation Countdown for Part 2
  useEffect(() => {
    let timer: number;
    if (isPrepTimerRunning && prepSecondsRemaining > 0) {
      timer = window.setInterval(() => {
        setPrepSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (prepSecondsRemaining === 0 && isPrepTimerRunning) {
      setIsPrepTimerRunning(false);
      alert('Preparation time is up! Click Start Speaking Recording now.');
    }
    return () => clearInterval(timer);
  }, [isPrepTimerRunning, prepSecondsRemaining]);

  const handleStartSpeaking = async () => {
    resetTranscript();
    setAnalysisResult(null);
    await startRecording();
    if (isSpeechRecSupported) {
      startListening();
    }
  };

  const handleStopSpeaking = () => {
    stopRecording();
    if (isSpeechRecSupported) {
      stopListening();
    }
  };

  const handleAnalyzeSpeaking = () => {
    const activeTranscript = transcript.trim() || 'Well, from my perspective, protecting the environment is an urgent and paramount responsibility for both individual citizens and national governments. For example, adopting renewable energy and reducing single-use plastics can significantly mitigate climate risks.';
    const result = analyzeSpeakingTranscript(activeTranscript, Math.max(recordingTime, 30));
    setAnalysisResult(result);

    // Save test result
    saveTestResult({
      testTitle: `Speaking Part ${exercise.part}: ${exercise.topic}`,
      testType: 'speaking',
      rawScore: Math.round(result.estimatedBand * 10),
      totalQuestions: 90,
      accuracyPercentage: Math.round((result.estimatedBand / 9.0) * 100),
      estimatedBand: result.estimatedBand,
      timeSpentSeconds: recordingTime || 60,
      breakdown: [
        { skill: 'Fluency & Pacing', score: result.wordsPerMinute, total: 150 },
        { skill: 'Lexical Diversity', score: result.lexicalVarietyScore, total: 100 },
      ],
      strengths: [`Speech rate: ${result.wordsPerMinute} WPM (${result.fluencyRating} pace).`],
      weaknesses: result.coherenceTips,
      recommendation: result.coherenceTips[0] || 'Maintain continuous flow with natural connecting phrases.'
    });

    if (result.estimatedBand >= 7.0) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    resetRecording();
    resetTranscript();
    setAnalysisResult(null);
    setPrepSecondsRemaining(60);
    setIsPrepTimerRunning(false);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <span className="badge badge-danger" style={{ marginBottom: '0.4rem' }}>
            Speaking Practice Studio
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {exercise.topic}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Part {exercise.part}: {exercise.description}
          </p>
        </div>

        {/* Part 1 / 2 / 3 Switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {SPEAKING_EXERCISES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPartIndex(idx);
                handleReset();
              }}
              className="btn btn-sm"
              style={{
                backgroundColor: selectedPartIndex === idx ? 'var(--brand-primary)' : 'var(--bg-surface)',
                color: selectedPartIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
              }}
            >
              Part {p.part} {p.part === 2 ? '(Cue Card)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Accent & Microphone Guidance Notice */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.85rem',
          marginBottom: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Globe size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
          <span>
            <strong>Accent Practice Model:</strong> Select an English accent model for listening and pronunciation reference. (IELTS evaluates clarity, not regional accent).
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            value={preferredAccentModel}
            onChange={(e) => setPreferredAccentModel(e.target.value)}
            className="form-select"
            style={{
              padding: '0.25rem 0.6rem',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            <option value="British">British English</option>
            <option value="American">American English</option>
            <option value="Australian">Australian English</option>
            <option value="Canadian">Canadian English</option>
            <option value="International">International English</option>
          </select>
        </div>
      </div>

      {/* Microphone Permission Warning / Error if denied */}
      {recordError && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--status-danger-bg)',
            color: 'var(--status-danger-text)',
            border: '1px solid var(--status-danger-border)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{recordError}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem',
          alignItems: 'start',
          marginBottom: '2.5rem',
        }}
      >
        {/* Left Column: Cue Card / Prompts */}
        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
          {exercise.cueCard ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-brand">Candidate Task Card</span>
                {/* 1-Minute Prep Timer */}
                <button
                  onClick={() => setIsPrepTimerRunning(prev => !prev)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.35rem' }}
                >
                  <Clock size={15} style={{ color: isPrepTimerRunning ? '#10B981' : 'var(--brand-primary)' }} />
                  <span>Prep: {prepSecondsRemaining}s</span>
                </button>
              </div>

              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1.5px dashed var(--brand-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {exercise.cueCard.topic}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  You should say:
                </p>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                  {exercise.cueCard.bulletPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                Interview Questions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {exercise.questions.map((q, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.92rem',
                    }}
                  >
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700, marginRight: '0.5rem' }}>
                      {idx + 1}.
                    </span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target Vocabulary Collocations */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Recommended High-Band Collocations:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {exercise.targetVocabulary.map((word) => (
                <span key={word} className="badge badge-brand" style={{ fontSize: '0.78rem' }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Recording & Audio Player */}
        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Live Audio Recording & Transcription
          </h3>

          {/* Visual Waveform */}
          <div style={{ marginBottom: '1.25rem' }}>
            <AudioWaveform levels={audioLevels} isRecording={recordStatus === 'recording'} />
          </div>

          {/* Recording Timer & Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: recordStatus === 'recording' ? '#EF4444' : '#94A3B8',
                  boxShadow: recordStatus === 'recording' ? '0 0 8px #EF4444' : 'none',
                }}
              />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {recordStatus === 'recording' ? 'Recording in progress...' : recordStatus === 'stopped' ? 'Recording ready for replay' : 'Microphone idle'}
              </span>
            </div>

            <div style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'monospace' }}>
              {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Controls: Record / Stop / Reset */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {recordStatus !== 'recording' ? (
              <button
                onClick={handleStartSpeaking}
                className="btn btn-primary btn-md"
                style={{ backgroundColor: '#DC2626', gap: '0.5rem' }}
              >
                <Mic size={18} />
                <span>Start Recording Speech</span>
              </button>
            ) : (
              <button
                onClick={handleStopSpeaking}
                className="btn btn-secondary btn-md"
                style={{ borderColor: '#DC2626', color: '#DC2626', gap: '0.5rem' }}
              >
                <Square size={18} />
                <span>Stop Recording</span>
              </button>
            )}

            <button onClick={handleReset} className="btn btn-secondary btn-md">
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>

          {/* Audio Replay Component if recorded */}
          {audioUrl && (
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Volume2 size={16} style={{ color: 'var(--brand-primary)' }} />
                <span>Your Spoken Audio Recording:</span>
              </div>
              <audio controls src={audioUrl} style={{ width: '100%', height: '40px' }} />
            </div>
          )}

          {/* Live Speech-to-Text Transcript */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Speech Transcript (Editable for Feedback):
              </label>
              {!isSpeechRecSupported && (
                <span style={{ fontSize: '0.75rem', color: 'var(--brand-accent)' }}>
                  Browser Speech recognition unavailable: you can type/paste transcript
                </span>
              )}
            </div>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Your spoken words will appear here in real-time as you speak, or you can edit/type your transcript to test the speech evaluator..."
              value={transcript + (interimTranscript ? ' ' + interimTranscript : '')}
              onChange={(e) => setTranscript(e.target.value)}
              style={{ fontSize: '0.9rem', lineHeight: 1.6 }}
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzeSpeaking}
            className="btn btn-primary btn-md"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={recordStatus === 'recording'}
          >
            <Sparkles size={16} />
            <span>Generate Automated Speaking Feedback</span>
          </button>
        </div>
      </div>

      {/* Speaking Automated Practice Feedback Report */}
      {analysisResult && (
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
                Automated Speaking Feedback
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                Acoustic & Fluency Indicators
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Estimated practice indicators — not an official IELTS examiner score.
              </p>
            </div>

            <BandScoreBadge band={analysisResult.estimatedBand} size="lg" showDescription />
          </div>

          {/* 3 Metric Cards: WPM, Lexical Diversity, Fillers */}
          <div className="grid-3" style={{ marginBottom: '1.75rem' }}>
            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Speech Rate (WPM)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-primary)', margin: '0.2rem 0' }}>
                {analysisResult.wordsPerMinute} WPM
              </div>
              <span className={`badge ${analysisResult.fluencyRating === 'Optimal' ? 'badge-success' : 'badge-warning'}`}>
                {analysisResult.fluencyRating} Tempo (Target: 110–150 WPM)
              </span>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Lexical Variety Index</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', margin: '0.2rem 0' }}>
                {analysisResult.lexicalVarietyScore}%
              </div>
              <span className="badge badge-brand">
                Unique vs Total Word Ratio
              </span>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hesitation / Filler Words</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#D97706', margin: '0.2rem 0' }}>
                {analysisResult.fillerWordsFound.reduce((sum, f) => sum + f.count, 0)} detected
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {analysisResult.fillerWordsFound.length > 0 ? analysisResult.fillerWordsFound.map(f => `"${f.word}": ${f.count}`).join(', ') : 'Zero unnecessary fillers!'}
              </div>
            </div>
          </div>

          {/* Coaching Recommendations */}
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-info-bg)',
              color: 'var(--status-info-text)',
              border: '1px solid var(--status-info-border)',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
              Examiner Coaching Guidance:
            </strong>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {analysisResult.coherenceTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
