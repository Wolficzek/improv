import { pgTable, varchar, integer, boolean } from 'drizzle-orm/pg-core'
import { todoLists } from './todo-list'

export const todoTasks = pgTable('todo_tasks', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  listId: integer('list_id')
    .references(() => todoLists.id)
    .notNull(),

  label: varchar('label', { length: 255 }).notNull(),
  note: varchar('note', { length: 1000 }),
  completed: boolean('completed').default(false),
})
