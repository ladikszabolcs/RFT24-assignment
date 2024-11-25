import React, { useState } from 'react';
import { X, Clock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lecture } from '../../types';

interface LectureFormModalProps {
    lecture: Lecture | null;
    teacher: string;
    onClose: () => void;
    onSubmit: (data: Omit<Lecture, 'id' | 'enrolledStudents'>) => void;
    isSubmitting?: boolean;
}

export const LectureFormModal: React.FC<LectureFormModalProps> = ({
                                                                      lecture,
                                                                      teacher,
                                                                      onClose,
                                                                      onSubmit,
                                                                      isSubmitting = false,
                                                                  }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title: lecture?.title || '',
        description: lecture?.description || '',
        startTime: lecture?.startTime || '09:00',
        endTime: lecture?.endTime || '10:30',
        dayOfWeek: lecture?.dayOfWeek || 1,
        maxStudents: lecture?.maxStudents || 30,
        teacher,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {lecture ? t('lectures.editLecture') : t('lectures.createLecture')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        disabled={isSubmitting}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t('lectures.lectureTitle')}
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="input-primary w-full"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t('lectures.description')}
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="input-primary w-full h-24 resize-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('lectures.startTime')}
                            </label>
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
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('lectures.endTime')}
                            </label>
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
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('lectures.dayOfWeek')}
                            </label>
                            <select
                                value={formData.dayOfWeek}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        dayOfWeek: parseInt(e.target.value),
                                    })
                                }
                                className="input-primary w-full"
                                disabled={isSubmitting}
                            >
                                <option value={1}>{t('lectures.days.monday')}</option>
                                <option value={2}>{t('lectures.days.tuesday')}</option>
                                <option value={3}>{t('lectures.days.wednesday')}</option>
                                <option value={4}>{t('lectures.days.thursday')}</option>
                                <option value={5}>{t('lectures.days.friday')}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t('lectures.maxStudents')}
                            </label>
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
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary"
                            disabled={isSubmitting}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? t('common.loading')
                                : lecture
                                    ? t('common.update')
                                    : t('common.create')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};