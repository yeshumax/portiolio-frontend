import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from './Toast';

interface SidebarProps {
  role: 'admin' | 'user';
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { showToast } = useToast();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    setLogoutLoading(true);
    try {
      await logout();
      showToast('Logged out successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Logout failed', 'error');
    } finally {
      setLogoutLoading(false);
    }
  };

  const settingsTab = { id: 'settings', label: 'Settings', icon: '⚙️' };

  const commonTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'messages', label: 'User Complaints', icon: '💬' },
    { id: 'history', label: 'My Complaints', icon: '🕒' },
    { id: 'skills', label: 'Manage Skills', icon: '⚡' },
    { id: 'projects', label: 'Manage Projects', icon: '📁' },
    { id: 'browse-projects', label: 'Browse Projects', icon: '🚀' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const userTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'submit', label: 'Submit Feedback', icon: '📝' },
    { id: 'history', label: 'My Complaints', icon: '🕒' },
    { id: 'browse-projects', label: 'Browse Projects', icon: '🚀' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const tabs = role === 'admin' ? adminTabs : userTabs;

  const groupTabs = () => [
    { title: 'Main', items: tabs }
  ];

  const groupedTabs = groupTabs();

  return (
    <div className="w-full flex-1 bg-transparent flex flex-col space-y-4 pb-10">
      <h2 className="text-xs font-black text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider px-3">
        {role === 'admin' ? 'Admin Panel' : 'User Panel'}
      </h2>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {groupedTabs.map((group) => (
          <div key={group.title} className="space-y-2">
            <p className="px-4 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold opacity-70">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  className={`group flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 text-left relative overflow-hidden outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-900/70 shadow-lg text-blue-600 dark:text-blue-300 font-bold'
                      : 'text-gray-600 dark:text-gray-300 font-semibold bg-white/20 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 dark:bg-blue-500 rounded-r-full"
                    />
                  )}
                  <span className={`mr-4 text-xl transition-transform duration-300 flex items-center justify-center w-8 h-8 rounded-xl ${activeTab === tab.id ? 'bg-blue-50 dark:bg-blue-900/30 scale-110 transform' : 'bg-gray-50 dark:bg-gray-800 group-hover:scale-110'}`}>
                    {tab.icon}
                  </span>
                  <span className="relative z-10 tracking-tight">{tab.label}</span>
                  <span className="ml-auto px-2 py-0.5 text-[10px] rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Jump
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <button
          onClick={() => setActiveTab(settingsTab.id)}
          className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 text-left ${activeTab === settingsTab.id ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 bg-white/10 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:text-blue-600'} font-semibold`}
        >
          <span className="mr-4 text-xl">{settingsTab.icon}</span>
          <span>{settingsTab.label}</span>
        </button>

        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300 text-left text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 font-medium group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {logoutLoading ? (
            <LoadingSpinner size="sm" className="mr-4" />
          ) : (
            <span className="mr-4 text-xl transition-transform duration-300 group-hover:-translate-x-1">🚪</span>
          )}
          <span>{logoutLoading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
