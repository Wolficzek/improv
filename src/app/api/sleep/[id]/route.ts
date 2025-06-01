import { NextRequest, NextResponse } from 'next/server'
import {
  deleteSleepRecordById,
  getSleepRecordById,
  updateSleepRecord,
} from '@/app/repositories/sleepDataRepository'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Missing id' })
    }
    const results = await deleteSleepRecordById(parseInt(id))
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
    const results = await updateSleepRecord({
      id: parseInt(id),
      data: updateData,
    })

    if (results.length === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json(results)
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

    const results = await getSleepRecordById(parseInt(id))

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}
