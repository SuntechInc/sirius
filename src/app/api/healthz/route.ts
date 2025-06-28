// src/app/api/healthz/route.ts
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json(
    {
      service: 'Sirius',
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  )
}
