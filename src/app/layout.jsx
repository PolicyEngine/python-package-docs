import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'PolicyEngine Python package documentation',
  description:
    'Documentation for the policyengine-us Python package — simulate tax and benefit policy outcomes for US households.',
  openGraph: {
    title: 'PolicyEngine Python package',
    description:
      'Simulate tax and benefit policy outcomes for US households using the policyengine-us Python package.',
    url: 'https://policyengine.org/us/python-package',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PolicyEngine Python package',
    description:
      'Simulate tax and benefit policy outcomes for US households using the policyengine-us Python package.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logos/policyengine/policyengine.png',
  },
  alternates: {
    canonical: 'https://policyengine.org/us/python-package',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
