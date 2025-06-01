import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sleepEntries } from '@/db/schema/sleep'

export type SelectSleepData = InferSelectModel<typeof sleepEntries>
export type InsertSleepData = InferInsertModel<typeof sleepEntries>
