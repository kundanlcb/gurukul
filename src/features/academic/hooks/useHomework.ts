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

    // --- Mutation: Submit homework (optimistic) ---
    const submitMutation = useMutation({
        mutationKey: ['homework', 'submit'],
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
        onMutate: async (payload) => {
            // Optimistic: mark the homework item as "submitted" in cache
            await queryClient.cancelQueries({ queryKey: ['homework'] });
            const previous = queryClient.getQueryData(['homework']);
            queryClient.setQueryData(['homework'], (old: any) => {
                if (!old) return old;
                if (Array.isArray(old)) {
                    return old.map((hw: any) =>
                        String(hw.id) === payload.homeworkId
                            ? { ...hw, submitted: true, submittedAt: new Date().toISOString() }
                            : hw,
                    );
                }
                return old;
            });
            return { previous };
        },
        onError: (_err, _data, context) => {
            queryClient.setQueryData(['homework'], context?.previous);
        },
        onSettled: () => {
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
