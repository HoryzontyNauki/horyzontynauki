import { redirect } from 'next/navigation';
import { supabaseBrowser } from '../../lib/supabase-browser';
import { serverClient } from '../../lib/supabase';


export default async function Dashboard() {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="card">
      <h1>Panel</h1>
      <p><strong>Użytkownik:</strong> {user.email}</p>
      <p><strong>Imię i nazwisko:</strong> {profile?.full_name || '—'}</p>
      <p><strong>Rola:</strong> {profile?.role}</p>

      {profile?.role === 'admin' && (
        <div style={{marginTop:16, padding:12, border:'1px dashed #aaa'}}>
          <h3>Strefa administratora</h3>
          <p>Tu dodasz widoki admina (zarządzanie użytkownikami, kursami, itp.).</p>
        </div>
      )}

      {profile?.role === 'teacher' && (
        <div style={{marginTop:16, padding:12, border:'1px dashed #aaa'}}>
          <h3>Strefa nauczyciela</h3>
          <p>Tu dodasz widoki dla nauczycieli (kalendarz, uczniowie, materiały).</p>
        </div>
      )}

      {profile?.role === 'student' && (
        <div style={{marginTop:16, padding:12, border:'1px dashed #aaa'}}>
          <h3>Strefa ucznia</h3>
          <p>Tu dodasz widoki ucznia (lekcje, postępy, płatności).</p>
        </div>
      )}

      <div style={{marginTop:16}}>
        <form action="/logout" method="post">
          <button>Wyloguj</button>
        </form>
      </div>
    </div>
  );
}
