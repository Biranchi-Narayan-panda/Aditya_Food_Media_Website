import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  enableDemoAdmin: () => void;
  disableDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('aditya_demo_admin') === 'true';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const adminEmail = 'jayprabhujagannath01@gmail.com';
  const isAdmin = isDemoAdmin || (!!user && user.email === adminEmail);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign In error:', error);
      throw error;
    }
  };

  const logout = async () => {
    setIsDemoAdmin(false);
    localStorage.removeItem('aditya_demo_admin');
    await signOut(auth);
  };

  const enableDemoAdmin = () => {
    setIsDemoAdmin(true);
    localStorage.setItem('aditya_demo_admin', 'true');
  };

  const disableDemoAdmin = () => {
    setIsDemoAdmin(false);
    localStorage.removeItem('aditya_demo_admin');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInWithGoogle,
        logout,
        enableDemoAdmin,
        disableDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
