import { ElectricityRateData, TimePeriod } from '@/types/electricity-rates';

export type RatePlan = 'TOU' | 'ULO' | 'Tiered';
export type Season = 'winter' | 'summer';

interface CalculationInput {
  consumption: number;
  ratePlan: RatePlan;
  utility: string;
  rateZone?: string;
  season: Season;
  isWeekend: boolean;
  evChargerHours: number;
  evChargerSpeed: number;
  evChargerStartHour: number;
}

export interface CalculationResult {
  totalBill: number;
  breakdown: {
    commodity: number;
    delivery: number;
    regulatory: number;
    oer: number;
    hst: number;
  };
  evEarnings: {
    daily: number;
    monthly: number;
    yearly: number;
  };
  evConsumption: {
    daily: number;
    monthly: number;
  };
}

const isTimeInPeriod = (hour: number, period: TimePeriod): boolean => {
  if (period.start <= period.end) {
    return hour >= period.start && hour < period.end;
  } else {
    // Handle overnight periods (e.g., 19:00 to 07:00)
    return hour >= period.start || hour < period.end;
  }
};

const getRateForTimePeriod = (
  hour: number,
  isWeekend: boolean,
  ratePlan: RatePlan,
  season: Season,
  rateData: ElectricityRateData
): number => {
  if (isWeekend) {
    if (ratePlan === 'ULO') {
      return rateData.rpp.ulo.weekendOffPeak;
    }
    return rateData.rpp.tou[season].offPeak;
  }

  if (ratePlan === 'ULO') {
    if (isTimeInPeriod(hour, rateData.ratePeriods.ulo.ultraLowOvernight[0])) {
      return rateData.rpp.ulo.ultraLowOvernight;
    }
    if (isTimeInPeriod(hour, rateData.ratePeriods.ulo.midPeak[0])) {
      return rateData.rpp.ulo.midPeak;
    }
    if (isTimeInPeriod(hour, rateData.ratePeriods.ulo.onPeak[0])) {
      return rateData.rpp.ulo.onPeak;
    }
    return rateData.rpp.ulo.weekendOffPeak;
  }

  if (ratePlan === 'TOU') {
    if (isTimeInPeriod(hour, rateData.ratePeriods.tou[season].offPeak[0])) {
      return rateData.rpp.tou[season].offPeak;
    }
    if (isTimeInPeriod(hour, rateData.ratePeriods.tou[season].midPeak[0])) {
      return rateData.rpp.tou[season].midPeak;
    }
    if (isTimeInPeriod(hour, rateData.ratePeriods.tou[season].onPeak[0])) {
      return rateData.rpp.tou[season].onPeak;
    }
    return rateData.rpp.tou[season].offPeak;
  }

  // Tiered rate plan
  return rateData.rpp.tiered[season].tier1;
};

