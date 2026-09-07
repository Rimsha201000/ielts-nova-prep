import React, { useState } from 'react';
import { VOCABULARY_LIST, VOCABULARY_CATEGORIES } from '../data/vocabularyData';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { VocabularyWord } from '../types';
import {
  Volume2,
  BookOpen,
  RotateCw,
  CheckCircle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VocabularyPageProps {
  onNavigate: (route: string) => void;
}

export const VocabularyPage: React.FC<VocabularyPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [mode, setMode] = useState<'cards' | 'flashcards' | 'quiz'>('cards');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Quiz mode state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const { speak } = useSpeechSynthesis();

  const filteredWords = selectedCategory === 'All Categories'
    ? VOCABULARY_LIST
    : VOCABULARY_LIST.filter(w => w.category === selectedCategory);

  const handlePronounce = (word: string) => {
    speak(word, 'British', 0.9);
  };

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % filteredWords.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  // Quiz answer handler
  const handleQuizAnswer = (chosenWord: string, correctWord: string) => {
    setQuizSelected(chosenWord);
    if (chosenWord === correctWord) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizSelected(null);
    if (quizIndex + 1 < filteredWords.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setIsQuizCompleted(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelected(null);
    setIsQuizCompleted(false);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
            Academic Lexicon Lab
          </span>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 800 }}>
            IELTS Vocabulary Builder
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Learn high-yield academic collocations, authentic usage examples, and accurate British pronunciation.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => setMode('cards')}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: mode === 'cards' ? 'var(--brand-primary)' : 'transparent',
              color: mode === 'cards' ? '#FFFFFF' : 'var(--text-secondary)',
            }}
          >
            Word Library
          </button>
          <button
            onClick={() => {
              setMode('flashcards');
              setFlashcardIndex(0);
              setIsFlipped(false);
            }}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: mode === 'flashcards' ? 'var(--brand-primary)' : 'transparent',
              color: mode === 'flashcards' ? '#FFFFFF' : 'var(--text-secondary)',
            }}
          >
            Flashcards
          </button>
          <button
            onClick={() => {
              setMode('quiz');
              handleResetQuiz();
            }}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              backgroundColor: mode === 'quiz' ? 'var(--brand-primary)' : 'transparent',
              color: mode === 'quiz' ? '#FFFFFF' : 'var(--text-secondary)',
            }}
          >
            Practice Quiz
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {VOCABULARY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setFlashcardIndex(0);
              setIsFlipped(false);
              handleResetQuiz();
            }}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.82rem',
              backgroundColor: selectedCategory === cat ? 'var(--brand-primary)' : 'var(--bg-surface)',
              color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${selectedCategory === cat ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MODE 1: Flashcards Mode with 3D Flip */}
      {mode === 'flashcards' && filteredWords.length > 0 && (
        <div style={{ maxWidth: '640px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            Card {flashcardIndex + 1} of {filteredWords.length} · Click card to flip
          </div>

          <div
            className="perspective-1000"
            style={{ minHeight: '320px', cursor: 'pointer', marginBottom: '1.5rem' }}
            onClick={() => setIsFlipped(prev => !prev)}
          >
            <div
              className={`card ${isFlipped ? 'rotate-y-180' : ''}`}
              style={{
                minHeight: '320px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.5s ease',
                transformStyle: 'preserve-3d',
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--brand-primary)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {!isFlipped ? (
                /* Front of Flashcard */
                <div>
                  <span className="badge badge-brand" style={{ marginBottom: '1rem' }}>
                    {filteredWords[flashcardIndex].category} · {filteredWords[flashcardIndex].cefrLevel}
                  </span>
                  <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--brand-primary)' }}>
                    {filteredWords[flashcardIndex].word}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    {filteredWords[flashcardIndex].phonetic}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePronounce(filteredWords[flashcardIndex].word);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <Volume2 size={16} style={{ color: 'var(--brand-primary)' }} />
                    <span>Listen Pronunciation</span>
                  </button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
                    Tap to reveal meaning & example
                  </p>
                </div>
              ) : (
                /* Back of Flashcard */
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--brand-primary)' }}>
                      {filteredWords[flashcardIndex].word} ({filteredWords[flashcardIndex].partOfSpeech})
                    </span>
                    <span className="badge badge-brand">{filteredWords[flashcardIndex].cefrLevel}</span>
                  </div>

                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {filteredWords[flashcardIndex].definition}
                  </p>

                  <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>
                      Example in Academic Context:
                    </span>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                      "{filteredWords[flashcardIndex].exampleSentence}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {filteredWords[flashcardIndex].collocations.map((c) => (
                      <span key={c} className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Flashcard Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={handlePrevFlashcard} className="btn btn-secondary btn-md">
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            <button onClick={handleNextFlashcard} className="btn btn-primary btn-md">
              <span>Next Card</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: Quiz Mode */}
      {mode === 'quiz' && (
        <div style={{ maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          {!isQuizCompleted ? (
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span className="badge badge-brand">
                  Question {quizIndex + 1} of {filteredWords.length}
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Score: {quizScore}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Which word matches this definition?
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                "{filteredWords[quizIndex].definition}"
              </p>

              {/* Multiple choice options generated from current word + 3 random */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {Array.from(new Set([
                  filteredWords[quizIndex].word,
                  filteredWords[(quizIndex + 1) % filteredWords.length].word,
                  filteredWords[(quizIndex + 2) % filteredWords.length].word,
                  filteredWords[(quizIndex + 3) % filteredWords.length].word,
                ])).sort().map((wordOption) => {
                  const isCorrect = wordOption === filteredWords[quizIndex].word;
                  const isSelected = quizSelected === wordOption;

                  return (
                    <button
                      key={wordOption}
                      onClick={() => !quizSelected && handleQuizAnswer(wordOption, filteredWords[quizIndex].word)}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        backgroundColor: quizSelected
                          ? isCorrect
                            ? 'var(--status-success-bg)'
                            : isSelected
                            ? 'var(--status-danger-bg)'
                            : 'var(--bg-surface)'
                          : 'var(--bg-surface)',
                        color: quizSelected
                          ? isCorrect
                            ? 'var(--status-success-text)'
                            : isSelected
                            ? 'var(--status-danger-text)'
                            : 'var(--text-primary)'
                          : 'var(--text-primary)',
                        border: `1.5px solid ${
                          quizSelected
                            ? isCorrect
                              ? 'var(--status-success-border)'
                              : isSelected
                              ? 'var(--status-danger-border)'
                              : 'var(--border-subtle)'
                            : 'var(--border-subtle)'
                        }`,
                        cursor: quizSelected ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{wordOption}</span>
                      {quizSelected && isCorrect && <CheckCircle size={18} style={{ color: '#10B981' }} />}
                    </button>
                  );
                })}
              </div>

              {quizSelected && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleNextQuizQuestion} className="btn btn-primary btn-md">
                    <span>{quizIndex + 1 === filteredWords.length ? 'See Final Score' : 'Next Question'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <Sparkles size={48} style={{ color: 'var(--brand-accent)', margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Vocabulary Quiz Complete!
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                You scored <strong>{quizScore} out of {filteredWords.length}</strong> ({Math.round((quizScore / filteredWords.length) * 100)}%).
              </p>
              <button onClick={handleResetQuiz} className="btn btn-primary">
                Try Quiz Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: Word Library Cards */}
      {mode === 'cards' && (
        <div className="grid-3">
          {filteredWords.map((word) => (
            <div key={word.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-brand">{word.category}</span>
                  <span className="badge badge-warning">{word.cefrLevel}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                    {word.word}
                  </h3>
                  <button
                    onClick={() => handlePronounce(word.word)}
                    style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
                    title="Pronounce word"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {word.phonetic} · <em style={{ textTransform: 'capitalize' }}>{word.partOfSpeech}</em>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {word.definition}
                </p>

                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-subtle)', fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  "{word.exampleSentence}"
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  High-Band Collocations:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {word.collocations.map((c) => (
                    <span key={c} className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
