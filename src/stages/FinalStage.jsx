import React from 'react';

export default function FinalStage() {
  return (
    <section className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-2xl p-10 text-center bg-white border border-blue-100 shadow-2xl rounded-2xl">
        <h1 className="mb-4 text-3xl font-bold text-purple-700">🎉 Mission Complete!</h1>
        <p className="mb-6 text-lg text-gray-700">
          Thank you for taking part in this challenge, Commander.
        </p>
        <p className="mb-4 text-gray-600">
          We appreciate your time and effort during this mission. Your response has been recorded.
        </p>
        <p className="mb-6 text-gray-600">
          🌟 We wish you the very best in your job search journey! If you're selected for the next steps,
          our hiring team will be in touch with you soon.
        </p>
      </div>
    </section>
  );
}
