const HUBSPOT_API_BASE = 'https://api.hubapi.com'

export interface CalculatorLead {
  name: string
  email: string
  province?: string
}

export interface PreListLead extends CalculatorLead {
  phone: string
  address: string
  city: string
  postalCode: string
  chargerSpeed?: number
  chargerCategory?: string
  ratePlan?: string
}

function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return { firstname: '', lastname: '' }
  }
  if (parts.length === 1) {
    return { firstname: parts[0], lastname: '' }
  }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

function setOptionalProperty(
  properties: Record<string, string>,
  key: string | undefined,
  value: string | number | undefined
): void {
  if (!key || value === undefined || value === '') return
  properties[key] = String(value)
}

function buildContactProperties(
  lead: CalculatorLead,
  extras?: Omit<PreListLead, keyof CalculatorLead>
): Record<string, string> {
  const { firstname, lastname } = splitName(lead.name)
  const properties: Record<string, string> = {
    email: lead.email.trim().toLowerCase(),
    lifecyclestage: 'lead',
  }

  if (firstname) properties.firstname = firstname
  if (lastname) properties.lastname = lastname

  if (lead.province?.trim()) {
    const provinceProperty = process.env.HUBSPOT_PROVINCE_PROPERTY ?? 'state'
    properties[provinceProperty] = lead.province.trim()
  }

  const leadSourceProperty = process.env.HUBSPOT_LEAD_SOURCE_PROPERTY
  const leadSourceValue =
    process.env.HUBSPOT_LEAD_SOURCE_VALUE ?? 'EV Charging Income Calculator'

  if (leadSourceProperty) {
    properties[leadSourceProperty] = leadSourceValue
  }

  if (extras) {
    if (extras.phone.trim()) properties.phone = extras.phone.trim()
    if (extras.address.trim()) properties.address = extras.address.trim()
    if (extras.city.trim()) properties.city = extras.city.trim()
    if (extras.postalCode.trim()) properties.zip = extras.postalCode.trim().toUpperCase()
    properties.country = 'Canada'

    setOptionalProperty(
      properties,
      process.env.HUBSPOT_CHARGER_SPEED_PROPERTY,
      extras.chargerSpeed
    )
    setOptionalProperty(
      properties,
      process.env.HUBSPOT_CHARGER_TYPE_PROPERTY,
      extras.chargerCategory
    )
    setOptionalProperty(
      properties,
      process.env.HUBSPOT_RATE_PLAN_PROPERTY,
      extras.ratePlan
    )

    const preListProperty = process.env.HUBSPOT_PRE_LIST_PROPERTY
    if (preListProperty) {
      properties[preListProperty] = 'true'
    }
  }

  return properties
}

async function upsertContact(properties: Record<string, string>): Promise<void> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error('HUBSPOT_ACCESS_TOKEN is not configured')
  }

  const response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/batch/upsert`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [
        {
          idProperty: 'email',
          id: properties.email,
          properties,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('[hubspot] upsert failed', response.status, errorBody)
    throw new Error(`HubSpot API error (${response.status})`)
  }
}

export async function upsertCalculatorLead(lead: CalculatorLead): Promise<void> {
  await upsertContact(buildContactProperties(lead))
}

export async function upsertPreListLead(lead: PreListLead): Promise<void> {
  const { phone, address, city, postalCode, chargerSpeed, chargerCategory, ratePlan, ...base } =
    lead
  await upsertContact(
    buildContactProperties(base, {
      phone,
      address,
      city,
      postalCode,
      chargerSpeed,
      chargerCategory,
      ratePlan,
    })
  )
}

export function isHubSpotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN?.trim())
}
