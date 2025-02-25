import mongoose from 'mongoose';

export interface IProject {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    technologies: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema); 