"use client";

import { useState } from 'react';
import ProjectForm from '@/components/ProjectForm';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-card-bg rounded-lg p-8 border border-neon-purple/30 shadow-2xl">
            <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
              Admin Access
            </h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
            Project Management
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-card-bg rounded-lg p-6 border border-neon-purple/30">
          <ProjectForm />
        </div>
      </div>
    </main>
  );
} 