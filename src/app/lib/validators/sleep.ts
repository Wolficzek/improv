import { z } from 'zod'
import { InsertSleepData } from '@/db/types/db-types'

export const SleepSchema: z.ZodType<InsertSleepData> = z.object({
  date: z.coerce.date(),
  snoozes: z.number({ required_error: 'Required' }).min(0),
  tiredness: z.number({ required_error: 'Required' }).min(0).max(10),
  bedTime: z.string().min(1, 'Required'),
  wakeTime: z.string().min(1, 'Required'),
  timeTillAsleep: z.string().min(1, 'Required'),
  sleepTime: z.string().min(1, 'Required'),
  wakeUps: z.number({ required_error: 'Required' }).min(0),
  medications: z.string().optional(),
})

export type SleepFormValues = z.infer<typeof SleepSchema>
