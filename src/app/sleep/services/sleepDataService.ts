import { InsertSleepData, SelectSleepData } from '@/db/types/db-types'
import axiosClient from '@/lib/axios'

export const fetchSleepData = async (
  id?: number
): Promise<SelectSleepData[]> => {
  if (!id) {
    const response = await axiosClient.get<SelectSleepData[]>('/sleep')
    return response.data
  }

  const response = await axiosClient.get<SelectSleepData[]>(`/sleep/${id}`)
  return response.data
}

export const createSleepData = async (
  data: InsertSleepData
): Promise<SelectSleepData> => {
  const response = await axiosClient.post('/sleep', data)
  return response.data
}

export const editSleepData = async ({
  id,
  data,
}: {
  id: number
  data: InsertSleepData
}): Promise<SelectSleepData> => {
  console.log(data)
  const response = await axiosClient.patch(`/sleep/${id}`, data)
  return response.data
}

export const deleteSleepData = async (id: number): Promise<void> => {
  const response = await axiosClient.delete(`/sleep/${id}`)
  return response.data
}
