import { CalculatorShell } from '@/components/Calculator/CalculatorShell'
import { SITE_URL } from '@/config/site'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EV Charging Income Calculator',
  description:
    'Free calculator for Canadian property owners to estimate passive income from hosting a home EV charger, no signup required.',
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CAD',
  },
  featureList: [
    'EV charger income calculator Canada',
    'Provincial utility rate estimates',
    'Level 2 charger earnings estimator',
    'Peak vs off-peak charging income',
    'Home EV charger passive income',
  ],
}

export default function CalculatorMicrositePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CalculatorShell />
    </>
  )
}
