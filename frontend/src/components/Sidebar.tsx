import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CodeBracketIcon,
  ClockIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Code Reviewer', icon: CodeBracketIcon, path: '/reviewer' },
    { name: 'History', icon: ClockIcon, path: '/history' },
    { name: 'Profile', icon: UserIcon, path: '/profile' },
  ];

  return (
    <div className="w-64 bg-dark-surface border-r border-dark-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-2xl font-bold text-white mb-2">AI Code Reviewer</h1>
        <p className="text-dark-textSecondary text-sm">Intelligent code analysis</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-dark-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-dark-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-dark-text truncate">
              {user?.name || user?.username}
            </p>
            <p className="text-xs text-dark-textSecondary truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
