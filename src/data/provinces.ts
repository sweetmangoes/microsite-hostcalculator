export interface Province {
  code: string
  name: string
  /** Full utility-rate calculator available for this province */
  hasDetailedRates: boolean
  utilityHighlight: string
  ratePlanExample: string
}

export const PROVINCES: Province[] = [
  {
    code: 'ON',
    name: 'Ontario',
    hasDetailedRates: true,
    utilityHighlight: 'Hydro One, Toronto Hydro, Alectra & 50+ LDCs',
    ratePlanExample: 'TOU, Ultra-Low Overnight (ULO), and Tiered',
  },
  {
    code: 'BC',
    name: 'British Columbia',
    hasDetailedRates: false,
    utilityHighlight: 'BC Hydro residential tiered rates',
    ratePlanExample: 'Step 1 / Step 2 tiered pricing',
  },
  {
    code: 'AB',
    name: 'Alberta',
    hasDetailedRates: false,
    utilityHighlight: 'Regulated Rate Option (RRO) providers',
    ratePlanExample: 'Flat and time-of-use options',
  },
  {
    code: 'QC',
    name: 'Quebec',
    hasDetailedRates: false,
    utilityHighlight: 'Hydro-Québec domestic rates',
    ratePlanExample: 'Tiered domestic rate (DT)',
  },
  {
    code: 'MB',
    name: 'Manitoba',
    hasDetailedRates: false,
    utilityHighlight: 'Manitoba Hydro residential rates',
    ratePlanExample: 'Flat residential rate',
  },
  {
    code: 'SK',
    name: 'Saskatchewan',
    hasDetailedRates: false,
    utilityHighlight: 'SaskPower residential rates',
    ratePlanExample: 'Flat residential rate',
  },
  {
    code: 'NS',
    name: 'Nova Scotia',
    hasDetailedRates: false,
    utilityHighlight: 'Nova Scotia Power time-of-use rates',
    ratePlanExample: 'Time-of-day and standard rates',
  },
  {
    code: 'NB',
    name: 'New Brunswick',
    hasDetailedRates: false,
    utilityHighlight: 'NB Power residential rates',
    ratePlanExample: 'Residential energy rate',
  },
  {
    code: 'PE',
    name: 'Prince Edward Island',
    hasDetailedRates: false,
    utilityHighlight: 'Maritime Electric residential rates',
    ratePlanExample: 'Residential energy rate',
  },
  {
    code: 'NL',
    name: 'Newfoundland & Labrador',
    hasDetailedRates: false,
    utilityHighlight: 'Newfoundland Power residential rates',
    ratePlanExample: 'Domestic service rate',
  },
]

export function getProvinceByCode(code: string): Province | undefined {
  return PROVINCES.find((p) => p.code === code)
}
