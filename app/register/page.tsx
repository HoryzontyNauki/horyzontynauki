'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '../../lib/supabase-browser';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student'|'teacher'|'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName } }
    });
    if (error) { setLoading(false); setError(error.message); return; }
    const user = data.user;
    if (!user) { setLoading(false); setError('Brak użytkownika po rejestracji'); return; }
    const { error: insertError } = await supabase.from('profiles').insert({
      user_id: user.id,
      full_name: fullName,
      role
    });
    setLoading(false);
    if (insertError) setError(insertError.message);
    else router.push('/dashboard');
  }

  return (
    <div className="card">
      <h1>Rejestracja</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="Imię i nazwisko" value={fullName} onChange={e=>setFullName(e.target.value)} required/>
        <input placeholder="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input placeholder="Hasło" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <label>Rola
          <select value={role} onChange={e=>setRole(e.target.value as any)}>
            <option value="student">Uczeń</option>
            <option value="teacher">Nauczyciel</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button disabled={loading}>{loading ? 'Tworzenie...' : 'Utwórz konto'}</button>
      </form>
      {error && <p style={{color:'crimson'}}>{error}</p>}
      <p style={{marginTop:12, fontSize:14}}>Uwaga: rejestracja admina daje pełne uprawnienia. W realnej aplikacji ukryj tę opcję i nadawaj role ręcznie.</p>
    </div>
  );
}
