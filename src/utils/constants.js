export const SUPPORTED_ROLES = [
  {
    id: 'java-dev',
    title: 'Java Developer',
    category: 'Backend',
    icon: 'Code2',
    description: 'Core Java, Spring Boot, Microservices, JVM Tuning, JPA/Hibernate',
    skills: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'SQL', 'Hibernate', 'JUnit']
  },
  {
    id: 'react-dev',
    title: 'React Developer',
    category: 'Frontend',
    icon: 'Layout',
    description: 'React.js, Redux, Modern Hooks, Next.js, Webpack, Tailwind CSS',
    skills: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux', 'HTML5/CSS3', 'Tailwind CSS']
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Developer',
    category: 'Full Stack',
    icon: 'Layers',
    description: 'Node.js, React, Express, MongoDB/PostgreSQL, System Architecture',
    skills: ['Node.js', 'React.js', 'Express', 'PostgreSQL', 'MongoDB', 'System Design', 'Docker']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data Science',
    icon: 'BarChart2',
    description: 'SQL queries, Python (Pandas), Tableau, PowerBI, Statistical Analysis',
    skills: ['SQL', 'Python', 'Pandas', 'Excel', 'Tableau', 'Data Visualization', 'Statistics']
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'AI & Data',
    icon: 'Brain',
    description: 'Machine Learning algorithms, TensorFlow/PyTorch, Python, Scikit-learn',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'NLP', 'Deep Learning']
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'DevOps & Infrastructure',
    icon: 'Cloud',
    description: 'AWS / Azure / GCP, Terraform, Docker, Kubernetes, CI/CD pipelines',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Networking']
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'DevOps & Infrastructure',
    icon: 'GitBranch',
    description: 'Jenkins, GitHub Actions, Infrastructure as Code, Kubernetes, Ansible',
    skills: ['Kubernetes', 'Docker', 'Jenkins', 'Ansible', 'GitHub Actions', 'Prometheus']
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Core Engineering',
    icon: 'Cpu',
    description: 'Data Structures & Algorithms, System Design, OOP, Object Oriented Design',
    skills: ['DSA', 'System Design', 'C++', 'Java', 'OOP', 'Database Indexing', 'Git']
  },
  {
    id: 'python-dev',
    title: 'Python Developer',
    category: 'Backend',
    icon: 'Terminal',
    description: 'Django, FastAPI, Asynchronous Programming, Flask, Celery, Postgres',
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Asyncio', 'Redis', 'Docker']
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Data',
    icon: 'Sparkles',
    description: 'Model deployment, MLops, PyTorch, Model Optimization, Vector DBs',
    skills: ['PyTorch', 'MLOps', 'Vector Databases', 'LangChain', 'CUDA', 'Python', 'FastAPI']
  }
];

export const EXPERIENCE_LEVELS = [
  { id: 'fresher', title: 'Fresher / Entry Level', description: '0 Years / Fresh Graduate' },
  { id: 'junior', title: '0 – 2 Years', description: 'Junior Level Engineer' },
  { id: 'mid', title: '2 – 5 Years', description: 'Mid Level Engineer' },
  { id: 'senior', title: '5+ Years', description: 'Senior / Lead Specialist' }
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', title: 'Easy', badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { id: 'medium', title: 'Medium', badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { id: 'hard', title: 'Hard', badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
  { id: 'adaptive', title: 'Adaptive (AI Auto-Tune)', badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10' }
];

export const INTERVIEW_TYPES = [
  { id: 'technical', title: 'Technical', description: 'Algorithms, framework internals, architecture, system design' },
  { id: 'hr', title: 'HR & Cultural', description: 'Background, team fit, work ethics, career trajectory' },
  { id: 'behavioral', title: 'Behavioral', description: 'STAR method scenarios, conflict resolution, leadership' },
  { id: 'mixed', title: 'Comprehensive Mixed', description: 'Balanced combination of technical, project & HR questions' },
  { id: 'resume', title: 'Resume Focused', description: 'Deep dive into projects, certifications, & listed skills' }
];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20];

export const MOCK_TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior React Developer at Stripe',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    content: 'InterviewAI helped me pinpoint specific gaps in my Spring Boot and microservice architecture explanations. I went from failing final rounds to landing 3 senior offers!',
    rating: 5
  },
  {
    name: 'Alex Rivera',
    role: 'Full Stack Engineer at Vercel',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    content: 'The resume-based questions felt unnervingly realistic. The AI brought up technical choices from my past side project that real interviewers actually ended up asking!',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Microsoft',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    content: 'The voice recording mode and real-time AI feedback helped me practice speaking concisely under timed pressure. A total game changer for interview anxiety.',
    rating: 5
  }
];

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Forever Free',
    description: 'Perfect for fresh graduates and quick practice sessions.',
    features: ['3 AI Interviews / month', 'Standard Resume Analysis', 'Basic Score Breakdown', 'Community Support'],
    isPopular: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Pro SaaS',
    price: '$19',
    period: 'per month',
    description: 'For serious job seekers aiming for top tech companies.',
    features: ['Unlimited AI Interviews', 'Deep Resume Parsing & Follow-ups', 'Voice & Audio Interview Mode', 'Full Recharts Performance Analytics', 'Downloadable Detailed Reports', 'Priority Support'],
    isPopular: true,
    buttonText: 'Start Pro Trial'
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: 'per month',
    description: 'For bootcamp cohorts, teams, and placement cells.',
    features: ['Everything in Pro', 'Custom Job Specs Import', '1-on-1 AI Mentorship Insights', 'Team Dashboard & Tracking', 'API Access'],
    isPopular: false,
    buttonText: 'Contact Sales'
  }
];
