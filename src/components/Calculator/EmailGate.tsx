'use client'

import { useState } from 'react'
import { Lock, Mail, Loader2 } from 'lucide-react'

interface EmailGateProps {
  onUnlock: (lead: { name: string; email: string }) => void
  provinceName: string
}

export function EmailGate({ onUnlock, provinceName }: EmailGateProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, province: provinceName }),
      })

      if (!response.ok) {
        throw new Error('Unable to submit. Please try again.')
      }

      sessionStorage.setItem('calculator_unlocked', 'true')
      sessionStorage.setItem('calculator_lead_email', email)
      sessionStorage.setItem('calculator_lead_name', name)
      onUnlock({ name, email })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-muted/60 to-white shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08),transparent_60%)]" />
      <div className="relative p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
            <Lock className="h-5 w-5 text-brand" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Unlock your complete provincial utility rate offset report
            </h3>
            <p className="text-sm text-muted-foreground">
              Plus your peak-hour revenue breakdown for {provinceName}
            </p>
          </div>
        </div>

        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            Net earnings after your local utility costs — not generic US estimates
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            Peak vs. off-peak charging revenue breakdown
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            Downloadable PDF report for your records
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Unlocking…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Unlock My Full Report
              </>
            )}
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Free. No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}