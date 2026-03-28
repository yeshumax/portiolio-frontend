import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import ProjectList from '../components/ProjectList';

const BrowseProjects: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse-projects');

  // If we are in this component, ProtectedRoute in App.tsx ensures user is not null
  const role = user?.role as 'admin' | 'user' || 'user';

  const handleTabChange = (tabId: string) => {
    if (tabId === 'browse-projects') {
      setActiveTab(tabId);
    } else {
      // Navigate to the appropriate dashboard with the selected tab
      navigate(role === 'admin' ? '/admin' : '/dashboard', { state: { activeTab: tabId } });
    }
  };

  return (
    <DashboardLayout role={role} activeTab={activeTab} setActiveTab={handleTabChange}>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Discover all projects developed by our team and community.</p>
        <ProjectList />
      </div>
    </DashboardLayout>
  );
};

export default BrowseProjects;
