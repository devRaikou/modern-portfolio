"use client";

import { useEffect, useState } from 'react';
import DiscordCard from '@/components/DiscordCard';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

const languages = [
  { 
    name: 'JavaScript', 
    color: '#F7DF1E', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description: 'Dynamic web development' 
  },
  { 
    name: 'TypeScript', 
    color: '#3178C6', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    description: 'Static typing for JavaScript' 
  },
  { 
    name: 'React', 
    color: '#61DAFB', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: 'UI components & state' 
  },
  { 
    name: 'Next.js', 
    color: '#000000', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
    description: 'React framework for production' 
  },
  { 
    name: 'TailwindCSS', 
    color: '#38B2AC', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg',
    description: 'Utility-first CSS framework' 
  },
  { 
    name: 'Python', 
    color: '#3776AB', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description: 'Backend & automation' 
  },
  { 
    name: 'Flask', 
    color: '#000000', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    description: 'Python web framework' 
  },
  { 
    name: 'MongoDB', 
    color: '#47A248', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    description: 'NoSQL database' 
  },
  { 
    name: 'SQL', 
    color: '#4479A1', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    description: 'Relational database' 
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', {
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#030304] overflow-hidden">
      {/* Hero Section with Enhanced Background */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/30 to-dark-bg/80"></div>
          
          {/* Enhanced Animated Grid */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] animate-pulse-slow"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] rotate-45 scale-150 animate-pulse-slower"></div>
          </div>
          
          {/* Enhanced Floating Orbs */}
          <div className="absolute top-20 left-[10%] w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-[15%] w-40 h-40 bg-neon-pink/5 rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-[20%] w-36 h-36 bg-neon-blue/5 rounded-full blur-3xl animate-float-reverse" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional Floating Elements */}
          <div className="absolute top-1/3 right-[30%] w-24 h-24 bg-neon-purple/3 rounded-full blur-2xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/3 left-[35%] w-28 h-28 bg-neon-pink/3 rounded-full blur-2xl animate-pulse-glow-delayed"></div>
          
          {/* Enhanced Radial Gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-neon-purple/5 via-transparent to-transparent animate-pulse-slow"></div>
          
          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-[120%] w-px left-1/4 bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent animate-scan-vertical"></div>
            <div className="absolute h-[120%] w-px right-1/4 bg-gradient-to-b from-transparent via-neon-pink/10 to-transparent animate-scan-vertical" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center space-y-16"
          >
            <div className="space-y-8 text-center max-w-4xl mx-auto">
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient">
                  Hi, I'm Arda
                </span>
              </motion.h1>
              <motion.p
                className="text-2xl sm:text-3xl text-neon-purple mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
              </motion.p>
              <motion.p 
                className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                A passionate full-stack developer crafting innovative web experiences with modern technologies
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-lg mx-auto relative group"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:animate-gradient-flow"></div>
              <DiscordCard />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030304] via-[#030304]/60 to-transparent"></div>
      </div>

      {/* Technologies Section with Enhanced Background */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-neon-purple/3 to-dark-bg/80"></div>
          
          {/* Enhanced Animated Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-pulse-glow opacity-40"></div>
            <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-neon-pink rounded-full animate-pulse-glow opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-neon-blue rounded-full animate-pulse-glow opacity-40" style={{ animationDelay: '2s' }}></div>
            
            {/* Additional Particles */}
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-ping opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-neon-pink rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-neon-blue rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Animated Background Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-px top-1/4 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent animate-scan-horizontal"></div>
            <div className="absolute w-full h-px bottom-1/4 bg-gradient-to-r from-transparent via-neon-pink/10 to-transparent animate-scan-horizontal" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Glowing Corner Effects */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-purple/10 to-transparent rotate-45"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-neon-pink/10 to-transparent rotate-45"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-20"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-center"
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Technologies I Work With
              </span>
            </motion.h2>
            
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl mx-auto"
            >
              {languages.map((lang) => (
                <motion.div
                  key={lang.name}
                  variants={item}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-6 rounded-2xl bg-[#0a0b0e]/80 border border-neon-purple/10 hover:border-neon-purple/40 backdrop-blur-sm transition-all duration-300 card-glow"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex flex-col items-center text-center space-y-4">
                    <div className="relative w-16 h-16 mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={lang.icon}
                        alt={lang.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
                        {lang.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {lang.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section with Enhanced Background */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/5 to-transparent"></div>
          
          {/* Enhanced Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent animate-pulse-glow"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-neon-pink/20 to-transparent animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            
            {/* Diagonal Lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-1/3 w-px h-[150%] bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent rotate-45 transform origin-top"></div>
              <div className="absolute top-0 right-1/3 w-px h-[150%] bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent -rotate-45 transform origin-top"></div>
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-neon-pink rounded-full animate-float-slow opacity-30"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-neon-purple rounded-full animate-float-slow opacity-30" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-2/3 right-1/2 w-2 h-2 bg-neon-blue rounded-full animate-float-slow opacity-30" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-20"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-center"
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
              {loading ? (
                // Loading skeleton
                [...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="rounded-xl overflow-hidden bg-card-bg/50">
                      <div className="aspect-video bg-gray-700/20" />
                      <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-700/20 rounded w-3/4" />
                        <div className="h-4 bg-gray-700/20 rounded w-full" />
                        <div className="h-4 bg-gray-700/20 rounded w-2/3" />
                        <div className="flex gap-2">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-6 bg-gray-700/20 rounded w-16" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    {...project}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                      No Projects Yet
                    </h3>
                    <p className="text-gray-400">
                      Projects will be added soon. Stay tuned!
                    </p>
                    <div className="w-16 h-16 mx-auto opacity-50">
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-2h2V7h-2z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 