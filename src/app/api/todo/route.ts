import { NextRequest, NextResponse } from 'next/server'
import { addToDoList, getAllTodoList } from '@/app/repositories/toDoRepository'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    const result = await addToDoList(data)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error saving sleep data:', error)
    return NextResponse.json(
      { error: 'Failed to save sleep data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const results = await getAllTodoList()

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}
