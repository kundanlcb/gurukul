/**
 * Dashboard Hook — Gurukul (Parent/Student App)
 * TanStack Query hook for fetching dashboard data.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useDashboard = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await profileApi.getDashboard({});
            return response.data;
        },
        staleTime: 2 * 60 * 1000,
    });

    return {
        dashboard: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
