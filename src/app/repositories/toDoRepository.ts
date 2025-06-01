import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { todoTasks } from '@/db/schema/todo-tasks'
import { todoLists } from '@/db/schema/todo-list'

export const getTodoListById = async (id: number) => {
  const list = await db.query.todoLists.findFirst({
    where: eq(todoLists.id, id),
    with: {
      tasks: true,
    },
  })

  return list
}

export const getAllTodoList = async () => {
  return await db.query.todoLists.findMany({
    // where: eq(todoLists.userId, userId),
    with: {
      tasks: true,
    },
  })
}

export const addToDoList = async (data: {
  type: 'daily' | 'reminder'
  tasks: { label: string; note?: string }[]
}) => {
  const [list] = await db
    .insert(todoLists)
    .values({ type: data.type })
    .returning()

  if (!list) return null

  await db.insert(todoTasks).values(
    data.tasks.map((task) => ({
      listId: list.id,
      label: task.label,
      note: task.note || '',
    }))
  )

  return getTodoListById(list.id)
}

export const updateToDoList = async ({
  id,
  data,
}: {
  id: number
  data: {
    type: 'daily' | 'reminder'
    tasks: { label: string; note?: string }[]
  }
}) => {
  await db
    .update(todoLists)
    .set({ type: data.type })
    .where(eq(todoLists.id, id))

  await db.delete(todoTasks).where(eq(todoTasks.listId, id))

  await db.insert(todoTasks).values(
    data.tasks.map((task) => ({
      listId: id,
      label: task.label,
      note: task.note || '',
    }))
  )

  return getTodoListById(id)
}

export const deleteToDoList = async (id: number) => {
  await db.delete(todoTasks).where(eq(todoTasks.listId, id))
  await db.delete(todoLists).where(eq(todoLists.id, id))
}
