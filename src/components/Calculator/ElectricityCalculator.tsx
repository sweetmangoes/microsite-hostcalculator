"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Calculator, Info, Sparkles, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { electricityRateData } from '@/data/electricity-rates';
import { PROVINCES, getProvinceByCode } from '@/data/provinces';
import { calculateElectricityBill } from '@/utils/electricity-calculator';
import type { RatePlan, Season, CalculationResult } from '@/utils/electricity-calculator';
import { calculateQuickEstimate, calculateScenarioMonthlyEarnings, formatCurrency, SHARING_RATE_SCENARIOS } from '@/utils/quick-estimate';
import type { QuickEstimateResult } from '@/utils/quick-estimate';
import { EmailGate } from '@/components/Calculator/EmailGate';
import { HostCTA } from '@/components/Calculator/HostCTA';
import { PrintableReport } from '@/components/Calculator/PrintableReport';
import { ChargerTypeSelector, type ChargerCategory } from '@/components/Calculator/ChargerTypeSelector';

export interface CalculatorSelections {
  provinceCode: string;
  chargerSpeed: number;
  chargerCategory: ChargerCategory;
  ratePlan: string;
}

const COLORS = {
  commodity: 'rgb(234, 88, 12)',
  delivery: 'rgb(249, 115, 22)',
  regulatory: 'rgb(251, 146, 60)',
  hst: 'rgb(253, 186, 116)',
  earnings: 'rgb(34, 197, 94)',
};

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {children}
  </div>
);

const SliderField = ({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="shrink-0 rounded-lg bg-brand-muted px-2.5 py-1 text-sm font-semibold tabular-nums text-brand-dark">
        {value}
      </span>
    </div>
    <div className="calculator-slider px-1">{children}</div>
  </div>
);

const EmptyResults = () => (
  <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-muted">
      <Calculator className="h-7 w-7 text-brand" />
    </div>
    <h3 className="text-lg font-semibold text-foreground">Your estimate will appear here</h3>
    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
      Select your province and charger type, then click &ldquo;Calculate My Earnings&rdquo; for an
      instant conservative profit estimate — no signup required.
    </p>
  </div>
);

const QuickEstimateCard = ({
  estimate,
  provinceName,
  provinceHighlight,
}: {
  estimate: QuickEstimateResult;
  provinceName: string;
  provinceHighlight: string;
}) => (
  <div className="overflow-hidden rounded-2xl border border-brand/20 bg-white shadow-sm">
    <div className="border-b border-border bg-gradient-to-r from-brand-muted/50 to-white px-6 py-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-brand" />
        <h3 className="text-lg font-semibold text-foreground">Conservative Monthly Profit Estimate</h3>
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground">
        Baseline earnings in {provinceName} — before utility offsets
      </p>
    </div>
    <div className="p-6 sm:p-8">
      <p className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
        {formatCurrency(estimate.monthlyLow)}
        <span className="text-lg font-medium text-muted-foreground">/mo</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Up to {formatCurrency(estimate.monthlyHigh)}/mo at peak rates · typical{' '}
        {formatCurrency(estimate.monthlyMid)}/mo
      </p>
      <p className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground">
        Calculations account for {provinceHighlight}. Unlock your complete provincial utility
        rate offset report and peak-hour revenue breakdown below.
      </p>
    </div>
  </div>
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }: {
  cx?: number; cy?: number; midAngle?: number; innerRadius?: number; outerRadius?: number; name?: string;
}) => {
  if (cx == null || cy == null || midAngle == null || innerRadius == null || outerRadius == null || !name) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const shortLabels: Record<string, string> = {
    Commodity: 'Eng', Delivery: 'Del', Regulatory: 'Reg', HST: 'HST', Earnings: 'Earn',
  };
  return (
    <text x={x} y={y} fill="currentColor" textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central" className="text-xs sm:text-sm font-medium fill-foreground">
      {shortLabels[name]}
    </text>
  );
};

