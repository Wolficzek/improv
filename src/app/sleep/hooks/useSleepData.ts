import { useQuery } from '@tanstack/react-query'
import { fetchSleepData } from '../services/sleepDataService'

export const useSleepData = (id?: number) =>
  useQuery({
    queryKey: id ? ['sleepData', id] : ['sleepData'],
    queryFn: () => fetchSleepData(id),
  })
