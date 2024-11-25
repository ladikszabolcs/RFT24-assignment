import { apiClient } from './client';
import type { Lecture } from '../types';

interface CreateLectureDTO {
    title: string;
    description: string;
    day_of_week: number;
    max_students: number;
    start_time: string;
    end_time: string;
    teacher: string;
}

interface LectureResponse {
    id: number;
    students: string[];
    title: string;
    description: string;
    day_of_week: string;
    max_students: number;
    start_time: string;
    end_time: string;
    teacher: number;
}

interface EnrollmentResponse {
    message: string;
}

const transformToApi = (data: Omit<Lecture, 'id' | 'enrolledStudents'>): CreateLectureDTO => ({
    title: data.title,
    description: data.description,
    day_of_week: data.dayOfWeek,
    max_students: data.maxStudents,
    start_time: data.startTime,
    end_time: data.endTime,
    teacher: data.teacher,
});

const transformResponse = (lecture: LectureResponse): Lecture => ({
    id: lecture.id.toString(),
    title: lecture.title,
    description: lecture.description,
    dayOfWeek: parseInt(lecture.day_of_week),
    maxStudents: lecture.max_students,
    startTime: lecture.start_time.substring(0, 5), // Remove seconds from time
    endTime: lecture.end_time.substring(0, 5), // Remove seconds from time
    teacher: lecture.teacher.toString(),
    enrolledStudents: lecture.students,
});

export const lecturesApi = {
    getAll: async (): Promise<Lecture[]> => {
        const { data } = await apiClient.get<LectureResponse[]>('/api/lectures/');
        return data.map(transformResponse);
    },

    getById: async (id: string): Promise<Lecture> => {
        const { data } = await apiClient.get<LectureResponse>(`/api/lectures/${id}/`);
        return transformResponse(data);
    },

    create: async (lecture: Omit<Lecture, 'id' | 'enrolledStudents'>): Promise<Lecture> => {
        const apiData = transformToApi(lecture);
        const { data } = await apiClient.post<LectureResponse>('/api/lectures/', apiData);
        return transformResponse(data);
    },

    update: async (id: string, lecture: Partial<Lecture>): Promise<Lecture> => {
        const apiData = transformToApi(lecture as Omit<Lecture, 'id' | 'enrolledStudents'>);
        const { data } = await apiClient.patch<LectureResponse>(`/api/lectures/${id}/`, apiData);
        return transformResponse(data);
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/lectures/${id}/`);
    },

    enroll: async (id: string): Promise<EnrollmentResponse> => {
        const { data } = await apiClient.post<EnrollmentResponse>(`/api/lectures/${id}/enroll/`);
        return data;
    },

    unenroll: async (id: string): Promise<EnrollmentResponse> => {
        const { data } = await apiClient.post<EnrollmentResponse>(`/api/lectures/${id}/unenroll/`);
        return data;
    },
};