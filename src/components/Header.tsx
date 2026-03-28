import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { useEffect } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
  pageTitle?: string;
  pageSubtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, pageTitle, pageSubtitle }) => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(user?.profileImage || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { data } = await api.get('/messages/unread');
        setUnreadMessages(data);
      } catch (error) {
        console.error('Failed to fetch unread messages', error);
      }
    };

    if (user) {
      fetchUnread();
      const interval = setInterval(fetchUnread, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.put(`/messages/${id}/mark-as-read`);
      setUnreadMessages(prev => prev.filter(m => m._id !== id));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setIsUpdating(true);
    try {
      await updateProfile({ profileImage: newImageUrl });
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error('Failed to update image', error);
      alert('Failed to update profile image. Check the URL and try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <header className="w-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl shadow-sm transition-colors duration-300 z-20 h-20 flex items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          )}
          <div className="flex flex-col">
            <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 tracking-tight">
              Dashboard
            </h2>
            {pageTitle && (
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {pageTitle}
              </p>
            )}
            {pageSubtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {pageSubtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Dark Mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isNotificationsOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadMessages.length > 0 && (
                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse">
                  {unreadMessages.length > 9 ? '9+' : unreadMessages.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsNotificationsOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-40 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
                      <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">{unreadMessages.length} New</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {unreadMessages.length === 0 ? (
                        <div className="p-10 text-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">All caught up!</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                          {unreadMessages.map((msg) => (
                            <div 
                              key={msg._id} 
                              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group relative"
                              onClick={() => {
                                handleMarkAsRead(msg._id);
                                // Optionally navigate or open message detail
                              }}
                            >
                              <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                  {msg.userId?.profileImage ? (
                                    <img src={msg.userId.profileImage} alt="" className="w-full h-full object-cover rounded-full" />
                                  ) : (
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">{msg.userId?.name?.charAt(0) || 'U'}</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {user?.role === 'admin' ? msg.userId?.name : 'Update from Admin'}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
                                    {msg.message}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">
                                    {msg.type} • {new Date(msg.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleMarkAsRead(msg._id); }}
                                className="absolute top-4 right-4 text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Mark as read"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
            </div>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
            >
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase">
                  {user?.name.charAt(0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Profile Image Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Update Profile Image</h3>
            <form onSubmit={handleUpdateImage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={newImageUrl} 
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              {newImageUrl && (
                <div className="flex justify-center my-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                    <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; }} />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Header;
