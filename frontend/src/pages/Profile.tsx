import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.updateProfile({
        name: formData.name,
      });
      
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-dark-textSecondary">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-morphism p-6 text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {user?.name || user?.username}
              </h2>
              <p className="text-dark-textSecondary mb-4">{user?.email}</p>
              <div className="flex justify-center space-x-4 text-sm text-dark-textSecondary">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Joined {formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-morphism p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-dark-text mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      disabled
                      className="input-field w-full opacity-50 cursor-not-allowed"
                      placeholder="Username cannot be changed"
                    />
                    <p className="text-xs text-dark-textSecondary mt-1">
                      Username cannot be changed after registration
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="input-field w-full opacity-50 cursor-not-allowed"
                      placeholder="Email cannot be changed"
                    />
                    <p className="text-xs text-dark-textSecondary mt-1">
                      Email cannot be changed. Contact support if you need to update it.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center space-x-3">
                        <UserIcon className="w-5 h-5 text-dark-textSecondary" />
                        <span className="text-dark-text">
                          {user?.name || 'Not set'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Username
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className="text-dark-text">@{user?.username}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-dark-textSecondary" />
                        <span className="text-dark-text">{user?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-text mb-2">
                        Member Since
                      </label>
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="w-5 h-5 text-dark-textSecondary" />
                        <span className="text-dark-text">
                          {formatDate(user?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="glass-morphism p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
                  <div>
                    <h4 className="text-dark-text font-medium">Email Notifications</h4>
                    <p className="text-dark-textSecondary text-sm">
                      Receive email updates about your code reviews
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
                  <div>
                    <h4 className="text-dark-text font-medium">Dark Mode</h4>
                    <p className="text-dark-textSecondary text-sm">
                      Use dark theme across the application
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
