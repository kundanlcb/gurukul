/**
 * Timetable Hook — Gurukul (Parent/Student App)
 * TanStack Query hook for fetching student's timetable.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useTimetable = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['timetable'],
        queryFn: async () => {
            const response = await profileApi.getTimetable({});
            return response.data;
        },
        staleTime: 30 * 60 * 1000,
    });

    return {
        timetable: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
