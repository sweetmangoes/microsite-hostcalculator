import { NextResponse } from 'next/server'
import { isHubSpotConfigured, upsertPreListLead } from '@/lib/hubspot'

interface PreListPayload {
  name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  province?: string
  chargerSpeed?: number
  chargerCategory?: string
  ratePlan?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POSTAL_CODE_PATTERN = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

export async function POST(request: Request) {
  let body: PreListPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone, address, city, postalCode, province } = body

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !address?.trim() || !city?.trim()) {
    return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  if (!postalCode?.trim() || !POSTAL_CODE_PATTERN.test(postalCode.trim())) {
    return NextResponse.json({ error: 'Enter a valid Canadian postal code' }, { status: 400 })
  }

  const lead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    address: address.trim(),
    city: city.trim(),
    postalCode: postalCode.trim(),
    province: province?.trim(),
    chargerSpeed: body.chargerSpeed,
    chargerCategory: body.chargerCategory?.trim(),
    ratePlan: body.ratePlan?.trim(),
  }

  if (!isHubSpotConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[pre-list] HUBSPOT_ACCESS_TOKEN is missing in production')
      return NextResponse.json({ error: 'Pre-list signup is temporarily unavailable' }, { status: 503 })
    }

    console.warn('[pre-list] HUBSPOT_ACCESS_TOKEN not set — skipping CRM sync', lead)
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    await upsertPreListLead(lead)
    console.info('[pre-list] synced to HubSpot', { email: lead.email, province: lead.province })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[pre-list] HubSpot sync failed', error)
    return NextResponse.json({ error: 'Unable to save your details. Please try again.' }, { status: 502 })
  }
}
