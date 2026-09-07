import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Globe, FileText, FastForward } from 'lucide-react';
import { useSpeechSynthesis, SupportedAccent } from '../../hooks/useSpeechSynthesis';

interface AudioPlayerProps {
  script: string;
  defaultAccent?: SupportedAccent;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  script,
  defaultAccent = 'British',
  title,
}) => {
  const [accent, setAccent] = useState<SupportedAccent>(defaultAccent);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showScript, setShowScript] = useState(false);

  const {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    currentProgress,
    supported,
  } = useSpeechSynthesis();

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(script, accent, playbackSpeed);
    }
  };

  const handleReplay = () => {
    stop();
    setTimeout(() => {
      speak(script, accent, playbackSpeed);
    }, 100);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      stop();
      setTimeout(() => {
        speak(script, accent, speed);
      }, 100);
    }
  };

  const handleAccentChange = (newAccent: SupportedAccent) => {
    setAccent(newAccent);
    if (isPlaying) {
      stop();
      setTimeout(() => {
        speak(script, newAccent, playbackSpeed);
      }, 100);
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary-light)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Volume2 size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{title}</h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>High-Fidelity Synthetic Audio</span>
              <span>·</span>
              <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>{accent} Accent</span>
            </div>
          </div>
        </div>

        {/* Accent Selector & Speed Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
            <Globe size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={accent}
              onChange={(e) => handleAccentChange(e.target.value as SupportedAccent)}
              className="form-select"
              style={{
                padding: '0.25rem 0.6rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-subtle)',
              }}
              title="Select speaker accent"
            >
              <option value="British">British English</option>
              <option value="American">American English</option>
              <option value="Australian">Australian English</option>
              <option value="Canadian">Canadian English</option>
            </select>
          </div>

          {/* Speed Toggle */}
          <div style={{ display: 'flex', gap: '0.2rem', backgroundColor: 'var(--bg-subtle)', padding: '0.15rem', borderRadius: 'var(--radius-sm)' }}>
            {[0.8, 1.0, 1.2].map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.45rem',
                  borderRadius: '3px',
                  fontWeight: 600,
                  backgroundColor: playbackSpeed === s ? 'var(--brand-primary)' : 'transparent',
                  color: playbackSpeed === s ? '#FFFFFF' : 'var(--text-muted)',
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '6px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${currentProgress}%`,
            backgroundColor: 'var(--brand-primary)',
            transition: 'width 0.15s linear',
            borderRadius: '3px',
          }}
        />
      </div>

      {/* Control buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleTogglePlay}
            className="btn btn-primary btn-sm"
            style={{ minWidth: '100px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {isPlaying && !isPaused ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play Audio'}</span>
          </button>

          <button
            onClick={handleReplay}
            className="btn btn-secondary btn-sm"
            title="Replay from beginning"
          >
            <RotateCcw size={15} />
            <span>Replay</span>
          </button>
        </div>

        {/* Script Toggle button */}
        <button
          onClick={() => setShowScript(prev => !prev)}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.8rem', gap: '0.35rem' }}
        >
          <FileText size={14} />
          <span>{showScript ? 'Hide Audio Script' : 'Show Audio Script'}</span>
        </button>
      </div>

      {/* Audio Script Accordion */}
      {showScript && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={15} style={{ color: 'var(--brand-primary)' }} />
            Official Audio Script:
          </div>
          {script}
        </div>
      )}
    </div>
  );
};
