import './globals.css'
import ClientLayout from './[locale]/ClientWrapper'

export const metadata = {
  title: 'Prepmee',
  description: 'Prepmee',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}