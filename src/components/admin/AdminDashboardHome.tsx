import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

export interface DashboardStat {
  label: string;
  value: number;
  icon: string;
  color: string;
  bg: string;
  tab: string;
}

interface AdminDashboardHomeProps {
  stats: DashboardStat[];
  user?: { name: string };
  onCardClick: (tab: string) => void;
  loading: boolean;
}

const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({ stats, user, onCardClick, loading }) => {
  if (loading) return <LoadingSpinner message="Loading dashboard..." className="py-12" />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <button
            key={i}
            onClick={() => onCardClick(stat.tab)}
            title={`Go to ${stat.label}`}
            className={`${stat.bg} p-6 rounded-3xl border border-white/20 dark:border-white/5 shadow-sm group hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-95`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            </div>
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center justify-between">
              {stat.label}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-blue-500">View ➔</span>
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