const FinancialOverview = ({ result }: { result: CalculationResult }) => {
  const netAmount = result.evEarnings.monthly - result.totalBill;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-brand-muted/50 to-white px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand" />
          <h3 className="text-lg font-semibold text-foreground">Localized Bill & Earnings Breakdown</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2 lg:p-8">
        <div className="h-[280px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Commodity', value: result.breakdown.commodity },
                  { name: 'Delivery', value: result.breakdown.delivery },
                  { name: 'Regulatory', value: result.breakdown.regulatory },
                  { name: 'HST', value: result.breakdown.hst },
                  { name: 'Earnings', value: result.evEarnings.monthly },
                ]}
                cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel}
                outerRadius="90%" innerRadius="58%" dataKey="value" paddingAngle={2}
              >
                <Cell fill={COLORS.commodity} />
                <Cell fill={COLORS.delivery} />
                <Cell fill={COLORS.regulatory} />
                <Cell fill={COLORS.hst} />
                <Cell fill={COLORS.earnings} />
              </Pie>
              <Label
                content={(props) => {
                const viewBox = props.viewBox as { cx?: number; cy?: number } | undefined;
                const cx = viewBox?.cx ?? 0;
                const cy = viewBox?.cy ?? 0;
                const [dollar, cents] = Math.abs(netAmount).toFixed(2).split('.');
                return (
                  <g>
                    <text x={cx} y={cy - 20} textAnchor="middle" dominantBaseline="middle"
                      className="fill-foreground text-3xl font-bold sm:text-4xl">
                      {netAmount >= 0 ? '+' : '-'}${dollar}
                    </text>
                    <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle"
                      className="fill-muted-foreground text-xl sm:text-2xl">.{cents}</text>
                    <text x={cx} y={cy + 36} textAnchor="middle" dominantBaseline="middle"
                      className="fill-muted-foreground text-sm">Net Monthly</text>
                  </g>
                );
              }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {[
            { color: COLORS.commodity, label: 'Energy (Commodity)', desc: 'Cost of electricity consumed', value: result.breakdown.commodity },
            { color: COLORS.delivery, label: 'Delivery', desc: 'Cost to deliver power to your home', value: result.breakdown.delivery },
            { color: COLORS.regulatory, label: 'Regulatory', desc: 'Government and regulatory charges', value: result.breakdown.regulatory },
            { color: COLORS.hst, label: 'HST', desc: 'Harmonized Sales Tax (13%)', value: result.breakdown.hst },
            { color: COLORS.earnings, label: 'EV Charger Earnings', desc: 'Income from sharing your charger', value: result.evEarnings.monthly },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3">
              <div className="mt-0.5 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums">${item.value.toFixed(2)}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-border bg-white p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-foreground">Total Electricity Bill</span>
              <span className="text-lg font-bold tabular-nums">${result.totalBill.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResultsPanelProps {
  quickEstimate: QuickEstimateResult | null;
  provinceCode: string;
  chargerCategory: ChargerCategory;
  isUnlocked: boolean;
  onUnlock: (lead: { name: string; email: string }) => void;
  detailedResult: CalculationResult | null;
  chargerSpeed: number;
  hoursPerDay: number;
  utility: string;
  ratePlan: string;
  leadName?: string;
  leadEmail?: string;
}

const ResultsPanel = ({
  quickEstimate, provinceCode, chargerCategory, isUnlocked, onUnlock, detailedResult,
  chargerSpeed, hoursPerDay, utility, ratePlan, leadName, leadEmail,
}: ResultsPanelProps) => {
  const province = getProvinceByCode(provinceCode);

  if (!quickEstimate || !province) return <EmptyResults />;

  return (
    <div className="space-y-6">
      <QuickEstimateCard
        estimate={quickEstimate}
        provinceName={province.name}
        provinceHighlight={province.ratePlanExample}
      />

      {!isUnlocked ? (
        <EmailGate onUnlock={onUnlock} provinceName={province.name} />
      ) : (
        <>
          {province.hasDetailedRates && detailedResult ? (
            <>
              <FinancialOverview result={detailedResult} />
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground">Peak vs. Off-Peak Earnings</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
                  {SHARING_RATE_SCENARIOS.map(({ label, rate, rateLabel }) => (
                    <div
                      key={label}
                      className={`rounded-xl p-4 ${
                        label === 'Off-Peak'
                          ? 'bg-green-100 text-green-800'
                          : label === 'Mid-Peak'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      <p className="text-xs font-medium opacity-80">
                        {label} ({rateLabel})
                      </p>
                      <p className="mt-1 text-xl font-bold tabular-nums">
                        ${calculateScenarioMonthlyEarnings(chargerSpeed, hoursPerDay, rate).toFixed(0)}/mo
                      </p>
                      <p className="text-xs opacity-70">if all hours at this rate</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-brand-muted/30 px-6 py-5">
                  <p className="text-sm text-muted-foreground">Net Monthly Impact</p>
                  <p className="mt-1 text-3xl font-bold tabular-nums text-brand-dark">
                    {detailedResult.evEarnings.monthly > detailedResult.totalBill ? '+' : '-'}
                    ${Math.abs(detailedResult.evEarnings.monthly - detailedResult.totalBill).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrintableReport
                  result={detailedResult}
                  province={province}
                  chargerSpeed={chargerSpeed}
                  hoursPerDay={hoursPerDay}
                  utility={utility}
                  ratePlan={ratePlan}
                  leadName={leadName}
                  leadEmail={leadEmail}
                />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">{province.name} Utility Rates</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detailed bill calculations for {province.utilityHighlight} are coming soon.
                Your income range above uses standard Canadian peer-to-peer charging rates.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Rate plans include {province.ratePlanExample}. We&apos;re expanding provincial
                coverage — Ontario hosts already get full localized breakdowns today.
              </p>
            </div>
          )}

          <HostCTA
            province={provinceCode}
            chargerSpeed={chargerSpeed}
            chargerCategory={chargerCategory}
            ratePlan={ratePlan}
            monthlyEarnings={detailedResult?.evEarnings.monthly ?? quickEstimate.monthlyMid}
          />
        </>
      )}

      <DisclaimerPanel provinceCode={provinceCode} />
    </div>
  );
};

const DisclaimerPanel = ({ provinceCode }: { provinceCode: string }) => {
  const isOntario = provinceCode === 'ON';
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/30 px-6 py-4">
        <Info className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">About These Estimates</h2>
      </div>
      <div className="space-y-4 p-6 text-sm leading-relaxed text-muted-foreground">
        {isOntario ? (
          <>
            <p>
              Detailed calculations use the latest publicly available Regulated Price Plan (RPP)
              rates from the Ontario Energy Board (OEB) and delivery charges from your selected
              local distribution company.
            </p>
            <p>For official rate information, visit the{' '}
              <a href="https://www.oeb.ca/" target="_blank" rel="noopener noreferrer"
                className="font-medium text-brand hover:underline">Ontario Energy Board</a>.
            </p>
          </>
        ) : (
          <p>
            Income ranges are based on standard peer-to-peer EV charging rates across Canada.
            Provincial utility cost offsets will be added as we expand localized rate data.
          </p>
        )}
        <p className="text-xs">
          This tool is a free public resource for Canadian property owners exploring EV charger
          hosting income. Estimates are for educational purposes and may differ from actual bills.
        </p>
      </div>
    </div>
  );
};

const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <div className="h-5 w-40 rounded bg-muted" />
        <div className="mt-2 h-4 w-56 rounded bg-muted" />
      </div>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-12 rounded-xl bg-muted" />
        </div>
        <div className="h-24 rounded-xl bg-muted" />
        <div className="h-10 rounded-xl bg-muted" />
      </div>
    </div>
    <div className="h-12 rounded-xl bg-muted" />
  </div>
);

export const ElectricityCalculator = ({
  onSelectionsChange,
}: {
  onSelectionsChange?: (selections: CalculatorSelections) => void;
}) => {
  const [provinceCode, setProvinceCode] = useState('ON');
  const [chargerCategory, setChargerCategory] = useState<ChargerCategory>('level2');
  const [consumption, setConsumption] = useState(760);
  const [ratePlan, setRatePlan] = useState<RatePlan>('TOU');
  const [utility, setUtility] = useState('Hydro One Networks Inc.');
  const [rateZone, setRateZone] = useState('Main');
  const [season, setSeason] = useState<Season>('winter');
  const [isWeekend, setIsWeekend] = useState(false);
  const [quickEstimate, setQuickEstimate] = useState<QuickEstimateResult | null>(null);
  const [detailedResult, setDetailedResult] = useState<CalculationResult | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadName, setLeadName] = useState<string>();
  const [leadEmail, setLeadEmail] = useState<string>();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [chargerSpeed, setChargerSpeed] = useState(10);
  const [sharingStartHour, setSharingStartHour] = useState(19);
  const [mounted, setMounted] = useState(false);

  const selectedProvince = getProvinceByCode(provinceCode);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onSelectionsChange?.({
      provinceCode,
      chargerSpeed,
      chargerCategory,
      ratePlan,
    });
  }, [provinceCode, chargerSpeed, chargerCategory, ratePlan, onSelectionsChange]);

  useEffect(() => {
    if (sessionStorage.getItem('calculator_unlocked') === 'true') {
      setIsUnlocked(true);
      setLeadEmail(sessionStorage.getItem('calculator_lead_email') ?? undefined);
      setLeadName(sessionStorage.getItem('calculator_lead_name') ?? undefined);
    }
  }, []);

  const utilities = electricityRateData.utilities.reduce((acc, u) => {
    const existing = acc.find((item) => item.name === u.name);
    if (!existing) {
      acc.push({ name: u.name, rateZones: u.rateZone ? [u.rateZone] : [] });
    } else if (u.rateZone && !existing.rateZones.includes(u.rateZone)) {
      existing.rateZones.push(u.rateZone);
    }
    return acc;
  }, [] as Array<{ name: string; rateZones: string[] }>);

  const selectedUtility = utilities.find((u) => u.name === utility);
  const hasMultipleRateZones = (selectedUtility?.rateZones.length ?? 0) > 1;

  const runQuickEstimate = () => {
    setQuickEstimate(calculateQuickEstimate({ chargerSpeed, hoursPerDay }));

    if (selectedProvince?.hasDetailedRates) {
      try {
        const result = calculateElectricityBill({
          consumption, ratePlan, utility, rateZone, season, isWeekend,
          evChargerHours: hoursPerDay, evChargerSpeed: chargerSpeed, evChargerStartHour: sharingStartHour,
        }, electricityRateData);
        setDetailedResult(result);
      } catch (error) {
        console.error('Detailed calculation error:', error);
        setDetailedResult(null);
      }
    } else {
      setDetailedResult(null);
    }
  };

  const handleUnlock = (lead: { name: string; email: string }) => {
    setIsUnlocked(true);
    setLeadName(lead.name);
    setLeadEmail(lead.email);
  };

  const handleUtilityChange = (value: string) => {
    const exact = electricityRateData.utilities.find((u) => u.name === value);
    if (exact) {
      setUtility(exact.name);
      setRateZone(exact.rateZone ?? '');
    }
  };

  const formatHour = (hour: number) => {
    const h = hour % 12 || 12;
    return `${h}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
      {!mounted ? (
        <FormSkeleton />
      ) : (
        <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Your Charger Setup</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Tap to select — no typing required
            </p>
          </div>
          <div className="space-y-6 p-6">
            <FormField label="Province">
              <Select value={provinceCode} onValueChange={setProvinceCode}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your province" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map((p) => (
                    <SelectItem key={p.code} value={p.code}>
                      {p.name}{p.hasDetailedRates ? ' ✓' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <ChargerTypeSelector
              category={chargerCategory}
              chargerSpeed={chargerSpeed}
              onCategoryChange={setChargerCategory}
              onSpeedChange={setChargerSpeed}
            />

            <SliderField label="Sharing Hours Per Day" value={`${hoursPerDay} hrs`}>
              <Slider min={0} max={24} step={0.5} value={hoursPerDay}
                onChange={(v) => setHoursPerDay(v as number)} />
            </SliderField>

            {selectedProvince && (
              <div className="rounded-xl border border-brand/15 bg-brand-muted/30 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {selectedProvince.name} rate intelligence
                </p>
                <p className="mt-1">
                  Our backend models {selectedProvince.utilityHighlight} — including{' '}
                  {selectedProvince.ratePlanExample}. Not generic American utility data.
                </p>
              </div>
            )}
          </div>
        </div>

        {selectedProvince?.hasDetailedRates && (
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-secondary/30">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Fine-Tune with Your Utility</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {selectedProvince.utilityHighlight} · {selectedProvince.ratePlanExample}
                </p>
              </div>
              {showAdvanced ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> :
                <ChevronDown className="h-5 w-5 text-muted-foreground" />}
            </button>

            {showAdvanced && (
              <div className="space-y-6 border-t border-border p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="Utility Provider">
                    <Select value={utility} onValueChange={handleUtilityChange}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {utilities.map((u) => (
                          <SelectItem key={u.name} value={u.name}>{u.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>

                  {hasMultipleRateZones && (
                    <FormField label="Rate Zone">
                      <Select value={rateZone} onValueChange={setRateZone}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {selectedUtility?.rateZones.map((zone) => (
                            <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                  )}

                  <FormField label="Rate Plan">
                    <Select value={ratePlan} onValueChange={(v) => setRatePlan(v as RatePlan)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TOU">Time of Use (TOU)</SelectItem>
                        <SelectItem value="ULO">Ultra-Low Overnight (ULO)</SelectItem>
                        <SelectItem value="Tiered">Tiered</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="Season">
                    <Select value={season} onValueChange={(v) => setSeason(v as Season)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="winter">Winter</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <SliderField label="Total Monthly Consumption" value={`${consumption} kWh`}>
                  <Slider min={0} max={2000} step={50} value={consumption}
                    onChange={(v) => setConsumption(v as number)} />
                </SliderField>

                <SliderField label="Sharing Start Time" value={formatHour(sharingStartHour)}>
                  <Slider min={0} max={23} step={1} value={sharingStartHour}
                    onChange={(v) => setSharingStartHour(v as number)} />
                </SliderField>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4">
                  <input type="checkbox" checked={isWeekend} onChange={(e) => setIsWeekend(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-brand accent-brand" />
                  <span className="text-sm">Include weekend charging in calculations</span>
                </label>
              </div>
            )}
          </div>
        )}

        {!selectedProvince?.hasDetailedRates && selectedProvince && (
          <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">{selectedProvince.name}</strong> — income range
              uses national peer-to-peer rates. Detailed {selectedProvince.utilityHighlight}{' '}
              breakdowns are coming soon.{' '}
              <Link href="#calculator" className="font-medium text-brand hover:underline">
                Ontario hosts
              </Link>{' '}
              get full localized calculations today.
            </p>
          </div>
        )}

        <button type="button" onClick={runQuickEstimate}
          className="w-full rounded-xl bg-brand py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark active:scale-[0.99]">
          Calculate My Earnings
        </button>
        <p className="text-center text-xs font-medium text-muted-foreground">
          Updated for 2026 Provincial Utility Rates
        </p>
        </div>
      )}

      <ResultsPanel
        quickEstimate={quickEstimate}
        provinceCode={provinceCode}
        chargerCategory={chargerCategory}
        isUnlocked={isUnlocked}
        onUnlock={handleUnlock}
        detailedResult={detailedResult}
        chargerSpeed={chargerSpeed}
        hoursPerDay={hoursPerDay}
        utility={utility}
        ratePlan={ratePlan}
        leadName={leadName}
        leadEmail={leadEmail}
      />
    </div>
  );
};
