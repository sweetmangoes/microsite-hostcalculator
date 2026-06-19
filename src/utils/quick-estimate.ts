/** Peer-to-peer sharing rates used for earnings estimates (CAD/kWh). */
const SHARING_RATES = {
  offPeak: 0.3,
  midPeak: 0.4,
  onPeak: 0.5,
} as const

export interface QuickEstimateInput {
  chargerSpeed: number
  hoursPerDay: number
}

export interface QuickEstimateResult {
  monthlyLow: number
  monthlyHigh: number
  monthlyMid: number
  dailyLow: number
  dailyHigh: number
  dailyMid: number
}

/** Instant earnings range — no utility data required. */
export function calculateQuickEstimate(input: QuickEstimateInput): QuickEstimateResult {
  const { chargerSpeed, hoursPerDay } = input

  const dailyLow = chargerSpeed * hoursPerDay * SHARING_RATES.offPeak
  const dailyHigh = chargerSpeed * hoursPerDay * SHARING_RATES.onPeak
  const dailyMid =
    chargerSpeed * hoursPerDay * ((SHARING_RATES.offPeak + SHARING_RATES.midPeak + SHARING_RATES.onPeak) / 3)

  return {
    dailyLow,
    dailyHigh,
    dailyMid,
    monthlyLow: dailyLow * 30,
    monthlyHigh: dailyHigh * 30,
    monthlyMid: dailyMid * 30,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const SHARING_RATE_SCENARIOS = [
  { label: 'Off-Peak', rate: SHARING_RATES.offPeak, rateLabel: '$0.30/kWh' },
  { label: 'Mid-Peak', rate: SHARING_RATES.midPeak, rateLabel: '$0.40/kWh' },
  { label: 'On-Peak', rate: SHARING_RATES.onPeak, rateLabel: '$0.50/kWh' },
] as const

/** Monthly gross earnings if every sharing hour were billed at a single peer rate. */
export function calculateScenarioMonthlyEarnings(
  chargerSpeed: number,
  hoursPerDay: number,
  ratePerKwh: number,
): number {
  return chargerSpeed * hoursPerDay * ratePerKwh * 30
}
