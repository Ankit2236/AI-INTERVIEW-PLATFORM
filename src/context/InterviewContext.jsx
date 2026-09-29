import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInterviewHistory, saveCompletedInterview, deleteInterview as removeInterview } from '../services/interviewService';
import { generateQuestions, evaluateAnswer, generateFollowUp, generateFinalReport } from '../services/aiService';
import { getStoredResume } from '../services/resumeService';

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await getInterviewHistory();
      setHistory(data);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async (config) => {
    setLoading(true);
    const resumeInfo = getStoredResume();
    const questions = await generateQuestions({ ...config, resumeInfo });

    const session = {
      config,
      questions,
      currentIndex: 0,
      answers: [],
      evaluatedQuestions: [],
      isProcessingAI: false,
      followUpQuestion: null,
      startTime: Date.now()
    };

    setActiveSession(session);
    setLoading(false);
    return session;
  };

  const submitAnswer = async (answerText) => {
    if (!activeSession) return;

    setActiveSession((prev) => ({ ...prev, isProcessingAI: true }));

    const currentQuestion = activeSession.questions[activeSession.currentIndex];
    
    // Evaluate answer with AI engine
    const evaluation = await evaluateAnswer({
      questionText: currentQuestion.text,
      userAnswer: answerText,
      role: activeSession.config.role,
      category: currentQuestion.category
    });

    const questionRecord = {
      ...currentQuestion,
      userAnswer: answerText,
      evaluation
    };

    // Check if dynamic follow-up should be asked (e.g. for long/specific answers)
    let followUp = null;
    if (answerText && answerText.length > 35 && Math.random() > 0.4 && !activeSession.followUpQuestion) {
      followUp = await generateFollowUp({
        questionText: currentQuestion.text,
        userAnswer: answerText,
        role: activeSession.config.role
      });
    }

    const updatedEvaluated = [...activeSession.evaluatedQuestions, questionRecord];
    const isLastQuestion = activeSession.currentIndex >= activeSession.questions.length - 1;

    if (followUp) {
      // Insert follow-up question right after current question
      const newQuestionObj = {
        id: `q-followup-${Date.now()}`,
        number: currentQuestion.number + 0.5,
        type: 'Follow-Up',
        category: 'Follow-Up',
        text: followUp,
        difficulty: activeSession.config.difficulty
      };

      const newQuestionsList = [...activeSession.questions];
      newQuestionsList.splice(activeSession.currentIndex + 1, 0, newQuestionObj);

      setActiveSession((prev) => ({
        ...prev,
        questions: newQuestionsList,
        currentIndex: prev.currentIndex + 1,
        evaluatedQuestions: updatedEvaluated,
        isProcessingAI: false,
        followUpQuestion: followUp
      }));
    } else {
      setActiveSession((prev) => ({
        ...prev,
        currentIndex: isLastQuestion ? prev.currentIndex : prev.currentIndex + 1,
        evaluatedQuestions: updatedEvaluated,
        isProcessingAI: false,
        followUpQuestion: null
      }));

      if (isLastQuestion) {
        return await finalizeInterview(updatedEvaluated, activeSession.config);
      }
    }
  };

  const skipQuestion = async () => {
    if (!activeSession) return;
    const currentQuestion = activeSession.questions[activeSession.currentIndex];
    const questionRecord = {
      ...currentQuestion,
      userAnswer: '[Question Skipped]',
      evaluation: {
        score: 0,
        feedback: 'Question was skipped. No evaluation score assigned.',
        technicalAccuracy: 0,
        relevance: 0,
        communication: 0,
        problemSolving: 0,
        strengths: [],
        improvements: ['Attempt all questions for complete interview score']
      }
    };

    const updatedEvaluated = [...activeSession.evaluatedQuestions, questionRecord];
    const isLastQuestion = activeSession.currentIndex >= activeSession.questions.length - 1;

    if (isLastQuestion) {
      return await finalizeInterview(updatedEvaluated, activeSession.config);
    } else {
      setActiveSession((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        evaluatedQuestions: updatedEvaluated
      }));
    }
  };

  const finalizeInterview = async (evaluatedQuestions, config) => {
    const report = generateFinalReport(evaluatedQuestions, config);
    const saved = await saveCompletedInterview(report);
    await loadHistory();
    setActiveSession(null);
    return saved;
  };

  const deleteSession = async (id) => {
    const updated = await removeInterview(id);
    setHistory(updated);
  };

  return (
    <InterviewContext.Provider
      value={{
        history,
        activeSession,
        loading,
        startNewSession,
        submitAnswer,
        skipQuestion,
        deleteSession,
        loadHistory
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
