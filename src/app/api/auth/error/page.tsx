'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Inner() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>Error type: {error || 'Unknown error'}</p>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Inner />
    </Suspense>
  )
}
