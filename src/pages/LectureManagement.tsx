import React, { useState } from 'react';
import { Plus, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lecture } from '../types';
import { useAuthStore } from '../store/authStore';

export const LectureManagement: React.FC = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  const user = useAuthStore((state) => state.user);

  const handleCreateLecture = () => {
    setEditingLecture(null);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('lectures.title')}</h1>
        <button
          onClick={handleCreateLecture}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t('lectures.createLecture')}</span>
        </button>
      </div>

      {showModal && (
        <LectureFormModal
          lecture={editingLecture}
          teacherId={user?.id || ''}
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

interface LectureFormModalProps {
  lecture: Lecture | null;
  teacherId: string;
  onClose: () => void;
  onSubmit: (data: Omit<Lecture, 'id' | 'enrolledStudents'>) => void;
}

const LectureFormModal: React.FC<LectureFormModalProps> = ({
  lecture,
  teacherId,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: lecture?.title || '',
    description: lecture?.description || '',
    startTime: lecture?.startTime || '09:00',
    endTime: lecture?.endTime || '10:30',
    dayOfWeek: lecture?.dayOfWeek || 1,
    maxStudents: lecture?.maxStudents || 30,
    teacherId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">
          {lecture ? t('lectures.editLecture') : t('lectures.createLecture')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('lectures.lectureTitle')}</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('lectures.description')}</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-primary w-full h-24 resize-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('lectures.startTime')}</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="input-primary w-full pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('lectures.endTime')}</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="input-primary w-full pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('lectures.dayOfWeek')}</label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dayOfWeek: parseInt(e.target.value),
                  })
                }
                className="input-primary w-full"
              >
                <option value={1}>{t('lectures.days.monday')}</option>
                <option value={2}>{t('lectures.days.tuesday')}</option>
                <option value={3}>{t('lectures.days.wednesday')}</option>
                <option value={4}>{t('lectures.days.thursday')}</option>
                <option value={5}>{t('lectures.days.friday')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('lectures.maxStudents')}</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxStudents}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxStudents: parseInt(e.target.value),
                    })
                  }
                  className="input-primary w-full pl-10"
                  required
                />
              </div>
            </div>
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
              {lecture ? t('common.update') : t('common.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};