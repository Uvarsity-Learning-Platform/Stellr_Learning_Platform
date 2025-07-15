import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, X, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { Quiz, QuizAttempt } from '@/types';

const QuizPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttempt | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock quiz data
  const mockQuiz: Quiz = {
    id: '1',
    courseId: courseId || '1',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics including components, props, and state.',
    timeLimit: 30, // 30 minutes
    passingScore: 70,
    attempts: 0,
    maxAttempts: 3,
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        type: 'single-choice',
        options: [
          'A JavaScript library for building user interfaces',
          'A backend framework',
          'A database management system',
          'A CSS preprocessor'
        ],
        correctAnswers: [0],
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces, particularly for web applications.'
      },
      {
        id: 'q2',
        question: 'Which of the following are React Hooks? (Select all that apply)',
        type: 'multiple-choice',
        options: [
          'useState',
          'useEffect',
          'componentDidMount',
          'useContext',
          'render'
        ],
        correctAnswers: [0, 1, 3],
        explanation: 'useState, useEffect, and useContext are React Hooks. componentDidMount and render are class component methods.'
      },
      {
        id: 'q3',
        question: 'What is JSX?',
        type: 'single-choice',
        options: [
          'A JavaScript extension syntax',
          'A CSS framework',
          'A backend language',
          'A database query language'
        ],
        correctAnswers: [0],
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
      },
      {
        id: 'q4',
        question: 'How do you pass data from a parent component to a child component?',
        type: 'single-choice',
        options: [
          'Using state',
          'Using props',
          'Using context only',
          'Using refs'
        ],
        correctAnswers: [1],
        explanation: 'Props (properties) are used to pass data from parent components to child components in React.'
      },
      {
        id: 'q5',
        question: 'What does the useState Hook return?',
        type: 'single-choice',
        options: [
          'Only the current state value',
          'Only the setter function',
          'An array with the current state value and a setter function',
          'An object with state and setState properties'
        ],
        correctAnswers: [2],
        explanation: 'The useState Hook returns an array containing the current state value and a function to update it.'
      }
    ]
  };

  useEffect(() => {
    // Simulate loading quiz data
    setTimeout(() => {
      setQuiz(mockQuiz);
      setTimeLeft((mockQuiz.timeLimit || 30) * 60); // Convert minutes to seconds
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerChange = (questionId: string, optionIndex: number, isMultiple: boolean) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const updatedAnswers = currentAnswers.includes(optionIndex)
          ? currentAnswers.filter(index => index !== optionIndex)
          : [...currentAnswers, optionIndex];
        return { ...prev, [questionId]: updatedAnswers };
      } else {
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers_arr = question.correctAnswers;
      
      if (userAnswers.length === correctAnswers_arr.length &&
          userAnswers.every(answer => correctAnswers_arr.includes(answer))) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    
    const score = calculateScore();
    const passed = score >= quiz.passingScore;
    
    const result: QuizAttempt = {
      id: Date.now().toString(),
      quizId: quiz.id,
      userId: 'current-user',
      answers,
      score,
      passed,
      startedAt: new Date(Date.now() - ((quiz.timeLimit || 30) * 60 - timeLeft) * 1000).toISOString(),
      completedAt: new Date().toISOString()
    };
    
    setQuizResult(result);
    setIsSubmitted(true);
    
    if (passed) {
      toast.success('Congratulations! You passed the quiz!');
    } else {
      toast.error('You didn\'t pass this time. You can try again!');
    }
  };

  const handleRetakeQuiz = () => {
    if (!quiz) return;
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft((quiz.timeLimit || 30) * 60);
    setIsSubmitted(false);
    setQuizResult(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz not found</h3>
        <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate(`/app/courses/${courseId}`)}
          className="btn-primary"
        >
          Back to Course
        </button>
      </div>
    );
  }

  if (isSubmitted && quizResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quiz Results */}
        <div className="card p-8 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            quizResult.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {quizResult.passed ? (
              <CheckCircle className="text-green-600" size={48} />
            ) : (
              <X className="text-red-600" size={48} />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quizResult.passed ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {quizResult.passed 
              ? 'You have successfully passed the quiz!' 
              : 'You didn\'t pass this time, but don\'t give up!'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">{quizResult.score}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">{quiz.passingScore}%</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {quiz.questions.filter(q => {
                  const userAnswers = answers[q.id] || [];
                  return userAnswers.length === q.correctAnswers.length &&
                         userAnswers.every(answer => q.correctAnswers.includes(answer));
                }).length}/{quiz.questions.length}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            {!quizResult.passed && quiz.attempts < quiz.maxAttempts && (
              <button onClick={handleRetakeQuiz} className="btn-primary">
                <RotateCcw className="mr-2" size={16} />
                Retake Quiz
              </button>
            )}
            <button
              onClick={() => navigate(`/app/courses/${courseId}`)}
              className="btn-outline"
            >
              Back to Course
            </button>
          </div>
        </div>

        {/* Review Answers */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Answers</h2>
          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswers = answers[question.id] || [];
              const isCorrect = userAnswers.length === question.correctAnswers.length &&
                               userAnswers.every(answer => question.correctAnswers.includes(answer));
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = userAnswers.includes(optionIndex);
                          const isCorrectOption = question.correctAnswers.includes(optionIndex);
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded text-sm ${
                                isCorrectOption
                                  ? 'bg-green-50 border border-green-200 text-green-800'
                                  : isSelected
                                  ? 'bg-red-50 border border-red-200 text-red-800'
                                  : 'bg-gray-50 text-gray-600'
                              }`}
                            >
                              {option}
                              {isCorrectOption && <span className="float-right">✓ Correct</span>}
                              {isSelected && !isCorrectOption && <span className="float-right">Your answer</span>}
                            </div>
                          );
                        })}
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const canProceed = answers[currentQuestion.id]?.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-lg font-medium text-primary-600">
              <Clock size={20} />
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time remaining</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current Question */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h2>
        
        {currentQuestion.type === 'multiple-choice' && (
          <p className="text-sm text-blue-600 mb-4">Select all that apply</p>
        )}
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[currentQuestion.id]?.includes(index) || false;
            const isMultiple = currentQuestion.type === 'multiple-choice';
            
            return (
              <label
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type={isMultiple ? 'checkbox' : 'radio'}
                  name={`question-${currentQuestion.id}`}
                  checked={isSelected}
                  onChange={() => handleAnswerChange(currentQuestion.id, index, isMultiple)}
                  className="mr-3"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            );
          })}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="mr-2" size={16} />
            Previous
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={!canProceed}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
              <CheckCircle className="ml-2" size={16} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={!canProceed}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="ml-2" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Question Overview */}
      <div className="card p-6">
        <h3 className="font-medium text-gray-900 mb-4">Question Overview</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-primary-600 text-white'
                  : answers[quiz.questions[index].id]?.length > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;