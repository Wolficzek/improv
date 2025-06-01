import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

export const sleepEntries = pgTable('sleep_entries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: timestamp('date').notNull(),
  snoozes: integer().notNull(),
  tiredness: integer().notNull(),
  bedTime: varchar({ length: 64 }).notNull(),
  wakeTime: varchar({ length: 64 }).notNull(),
  timeTillAsleep: varchar({ length: 64 }).notNull(),
  sleepTime: varchar({ length: 64 }).notNull(),
  wakeUps: integer().notNull(),
  medications: varchar({ length: 64 }),
})
