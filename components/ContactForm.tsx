'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // zapobiega przeładowaniu i przekierowaniu

    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/kontakt@horyzontynauki.com', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error('Błąd wysyłania');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">Formularz kontaktowy</h2>

      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Wiadomość z Horyzontów Nauki" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <input
        className="w-full border border-gray-300 rounded-lg p-3"
        type="text"
        name="name"
        placeholder="Imię i nazwisko"
        required
      />
      <input
        className="w-full border border-gray-300 rounded-lg p-3"
        type="email"
        name="email"
        placeholder="Twój e-mail"
        required
      />
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3"
        name="message"
        placeholder="Wiadomość"
        rows={4}
        required
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-center mt-3 font-medium">✅ Wiadomość została wysłana!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-center mt-3 font-medium">❌ Wystąpił problem z wysłaniem wiadomości.</p>
      )}
    </form>
  );
}
