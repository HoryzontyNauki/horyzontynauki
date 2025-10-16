import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Horyzonty Nauki',
  description: 'Edukacyjna platforma – starter',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <header style={{padding:'12px', borderBottom:'1px solid #ddd', display:'flex', gap:12}}>
          <Link href="/">Strona główna</Link>
          <Link href="/dashboard">Panel</Link>
          <Link href="/login">Zaloguj</Link>
          <Link href="/register">Rejestracja</Link>
        </header>
        <main style={{padding:'24px', maxWidth:900, margin:'0 auto'}}>{children}</main>
      </body>
    </html>
  );
}
