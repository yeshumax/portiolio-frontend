import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'user';
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  role, 
  activeTab, 
  setActiveTab 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionTitles: Record<string, string> = {
    dashboard: 'Overview',
    profile: 'Profile',
    settings: 'Settings',
    history: 'My Complaints',
    submit: 'Submit Feedback',
    'browse-projects': 'Browse Projects',
    messages: 'User Complaints',
    projects: 'Manage Projects',
    skills: 'Manage Skills',
    users: 'User Management',
  };

  const pageTitle = sectionTitles[activeTab] || 'Overview';
  const pageSubtitle = role === 'admin' ? 'Manage portfolio content, users, and feedback.' : undefined;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f1a] text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
      </div>
      
      <div className="flex-1 flex pt-20 overflow-hidden relative">
        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#1a1a1a] z-[70] lg:hidden shadow-2xl flex flex-col pt-20"
              >
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  <Sidebar role={role} activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar (Fixed) */}
        <aside className="hidden lg:flex fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] z-40 flex-col">
          <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-6">
            <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-[#0d1428] custom-scrollbar lg:ml-72">
          <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto min-h-full">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] min-h-[calc(100vh-160px)] border border-gray-200 dark:border-gray-700 shadow-xl p-5 sm:p-6 md:p-8 transition-all duration-300">
              <div className="space-y-6">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
