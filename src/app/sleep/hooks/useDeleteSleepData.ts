import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSleepData } from '@/app/sleep/services/sleepDataService'

export const useDeleteSleepData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSleepData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepData'] })
    },
  })
}
