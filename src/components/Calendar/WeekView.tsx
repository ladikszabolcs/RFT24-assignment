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

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg">
        {/* Time column */}
        <div className="bg-white dark:bg-gray-800 p-2">
          <div className="h-12"></div>
          {timeSlots.map((hour) => (
            <div key={hour} className="h-16 text-sm text-gray-500">
              {format(new Date().setHours(hour), 'ha')}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day) => (
          <div key={day.toString()} className="bg-white dark:bg-gray-800">
            <div className="h-12 p-2 text-center border-b dark:border-gray-700">
              <div className="font-medium">{format(day, 'EEE')}</div>
              <div className="text-sm text-gray-500">{format(day, 'd')}</div>
            </div>
            {timeSlots.map((hour) => {
              const dayLectures = lectures.filter(
                (lecture) =>
                  lecture.dayOfWeek === day.getDay() &&
                  parseInt(lecture.startTime.split(':')[0]) === hour
              );

              return (
                <div key={hour} className="h-16 border-b dark:border-gray-700 p-1">
                  {dayLectures.map((lecture) => (
                    <button
                      key={lecture.id}
                      onClick={() => onSelectLecture(lecture)}
                      className="w-full h-full p-1 text-xs bg-indigo-100 dark:bg-indigo-900 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800"
                    >
                      <div className="font-medium">{lecture.title}</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {lecture.startTime} - {lecture.endTime}
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};