export interface TimePeriod {
  start: number; // 24-hour format
  end: number; // 24-hour format
}

export interface RatePeriods {
  winter: {
    offPeak: TimePeriod[];
    midPeak: TimePeriod[];
    onPeak: TimePeriod[];
  };
  summer: {
    offPeak: TimePeriod[];
    midPeak: TimePeriod[];
    onPeak: TimePeriod[];
  };
}

export interface UloRatePeriods {
  ultraLowOvernight: TimePeriod[];
  weekendOffPeak: TimePeriod[];
  midPeak: TimePeriod[];
  onPeak: TimePeriod[];
}

export interface RppRates {
  tou: {
    winter: {
      offPeak: number;
      midPeak: number;
      onPeak: number;
    };
    summer: {
      offPeak: number;
      midPeak: number;
      onPeak: number;
    };
  };
  ulo: {
    ultraLowOvernight: number;
    weekendOffPeak: number;
    midPeak: number;
    onPeak: number;
  };
  tiered: {
    winter: {
      tier1: number;
      tier2: number;
      threshold: number;
    };
    summer: {
      tier1: number;
      tier2: number;
      threshold: number;
    };
  };
}

export interface DeliveryCharges {
  serviceCharge: number;
  smartMeteringCharge?: number;
  distributionRate: number;
  lowVoltageServiceRate?: number;
  transmissionNetworkRate: number;
  transmissionConnectionRate: number;
  rateRiders: Array<{
    name: string;
    rate: number;
    unit: string;
    effectiveDate: string;
  }>;
}

export interface RegulatoryCharges {
  wholesaleMarketServiceRate: number;
  capacityBasedRecovery: number;
  ruralRemoteProtectionCharge: number;
  standardSupplyServiceCharge?: number;
  rateRiders: Array<{
    name: string;
    rate: number;
    unit: string;
    effectiveDate: string;
  }>;
}

export interface UtilityRates {
  name: string;
  rateZone?: string;
  effectiveDate: string;
  residentialClasses: Array<{
    name: string;
    deliveryCharges: DeliveryCharges;
    regulatoryCharges: RegulatoryCharges;
    lossFactor: number;
  }>;
}

export interface ElectricityRateData {
  rpp: RppRates;
  ratePeriods: {
    tou: RatePeriods;
    ulo: UloRatePeriods;
  };
  utilities: UtilityRates[];
  oerPercentage: number;
  hstRate: number;
} 