import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export const SkillSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
  >
    <div className="flex justify-between mb-2">
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="20%" height={20} />
    </div>
    <Skeleton variant="rectangular" width="100%" height={8} />
  </motion.div>
);

export const ProjectSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
  >
    <Skeleton variant="rectangular" width="100%" height={256} />
    <div className="p-8">
      <Skeleton variant="text" width="30%" height={12} className="mb-2" />
      <Skeleton variant="text" width="80%" height={24} className="mb-4" />
      <Skeleton variant="text" width="100%" height={16} className="mb-2" />
      <Skeleton variant="text" width="90%" height={16} />
    </div>
  </motion.div>
);

export const MessageSkeleton: React.FC = () => (
  <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5 bg-white dark:bg-[#1a1a1a]">
    <div className="flex justify-between items-start mb-3">
      <div>
        <Skeleton variant="text" width="120px" height={16} className="mb-1" />
        <Skeleton variant="text" width="80px" height={12} />
      </div>
      <Skeleton variant="rectangular" width="60px" height={20} />
    </div>
    <Skeleton variant="rectangular" width="100%" height={60} className="mb-4" />
    <div className="flex justify-end gap-3">
      <Skeleton variant="rectangular" width="80px" height={32} />
    </div>
  </div>
);

export default Skeleton;