import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import type { Lecture } from '../../types';

interface WeekViewProps {
  currentDate: Date;
  lectures: Lecture[];
  onSelectLecture: (lecture: Lecture) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
                                                    currentDate,
                                                    lectures,
                                                    onSelectLecture,
                                                  }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getTimeInMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateLectureStyle = (lecture: Lecture, dayLectures: Lecture[]) => {
    const startMinutes = getTimeInMinutes(lecture.startTime) - getTimeInMinutes('08:00');
    const endMinutes = getTimeInMinutes(lecture.endTime) - getTimeInMinutes('08:00');
    const duration = endMinutes - startMinutes;

    // Find overlapping lectures
    const overlapping = dayLectures.filter(other => {
      if (other.id === lecture.id) return false;
      const otherStart = getTimeInMinutes(other.startTime);
      const otherEnd = getTimeInMinutes(other.endTime);
      const lectureStart = getTimeInMinutes(lecture.startTime);
      const lectureEnd = getTimeInMinutes(lecture.endTime);
      return (
          (otherStart >= lectureStart && otherStart < lectureEnd) ||
          (otherEnd > lectureStart && otherEnd <= lectureEnd) ||
          (otherStart <= lectureStart && otherEnd >= lectureEnd)
      );
    });

    // Sort overlapping events by start time to ensure consistent ordering
    const sortedOverlapping = [...overlapping, lecture].sort((a, b) => {
      const aStart = getTimeInMinutes(a.startTime);
      const bStart = getTimeInMinutes(b.startTime);
      if (aStart === bStart) {
        return a.id.localeCompare(b.id); // Ensure stable sort
      }
      return aStart - bStart;
    });

    const index = sortedOverlapping.findIndex(l => l.id === lecture.id);
    const totalOverlapping = sortedOverlapping.length;
    const width = 90 / totalOverlapping; // Slightly smaller width to ensure gap between columns
    const left = 5 + (index * width); // Start at 5% and distribute evenly

    return {
      top: `${(startMinutes / 60) * 4}rem`,
      height: `${(duration / 60) * 4}rem`,
      position: 'absolute' as const,
      width: `${width}%`,
      left: `${left}%`,
    };
  };

  return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg">
          {/* Time column */}
          <div className="bg-white dark:bg-gray-800 p-2">
            <div className="h-16"></div>
            {timeSlots.map((hour) => (
                <div key={hour} className="h-16 text-sm text-gray-500">
                  {format(new Date().setHours(hour), 'ha')}
                </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDays.map((day) => {
            const dayLectures = lectures.filter(
                lecture => lecture.dayOfWeek === day.getDay()
            );

            return (
                <div key={day.toString()} className="bg-white dark:bg-gray-800">
                  <div className="h-16 p-2 text-center border-b dark:border-gray-700">
                    <div className="font-medium">{format(day, 'EEE')}</div>
                    <div className="text-sm text-gray-500">{format(day, 'd')}</div>
                  </div>
                  <div className="relative">
                    {timeSlots.map((hour) => (
                        <div key={hour} className="h-16 border-b dark:border-gray-700" />
                    ))}
                    {dayLectures.map((lecture) => (
                        <button
                            key={lecture.id}
                            onClick={() => onSelectLecture(lecture)}
                            className="absolute p-1 text-xs bg-indigo-100 dark:bg-indigo-900 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800 overflow-hidden transition-colors"
                            style={calculateLectureStyle(lecture, dayLectures)}
                        >
                          <div className="font-medium truncate">{lecture.title}</div>
                          <div className="text-gray-600 dark:text-gray-400 truncate">
                            {lecture.startTime} - {lecture.endTime}
                          </div>
                        </button>
                    ))}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};