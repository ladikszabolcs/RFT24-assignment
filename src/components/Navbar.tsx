import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Users, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">UniCourse</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {t('nav.dashboard')}
              </Link>
              
              {(user?.role === 'admin' || user?.role === 'teacher') && (
                <Link
                  to="/lectures/manage"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('nav.manageLectures')}</span>
                </Link>
              )}

              {user?.role === 'admin' && (
                <Link
                  to="/users"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <Users className="w-4 h-4" />
                  <span>{t('nav.manageUsers')}</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user?.name} ({t(`users.roles.${user?.role}`)})
            </span>
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};