'use client'

import { Zap, BatteryCharging } from 'lucide-react'

export type ChargerCategory = 'level2' | 'dcfast'

const LEVEL2_SPEEDS = [7, 10, 11, 22] as const
const DCFAST_SPEEDS = [50, 100, 150] as const

interface ChargerTypeSelectorProps {
  category: ChargerCategory
  chargerSpeed: number
  onCategoryChange: (category: ChargerCategory) => void
  onSpeedChange: (speed: number) => void
}

export function ChargerTypeSelector({
  category,
  chargerSpeed,
  onCategoryChange,
  onSpeedChange,
}: ChargerTypeSelectorProps) {
  const speeds = category === 'level2' ? LEVEL2_SPEEDS : DCFAST_SPEEDS

  return (
    <div className="space-y-4">
      <span className="text-sm font-medium text-foreground">Charger Type</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            onCategoryChange('level2')
            if (!LEVEL2_SPEEDS.includes(chargerSpeed as (typeof LEVEL2_SPEEDS)[number])) {
              onSpeedChange(10)
            }
          }}
          className={`flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition ${
            category === 'level2'
              ? 'border-brand bg-brand-muted/50 shadow-sm'
              : 'border-border bg-white hover:border-brand/40 hover:bg-secondary/30'
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              category === 'level2' ? 'bg-brand text-white' : 'bg-secondary text-muted-foreground'
            }`}
          >
            <BatteryCharging className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Level 2 Charger</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Home &amp; workplace · 7–22 kW
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            onCategoryChange('dcfast')
            if (!DCFAST_SPEEDS.includes(chargerSpeed as (typeof DCFAST_SPEEDS)[number])) {
              onSpeedChange(50)
            }
          }}
          className={`flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition ${
            category === 'dcfast'
              ? 'border-brand bg-brand-muted/50 shadow-sm'
              : 'border-border bg-white hover:border-brand/40 hover:bg-secondary/30'
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              category === 'dcfast' ? 'bg-brand text-white' : 'bg-secondary text-muted-foreground'
            }`}
          >
            <Zap className="h-6 w-6" fill="currentColor" />
          </div>
          <div>
            <p className="font-semibold text-foreground">DC Fast Charger</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Commercial &amp; fleet · 50–150 kW
            </p>
          </div>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {speeds.map((speed) => (
          <button
            key={speed}
            type="button"
            onClick={() => onSpeedChange(speed)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              chargerSpeed === speed
                ? 'bg-brand text-white shadow-sm'
                : 'bg-secondary/60 text-foreground hover:bg-secondary'
            }`}
          >
            {speed} kW
          </button>
        ))}
      </div>
    </div>
  )
}

export { LEVEL2_SPEEDS, DCFAST_SPEEDS }
