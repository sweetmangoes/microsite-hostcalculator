'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { ElectricityCalculator } from '@/components/Calculator/ElectricityCalculator'
import { HostCTA } from '@/components/Calculator/HostCTA'
import type { CalculatorSelections } from '@/components/Calculator/ElectricityCalculator'

const DEFAULT_SELECTIONS: CalculatorSelections = {
  provinceCode: 'ON',
  chargerSpeed: 10,
  chargerCategory: 'level2',
  ratePlan: 'TOU',
}

export function CalculatorShell() {
  const [selections, setSelections] = useState<CalculatorSelections>(DEFAULT_SELECTIONS)

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.15),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[length:24px_24px]"
      />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
              <Zap className="h-4 w-4" fill="currentColor" />
            </span>
            EV Charging Income
          </div>
          <HostCTA
            province={selections.provinceCode}
            chargerSpeed={selections.chargerSpeed}
            chargerCategory={selections.chargerCategory}
            ratePlan={selections.ratePlan}
            variant="compact"
          />
        </div>
      </header>

      <main className="grow">
        <section className="px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-dark">
              Free · No signup required
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How Much Can You Earn From Your EV Charger?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Built for Canadian property owners. Our backend accounts for provincial rate
              structures — from Ontario&apos;s Ultra-Low Overnight (ULO) rates to BC Hydro&apos;s
              tiered commercial schedules.
            </p>
            <p className="mt-3 text-sm font-medium text-brand-dark">
              Updated for 2026 provincial utility rates across Canada
            </p>
          </div>
        </section>

        <section id="calculator" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <ElectricityCalculator onSelectionsChange={setSelections} />
        </section>

        <section className="border-t border-border bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Turn Your Estimate Into Real Income
            </h2>
            <p className="mt-3 text-muted-foreground">
              Thousands of Canadian property owners are earning passive income by sharing their
              chargers. Pre-list your charger to claim your spot — your calculator details carry
              over to the form.
            </p>
            <div className="mt-8 flex justify-center">
              <HostCTA
                province={selections.provinceCode}
                chargerSpeed={selections.chargerSpeed}
                chargerCategory={selections.chargerCategory}
                ratePlan={selections.ratePlan}
                variant="compact"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <nav
          className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2"
          aria-label="Related pages"
        >
          <Link
            href="https://wattshare.ca/earn-money-from-your-ev-charger"
            className="transition hover:text-brand"
          >
            How charger sharing works
          </Link>
          <Link
            href="https://wattshare.ca/FAQ"
            className="transition hover:text-brand"
          >
            FAQ
          </Link>
          <Link href="https://wattshare.ca" className="transition hover:text-brand">
            Powered by WattShare
          </Link>
        </nav>
        <p>
          &copy; {new Date().getFullYear()} EV Charging Income Calculator. A free public
          resource for Canadian property owners.
        </p>
      </footer>
    </div>
  )
}
