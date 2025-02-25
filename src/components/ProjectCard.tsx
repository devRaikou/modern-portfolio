"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  githubUrl,
  liveUrl,
  technologies,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl overflow-hidden bg-card-bg border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-400 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-card-bg border border-neon-purple/30 hover:border-neon-purple/60 transition-colors"
          >
            GitHub
          </Link>
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 text-sm text-center rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 transition-opacity"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
} 