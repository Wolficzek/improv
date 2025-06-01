import { NextRequest, NextResponse } from 'next/server'
import {
  deleteToDoList,
  getTodoListById,
  updateToDoList,
} from '@/app/repositories/toDoRepository'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Missing id' })
    }
    const results = await deleteToDoList(parseInt(id))
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 }
      )
    }

    const updateData = await request.json()
    const result = await updateToDoList({
      id: parseInt(id),
      data: updateData,
    })

    if (!result) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 500 })
    }

    const results = await getTodoListById(parseInt(id))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}
