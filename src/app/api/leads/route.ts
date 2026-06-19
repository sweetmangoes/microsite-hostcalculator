import { NextResponse } from 'next/server'
import { isHubSpotConfigured, upsertCalculatorLead } from '@/lib/hubspot'

interface LeadPayload {
  name?: string
  email?: string
  province?: string
}

export async function POST(request: Request) {
  let body: LeadPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, province } = body

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const lead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    province: province?.trim(),
  }

  if (!isHubSpotConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[leads] HUBSPOT_ACCESS_TOKEN is missing in production')
      return NextResponse.json({ error: 'Lead capture is temporarily unavailable' }, { status: 503 })
    }

    console.warn('[leads] HUBSPOT_ACCESS_TOKEN not set — skipping CRM sync', lead)
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    await upsertCalculatorLead(lead)
    console.info('[leads] synced to HubSpot', { email: lead.email, province: lead.province })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[leads] HubSpot sync failed', error)
    return NextResponse.json({ error: 'Unable to save your details. Please try again.' }, { status: 502 })
  }
}
