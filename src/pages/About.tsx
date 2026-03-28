import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/yeshumax.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-3xl transform rotate-3 scale-105 z-0 transition-colors duration-300"></div>
              <img
                src={aboutImage}
                alt="Work Place"
                className="relative z-10 rounded-3xl shadow-xl w-full h-[500px] object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-6"

          >
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm block">
              Discover
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">About Me</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a dedicated Full-Stack Developer with a passion for building exceptional digital experiences. What started as a curiosity for how websites work has evolved into a full-fledged career delivering robust, highly scalable web applications.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My journey involves continuous learning, moving from simple frontend layouts to complex backend architectures. I specialize in the MERN stack—MongoDB, Express, React (with TypeScript), and Node.js.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
              <div>
                <h4 className="font-bold text-3xl text-gray-900 dark:text-white mb-1">5+</h4>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Years Experience</p>
              </div>
              <div>
                <h4 className="font-bold text-3xl text-gray-900 dark:text-white mb-1">50+</h4>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;
