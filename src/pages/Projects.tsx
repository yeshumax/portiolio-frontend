import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
  type?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        // Sort by date descending if possible, but for now just take the most recent
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Project+Image';
    if (imagePath.startsWith('http')) return imagePath;
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:5000${normalizedPath}`;
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Featured Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating full-stack capabilities, performance optimization, and responsive design.
          </p>
          {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.length === 0 && !error ? (
             <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-500 dark:text-gray-400">No projects found. Admin has not added any projects yet.</p>
             </div>
          ) : (
            projects.slice(0, 6).map((project, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project._id} 
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 p-4 z-20">
                    <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-lg">
                      {project.type || 'Project'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition duration-300 z-10"></div>
                  <img 
                    src={getImageUrl(project.image)} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/600x400/1e40af/ffffff?text=Image+Not+Found';
                    }}
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 text-sm">
                    {project.techStack?.map((tech, idx) => (
                      <span key={idx} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium px-3 py-1 rounded-full">{tech}</span>
                    ))}
                  </div>

                  <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-700 pt-6 mt-auto">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition shadow hover:shadow-lg">
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 text-center border-2 border-gray-200 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 px-4 rounded-xl transition">
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {projects.length > 6 && (
          <div className="mt-16 text-center">
            <Link to="/browse-projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all text-lg"
              >
                Browse All Projects
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
