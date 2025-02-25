"use client";

import { useState, FormEvent } from 'react';

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

export default function ProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
    technologies: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const dataToSend = {
        ...formData,
        liveUrl: formData.liveUrl || undefined,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      setSuccess('Project created successfully!');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        githubUrl: '',
        liveUrl: '',
        technologies: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechChange = (e: FormEvent<HTMLInputElement>) => {
    const techs = e.currentTarget.value.split(',').map(tech => tech.trim());
    setFormData(prev => ({ ...prev, technologies: techs }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors min-h-[100px]"
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={formData.imageUrl}
          onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
          GitHub URL
        </label>
        <input
          type="url"
          id="githubUrl"
          value={formData.githubUrl}
          onChange={e => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300 mb-2">
          Live URL (optional)
        </label>
        <input
          type="url"
          id="liveUrl"
          value={formData.liveUrl}
          onChange={e => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-300 mb-2">
          Technologies (comma-separated)
        </label>
        <input
          type="text"
          id="technologies"
          value={formData.technologies.join(', ')}
          onChange={handleTechChange}
          className="w-full bg-dark-bg border border-neon-purple/30 rounded-lg p-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-colors"
          placeholder="React, TypeScript, Node.js"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
} 