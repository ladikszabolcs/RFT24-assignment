export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  dayOfWeek: number;
  maxStudents: number;
  startTime: string;
  endTime: string;
  teacher: string;
  students: User[];
}