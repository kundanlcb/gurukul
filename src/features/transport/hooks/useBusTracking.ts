/**
 * Transport Hook — Gurukul (Parent/Student App)
 * TanStack Query hook for fetching bus tracking data.
 */

import { useQuery } from '@tanstack/react-query';
import { transportApi } from '../../../api/instances';

export const useBusTracking = (routeId?: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['transport', 'bus', routeId],
        queryFn: async () => {
            const response = await transportApi.getLiveLocation({ routeId: Number(routeId!) });
            return response.data;
        },
        enabled: !!routeId,
        staleTime: 30 * 1000, // 30 seconds — live tracking
        refetchInterval: 30 * 1000,
    });

    return {
        busLocation: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
    };
};
