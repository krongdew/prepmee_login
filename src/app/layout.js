import './globals.css'
import ClientWrapper from './[locale]/ClientWrapper'
import { defaultLocale } from '@/i18n'

export const metadata = {
  title: 'Prepmee',
  description: 'Prepmee',
}

export default function RootLayout({ children }) {
  return (
    <html lang={defaultLocale}>
      <body>
        {children}
      </body>
    </html>
  )
}