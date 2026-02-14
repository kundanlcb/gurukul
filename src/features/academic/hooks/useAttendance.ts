/**
 * Attendance Hook — Gurukul (Parent/Student App)
 * TanStack Query hooks for fetching student attendance.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

/**
 * Fetch attendance summary for the linked student
 */
export const useStudentAttendance = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['attendance', 'summary'],
        queryFn: async () => {
            const response = await profileApi.getAttendanceSummary({});
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return {
        attendance: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};

/**
 * Fetch attendance records/history
 */
export const useAttendanceRecords = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['attendance', 'history'],
        queryFn: async () => {
            const response = await profileApi.getAttendanceHistory({});
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return {
        records: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
