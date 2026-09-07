import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Headphones, PenTool, Mic, FileText, CheckCircle } from 'lucide-react';
import { VOCABULARY_LIST } from '../../data/vocabularyData';
import { GRAMMAR_MODULES } from '../../data/grammarData';
import { STUDY_GUIDES } from '../../data/studyGuideData';

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  type: 'practice' | 'vocabulary' | 'grammar' | 'guide';
  route: string;
  snippet: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pre-index static data
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: SearchResultItem[] = [];

    // Core practice routes
    const coreRoutes = [
      { id: 'p-listen', title: 'Listening Practice Studio', category: 'Skill Practice', type: 'practice' as const, route: '/listening', snippet: 'Practice authentic audio tests with 4 distinct regional accents.' },
      { id: 'p-read', title: 'Reading Practice Studio', category: 'Skill Practice', type: 'practice' as const, route: '/reading', snippet: 'Academic & General reading passages with TFNG and matching questions.' },
      { id: 'p-write', title: 'Writing Practice Studio', category: 'Skill Practice', type: 'practice' as const, route: '/writing', snippet: 'Task 1 visual charts and Task 2 essays with instant automated analysis.' },
      { id: 'p-speak', title: 'Speaking Practice Studio', category: 'Skill Practice', type: 'practice' as const, route: '/speaking', snippet: 'Live microphone recorder, speech-to-text transcript, and fluency coach.' },
      { id: 'p-mock', title: 'Full Timed Mock Exams', category: 'Examinations', type: 'practice' as const, route: '/mock-tests', snippet: 'Realistic full exam simulation with section timer and question matrix.' },
      { id: 'p-diag', title: 'Diagnostic Assessment', category: 'Assessment', type: 'practice' as const, route: '/diagnostic', snippet: 'Evaluate your estimated practice band across 5 core skills in 15 minutes.' },
      { id: 'p-mistakes', title: 'My Mistake Book', category: 'Revision', type: 'practice' as const, route: '/mistakes', snippet: 'Review flagged errors, explanations, and test tips.' },
      { id: 'p-plan', title: 'Personalized Study Plan', category: 'Strategy', type: 'practice' as const, route: '/study-plan', snippet: 'Customized weekly preparation schedule tailored to your target band.' },
    ];

    coreRoutes.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.snippet.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) {
        matches.push(r);
      }
    });

    // Vocabulary items
    VOCABULARY_LIST.forEach(v => {
      if (v.word.toLowerCase().includes(q) || v.definition.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)) {
        matches.push({
          id: `voc-${v.id}`,
          title: `${v.word} (${v.partOfSpeech})`,
          category: `Vocabulary · ${v.category}`,
          type: 'vocabulary',
          route: '/vocabulary',
          snippet: v.definition
        });
      }
    });

    // Grammar modules
    GRAMMAR_MODULES.forEach(g => {
      if (g.title.toLowerCase().includes(q) || g.explanation.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)) {
        matches.push({
          id: `gram-${g.id}`,
          title: g.title,
          category: `Grammar · ${g.category}`,
          type: 'grammar',
          route: '/grammar',
          snippet: g.explanation
        });
      }
    });

    // Study guides
    STUDY_GUIDES.forEach(sg => {
      if (sg.title.toLowerCase().includes(q) || sg.summary.toLowerCase().includes(q) || sg.category.toLowerCase().includes(q)) {
        matches.push({
          id: `guide-${sg.id}`,
          title: sg.title,
          category: `Study Guide · ${sg.category}`,
          type: 'guide',
          route: '/study-guide',
          snippet: sg.summary
        });
      }
    });

    setResults(matches.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'practice': return <Headphones size={18} className="text-blue-500" />;
      case 'vocabulary': return <BookOpen size={18} className="text-amber-500" />;
      case 'grammar': return <CheckCircle size={18} className="text-emerald-500" />;
      case 'guide': return <FileText size={18} className="text-purple-500" />;
      default: return <Search size={18} />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: 0,
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search practice tests, vocabulary, grammar, or study guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <X size={18} />
            </button>
          )}
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}
          >
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
          {query.trim() === '' ? (
            <div style={{ padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Type keywords like <strong>"Listening"</strong>, <strong>"TFNG"</strong>, <strong>"Mitigate"</strong>, or <strong>"Task 2"</strong>.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                {['Speaking Part 2', 'Academic Task 1', 'Conditionals', 'Sleep Neuroscience', 'Mock Test'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="btn-sm btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.35rem' }}>No matching resources found for "{query}"</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching with a synonym, broader concept, or skill name.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="search-item-hover"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ marginTop: '0.2rem' }}>{getIcon(item.type)}</div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                        {item.category}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.15rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.snippet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
