import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

interface ContactFormProps {
  embedded?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ embedded = false }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [type, setType] = useState('feedback');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'submitting' | 'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const messageTypes = [
    { value: 'feedback', label: 'Feedback', icon: '💬', gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600' },
    { value: 'request', label: 'Request', icon: '📝', gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50 dark:bg-green-500/10', text: 'text-green-600' },
    { value: 'complaint', label: 'Complaint', icon: '⚠️', gradient: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-500/10', text: 'text-orange-600' },
    { value: 'collaboration', label: 'Collaborate', icon: '🤝', gradient: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-600' },
    { value: 'question', label: 'Question', icon: '❓', gradient: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!user && (!name.trim() || !email.trim())) {
      setErrorMessage('Please provide your name and email address');
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
      return;
    }
    
    if (!message.trim()) {
      setErrorMessage('Please enter your message');
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!user && !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const payload = user 
        ? { message, type }
        : { message, type, name, email };
      
      console.log('Sending payload:', payload); // Debug log
      
      const response = await api.post('/messages', payload);
      console.log('Response:', response.data); // Debug log
      
      setStatus('success');
      setMessage('');
      setName('');
      setEmail('');
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      console.error('Failed to send message:', err);
      
      // Handle different error scenarios
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);
        
        if (err.response.status === 401) {
          setErrorMessage('Please login to send messages');
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response.status === 400) {
          setErrorMessage(err.response.data.message || 'Invalid form data. Please check your inputs.');
        } else if (err.response.status === 500) {
          setErrorMessage('Server error. Please try again later.');
        } else {
          setErrorMessage(err.response.data?.message || 'Failed to send message. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        setErrorMessage('Network error. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const currentType = messageTypes.find(t => t.value === type) || messageTypes[0];

  const formContent = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${embedded ? '' : 'bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700'} relative overflow-hidden`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </motion.div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Get in Touch
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            I'd love to hear from you! Send me a message and I'll respond within 24 hours.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 rounded-2xl flex items-center shadow-lg"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Message Sent Successfully!</p>
                  <p className="text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 rounded-2xl flex items-start shadow-lg"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Failed to Send</p>
                  <p className="text-sm">{errorMessage || 'Please try again or contact me directly at support@example.com'}</p>
                  {errorMessage && (
                    <button
                      onClick={() => {
                        setStatus(null);
                        setErrorMessage('');
                      }}
                      className="text-xs font-semibold underline mt-2 hover:text-red-800 dark:hover:text-red-300"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 group-hover:border-gray-300 dark:group-hover:border-gray-500"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 group-hover:border-gray-300 dark:group-hover:border-gray-500"
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Message Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {messageTypes.map((t) => (
                <motion.button
                  key={t.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setType(t.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                    type === t.value 
                      ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg` 
                      : `${t.bg} ${t.text} border border-gray-200 dark:border-gray-600 hover:shadow-md`
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span>{t.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Your Message *
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={embedded ? 4 : 6}
              placeholder={`Write your ${currentType.label.toLowerCase()} here... I value your input and will respond promptly.`}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            ></textarea>
          </div>

          {user && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Sending as: <span className="font-semibold text-blue-600 dark:text-blue-400">{user.name}</span> ({user.email})
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-xl transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group ${
              status === 'submitting' 
                ? 'bg-gradient-to-r from-blue-400 to-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl'
            }`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Send Message
              </>
            )}
          </motion.button>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Prefer email? 
              <a href="mailto:contact@example.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                contact@example.com
              </a>
              <span>•</span>
              <span>Response within 24h</span>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );

  return embedded ? formContent : (
    <div className="max-w-4xl mx-auto px-4">
      {formContent}
    </div>
  );
};

export default ContactForm;