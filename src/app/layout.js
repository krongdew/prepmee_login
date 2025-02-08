
import './globals.css'

export const metadata = {
  title: 'Prepmee',
  description: 'Prepmee',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}