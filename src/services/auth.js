export const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('mnemo_user'));
  if (!user) throw new Error('Not authenticated');
  return user;
};

export const login = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = JSON.parse(localStorage.getItem('mnemo_user'));
  if (!user || user.email !== email) {
    throw new Error('User not found');
  }

  // In a real app, you would verify the password hash
  return user;
};

export const register = async (email, password, name, studyData = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock validation
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  // Check if user already exists
  const existingUser = JSON.parse(localStorage.getItem('mnemo_user'));
  if (existingUser && existingUser.email === email) {
    throw new Error('Email already registered');
  }

  // Create new user
  const user = {
    id: `user-${Date.now()}`,
    email,
    name,
    studyData, // Now properly defined as a parameter
    createdAt: new Date().toISOString()
  };

  // Save to localStorage (simulating database)
  localStorage.setItem('mnemo_user', JSON.stringify(user));
  return user;
};

export const logout = async () => {
  localStorage.removeItem('mnemo_user');
};
