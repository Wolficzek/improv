import { NextRequest, NextResponse } from 'next/server'
import {
  addSleepRecord,
  getAllSleepRecords,
} from '@/app/repositories/sleepDataRepository'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (
      !data.date ||
      !data.bedTime ||
      !data.wakeTime ||
      data.timeTillAsleep === undefined ||
      data.sleepTime === undefined ||
      data.wakeUps === undefined ||
      !data.medications
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    const result = await addSleepRecord(data)

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
    const results = await getAllSleepRecords()

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching sleep data', error)
    return NextResponse.json({ status: 500 })
  }
}
