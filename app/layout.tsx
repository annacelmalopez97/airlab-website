import type { Metadata } from 'next'
import { Red_Hat_Display, Red_Hat_Text, Poppins } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  variable: '--font-red-hat-display',
  display: 'swap',
})

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-red-hat-text',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AIR Lab Singapore',
    template: '%s | AIR Lab Singapore',
  },
  description:
    'AIR Lab Singapore develops innovative Air Traffic Management solutions through open collaboration and agile methodologies.',
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://airlab.aero',
    siteName: 'AIR Lab Singapore',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${redHatText.variable} ${poppins.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
