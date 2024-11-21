import React, { useState } from 'react';
import { addWeeks, subWeeks } from 'date-fns';
import { CalendarHeader } from '../components/Calendar/CalendarHeader';
import { WeekView } from '../components/Calendar/WeekView';
import { LectureModal } from '../components/Lectures/LectureModal';
import type { Lecture } from '../types';

// Mock data - replace with API calls later
const mockLectures: Lecture[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React and its core concepts.',
    teacherId: '2',
    startTime: '09:00',
    endTime: '10:30',
    dayOfWeek: 1,
    maxStudents: 30,
    enrolledStudents: [],
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript advanced topics.',
    teacherId: '2',
    startTime: '14:00',
    endTime: '15:30',
    dayOfWeek: 3,
    maxStudents: 25,
    enrolledStudents: [],
  },
];

export const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const handleEnroll = async () => {
    // TODO: Implement enrollment API call
    console.log('Enrolling in lecture:', selectedLecture?.id);
  };

  const handleUnenroll = async () => {
    // TODO: Implement unenrollment API call
    console.log('Unenrolling from lecture:', selectedLecture?.id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      
      <WeekView
        currentDate={currentDate}
        lectures={mockLectures}
        onSelectLecture={setSelectedLecture}
      />

      {selectedLecture && (
        <LectureModal
          lecture={selectedLecture}
          onClose={() => setSelectedLecture(null)}
          onEnroll={handleEnroll}
          onUnenroll={handleUnenroll}
        />
      )}
    </div>
  );
};