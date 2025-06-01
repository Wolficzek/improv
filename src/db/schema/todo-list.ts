import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core'

export const todoLists = pgTable('todo_lists', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  // userId: integer('user_id').references(() => users.id).notNull()
  type: varchar('type', { length: 16 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})
