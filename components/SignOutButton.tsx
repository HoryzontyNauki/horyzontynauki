'use client';
export default function SignOutButton() {
  async function logout() {
    await fetch('/logout', { method: 'POST' });
    window.location.href = '/login';
  }
  return <button onClick={logout}>Wyloguj</button>;
}
