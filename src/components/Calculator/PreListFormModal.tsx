'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader2, MapPin, X } from 'lucide-react'
import { PROVINCES } from '@/data/provinces'
import type { ChargerCategory } from '@/components/Calculator/ChargerTypeSelector'

const INPUT_CLASS =
  'w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

interface PreListFormModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  province: string
  chargerSpeed: number
  chargerCategory?: ChargerCategory
  ratePlan?: string
}

export function PreListFormModal({
  open,
  onClose,
  onSuccess,
  province,
  chargerSpeed,
  chargerCategory,
  ratePlan,
}: PreListFormModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const provinceName = PROVINCES.find((p) => p.code === province)?.name ?? province

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const storedName = sessionStorage.getItem('calculator_lead_name')
    const storedEmail = sessionStorage.getItem('calculator_lead_email')
    if (storedName) setName(storedName)
    if (storedEmail) setEmail(storedEmail)
    setError(null)
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open || !mounted) return null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/pre-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          province,
          chargerSpeed,
          chargerCategory,
          ratePlan,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to submit. Please try again.')
      }

      sessionStorage.setItem('calculator_prelist_submitted', 'true')
      sessionStorage.setItem('calculator_lead_email', email)
      sessionStorage.setItem('calculator_lead_name', name)
      onSuccess()
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <button
          type="button"
          aria-label="Close form"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="prelist-form-title"
          className="relative my-8 w-full max-w-lg rounded-2xl border border-border bg-white shadow-2xl"
        >
          <div className="flex items-start justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                <MapPin className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h2 id="prelist-form-title" className="text-lg font-semibold text-foreground">
                  Pre-List Your Charger
                </h2>
                <p className="text-sm text-muted-foreground">
                  Claim your spot — we&apos;ll follow up soon
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 p-6">
            <div className="rounded-xl border border-brand/20 bg-brand-muted/40 px-4 py-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{provinceName}</span>
              {' · '}
              {chargerCategory === 'dcfast' ? 'DC Fast' : 'Level 2'} · {chargerSpeed} kW
              {ratePlan ? ` · ${ratePlan}` : ''}
            </div>

            <input
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={INPUT_CLASS}
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT_CLASS}
            />
            <input
              type="tel"
              required
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={INPUT_CLASS}
            />
            <input
              type="text"
              required
              placeholder="Street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={INPUT_CLASS}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={INPUT_CLASS}
              />
              <input
                type="text"
                required
                placeholder="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving your spot…
                </>
              ) : (
                'Claim My Spot'
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Free. No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
