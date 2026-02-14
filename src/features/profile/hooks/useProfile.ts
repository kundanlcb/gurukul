/**
 * Profile Hook — Gurukul (Parent/Student App)
 * TanStack Query hooks for fetching user profile and linked students.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useProfile = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await profileApi.getCurrentUser();
            return response.data;
        },
        staleTime: 10 * 60 * 1000,
    });

    return {
        profile: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};

export const useLinkedStudents = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile', 'linkedStudents'],
        queryFn: async () => {
            const response = await profileApi.getLinkedStudents();
            return response.data;
        },
        staleTime: 30 * 60 * 1000,
    });

    return {
        students: data ?? null,
        isLoading,
        error: error?.message ?? null,
    };
};
