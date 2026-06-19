'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PreListFormModal } from '@/components/Calculator/PreListFormModal'
import type { ChargerCategory } from '@/components/Calculator/ChargerTypeSelector'

interface HostCTAProps {
  province: string
  chargerSpeed: number
  chargerCategory?: ChargerCategory
  ratePlan?: string
  monthlyEarnings?: number
  variant?: 'primary' | 'compact'
}

const CTA_LABEL = 'Pre-List Your Charger & Claim Your Spot'
const CTA_CLAIMED_LABEL = 'Spot Claimed'

export function HostCTA({
  province,
  chargerSpeed,
  chargerCategory,
  ratePlan,
  monthlyEarnings,
  variant = 'primary',
}: HostCTAProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('calculator_prelist_submitted') === 'true') {
      setSubmitted(true)
    }
  }, [])

  const handleSuccess = () => {
    setSubmitted(true)
    setFormOpen(false)
  }

  const buttonClass =
    variant === 'compact'
      ? 'inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/25 transition hover:bg-brand-dark disabled:cursor-default disabled:opacity-80'
      : 'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark sm:w-auto disabled:cursor-default disabled:opacity-80'

  const button = submitted ? (
    <button type="button" disabled className={buttonClass}>
      <CheckCircle2 className={variant === 'compact' ? 'h-4 w-4' : 'h-5 w-5'} />
      {CTA_CLAIMED_LABEL}
    </button>
  ) : (
    <button type="button" onClick={() => setFormOpen(true)} className={buttonClass}>
      {CTA_LABEL}
      <ArrowRight className={variant === 'compact' ? 'h-4 w-4' : 'h-5 w-5'} />
    </button>
  )

  const modal = (
    <PreListFormModal
      open={formOpen}
      onClose={() => setFormOpen(false)}
      onSuccess={handleSuccess}
      province={province}
      chargerSpeed={chargerSpeed}
      chargerCategory={chargerCategory}
      ratePlan={ratePlan}
    />
  )

  if (variant === 'compact') {
    return (
      <>
        {button}
        {modal}
      </>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-brand/40 bg-gradient-to-br from-brand-muted to-white p-6 shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
        Your next step
      </p>
      {monthlyEarnings !== undefined && (
        <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
          ~${monthlyEarnings.toFixed(0)}/mo potential
        </p>
      )}
      {submitted ? (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Thanks — your charger is pre-listed. We&apos;ll follow up with next steps.
          </p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Share your address and contact details to pre-list your charger — we&apos;ll save your
          spot and follow up with next steps.
        </p>
      )}
      {button}
      {modal}
    </div>
  )
}
