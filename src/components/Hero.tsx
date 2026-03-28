import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../assets/Image.png';
const Hero: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50 dark:from-blue-900/20 to-transparent dark:to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl -z-10 transform translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-100 dark:border-blue-800/50 shadow-sm"
            >
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for new projects
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">YESHWOND</span>
              <br />
              <span className="block mt-2">Full-Stack Developer</span>
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              I architect, design, and build extremely functional and breathtaking web applications from the ground up using the MERN stack.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-lg font-semibold transition-all"
                >
                  View My Work
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm text-lg font-semibold transition-all"
                >
                  Contact Me
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-[3rem] transform rotate-3 scale-105 transition-transform hover:rotate-6 duration-700 z-0"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10 flex items-center justify-center">
                <img src={Image} alt="YESHWOND" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;