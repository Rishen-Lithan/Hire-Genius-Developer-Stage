import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function KeyTest() {
  const [key, setKey] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const [correctKey, setCorrectKey] = useState('');

  const maxAttempts = 3;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const normalizedKey = key.trim();
    const isMatch = normalizedKey === correctKey;

    setIsCorrect(isMatch);
    setAttempts((prev) => prev + 1);

    if (isMatch || attempts + 1 >= maxAttempts) {
      setSubmitted(true);
    }

    setKey('');

    await localStorage.clear();
    await sessionStorage.clear();
  };

  const handleSkip = () => {
    setSkipped(true);
    setSubmitted(true);
  };

  const remainingAttempts = maxAttempts - attempts;

  const handleGetKey = async () => {
    try {
      const key = await localStorage.getItem('sessionKey');
      if (key) {
        setCorrectKey(key);
      } else {
        console.log('Key Not Found');
      }
    } catch (error) {
      console.log('Error getting key : ', error.message);
    }
  }

  useEffect(() => {
    handleGetKey();
  }, [handleGetKey]);

  return (
    <section className="flex items-center justify-center min-h-screen max-container">
      <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">🔐 Key Challenge</h1>
        <p className="mb-6 text-gray-600">
          Enter the secret key you discovered during your mission to unlock the final gateway.
        </p>

        {!submitted ? (
          <>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key..."
              className="w-full px-4 py-3 mb-4 text-lg text-center transition border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSubmit}
                disabled={key.trim() === ''}
                className="flex-1 py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                Submit
              </button>
              <button
                onClick={handleSkip}
                className="flex-1 py-3 font-medium text-gray-700 transition border border-gray-400 rounded-xl hover:bg-gray-100"
              >
                Skip (No Marks)
              </button>
            </div>

            {attempts > 0 && (
              <p className="mt-3 text-sm text-gray-500">
                {remainingAttempts > 0
                  ? `Incorrect. You have ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} left.`
                  : null}
              </p>
            )}
          </>
        ) : (
          <div className="mt-6 text-lg font-medium">
            {skipped ? (
              <>
                <p className="text-yellow-600">⚠️ Challenge skipped. No marks awarded.</p>
                <button
                  onClick={() => navigate('')}
                  className="w-full px-6 py-3 mt-4 font-semibold text-white transition bg-yellow-500 rounded-xl hover:bg-yellow-600"
                >
                  ➡️ Continue to Next Stage
                </button>
              </>
            ) : isCorrect ? (
              <>
                <p className="text-green-600">✅ Access Granted. Welcome, Commander!</p>
                <button
                  onClick={() => navigate('/next-stage')}
                  className="w-full px-6 py-3 mt-4 font-semibold text-white transition bg-green-600 rounded-xl hover:bg-green-700"
                >
                  🚀 Proceed to Next Mission
                </button>
              </>
            ) : (
               <>
                <p className="text-red-600">
                  ❌ All attempts used. The correct key was <strong>{correctKey}</strong>.
                </p>
                <button
                  onClick={() => navigate('/next-stage')}
                  className="w-full px-6 py-3 mt-4 font-semibold text-white transition bg-red-500 rounded-xl hover:bg-red-600"
                >
                  🔄 Proceed to next stage
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
