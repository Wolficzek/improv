import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editSleepData } from '@/app/sleep/services/sleepDataService'

export const useEditSleepData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editSleepData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sleepData'] })
    },
  })
}
