// Dynamic AI Simulation Engine

const ROLE_QUESTION_BANKS = {
  'Java Developer': [
    { type: 'Technical', text: 'Explain the internal working of Java HashMap and how hash collisions are handled in Java 8+.' },
    { type: 'Technical', text: 'What are the key differences between Spring Boot @Component, @Service, and @Repository annotations?' },
    { type: 'Resume Based', text: 'In your resume, you listed experience with Microservices. How do you handle distributed transactions across services?' },
    { type: 'Situational', text: 'What steps would you take if a production Java application suffers from a sudden OutOfMemoryError?' },
    { type: 'Project Based', text: 'Describe a complex Spring Boot backend application you designed. How did you structure the data access layer?' },
    { type: 'Behavioral', text: 'Tell me about a time when you had to optimize a slow database query in a legacy Java codebase.' },
    { type: 'HR', text: 'Why are you specifically interested in advancing your career as a Java Developer at our organization?' }
  ],
  'React Developer': [
    { type: 'Technical', text: 'Explain how React Reconciliation works under the hood and the role of Fiber architecture.' },
    { type: 'Technical', text: 'Compare React Context API with Redux Toolkit. When would you choose one over the other?' },
    { type: 'Resume Based', text: 'Your resume mentions building responsive web applications with React. How do you optimize bundle size and re-renders?' },
    { type: 'Situational', text: 'What would you do if a React component tree starts lagging significantly during state updates in production?' },
    { type: 'Project Based', text: 'Describe the state management architecture of a major React application you worked on.' },
    { type: 'Behavioral', text: 'Describe a situation where you had to push back on a designer UX spec due to performance constraints.' },
    { type: 'HR', text: 'What keeps you passionate about the modern JavaScript and React ecosystem?' }
  ],
  'Full Stack Developer': [
    { type: 'Technical', text: 'How do you design RESTful APIs for scale, and what caching strategies (e.g. Redis) do you implement?' },
    { type: 'Technical', text: 'Explain the difference between relational SQL joins and NoSQL document embedding.' },
    { type: 'Resume Based', text: 'Looking at your listed projects, how did you decouple your frontend client from backend microservices?' },
    { type: 'Situational', text: 'Your web app is experiencing a spikes in 504 Gateway Timeouts under high concurrent traffic. How do you isolate the bottleneck?' },
    { type: 'Project Based', text: 'Walk me through the end-to-end architecture of a full-stack application you built from scratch.' },
    { type: 'Behavioral', text: 'Tell me about a time you had to pick up a new backend framework rapidly to deliver a tight sprint commitment.' },
    { type: 'HR', text: 'How do you balance development speed with code quality in a fast-paced environment?' }
  ],
  'Data Analyst': [
    { type: 'Technical', text: 'Explain the difference between WHERE and HAVING clauses in SQL, and how window functions like ROW_NUMBER work.' },
    { type: 'Technical', text: 'How do you handle missing values and outliers in a large pandas DataFrame?' },
    { type: 'Resume Based', text: 'Your resume mentions creating dashboards in Tableau/PowerBI. How do you translate raw data into actionable stakeholder insights?' },
    { type: 'Situational', text: 'A stakeholder reports that two executive metrics dashboards show conflicting numbers. How do you audit the dataset?' },
    { type: 'Project Based', text: 'Walk me through an end-to-end data analysis project you conducted that directly impacted business revenue.' },
    { type: 'Behavioral', text: 'Describe a scenario where you presented complex statistical findings to a non-technical audience.' },
    { type: 'HR', text: 'What motivates you to uncover hidden patterns within enterprise datasets?' }
  ],
  'Data Scientist': [
    { type: 'Technical', text: 'Explain the Bias-Variance tradeoff and how regularization techniques (L1 vs L2) mitigate overfitting.' },
    { type: 'Technical', text: 'How do Precision, Recall, and ROC-AUC differ when evaluating models on imbalanced classification datasets?' },
    { type: 'Resume Based', text: 'You listed experience with PyTorch/TensorFlow. Describe how you select model architectures for specialized tasks.' },
    { type: 'Situational', text: 'Your deployed ML model performance decays by 15% in production over 3 months. How do you diagnose data drift?' },
    { type: 'Project Based', text: 'Describe a machine learning model you trained and deployed to production. What were the key feature engineering steps?' },
    { type: 'Behavioral', text: 'Tell me about a time an ML experiment yielded unexpected negative results. What did you learn?' },
    { type: 'HR', text: 'Where do you see the future of generative AI and traditional statistical modelling heading in industry?' }
  ]
};

