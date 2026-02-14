/**
 * Results Hook — Gurukul (Parent/Student App)
 * TanStack Query hook for fetching exam results.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useResults = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const response = await profileApi.getResults({});
            return response.data;
        },
        staleTime: 10 * 60 * 1000,
    });

    return {
        results: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
