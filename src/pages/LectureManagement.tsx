import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lecture } from '../types';
import { useAuthStore } from '../store/authStore';
import { lecturesApi } from '../api/lectures';
import { LectureFormModal } from '../components/Lectures/LectureFormModal';
import { Toast } from '../components/Toast';

export const LectureManagement: React.FC = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: lectures, isLoading } = useQuery({
    queryKey: ['lectures'],
    queryFn: lecturesApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: lecturesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      setShowModal(false);
      setMessage({ text: t('lectures.createSuccess'), type: 'success' });
    },
    onError: (error: any) => {
      setMessage({
        text: error.response?.data?.error || t('lectures.createError'),
        type: 'error'
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lecture> }) =>
        lecturesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      setShowModal(false);
      setMessage({ text: t('lectures.updateSuccess'), type: 'success' });
    },
    onError: (error: any) => {
      setMessage({
        text: error.response?.data?.error || t('lectures.updateError'),
        type: 'error'
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: lecturesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      setMessage({ text: t('lectures.deleteSuccess'), type: 'success' });
    },
    onError: (error: any) => {
      setMessage({
        text: error.response?.data?.error || t('lectures.deleteError'),
        type: 'error'
      });
    },
  });

  const handleCreateLecture = () => {
    setEditingLecture(null);
    setShowModal(true);
  };

  const handleSubmit = async (data: Omit<Lecture, 'id' | 'students'>) => {
    if (editingLecture) {
      await updateMutation.mutateAsync({
        id: editingLecture.id,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">{t('common.loading')}</div>
        </div>
    );
  }

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lectures?.map((lecture) => (
              <div
                  key={lecture.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{lecture.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {lecture.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>
                {t(`lectures.days.${lecture.dayOfWeek}`)} {lecture.startTime}-
                {lecture.endTime}
              </span>
                  <span>
                {lecture.students.length}/{lecture.maxStudents}
              </span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                      onClick={() => {
                        setEditingLecture(lecture);
                        setShowModal(true);
                      }}
                      className="btn-secondary"
                  >
                    {t('common.edit')}
                  </button>
                  <button
                      onClick={() => deleteMutation.mutate(lecture.id)}
                      className="btn-secondary text-red-600 hover:text-red-700"
                      disabled={deleteMutation.isPending}
                  >
                    {t('common.delete')}
                  </button>
                </div>
              </div>
          ))}
        </div>

        {showModal && (
            <LectureFormModal
                lecture={editingLecture}
                teacher={user?.id || ''}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
        )}

        {message && (
            <Toast
                message={message.text}
                type={message.type}
                onClose={() => setMessage(null)}
            />
        )}
      </div>
  );
};