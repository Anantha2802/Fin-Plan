
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Fetch the CSV file
      const response = await fetch('/users.csv');
      const csvText = await response.text();
      
      // Parse CSV
      const lines = csvText.split('\n').slice(1); // Skip header
      
      // Check if credentials match
      for (const line of lines) {
        if (!line.trim()) continue;
        
        const [csvEmail, csvPassword, csvName] = line.split(',');
        
        if (csvEmail === email && csvPassword === password) {
          const loggedInUser = { email, name: csvName };
          localStorage.setItem('user', JSON.stringify(loggedInUser));
          setUser(loggedInUser);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Update the signup function to use localStorage as our database
  // since we cannot directly modify the server CSV file from the browser
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists in localStorage
      const existingUsers = localStorage.getItem('users') ? 
        JSON.parse(localStorage.getItem('users') || '[]') : [];
      
      const userExists = existingUsers.some((u: any) => u.email === email);
      if (userExists) {
        return false;
      }
      
      // Add user to our "database"
      const newUser = { email, password, name };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Log the user in
      const loggedInUser = { email, name };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('onboardingComplete');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
