export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  maxStudents: number;
  enrolledStudents: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}