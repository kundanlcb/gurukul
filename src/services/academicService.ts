// Mock Academic Service
import { Student } from '../types/auth';

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'holiday';
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  description?: string;
  attachmentUrl?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // "09:00"
  endTime: string; // "09:45"
  subject: string;
  teacher: string;
  room?: string;
}

export const getStudentAttendance = async (studentId: string, month: string): Promise<{ records: AttendanceRecord[], summary: any }> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: { total: 24, present: 22, absent: 2, percentage: 91.6 },
        records: [
          { date: '2023-11-01', status: 'present' },
          { date: '2023-11-02', status: 'present' },
          { date: '2023-11-03', status: 'absent' },
          { date: '2023-11-04', status: 'holiday' },
          // ... more data
        ]
      });
    }, 500);
  });
};

export const getHomework = async (studentId: string, filter: 'all'|'pending'|'completed' = 'all'): Promise<HomeworkItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all: HomeworkItem[] = [
        { id: '1', subject: 'Mathematics', title: 'Algebra Worksheet 4', dueDate: '2023-11-20', status: 'pending', description: 'Complete exercises 1-10 on page 42.' },
        { id: '2', subject: 'Science', title: 'Lab Report: Photosynthesis', dueDate: '2023-11-18', status: 'overdue', description: 'Submit PDF report.' },
        { id: '3', subject: 'English', title: 'Essay: Shakespeare', dueDate: '2023-11-15', status: 'completed' },
      ];
      
      if (filter === 'all') resolve(all);
      else resolve(all.filter(i => i.status === filter || (filter === 'pending' && i.status === 'overdue')));
    }, 500);
  });
};

export const getTimetable = async (studentId: string, day: string): Promise<TimeSlot[]> => {
  // day: "Monday", "Tuesday"...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', startTime: '09:00', endTime: '09:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: '101' },
        { id: '2', startTime: '09:45', endTime: '10:30', subject: 'Science', teacher: 'Mrs. Verma', room: 'Lab 2' },
        { id: '3', startTime: '10:45', endTime: '11:30', subject: 'English', teacher: 'Ms. Gupta', room: '101' },
        { id: '4', startTime: '11:30', endTime: '12:15', subject: 'Social Studies', teacher: 'Mr. Singh', room: '101' },
      ]);
    }, 500);
  });
};
