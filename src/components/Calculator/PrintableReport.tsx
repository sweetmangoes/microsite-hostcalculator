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
        <div className="p-8 font-sans text-foreground">
          <header className="border-b border-gray-200 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Watt Share · Provincial Utility Rate Offset Report
            </p>
            <h1 className="mt-2 text-2xl font-bold">EV Charging Income Report</h1>
            <p className="mt-1 text-sm text-gray-600">
              {province.name} · Generated {new Date().toLocaleDateString('en-CA', { dateStyle: 'long' })}
            </p>
            {(leadName || leadEmail) && (
              <p className="mt-1 text-sm text-gray-600">
                Prepared for: {[leadName, leadEmail].filter(Boolean).join(' · ')}
              </p>
            )}
          </header>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Net Earnings After Utility Costs</h2>
            <p className="mt-1 text-sm text-gray-600">
              Localized to {utility} using {ratePlan} rates -not generic US estimates.
            </p>
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-medium text-green-800">Net Monthly Impact</p>
              <p className="mt-1 text-3xl font-bold text-green-900">
                {netMonthly >= 0 ? '+' : '-'}
                {formatCurrencyDetailed(Math.abs(netMonthly))}
              </p>
              <p className="mt-2 text-sm text-green-800">
                Gross charger income {formatCurrencyDetailed(result.evEarnings.monthly)} minus estimated
                electricity bill {formatCurrencyDetailed(result.totalBill)}
              </p>
              <p className="mt-1 text-sm text-green-700">
                Projected net annual impact: {netAnnual >= 0 ? '+' : '-'}
                {formatCurrencyDetailed(Math.abs(netAnnual))}
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Your Setup</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-gray-600">Province</td>
                  <td className="py-1 text-right font-medium">{province.name}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Utility</td>
                  <td className="py-1 text-right font-medium">{utility}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Rate Plan</td>
                  <td className="py-1 text-right font-medium">{ratePlan}</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Charger Level</td>
                  <td className="py-1 text-right font-medium">{chargerSpeed} kW (Level 2)</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Sharing Hours</td>
                  <td className="py-1 text-right font-medium">{hoursPerDay} hrs/day</td>
                </tr>
                <tr>
                  <td className="py-1 text-gray-600">Est. EV Energy Shared</td>
                  <td className="py-1 text-right font-medium">
                    {result.evConsumption.monthly.toFixed(0)} kWh/mo
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Peak vs. Off-Peak Charging Revenue</h2>
            <p className="mt-1 text-sm text-gray-600">
              Monthly gross earnings if all {hoursPerDay} daily sharing hours were billed at each
              peer-to-peer rate tier.
            </p>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="pb-2 font-medium">Period</th>
                  <th className="pb-2 text-right font-medium">Rate</th>
                  <th className="pb-2 text-right font-medium">Monthly Gross</th>
                </tr>
              </thead>
              <tbody>
                {SHARING_RATE_SCENARIOS.map(({ label, rate, rateLabel }) => {
                  const monthly = calculateScenarioMonthlyEarnings(chargerSpeed, hoursPerDay, rate)
                  return (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{label}</td>
                      <td className="py-2 text-right">{rateLabel}</td>
                      <td className="py-2 text-right font-semibold">{formatCurrency(monthly)}/mo</td>
                    </tr>
                  )
                })}
                <tr className="font-semibold">
                  <td className="py-2">Calculated (time-weighted)</td>
                  <td className="py-2 text-right text-gray-600">varies by schedule</td>
                  <td className="py-2 text-right">{formatCurrencyDetailed(result.evEarnings.monthly)}/mo</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Monthly Earnings &amp; Bill Summary</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1">Gross Charger Income</td>
                  <td className="py-1 text-right font-medium">
                    {formatCurrencyDetailed(result.evEarnings.monthly)}
                  </td>
                </tr>
                <tr>
                  <td className="py-1">Estimated Electricity Bill</td>
                  <td className="py-1 text-right font-medium">
                    {formatCurrencyDetailed(result.totalBill)}
                  </td>
                </tr>
                <tr className="border-t border-gray-200 font-semibold">
                  <td className="py-2">Net Monthly Impact</td>
                  <td className="py-2 text-right">
                    {netMonthly >= 0 ? '+' : '-'}
                    {formatCurrencyDetailed(Math.abs(netMonthly))}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Provincial Utility Bill Breakdown</h2>
            <p className="mt-1 text-sm text-gray-600">
              Estimated offset from your local distribution company using publicly available{' '}
              {ratePlan}, TOU, ULO, and Tiered rate data where applicable.
            </p>
            <table className="mt-3 w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1">Energy (Commodity)</td>
                  <td className="py-1 text-right">{formatCurrencyDetailed(result.breakdown.commodity)}</td>
                </tr>
                <tr>
                  <td className="py-1">Delivery</td>
                  <td className="py-1 text-right">{formatCurrencyDetailed(result.breakdown.delivery)}</td>
                </tr>
                <tr>
                  <td className="py-1">Regulatory</td>
                  <td className="py-1 text-right">{formatCurrencyDetailed(result.breakdown.regulatory)}</td>
                </tr>
                {result.breakdown.oer > 0 && (
                  <tr>
                    <td className="py-1">Ontario Electricity Rebate (OER)</td>
                    <td className="py-1 text-right text-green-700">
                      -{formatCurrencyDetailed(result.breakdown.oer)}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-1">HST</td>
                  <td className="py-1 text-right">{formatCurrencyDetailed(result.breakdown.hst)}</td>
                </tr>
                <tr className="border-t border-gray-200 font-semibold">
                  <td className="py-2">Total Estimated Bill</td>
                  <td className="py-2 text-right">{formatCurrencyDetailed(result.totalBill)}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <footer className="mt-10 border-t border-gray-200 pt-4 text-xs leading-relaxed text-gray-500">
            <p>
              Estimates based on publicly available provincial utility rates from the Ontario Energy
              Board and your selected local distribution company. Actual earnings and bills may vary
              based on consumption, time-of-use patterns, and rate changes.
            </p>
            <p className="mt-2">
              Peer-to-peer sharing rates: off-peak $0.30/kWh · mid-peak $0.40/kWh · on-peak $0.50/kWh.
              Visit evchargingincome.ca for updated calculations.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