export const calculateElectricityBill = (
  input: CalculationInput,
  rateData: ElectricityRateData
): CalculationResult => {
  console.log('Looking for utility:', input.utility);
  console.log('Available utilities:', rateData.utilities.map(u => ({ name: u.name, rateZone: u.rateZone })));
  
  const utility = rateData.utilities.find(
    (u) => {
      const utilityNameMatch = u.name.trim().toLowerCase() === input.utility.trim().toLowerCase();
      const rateZoneMatch = !input.rateZone || 
        (u.rateZone && u.rateZone.trim().toLowerCase() === input.rateZone.trim().toLowerCase());
      return utilityNameMatch && rateZoneMatch;
    }
  );

  if (!utility) {
    console.error('Utility not found:', {
      searchedFor: input.utility,
      rateZone: input.rateZone,
      availableUtilities: rateData.utilities.map(u => ({ name: u.name, rateZone: u.rateZone }))
    });
    throw new Error(`Utility ${input.utility} not found`);
  }

  const residentialClass = utility.residentialClasses[0];
  const { deliveryCharges, regulatoryCharges, lossFactor } = residentialClass;

  // Calculate EV Charger Consumption
  const evDailyConsumption = input.evChargerHours * input.evChargerSpeed;
  const evMonthlyConsumption = evDailyConsumption * 28; // Approximate days in a month
  const totalMonthlyConsumption = input.consumption + evMonthlyConsumption;

  // Apply loss factor to consumption
  const adjustedConsumption = totalMonthlyConsumption * lossFactor;

  // Calculate Commodity Charges
  let commodityCharge = 0;
  if (input.ratePlan === 'Tiered') {
    const tieredRates = rateData.rpp.tiered[input.season];
    const tier1Consumption = Math.min(adjustedConsumption, tieredRates.threshold);
    const tier2Consumption = Math.max(0, adjustedConsumption - tieredRates.threshold);
    commodityCharge = (
      tier1Consumption * tieredRates.tier1 +
      tier2Consumption * tieredRates.tier2
    );
  } else if (input.ratePlan === 'ULO') {
    // Use OEB's specific period breakdowns for ULO
    const periodBreakdown = {
      onPeak: 26.7,
      midPeak: 201.3,
      weekendOffPeak: 260.7,
      ultraLowOvernight: 271.7
    };
    
    // Scale the breakdown to match total consumption
    const scaleFactor = adjustedConsumption / (periodBreakdown.onPeak + periodBreakdown.midPeak + 
      periodBreakdown.weekendOffPeak + periodBreakdown.ultraLowOvernight);
    
    commodityCharge = (
      periodBreakdown.onPeak * scaleFactor * rateData.rpp.ulo.onPeak +
      periodBreakdown.midPeak * scaleFactor * rateData.rpp.ulo.midPeak +
      periodBreakdown.weekendOffPeak * scaleFactor * rateData.rpp.ulo.weekendOffPeak +
      periodBreakdown.ultraLowOvernight * scaleFactor * rateData.rpp.ulo.ultraLowOvernight
    );
  } else {
    // For TOU, calculate based on time periods
    const periodConsumption = adjustedConsumption / 3; // Simplified distribution
    commodityCharge = periodConsumption * getRateForTimePeriod(
      input.evChargerStartHour,
      input.isWeekend,
      input.ratePlan,
      input.season,
      rateData
    );
  }

  // Calculate Delivery Charges
  const deliveryCharge = (
    deliveryCharges.serviceCharge +
    (deliveryCharges.smartMeteringCharge || 0) +
    adjustedConsumption * deliveryCharges.distributionRate +
    adjustedConsumption * deliveryCharges.transmissionNetworkRate +
    adjustedConsumption * deliveryCharges.transmissionConnectionRate
  );

  // Calculate Regulatory Charges
  const regulatoryCharge = (
    adjustedConsumption * regulatoryCharges.wholesaleMarketServiceRate +
    adjustedConsumption * regulatoryCharges.capacityBasedRecovery +
    adjustedConsumption * regulatoryCharges.ruralRemoteProtectionCharge +
    (regulatoryCharges.standardSupplyServiceCharge || 0)
  );

  // Calculate Rate Riders
  const deliveryRateRiders = deliveryCharges.rateRiders.reduce(
    (sum, rider) => sum + (rider.rate * adjustedConsumption), 0
  );
  const regulatoryRateRiders = regulatoryCharges.rateRiders.reduce(
    (sum, rider) => sum + (rider.rate * adjustedConsumption), 0
  );

  // Calculate OER and HST
  const subtotal = commodityCharge + deliveryCharge + regulatoryCharge + deliveryRateRiders + regulatoryRateRiders;
  const oer = subtotal * (rateData.oerPercentage / 100);
  const hst = (subtotal - oer) * (rateData.hstRate / 100);
  const totalBill = subtotal - oer + hst;

  // Calculate EV Charger Sharing Earnings
  const SHARING_RATES = {
    OFF_PEAK: 0.30, // per kWh
    MID_PEAK: 0.40, // per kWh
    ON_PEAK: 0.50, // per kWh
  };

  let dailyEarnings = 0;
  console.log('EV Charger Settings:', {
    speed: input.evChargerSpeed,
    hours: input.evChargerHours,
    startHour: input.evChargerStartHour,
    isWeekend: input.isWeekend
  });

  // Helper function to get rate for a specific hour
  const getRateForHour = (hour: number): number => {
    if (input.isWeekend) {
      return SHARING_RATES.OFF_PEAK;
    }
    
    // Weekday rates
    if (hour >= 19 || hour < 7) {
      // Off-peak: 7 PM to 7 AM
      return SHARING_RATES.OFF_PEAK;
    } else if (hour >= 11 && hour < 17) {
      // Mid-peak: 11 AM to 5 PM
      return SHARING_RATES.MID_PEAK;
    } else {
      // On-peak: 7 AM to 11 AM and 5 PM to 7 PM
      return SHARING_RATES.ON_PEAK;
    }
  };

  // Calculate earnings for each hour, handling partial hours
  let remainingHours = input.evChargerHours;
  let currentHour = input.evChargerStartHour;
  
  while (remainingHours > 0) {
    const rate = getRateForHour(currentHour);
    const hoursInThisPeriod = Math.min(remainingHours, 1); // Handle partial hours
    
    const periodEarnings = input.evChargerSpeed * rate * hoursInThisPeriod;
    dailyEarnings += periodEarnings;
    
    console.log(`Hour ${currentHour}:`, {
      rate,
      hoursInThisPeriod,
      periodEarnings
    });
    
    remainingHours -= hoursInThisPeriod;
    currentHour = (currentHour + 1) % 24;
  }

  console.log('Daily Earnings:', dailyEarnings);
  const monthlyEarnings = dailyEarnings * 30; // Using 30 days for monthly calculation
  console.log('Monthly Earnings:', monthlyEarnings);
  const yearlyEarnings = dailyEarnings * 365;

  return {
    totalBill,
    breakdown: {
      commodity: commodityCharge,
      delivery: deliveryCharge,
      regulatory: regulatoryCharge,
      oer,
      hst,
    },
    evEarnings: {
      daily: dailyEarnings,
      monthly: monthlyEarnings,
      yearly: yearlyEarnings,
    },
    evConsumption: {
      daily: evDailyConsumption,
      monthly: evMonthlyConsumption,
    },
  };
}; 