const GENERIC_QUESTIONS = [
  { type: 'HR', text: 'Tell me about yourself, your technical journey, and why you are applying for this role.' },
  { type: 'Behavioral', text: 'Describe a challenging bug or architecture problem you encountered and how you solved it step by step.' },
  { type: 'Technical', text: 'Explain the fundamental concepts of asynchronous programming and how memory allocation is managed in your primary language.' },
  { type: 'Situational', text: 'What would you do if your production server suddenly crashed during peak user activity?' },
  { type: 'Project Based', text: 'Which project on your resume are you most proud of, and what technical trade-offs did you make?' }
];

export const generateQuestions = async ({ role, experienceLevel, difficulty, interviewType, questionCount, resumeInfo }) => {
  // Simulate AI delay
  await new Promise((res) => setTimeout(res, 800));

  const roleBank = ROLE_QUESTION_BANKS[role] || GENERIC_QUESTIONS;
  let questions = [];

  // Filter or prioritize based on interviewType
  if (interviewType === 'technical') {
    questions = roleBank.filter(q => q.type === 'Technical' || q.type === 'Project Based');
  } else if (interviewType === 'hr') {
    questions = roleBank.filter(q => q.type === 'HR' || q.type === 'Behavioral');
  } else if (interviewType === 'resume' && resumeInfo && resumeInfo.projects?.length > 0) {
    const projName = resumeInfo.projects[0].name || 'your primary project';
    questions = [
      { id: 'q-res-1', type: 'Resume Based', category: 'Resume', text: `In your resume, you listed "${projName}". Explain the key architecture and technical hurdles you overcame.` },
      { id: 'q-res-2', type: 'Resume Based', category: 'Skills', text: `You highlighted skills in ${resumeInfo.skills?.slice(0, 3).join(', ') || 'modern frameworks'}. How have you applied these in real-world applications?` },
      ...roleBank
    ];
  } else {
    questions = [...roleBank];
  }

  // Fill up if questionCount is greater than bank length
  while (questions.length < questionCount) {
    const randomIndex = Math.floor(Math.random() * GENERIC_QUESTIONS.length);
    const q = { ...GENERIC_QUESTIONS[randomIndex] };
    q.id = `q-extra-${questions.length + 1}`;
    questions.push(q);
  }

  // Format final questions array
  return questions.slice(0, questionCount).map((q, idx) => ({
    id: q.id || `q-${idx + 1}`,
    number: idx + 1,
    type: q.type || 'Technical',
    category: q.type || 'General',
    text: q.text,
    difficulty: difficulty || 'Medium'
  }));
};

export const generateFollowUp = async ({ questionText, userAnswer, role }) => {
  await new Promise((res) => setTimeout(res, 600));

  const answerLower = userAnswer.toLowerCase();
  
  if (answerLower.includes('spring') || answerLower.includes('java')) {
    return 'You mentioned Spring Boot. Why did you choose Spring Boot over traditional Spring MVC or Quarkus for this architecture?';
  }
  if (answerLower.includes('redux') || answerLower.includes('context')) {
    return 'You referenced state management. How do you prevent unnecessary selector re-renders when global state expands?';
  }
  if (answerLower.includes('sql') || answerLower.includes('database') || answerLower.includes('query')) {
    return 'Follow-up: How did you ensure database indexing and connection pooling were optimized for that volume?';
  }
  if (answerLower.includes('docker') || answerLower.includes('aws') || answerLower.includes('cloud')) {
    return 'Follow-up: What container orchestration or security isolation mechanisms were configured in deployment?';
  }

  return `Interesting point regarding "${userAnswer.slice(0, 35)}...". Could you elaborate on how you validated that technical decision in production?`;
};

