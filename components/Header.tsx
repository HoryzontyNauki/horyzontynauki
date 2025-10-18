// components/Header.tsx
export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <a className="logo" href="/">Horyzonty Nauki</a>

        <nav className="nav__links">
          <a href="#o-platformie">O platformie</a>
          <a href="#dla-ucznia">Dla ucznia</a>
          <a href="#dla-nauczyciela">Dla nauczyciela</a>
        </nav>

        <div className="auth-buttons">
          <a className="btn btn--primary" href="/register">Zarejestruj się</a>
          <a className="btn btn--primary" href="/login">Zaloguj się</a>
        </div>
      </div>
    </header>
  );
}
