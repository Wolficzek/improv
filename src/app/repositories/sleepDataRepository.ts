import { InsertSleepData, SelectSleepData } from '@/db/types/db-types'
import { db } from '@/db'
import { sleepEntries } from '@/db/schema/sleep'
import { eq } from 'drizzle-orm'

export const getSleepRecordById = async (id: number) => {
  return db.select().from(sleepEntries).where(eq(sleepEntries.id, id))
}

export const getAllSleepRecords = async () => {
  return db.select().from(sleepEntries)
}

export const addSleepRecord = async (data: InsertSleepData) => {
  const result = await db
    .insert(sleepEntries)
    .values({
      date: new Date(data.date),
      snoozes: data.snoozes,
      tiredness: data.tiredness,
      bedTime: data.bedTime,
      wakeTime: data.wakeTime,
      timeTillAsleep: data.timeTillAsleep,
      sleepTime: data.sleepTime,
      wakeUps: data.wakeUps,
      medications: data.medications,
    })
    .returning({ id: sleepEntries.id })

  return result[0]
}

export const updateSleepRecord = async ({
  id,
  data,
}: {
  id: number
  data: InsertSleepData
}): Promise<SelectSleepData[]> => {
  const parsedData = { ...data, date: new Date(data.date) }

  return db
    .update(sleepEntries)
    .set(parsedData)
    .where(eq(sleepEntries.id, id))
    .returning()
}

export const deleteSleepRecordById = async (id: number) => {
  return db
    .delete(sleepEntries)
    .where(eq(sleepEntries.id, id))
    .returning({ id: sleepEntries.id })
}
