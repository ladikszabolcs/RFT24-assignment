import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addWeeks, subWeeks } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CalendarHeader } from '../components/Calendar/CalendarHeader';
import { WeekView } from '../components/Calendar/WeekView';
import { LectureModal } from '../components/Lectures/LectureModal';
import { lecturesApi } from '../api/lectures';
import { useAuthStore } from '../store/authStore';
import type { Lecture } from '../types';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: lectures, isLoading } = useQuery({
    queryKey: ['lectures'],
    queryFn: lecturesApi.getAll,
  });

  const enrollMutation = useMutation({
    mutationFn: lecturesApi.enroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
    },
  });

  const unenrollMutation = useMutation({
    mutationFn: lecturesApi.unenroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
    },
  });

  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const handleEnroll = async () => {
    if (selectedLecture) {
      await enrollMutation.mutateAsync(selectedLecture.id);
      setSelectedLecture(null);
    }
  };

  const handleUnenroll = async () => {
    if (selectedLecture) {
      await unenrollMutation.mutateAsync(selectedLecture.id);
      setSelectedLecture(null);
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
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <CalendarHeader
            currentDate={currentDate}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
        />

        <WeekView
            currentDate={currentDate}
            lectures={lectures || []}
            onSelectLecture={setSelectedLecture}
        />

        {selectedLecture && (
            <LectureModal
                lecture={selectedLecture}
                onClose={() => setSelectedLecture(null)}
                onEnroll={handleEnroll}
                onUnenroll={handleUnenroll}
                isStudent={user?.role === 'student'}
                isEnrolled={selectedLecture.enrolledStudents.includes(user?.id || '')}
                isLoading={enrollMutation.isPending || unenrollMutation.isPending}
            />
        )}
      </div>
  );
};