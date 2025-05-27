import React, { useState, useEffect } from 'react';
import questions from '../assets/questions/StatusQuestions.json';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function CodeTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [trophies, setTrophies] = useState(0);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmail(email);
  }, []);

  const allOptions = React.useMemo(() => {
    const options = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    return options.sort(() => Math.random() - 0.5);
  }, [currentIndex]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    const correctCount = Object.entries(answers).filter(
      ([index, ans]) => ans === questions[index].correct_answer
    ).length;

    setTrophies(correctCount);
    await localStorage.setItem('codeSubmitted', 'true');
    
    const result = {
      correct: correctCount,
      total: questions.length,
      email: email,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'codes'), result);
      console.log('Result successfully stored in Firestore');
    } catch (error) {
      console.error('Error adding document to Firestore:', error);
    }
    setShowResult(true);
  };

  useEffect(() => {
    const submitted = localStorage.getItem('codeSubmitted');
    if (submitted === 'true') {
      setIsAlreadySubmitted(true);
      const result = JSON.parse(localStorage.getItem('codeTestResult'));
      if (result) {
        setTrophies(result.correct);
        setShowResult(true);
      }
    }
  }, []);

  const isAnswerSelected = answers[currentIndex] !== undefined;

  return (
    <section className="p-4 max-container">
      {isAlreadySubmitted ? (
        <div className="p-6 text-center bg-white border border-green-300 shadow-lg rounded-2xl animate-pulse">
          <h2 className="mb-4 text-2xl font-extrabold text-green-600">🎯 Challenge Already Completed</h2>
          <div className="text-4xl animate-bounce">
            {Array.from({ length: trophies }, (_, i) => (
              <span key={i}>🏆</span>
            ))}
          </div>
        </div>
      ) : !showResult ? (
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="mb-4 text-xl font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </h2>
          <p className="mb-6 text-lg">{currentQuestion.question}</p>
          <div className="space-y-3">
            {allOptions.map((option, idx) => (
              <button
                key={idx}
                className={`w-full px-4 py-2 border rounded-xl text-left ${
                  answers[currentIndex] === option
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'hover:bg-blue-100'
                }`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isAnswerSelected}
                className="px-6 py-2 text-white bg-blue-600 rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isAnswerSelected}
                className="px-6 py-2 text-white bg-green-600 rounded-xl disabled:opacity-50"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center bg-white shadow-lg rounded-2xl animate-fade-in">
          <h2 className="mb-4 text-2xl font-bold text-green-700">✅ Test Completed</h2>
          <p className="mb-4 text-lg font-medium text-gray-800">
            You got <span className="font-bold text-green-800">{trophies}</span> out of{' '}
            <span className="font-bold">{questions.length}</span> correct!
          </p>
          <div className="text-4xl animate-bounce">
            {Array.from({ length: trophies }, (_, i) => (
              <span key={i}>🏆</span>
            ))}
          </div>
           <button
            onClick={() => navigate('/')}
            className="px-6 py-3 mt-4 font-bold text-white transition-all duration-300 bg-purple-600 rounded-full shadow-md hover:bg-purple-700 animate-bounce"
          >
            🏡 Back to Village
          </button>
        </div>
      )}
    </section>
  );
}
