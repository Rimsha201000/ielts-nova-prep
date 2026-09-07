import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Flame, ChevronDown, BookOpen, Headphones, PenTool, Mic, Award, Bookmark, Compass } from 'lucide-react';
import { AnimatedLogo } from './AnimatedLogo';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { useUser } from '../../context/UserContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const { profile } = useUser();

  // Keyboard shortcut Ctrl/Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', route: '/' },
    {
      label: 'Practice',
      route: '/practice',
      hasDropdown: true,
      items: [
        { label: 'Listening Studio', route: '/listening', icon: <Headphones size={16} /> },
        { label: 'Reading Studio', route: '/reading', icon: <BookOpen size={16} /> },
        { label: 'Writing Studio', route: '/writing', icon: <PenTool size={16} /> },
        { label: 'Speaking Studio', route: '/speaking', icon: <Mic size={16} /> },
        { label: 'Diagnostic Test', route: '/diagnostic', icon: <Compass size={16} /> },
      ]
    },
    { label: 'Mock Tests', route: '/mock-tests' },
    { label: 'Vocabulary', route: '/vocabulary' },
    { label: 'Grammar', route: '/grammar' },
    { label: 'Mistake Book', route: '/mistakes' },
    { label: 'Progress', route: '/progress' },
    { label: 'Study Guide', route: '/study-guide' },
    { label: 'About', route: '/about' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(8px)',
          transition: 'background-color 0.2s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.85rem' }}>
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('/')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="IELTS NovaPrep Home"
          >
            <AnimatedLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.hasDropdown && link.items?.some(i => i.route === currentRoute));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setIsPracticeDropdownOpen(true)}
                    onMouseLeave={() => setIsPracticeDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate(link.route)}
                      style={{
                        padding: '0.45rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                        backgroundColor: isActive ? 'var(--brand-primary-light)' : 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} style={{ transform: isPracticeDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>

                    {/* Dropdown Menu */}
                    {isPracticeDropdownOpen && (
                      <div
                        className="card"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          width: '210px',
                          padding: '0.5rem',
                          boxShadow: 'var(--shadow-lg)',
                          zIndex: 110,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem',
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {link.items?.map((subItem) => (
                          <button
                            key={subItem.route}
                            onClick={() => {
                              onNavigate(subItem.route);
                              setIsPracticeDropdownOpen(false);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              padding: '0.5rem 0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              color: currentRoute === subItem.route ? 'var(--brand-primary)' : 'var(--text-primary)',
                              backgroundColor: currentRoute === subItem.route ? 'var(--brand-primary-light)' : 'transparent',
                              textAlign: 'left',
                              width: '100%',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = currentRoute === subItem.route ? 'var(--brand-primary-light)' : 'transparent')}
                          >
                            <span style={{ color: 'var(--brand-primary)' }}>{subItem.icon}</span>
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.route)}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--brand-primary-light)' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="btn-secondary"
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.85rem',
                gap: '0.4rem',
              }}
              title="Search practice resources (Cmd/Ctrl + K)"
            >
              <Search size={16} />
              <span className="search-text-label" style={{ display: 'none' }}>Search</span>
              <kbd
                style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '3px',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Streak Badge */}
            <div
              className="badge"
              style={{
                backgroundColor: 'var(--status-warning-bg)',
                color: 'var(--status-warning-text)',
                border: '1px solid var(--status-warning-border)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => onNavigate('/progress')}
              title={`${profile.studyStreakDays} Day Study Streak`}
            >
              <Flame size={15} style={{ color: '#F59E0B' }} />
              <span>{profile.studyStreakDays}d</span>
            </div>

            {/* Light/Dark Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="btn-secondary mobile-menu-btn"
              style={{
                padding: '0.45rem',
                display: 'none',
              }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {navLinks.map((link) => (
              <div key={link.label}>
                <button
                  onClick={() => {
                    onNavigate(link.route);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: currentRoute === link.route ? 'var(--brand-primary)' : 'var(--text-primary)',
                    backgroundColor: currentRoute === link.route ? 'var(--brand-primary-light)' : 'transparent',
                  }}
                >
                  {link.label}
                </button>
                {link.hasDropdown && (
                  <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                    {link.items?.map(sub => (
                      <button
                        key={sub.route}
                        onClick={() => {
                          onNavigate(sub.route);
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: currentRoute === sub.route ? 'var(--brand-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        {sub.icon}
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Responsive media query styling injection */}
      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .search-text-label {
            display: inline !important;
          }
        }
        @media (max-width: 959px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
