'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '../../lib/supabase-browser';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push('/dashboard');
  }

  return (
    <div className="card">
      <h1>Logowanie</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input placeholder="Hasło" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button disabled={loading}>{loading ? 'Logowanie...' : 'Zaloguj'}</button>
      </form>
      {error && <p style={{color:'crimson'}}>{error}</p>}
    </div>
  );
}
