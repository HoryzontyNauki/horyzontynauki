import Header from "../components/Header";

export default function HomePage() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          {/* lewa kolumna */}
          <div>
            <h1 className="hero__title">Łączymy uczniów<br/>z nauczycielami</h1>
            <p className="hero__lead">
              Znajdź idealnego korepetytora i ucz się online na Horyzontach Nauki!
            </p>

            <div className="hero__search">
              <input className="input" placeholder="Wyszukaj przedmiot" />
              <button className="btn btn--accent">Szukaj</button>
            </div>
          </div>

          {/* prawa kolumna – ilustracja */}
          <div className="hero__art">
            <img src="/hero-illustration.png" alt="Uczennica i nauczyciel online" />
          </div>
        </div>
      </section>

      {/* Formularz (sekcja pełnej szerokości, karta na środku) */}
      <section id="kontakt" style={{padding:'28px 0 64px'}}>
        <div className="container">
          <div className="card" style={{maxWidth:640, margin:'0 auto'}}>
            <h2 style={{marginTop:0, marginBottom:6}}>Formularz kontaktowy</h2>
            <form action="https://formsubmit.co/kontakt@horyzontynauki.com" method="POST">
              {/* FormSubmit – zero backendu, od razu działa */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Wiadomość z Horyzontów Nauki" />
              <div style={{display:'grid', gap:12}}>
                <input className="input" name="name" placeholder="Imię i nazwisko" required />
                <input className="input" type="email" name="email" placeholder="Twój e-mail" required />
                <textarea className="input" name="message" placeholder="Wiadomość" rows={5} required />
                <button className="btn btn--primary" type="submit">Wyślij</button>
              </div>
            </form>
            <p style={{color:'#6c7a92', fontSize:14, marginTop:10}}>
              Wiadomość zostanie dostarczona na <b>kontakt@horyzontynauki.com</b>.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Horyzonty Nauki</div>
      </footer>
    </main>
  );
}
