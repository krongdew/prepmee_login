
import './globals.css'

export const metadata = {
  title: 'Next.js i18n',
  description: 'Next.js i18n example',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}