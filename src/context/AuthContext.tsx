// Context pour gérer l'authentification dans toute l'application
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthResponse, ProgressResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, username: string) => Promise<AuthResponse>;
  logout: () => void;
  loadProgress: () => Promise<ProgressResponse | null>;
  saveProgress: (data: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le token et user depuis localStorage au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erreur chargement auth:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        
        console.log('✅ Connexion réussie:', data.user.email);
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur login:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur'
      };
    }
  };

  const register = async (email: string, password: string, username: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username })
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        
        console.log('✅ Inscription réussie:', data.user.email);
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      return {
        success: false,
        message: 'Erreur de connexion au serveur'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    console.log('✅ Déconnexion réussie');
  };

  const loadProgress = async (): Promise<ProgressResponse | null> => {
    if (!token) return null;

    try {
      const response = await fetch('/api/progress/load', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data: ProgressResponse = await response.json();
      
      if (data.success) {
        console.log('✅ Progression chargée');
        return data;
      }

      return null;
    } catch (error) {
      console.error('❌ Erreur chargement progression:', error);
      return null;
    }
  };

  const saveProgress = async (progressData: any): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch('/api/progress/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(progressData)
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Progression sauvegardée');
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Erreur sauvegarde progression:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      loadProgress,
      saveProgress
    }}>
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
