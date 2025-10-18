"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setStatus("Wysyłanie...");

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setStatus("Wiadomość wysłana!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("Błąd podczas wysyłania wiadomości"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-purple-50 p-6 rounded-2xl shadow-lg"
    >
      <input
        name="name"
        placeholder="Imię"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-md"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Twój e-mail"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-md"
        required
      />
      <textarea
        name="message"
        placeholder="Wiadomość"
        value={form.message}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-md h-32"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Wyślij
      </button>
      <p className="text-center mt-4 text-sm text-gray-600">{status}</p>
    </form>
  );
}
