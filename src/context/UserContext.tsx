import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { getUserProfile, saveUserProfile, updatePracticeStreak } from '../services/progressService';

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  refreshStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(getUserProfile);

  useEffect(() => {
    // Automatically update streak on daily visit
    const updated = updatePracticeStreak();
    setProfile(updated);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const merged = { ...profile, ...updates };
    setProfile(merged);
    saveUserProfile(merged);
  };

  const refreshStreak = () => {
    const updated = updatePracticeStreak();
    setProfile(updated);
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, refreshStreak }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
