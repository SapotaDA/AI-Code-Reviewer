import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { codeReviewAPI } from '../services/api';
import {
  CodeBracketIcon,
  ClockIcon,
  SparklesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await codeReviewAPI.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Reviews',
      value: stats?.analytics?.totalReviews || 0,
      icon: CodeBracketIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'AI Usage',
      value: stats?.analytics?.aiUsageCount || 0,
      icon: SparklesIcon,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Favorite Language',
      value: stats?.analytics?.favoriteLanguage || 'N/A',
      icon: ChartBarIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Last Active',
      value: stats?.analytics?.lastActive
        ? new Date(stats.analytics.lastActive).toLocaleDateString()
        : 'Never',
      icon: ClockIcon,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-dark-textSecondary">
            Welcome back! Here's your coding activity overview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-morphism p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-dark-textSecondary text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-morphism p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {stats?.recentReviews?.length > 0 ? (
                stats.recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-center justify-between p-3 bg-dark-surface rounded-lg"
                  >
                    <div>
                      <p className="text-dark-text font-medium">
                        {review.reviewType.charAt(0).toUpperCase() +
                          review.reviewType.slice(1)}
                      </p>
                      <p className="text-dark-textSecondary text-sm">
                        {review.language}
                      </p>
                    </div>
                    <span className="text-dark-textSecondary text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-dark-textSecondary text-center py-8">
                  No recent activity
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-morphism p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Language Statistics
            </h2>
            <div className="space-y-3">
              {stats?.languageStats?.length > 0 ? (
                stats.languageStats.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-center justify-between p-3 bg-dark-surface rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span className="text-dark-text font-medium">
                        {lang.language}
                      </span>
                    </div>
                    <span className="text-dark-textSecondary font-medium">
                      {lang._count.language} reviews
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-dark-textSecondary text-center py-8">
                  No language data available
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