export const evaluateAnswer = async ({ questionText, userAnswer, role, category }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const wordCount = userAnswer ? userAnswer.trim().split(/\s+/).length : 0;
  
  let score = 8.5;
  let technicalAccuracy = 8.5;
  let relevance = 9.0;
  let communication = 8.0;
  let problemSolving = 8.5;
  let feedback = 'Solid, well-articulated response. You demonstrated a clear technical foundation.';
  
  if (wordCount < 10) {
    score = 4.5;
    technicalAccuracy = 5.0;
    relevance = 6.0;
    communication = 4.0;
    problemSolving = 4.5;
    feedback = 'Your answer was extremely brief. In a real interview, aim to expand with concrete technical details, code examples, or STAR methodology.';
  } else if (wordCount < 30) {
    score = 6.8;
    technicalAccuracy = 7.0;
    relevance = 7.5;
    communication = 6.5;
    problemSolving = 6.8;
    feedback = 'Good start, but missing depth. Try including real-world trade-offs, architecture decisions, or quantitative metrics achieved.';
  } else if (wordCount > 60) {
    score = 9.2;
    technicalAccuracy = 9.4;
    relevance = 9.2;
    communication = 9.0;
    problemSolving = 9.1;
    feedback = 'Excellent and thorough explanation! You structured your answer effectively and backed your claims with technical depth.';
  }

  return {
    score: parseFloat(score.toFixed(1)),
    technicalAccuracy: Math.min(10, Math.round(technicalAccuracy)),
    relevance: Math.min(10, Math.round(relevance)),
    communication: Math.min(10, Math.round(communication)),
    problemSolving: Math.min(10, Math.round(problemSolving)),
    feedback,
    strengths: ['Addressed the core concept directly', 'Good terminology usage', 'Clear communication flow'],
    improvements: wordCount < 30 ? ['Add concrete practical examples', 'Elaborate on edge cases'] : ['None - great response structure']
  };
};

export const generateFinalReport = (evaluatedQuestions, config) => {
  const total = evaluatedQuestions.reduce((acc, q) => acc + (q.evaluation?.score || 7), 0);
  const avgOutOf10 = evaluatedQuestions.length > 0 ? total / evaluatedQuestions.length : 7.5;
  const overallPercentage = Math.round(avgOutOf10 * 10);

  // Category breakdown for Radar Chart
  const radarData = [
    { subject: 'Technical Knowledge', A: Math.min(95, overallPercentage + 3), fullMark: 100 },
    { subject: 'Communication', A: Math.min(92, overallPercentage - 2), fullMark: 100 },
    { subject: 'Problem Solving', A: Math.min(96, overallPercentage + 4), fullMark: 100 },
    { subject: 'Resume Knowledge', A: Math.min(90, overallPercentage - 1), fullMark: 100 },
    { subject: 'Confidence', A: Math.min(88, overallPercentage - 4), fullMark: 100 },
  ];

  // Bar chart breakdown
  const categoryScores = [
    { category: 'Technical Accuracy', score: Math.round(overallPercentage * 0.95) },
    { category: 'Relevance', score: Math.round(overallPercentage * 0.98) },
    { category: 'Clarity & Structure', score: Math.round(overallPercentage * 0.90) },
    { category: 'Problem Solving', score: Math.round(overallPercentage * 0.96) },
    { category: 'Confidence', score: Math.round(overallPercentage * 0.88) },
  ];

  const strengths = [
    `Strong technical foundation in ${config.role || 'software development'} core concepts.`,
    'Clear problem-solving methodology when breaking down architectural questions.',
    'Effective communication style with good technical vocabulary.'
  ];

  const improvements = [
    'Include more specific quantitative outcomes (e.g. "% performance boost achieved").',
    'Structure complex situational answers using the STAR method (Situation, Task, Action, Result).',
    'Deepen explanations around edge cases and memory/performance bottlenecks.'
  ];

  return {
    overallScore: overallPercentage,
    role: config.role,
    date: new Date().toISOString(),
    difficulty: config.difficulty || 'Medium',
    interviewType: config.interviewType || 'Mixed',
    questionCount: evaluatedQuestions.length,
    radarData,
    categoryScores,
    strengths,
    improvements,
    questions: evaluatedQuestions
  };
};
