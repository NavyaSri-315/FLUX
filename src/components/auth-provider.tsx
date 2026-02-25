"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type User, type TeamMember } from '@/lib/types';
import { mockClientUser, mockTeamUser } from '@/lib/data';

type AuthContextType = {
  user: User | TeamMember | null;
  userType: 'client' | 'team' | null;
  login: (userType: 'client' | 'team', from: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | TeamMember | null>(null);
  const [userType, setUserType] = useState<'client' | 'team' | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUserType = localStorage.getItem('userType');
      if (storedUserType === 'client') {
        setUser(mockClientUser);
        setUserType('client');
      } else if (storedUserType === 'team') {
        setUser(mockTeamUser);
        setUserType('team');
      }
    } catch (error) {
        console.error("Could not access local storage", error)
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (type: 'client' | 'team', from: string) => {
    setLoading(true);
    const destination = type === 'client' ? '/client/dashboard' : '/team/dashboard';
    localStorage.setItem('userType', type);
    setUser(type === 'client' ? mockClientUser : mockTeamUser);
    setUserType(type);
    router.push(from || destination);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
