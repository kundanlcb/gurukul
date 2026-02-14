/**
 * Homework Hook — Gurukul (Parent/Student App)
 * TanStack Query hooks for homework list and submission.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../../../api/instances';

export const useHomework = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['homework'],
        queryFn: async () => {
            const response = await profileApi.getHomework({});
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const submitMutation = useMutation({
        mutationFn: async (payload: {
            homeworkId: string;
            fileUrl: string;
            remarks?: string;
        }) => {
            const response = await profileApi.submitHomework({
                homeworkId: Number(payload.homeworkId),
                formData: {
                    fileUrl: payload.fileUrl,
                    remarks: payload.remarks,
                },
            } as any);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['homework'] });
        },
    });

    return {
        homeworkList: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch,
        submitHomework: submitMutation.mutateAsync,
        isSubmitting: submitMutation.isPending,
    };
};
