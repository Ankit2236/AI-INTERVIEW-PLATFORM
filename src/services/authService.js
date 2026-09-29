import api from './api';

const DEMO_USER = {
  id: 'usr_demo_101',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 234-5678',
  college: 'Stanford University',
  degree: 'B.S. Computer Science',
  experience: '2-5 Years',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  skills: ['Java', 'Spring Boot', 'React.js', 'Node.js', 'SQL', 'PostgreSQL', 'Docker', 'AWS']
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('interview_ai_token', response.data.token);
      localStorage.setItem('interview_ai_user', JSON.stringify(response.data.user));
      return response.data;
    }
  } catch (err) {
    console.warn('Backend API unavailable. Falling back to Demo Mode Authentication.', err);
  }

  // Demo fallback
  await new Promise((res) => setTimeout(res, 600));
  const user = { ...DEMO_USER, email: email || DEMO_USER.email };
  const token = 'demo_jwt_token_xyz_789';

  localStorage.setItem('interview_ai_token', token);
  localStorage.setItem('interview_ai_user', JSON.stringify(user));

  return { token, user };
};

export const registerUser = async ({ fullName, email, password }) => {
  try {
    const response = await api.post('/auth/register', { fullName, email, password });
    if (response.data && response.data.token) {
      localStorage.setItem('interview_ai_token', response.data.token);
      localStorage.setItem('interview_ai_user', JSON.stringify(response.data.user));
      return response.data;
    }
  } catch (err) {
    console.warn('Backend API unavailable. Falling back to Demo Mode Registration.', err);
  }

  await new Promise((res) => setTimeout(res, 600));
  const user = {
    ...DEMO_USER,
    name: fullName || 'New Engineer',
    email: email || 'user@example.com'
  };
  const token = 'demo_jwt_token_register_123';

  localStorage.setItem('interview_ai_token', token);
  localStorage.setItem('interview_ai_user', JSON.stringify(user));

  return { token, user };
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('interview_ai_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return DEMO_USER;
};

export const updateProfile = async (updatedData) => {
  try {
    const response = await api.put('/user/profile', updatedData);
    if (response.data) {
      localStorage.setItem('interview_ai_user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    console.warn('Backend API unavailable. Updating local user state in Demo Mode.', err);
  }

  await new Promise((res) => setTimeout(res, 400));
  const currentUser = getCurrentUser() || DEMO_USER;
  const newUser = { ...currentUser, ...updatedData };
  localStorage.setItem('interview_ai_user', JSON.stringify(newUser));
  return newUser;
};

export const logoutUser = () => {
  localStorage.removeItem('interview_ai_token');
  localStorage.removeItem('interview_ai_user');
};
