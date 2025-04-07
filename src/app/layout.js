// prepmee_website/src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'Prepmee',
  description: 'Prepmee',
}

export default function RootLayout({ children, params }) {
  const locale = params?.locale || 'th'; 
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}