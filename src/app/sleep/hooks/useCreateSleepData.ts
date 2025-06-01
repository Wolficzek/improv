import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSleepData } from '@/app/sleep/services/sleepDataService'

export const useCreateSleepData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSleepData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepData'] })
    },
  })
}
