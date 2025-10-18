'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 980 && setOpen(false);
    window.addEventListener('keydown', onEsc);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onEsc);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="container nav">
        <a className="logo" href="/">Horyzonty Nauki</a>

        {/* desktop */}
        <nav className="nav__links" aria-label="Główna nawigacja">
          <a href="#o-platformie">O platformie</a>
          <a href="#dla-ucznia">Dla ucznia</a>
          <a href="#dla-nauczyciela">Dla nauczyciela</a>
        </nav>
        <div className="auth-buttons">
          <a className="btn btn--ghost" href="/register">Zarejestruj się</a>
          <a className="btn btn--primary" href="/login">Zaloguj się</a>
        </div>

        {/* hamburger (mobile) */}
        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label="Otwórz menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* panel mobilny */}
      <div id="mobile-menu" className={`mobileMenu ${open ? 'is-open' : ''}`}>
        <nav className="mobileMenu__section">
          <a onClick={() => setOpen(false)} href="#o-platformie">O platformie</a>
          <a onClick={() => setOpen(false)} href="#dla-ucznia">Dla ucznia</a>
          <a onClick={() => setOpen(false)} href="#dla-nauczyciela">Dla nauczyciela</a>
        </nav>
        <div className="mobileMenu__section mobileMenu__auth">
          <a className="btn btn--ghost" onClick={() => setOpen(false)} href="/register">Zarejestruj się</a>
          <a className="btn btn--primary" onClick={() => setOpen(false)} href="/login">Zaloguj się</a>
        </div>
      </div>

      {open && <div className="mobileMenu__backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}
