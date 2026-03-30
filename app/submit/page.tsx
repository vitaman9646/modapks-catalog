'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    appName: '',
    packageName: '',
    downloadLink: '',
    description: '',
    contactInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправляем в Telegram через бота (webhook)
    const message = `
?? Новое предложение MOD приложения:

?? Название: ${formData.appName}
?? Package: ${formData.packageName}
?? Ссылка: ${formData.downloadLink}
?? Описание: ${formData.description}
?? Контакт: ${formData.contactInfo}
    `.trim();

    try {
      // TODO: Отправить в Telegram (позже настроим webhook)
      console.log('Submitted:', message);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-400 mb-8">
            Your submission has been received. We'll review it and add the app if it meets our criteria.
          </p>
          <Link href="/" className="inline-block bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full font-bold transition">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-4 inline-block">
          ← Back
        </Link>

        <h1 className="text-5xl font-bold mb-4">?? Submit a MOD App</h1>
        <p className="text-gray-400 mb-8">
          Know a great MOD app that's not in our catalog? Suggest it here!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">App Name *</label>
            <input
              type="text"
              required
              value={formData.appName}
              onChange={(e) => setFormData({...formData, appName: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="GB WhatsApp"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Package Name</label>
            <input
              type="text"
              value={formData.packageName}
              onChange={(e) => setFormData({...formData, packageName: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="com.gbwhatsapp"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Download Link *</label>
            <input
              type="url"
              required
              value={formData.downloadLink}
              onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="What makes this MOD special?"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Your Contact (optional)</label>
            <input
              type="text"
              value={formData.contactInfo}
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="@telegram or email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition"
          >
            Submit MOD App
          </button>
        </form>
      </div>
    </main>
  );
}
