'use client'

import { Download } from 'lucide-react'
import type { CalculationResult } from '@/utils/electricity-calculator'
import type { Province } from '@/data/provinces'
import {
  calculateScenarioMonthlyEarnings,
  formatCurrency,
  formatCurrencyDetailed,
  SHARING_RATE_SCENARIOS,
} from '@/utils/quick-estimate'

interface PrintableReportProps {
  result: CalculationResult
  province: Province
  chargerSpeed: number
  hoursPerDay: number
  utility: string
  ratePlan: string
  leadName?: string
  leadEmail?: string
}

function SignedAmount({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span className={className}>
      {value >= 0 ? '+' : '−'}
      {formatCurrencyDetailed(Math.abs(value))}
    </span>
  )
}

export function PrintableReport({
  result,
  province,
  chargerSpeed,
  hoursPerDay,
  utility,
  ratePlan,
  leadName,
  leadEmail,
}: PrintableReportProps) {
  const netMonthly = result.evEarnings.monthly - result.totalBill
  const netAnnual = result.evEarnings.yearly - result.totalBill * 12

  const handlePrint = () => {
    const originalTitle = document.title
    document.title = `EV Charging Income Report - ${province.name} - ${new Date().toLocaleDateString('en-CA')}`
    window.print()
    document.title = originalTitle
  }

  const setupItems = [
    { label: 'Province', value: province.name },
    { label: 'Utility', value: utility },
    { label: 'Rate plan', value: ratePlan },
    { label: 'Charger', value: `${chargerSpeed} kW Level 2` },
    { label: 'Sharing hours', value: `${hoursPerDay} hrs/day` },
    { label: 'Energy shared', value: `${result.evConsumption.monthly.toFixed(0)} kWh/mo` },
  ]

  return (
    <>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary/50 print:hidden"
      >
        <Download className="h-4 w-4" />
        Download PDF Report
      </button>

      <div id="printable-report" className="hidden print:block">
        <div className="p-6 font-sans text-[11pt] leading-snug text-foreground">
          <header className="print-avoid-break border-b border-gray-200 pb-4">
            <p className="text-[9pt] font-semibold uppercase tracking-widest text-green-700">
              Watt Share · EV Charging Income Report
            </p>
            <h1 className="mt-1.5 text-[20pt] font-bold leading-tight">Your Charging Income Estimate</h1>
            <p className="mt-1 text-[10pt] text-gray-600">
              {province.name} · {new Date().toLocaleDateString('en-CA', { dateStyle: 'long' })}
              {(leadName || leadEmail) && (
                <> · Prepared for {[leadName, leadEmail].filter(Boolean).join(', ')}</>
              )}
            </p>
          </header>

          <section className="print-avoid-break mt-5">
            <h2 className="print-keep-with-next text-[12pt] font-semibold">Estimated Monthly Impact</h2>
            <p className="mt-0.5 text-[10pt] text-gray-600">
              Based on {utility} {ratePlan} rates for {province.name}.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                <p className="text-[9pt] font-medium uppercase tracking-wide text-gray-500">Gross income</p>
                <p className="mt-0.5 text-[14pt] font-bold tabular-nums">
                  {formatCurrencyDetailed(result.evEarnings.monthly)}
                </p>
                <p className="mt-0.5 text-[9pt] text-gray-500">From charger sharing</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
                <p className="text-[9pt] font-medium uppercase tracking-wide text-gray-500">Est. bill</p>
                <p className="mt-0.5 text-[14pt] font-bold tabular-nums">
                  {formatCurrencyDetailed(result.totalBill)}
                </p>
                <p className="mt-0.5 text-[9pt] text-gray-500">Electricity costs</p>
              </div>
              <div className="rounded-lg border border-green-300 bg-green-50 px-3 py-2.5">
                <p className="text-[9pt] font-medium uppercase tracking-wide text-green-700">Net impact</p>
                <p className="mt-0.5 text-[14pt] font-bold tabular-nums text-green-900">
                  <SignedAmount value={netMonthly} />
                </p>
                <p className="mt-0.5 text-[9pt] text-green-700">Per month</p>
              </div>
            </div>
            <p className="mt-2 text-[10pt] text-gray-600">
              Projected annual net impact:{' '}
              <span className="font-semibold text-green-800">
                <SignedAmount value={netAnnual} />
              </span>
            </p>
          </section>

          <section className="print-avoid-break mt-5">
            <h2 className="print-keep-with-next text-[12pt] font-semibold">Your Setup</h2>
            <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10pt]">
              {setupItems.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 border-b border-gray-100 py-1">
                  <dt className="text-gray-600">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-5 grid grid-cols-1 gap-5 print:grid-cols-2">
            <section className="print-avoid-break">
              <h2 className="print-keep-with-next text-[12pt] font-semibold">Revenue by Time Period</h2>
              <p className="mt-0.5 text-[10pt] text-gray-600">
                Gross monthly earnings if all {hoursPerDay} daily hours were billed at each rate tier.
              </p>
              <table className="mt-2 w-full text-[10pt]">
                <thead>
                  <tr className="border-b border-gray-300 text-left text-gray-600">
                    <th className="pb-1.5 pr-2 font-medium">Period</th>
                    <th className="pb-1.5 pr-2 text-right font-medium">Rate</th>
                    <th className="pb-1.5 text-right font-medium">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {SHARING_RATE_SCENARIOS.map(({ label, rate, rateLabel }) => {
                    const monthly = calculateScenarioMonthlyEarnings(chargerSpeed, hoursPerDay, rate)
                    return (
                      <tr key={label} className="border-b border-gray-100">
                        <td className="py-1.5 pr-2">{label}</td>
                        <td className="py-1.5 pr-2 text-right text-gray-600">{rateLabel}</td>
                        <td className="py-1.5 text-right font-medium tabular-nums">
                          {formatCurrency(monthly)}
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="font-semibold">
                    <td className="py-1.5 pr-2">Time-weighted</td>
                    <td className="py-1.5 pr-2 text-right text-gray-600">By schedule</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.evEarnings.monthly)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="print-avoid-break">
              <h2 className="print-keep-with-next text-[12pt] font-semibold">Electricity Bill Breakdown</h2>
              <p className="mt-0.5 text-[10pt] text-gray-600">
                Estimated monthly bill using publicly available {ratePlan} rate data.
              </p>
              <table className="mt-2 w-full text-[10pt]">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">Energy (commodity)</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.breakdown.commodity)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">Delivery</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.breakdown.delivery)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">Regulatory</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.breakdown.regulatory)}
                    </td>
                  </tr>
                  {result.breakdown.oer > 0 && (
                    <tr className="border-b border-gray-100">
                      <td className="py-1.5">Ontario Electricity Rebate</td>
                      <td className="py-1.5 text-right tabular-nums text-green-700">
                        −{formatCurrencyDetailed(result.breakdown.oer)}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5">HST</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.breakdown.hst)}
                    </td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="py-1.5">Total estimated bill</td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCurrencyDetailed(result.totalBill)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          <footer className="print-avoid-break mt-6 border-t border-gray-200 pt-3 text-[8.5pt] leading-relaxed text-gray-500">
            <p>
              Estimates use publicly available provincial utility rates from the Ontario Energy Board and
              your selected local distribution company. Actual earnings and bills may vary with consumption,
              time-of-use patterns, and future rate changes.
            </p>
            <p className="mt-1.5">
              Peer-to-peer sharing rates: off-peak $0.30/kWh · mid-peak $0.40/kWh · on-peak $0.50/kWh.
              Updated calculations at evchargingincome.ca.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
