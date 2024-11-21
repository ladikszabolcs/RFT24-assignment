import React, { useState } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { User, Role } from '../types';

const mockUsers: User[] = [
  { id: '1', email: 'admin@edu.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'teacher@edu.com', name: 'John Teacher', role: 'teacher' },
  { id: '3', email: 'student@edu.com', name: 'Jane Student', role: 'student' },
];

export const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [users] = useState<User[]>(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('users.title')}</h1>
        <button
          onClick={handleCreateUser}
          className="btn-primary flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>{t('users.createUser')}</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('users.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('users.email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('users.role')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('users.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {t(`users.roles.${user.role}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                    aria-label={t('common.edit')}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    aria-label={t('common.delete')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserFormModal
          user={editingUser}
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

interface UserFormModalProps {
  user: User | null;
  onClose: () => void;
  onSubmit: (data: Omit<User, 'id'>) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  user,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">
          {user ? t('common.edit') : t('users.createUser')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('users.name')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('users.email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('users.role')}</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as Role,
                })
              }
              className="input-primary w-full"
            >
              <option value="student">{t('users.roles.student')}</option>
              <option value="teacher">{t('users.roles.teacher')}</option>
              <option value="admin">{t('users.roles.admin')}</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {user ? t('common.update') : t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};