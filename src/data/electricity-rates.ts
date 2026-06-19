import { ElectricityRateData } from '@/types/electricity-rates';

export const electricityRateData: ElectricityRateData = {
  rpp: {
    tou: {
      winter: {
        offPeak: 0.082, // ¢/kWh
        midPeak: 0.113, // ¢/kWh
        onPeak: 0.174, // ¢/kWh
      },
      summer: {
        offPeak: 0.082, // ¢/kWh
        midPeak: 0.113, // ¢/kWh
        onPeak: 0.174, // ¢/kWh
      },
    },
    ulo: {
      ultraLowOvernight: 0.024, // ¢/kWh
      weekendOffPeak: 0.082, // ¢/kWh
      midPeak: 0.113, // ¢/kWh
      onPeak: 0.174, // ¢/kWh
    },
    tiered: {
      winter: {
        tier1: 0.093, // ¢/kWh
        tier2: 0.109, // ¢/kWh
        threshold: 1000, // kWh
      },
      summer: {
        tier1: 0.093, // ¢/kWh
        tier2: 0.109, // ¢/kWh
        threshold: 600, // kWh
      },
    },
  },
  ratePeriods: {
    tou: {
      winter: {
        offPeak: [
          { start: 19, end: 7 }, // 7 PM to 7 AM
        ],
        midPeak: [
          { start: 11, end: 17 }, // 11 AM to 5 PM
        ],
        onPeak: [
          { start: 7, end: 11 }, // 7 AM to 11 AM
          { start: 17, end: 19 }, // 5 PM to 7 PM
        ],
      },
      summer: {
        offPeak: [
          { start: 19, end: 7 }, // 7 PM to 7 AM
        ],
        midPeak: [
          { start: 11, end: 17 }, // 11 AM to 5 PM
        ],
        onPeak: [
          { start: 7, end: 11 }, // 7 AM to 11 AM
          { start: 17, end: 19 }, // 5 PM to 7 PM
        ],
      },
    },
    ulo: {
      ultraLowOvernight: [
        { start: 23, end: 7 }, // 11 PM to 7 AM
      ],
      weekendOffPeak: [
        { start: 0, end: 24 }, // All day on weekends
      ],
      midPeak: [
        { start: 11, end: 17 }, // 11 AM to 5 PM
      ],
      onPeak: [
        { start: 7, end: 11 }, // 7 AM to 11 AM
        { start: 17, end: 23 }, // 5 PM to 11 PM
      ],
    },
  },
  utilities: [
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Main",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Toronto Hydro",
      rateZone: "Toronto",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "COMPETITIVE SECTOR MULTI-UNIT RESIDENTIAL",
          deliveryCharges: {
            serviceCharge: 28.00,
            distributionRate: 0.028,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [
              {
                name: "Global Adjustment",
                rate: 0.012,
                unit: "$/kWh",
                effectiveDate: "2025-01-01"
              },
              {
                name: "Conservation and Demand Management",
                rate: 0.001,
                unit: "$/kWh",
                effectiveDate: "2025-01-01"
              }
            ],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [
              {
                name: "Debt Retirement Charge",
                rate: 0.001,
                unit: "$/kWh",
                effectiveDate: "2025-01-01"
              }
            ],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Brampton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Hydro Ottawa",
      rateZone: "Ottawa",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 26.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Enova Power",
      rateZone: "Kitchener",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "London Hydro",
      rateZone: "London",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Rural",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 30.00,
            distributionRate: 0.030,
            transmissionNetworkRate: 0.016,
            transmissionConnectionRate: 0.011,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.016,
            capacityBasedRecovery: 0.011,
            ruralRemoteProtectionCharge: 0.006,
            rateRiders: [],
          },
          lossFactor: 1.08,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Mississauga",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Hamilton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "North",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 32.00,
            distributionRate: 0.032,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "South",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 28.00,
            distributionRate: 0.028,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Vaughan",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Markham",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "East",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 29.00,
            distributionRate: 0.029,
            transmissionNetworkRate: 0.016,
            transmissionConnectionRate: 0.011,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.016,
            capacityBasedRecovery: 0.011,
            ruralRemoteProtectionCharge: 0.006,
            rateRiders: [],
          },
          lossFactor: 1.08,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "West",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 29.00,
            distributionRate: 0.029,
            transmissionNetworkRate: 0.016,
            transmissionConnectionRate: 0.011,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.016,
            capacityBasedRecovery: 0.011,
            ruralRemoteProtectionCharge: 0.006,
            rateRiders: [],
          },
          lossFactor: 1.08,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Central",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 27.00,
            distributionRate: 0.027,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "St. Catharines",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Guelph",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Northwest",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 33.00,
            distributionRate: 0.033,
            transmissionNetworkRate: 0.018,
            transmissionConnectionRate: 0.013,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.018,
            capacityBasedRecovery: 0.013,
            ruralRemoteProtectionCharge: 0.008,
            rateRiders: [],
          },
          lossFactor: 1.10,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Northeast",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 33.00,
            distributionRate: 0.033,
            transmissionNetworkRate: 0.018,
            transmissionConnectionRate: 0.013,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.018,
            capacityBasedRecovery: 0.013,
            ruralRemoteProtectionCharge: 0.008,
            rateRiders: [],
          },
          lossFactor: 1.10,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Barrie",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Collingwood",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Orangeville",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Aurora",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Newmarket",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Richmond Hill",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Woodbridge",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Bolton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Caledon",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Alectra Utilities",
      rateZone: "Milton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 22.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Richmond Hill",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Aurora",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Newmarket",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Whitchurch-Stouffville",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "King",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Georgina",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "East Gwillimbury",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Uxbridge",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Scugog",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "PowerStream",
      rateZone: "Brock",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Thunder Bay",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Sudbury",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Sault Ste. Marie",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "North Bay",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Timmins",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Kenora",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Dryden",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Fort Frances",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Atikokan",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Hydro One Networks Inc.",
      rateZone: "Red Lake",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 31.00,
            distributionRate: 0.031,
            transmissionNetworkRate: 0.017,
            transmissionConnectionRate: 0.012,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.017,
            capacityBasedRecovery: 0.012,
            ruralRemoteProtectionCharge: 0.007,
            rateRiders: [],
          },
          lossFactor: 1.09,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Ajax",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Pickering",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Whitby",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Oshawa",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Bowmanville",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Port Perry",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Beaverton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Cannington",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Sunderland",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Elexicon Energy",
      rateZone: "Uxbridge",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Newmarket-Tay Power Distribution",
      rateZone: "Newmarket",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Wasaga Distribution",
      rateZone: "Wasaga Beach",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Innisfil Hydro",
      rateZone: "Innisfil",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Orillia Power",
      rateZone: "Orillia",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Collingwood Hydro",
      rateZone: "Collingwood",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Barrie Hydro",
      rateZone: "Barrie",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Midland Power",
      rateZone: "Midland",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Penetanguishene Hydro",
      rateZone: "Penetanguishene",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Tiny Hydro",
      rateZone: "Tiny",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Tay Hydro",
      rateZone: "Tay",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 23.00,
            distributionRate: 0.024,
            transmissionNetworkRate: 0.013,
            transmissionConnectionRate: 0.008,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.013,
            capacityBasedRecovery: 0.008,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.05,
        },
      ],
    },
    {
      name: "Cambridge and North Dumfries Hydro",
      rateZone: "Cambridge",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Waterloo North Hydro",
      rateZone: "Waterloo",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Kitchener-Wilmot Hydro",
      rateZone: "Kitchener",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Guelph Hydro",
      rateZone: "Guelph",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Brantford Power",
      rateZone: "Brantford",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "GrandBridge Energy",
      rateZone: "Brant",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "GrandBridge Energy",
      rateZone: "Norfolk",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "GrandBridge Energy",
      rateZone: "Haldimand",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Niagara Peninsula Energy",
      rateZone: "Niagara",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Welland Hydro",
      rateZone: "Welland",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "St. Catharines Hydro",
      rateZone: "St. Catharines",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Niagara-on-the-Lake Hydro",
      rateZone: "Niagara-on-the-Lake",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Fort Erie Hydro",
      rateZone: "Fort Erie",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Port Colborne Hydro",
      rateZone: "Port Colborne",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Thorold Hydro",
      rateZone: "Thorold",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Grimsby Hydro",
      rateZone: "Grimsby",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Lincoln Hydro",
      rateZone: "Lincoln",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "West Lincoln Hydro",
      rateZone: "West Lincoln",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Wainfleet Hydro",
      rateZone: "Wainfleet",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Pelham Hydro",
      rateZone: "Pelham",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 24.00,
            distributionRate: 0.025,
            transmissionNetworkRate: 0.014,
            transmissionConnectionRate: 0.009,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.014,
            capacityBasedRecovery: 0.009,
            ruralRemoteProtectionCharge: 0.004,
            rateRiders: [],
          },
          lossFactor: 1.06,
        },
      ],
    },
    {
      name: "Kingston Hydro",
      rateZone: "Kingston",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Belleville Hydro",
      rateZone: "Belleville",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Quinte Hydro",
      rateZone: "Quinte",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Peterborough Hydro",
      rateZone: "Peterborough",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Lindsay Hydro",
      rateZone: "Lindsay",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Cobourg Hydro",
      rateZone: "Cobourg",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Port Hope Hydro",
      rateZone: "Port Hope",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Bowmanville Hydro",
      rateZone: "Bowmanville",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Oshawa Hydro",
      rateZone: "Oshawa",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Whitby Hydro",
      rateZone: "Whitby",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Ajax Hydro",
      rateZone: "Ajax",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Pickering Hydro",
      rateZone: "Pickering",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Scarborough Hydro",
      rateZone: "Scarborough",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Etobicoke Hydro",
      rateZone: "Etobicoke",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "York Hydro",
      rateZone: "York",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "East York Hydro",
      rateZone: "East York",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "North York Hydro",
      rateZone: "North York",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Mississauga Hydro",
      rateZone: "Mississauga",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Brampton Hydro",
      rateZone: "Brampton",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
    {
      name: "Caledon Hydro",
      rateZone: "Caledon",
      effectiveDate: "2025-01-01",
      residentialClasses: [
        {
          name: "Residential",
          deliveryCharges: {
            serviceCharge: 25.00,
            distributionRate: 0.026,
            transmissionNetworkRate: 0.015,
            transmissionConnectionRate: 0.010,
            rateRiders: [],
          },
          regulatoryCharges: {
            wholesaleMarketServiceRate: 0.015,
            capacityBasedRecovery: 0.010,
            ruralRemoteProtectionCharge: 0.005,
            rateRiders: [],
          },
          lossFactor: 1.07,
        },
      ],
    },
  ],
  oerPercentage: 13.1,
  hstRate: 13,
}; 