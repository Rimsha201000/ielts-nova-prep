import React from 'react';

interface AudioWaveformProps {
  levels: number[];
  isRecording: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ levels, isRecording }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        height: '56px',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
      }}
      aria-hidden="true"
    >
      {levels.map((lvl, idx) => {
        const heightPx = isRecording ? Math.max(8, Math.min(48, Math.round((lvl / 100) * 48))) : 8;
        return (
          <div
            key={idx}
            className="audio-bar"
            style={{
              height: `${heightPx}px`,
              backgroundColor: isRecording ? '#EF4444' : 'var(--brand-primary)',
              opacity: isRecording ? 1 : 0.4,
              transition: 'height 0.08s ease',
              width: '5px',
              borderRadius: '3px',
            }}
          />
        );
      })}
    </div>
  );
};
