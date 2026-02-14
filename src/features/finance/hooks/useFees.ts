/**
 * Fees Hook — Gurukul (Parent/Student App)
 * TanStack Query hook for fetching fee ledger.
 */

import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useStudentFees = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['fees', 'ledger'],
        queryFn: async () => {
            const response = await profileApi.getFeeLedger({});
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return {
        ledger: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
