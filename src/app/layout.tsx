import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'
import { SITE_URL } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'EV Charging Income Calculator — Free Canadian Host Earnings Estimator',
  description:
    'Estimate how much you can earn sharing your home EV charger in Canada. Instant income range by province, localized Ontario utility rates, and peak vs. off-peak breakdowns.',
  keywords:
    'EV charging income calculator, host EV charger Canada, home charger earnings, Level 2 charger income, EV charger passive income Canada, provincial utility rates EV charging, BC Hydro EV charger income, Ontario ULO EV charging',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'EV Charging Income Calculator — How Much Can You Earn?',
    description:
      'Free tool for Canadian property owners. See your estimated monthly EV charger hosting income instantly, no signup required.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: 'https://wattshare-images.s3.us-east-1.amazonaws.com/og-image-ev-charging.jpg',
        width: 1200,
        height: 630,
        alt: 'EV Charging Income Calculator for Canadian property owners',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Income Calculator — Canadian Host Earnings',
    description:
      'Estimate passive income from your home EV charger. Provincial utility rates included.',
    images: ['https://wattshare-images.s3.us-east-1.amazonaws.com/twitter-image-ev-charging.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body className={`${inter.variable} ${inter.className}`}>{children}</body>
    </html>
  )
}
