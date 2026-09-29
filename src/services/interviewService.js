import api from './api';
import { generateId } from '../utils/helpers';

const INITIAL_SAMPLE_INTERVIEWS = [
  {
    id: 'intv_001',
    role: 'Java Developer',
    date: '2026-09-18T10:30:00.000Z',
    score: 82,
    difficulty: 'Medium',
    interviewType: 'Mixed',
    questionCount: 10,
    status: 'Completed',
    radarData: [
      { subject: 'Technical Knowledge', A: 85, fullMark: 100 },
      { subject: 'Communication', A: 78, fullMark: 100 },
      { subject: 'Problem Solving', A: 88, fullMark: 100 },
      { subject: 'Resume Knowledge', A: 80, fullMark: 100 },
      { subject: 'Confidence', A: 76, fullMark: 100 }
    ],
    categoryScores: [
      { category: 'Technical Accuracy', score: 85 },
      { category: 'Relevance', score: 88 },
      { category: 'Clarity & Structure', score: 78 },
      { category: 'Problem Solving', score: 88 },
      { category: 'Confidence', score: 76 }
    ],
    strengths: [
      'Good understanding of Java core principles and JVM memory structure',
      'Clear explanations for microservices database patterns',
      'Solid problem-solving steps when evaluating high-load scenarios'
    ],
    improvements: [
      'Explain database indexing and connection pool tuning in greater detail',
      'Give more structured STAR framework answers for behavioral questions',
      'Discuss edge cases during algorithm explanations'
    ],
    questions: [
      {
        id: 'q1',
        number: 1,
        category: 'Technical',
        text: 'Explain Java HashMap and how it works internally.',
        userAnswer: 'Java HashMap uses an array of buckets to store key-value pairs. Key hashes are mapped to index. In Java 8, if a bucket chain exceeds 8 nodes, it transforms into a Red-Black tree for O(log n) lookup.',
        evaluation: {
          score: 8.5,
          feedback: 'Excellent response! You correctly identified the treeification threshold introduced in Java 8 and the bucket index calculation.'
        }
      },
      {
        id: 'q2',
        number: 2,
        category: 'Resume Based',
        text: 'You mentioned a Spring Boot microservice project in your resume. Explain the architecture of that project.',
        userAnswer: 'We built an e-commerce order service using Spring Boot microservices, Spring Cloud Gateway for routing, Eureka for service discovery, and PostgreSQL with Redis caching.',
        evaluation: {
          score: 8.8,
          feedback: 'Very clear architectural overview. Good mention of Eureka service discovery and Redis caching layers.'
        }
      }
    ]
  },
  {
    id: 'intv_002',
    role: 'React Developer',
    date: '2026-09-12T14:15:00.000Z',
    score: 74,
    difficulty: 'Hard',
    interviewType: 'Technical',
    questionCount: 5,
    status: 'Completed',
    radarData: [
      { subject: 'Technical Knowledge', A: 78, fullMark: 100 },
      { subject: 'Communication', A: 72, fullMark: 100 },
      { subject: 'Problem Solving', A: 75, fullMark: 100 },
      { subject: 'Resume Knowledge', A: 70, fullMark: 100 },
      { subject: 'Confidence', A: 75, fullMark: 100 }
    ],
    categoryScores: [
      { category: 'Technical Accuracy', score: 78 },
      { category: 'Relevance', score: 75 },
      { category: 'Clarity & Structure', score: 72 },
      { category: 'Problem Solving', score: 75 },
      { category: 'Confidence', score: 70 }
    ],
    strengths: ['Great knowledge of React hooks', 'Familiar with state isolation'],
    improvements: ['Deepen knowledge on fiber reconciliation mechanics'],
    questions: []
  },
  {
    id: 'intv_003',
    role: 'Full Stack Developer',
    date: '2026-09-05T09:00:00.000Z',
    score: 69,
    difficulty: 'Medium',
    interviewType: 'Behavioral',
    questionCount: 5,
    status: 'Completed',
    radarData: [
      { subject: 'Technical Knowledge', A: 70, fullMark: 100 },
      { subject: 'Communication', A: 68, fullMark: 100 },
      { subject: 'Problem Solving', A: 72, fullMark: 100 },
      { subject: 'Resume Knowledge', A: 65, fullMark: 100 },
      { subject: 'Confidence', A: 70, fullMark: 100 }
    ],
    categoryScores: [
      { category: 'Technical Accuracy', score: 70 },
      { category: 'Relevance', score: 68 },
      { category: 'Clarity & Structure', score: 68 },
      { category: 'Problem Solving', score: 72 },
      { category: 'Confidence', score: 65 }
    ],
    strengths: ['Good team communication examples'],
    improvements: ['Focus on quantitative results achieved in projects'],
    questions: []
  }
];

export const getInterviewHistory = async () => {
  try {
    const response = await api.get('/interviews');
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend interview API unavailable. Loading local interview history in Demo Mode.', err);
  }

  const stored = localStorage.getItem('interview_ai_history');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_SAMPLE_INTERVIEWS;
    }
  }

  localStorage.setItem('interview_ai_history', JSON.stringify(INITIAL_SAMPLE_INTERVIEWS));
  return INITIAL_SAMPLE_INTERVIEWS;
};

export const getInterviewById = async (id) => {
  const history = await getInterviewHistory();
  return history.find((intv) => intv.id === id) || history[0];
};

export const saveCompletedInterview = async (reportData) => {
  const history = await getInterviewHistory();
  const newSession = {
    id: `intv_${generateId()}`,
    status: 'Completed',
    ...reportData
  };

  const updatedHistory = [newSession, ...history];
  localStorage.setItem('interview_ai_history', JSON.stringify(updatedHistory));

  try {
    await api.post('/interviews', newSession);
  } catch (e) {
    // Demo fallback handled above
  }

  return newSession;
};

export const deleteInterview = async (id) => {
  const history = await getInterviewHistory();
  const updated = history.filter((item) => item.id !== id);
  localStorage.setItem('interview_ai_history', JSON.stringify(updated));

  try {
    await api.delete(`/interviews/${id}`);
  } catch (e) {
    // Demo fallback handled
  }

  return updated;
};
