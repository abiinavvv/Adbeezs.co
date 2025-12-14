import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adbeezs.com';

export const metadata: Metadata = {
  title: 'Our Clients',
  description: 'Discover the brands that trust Adbeezs for their advertising needs. We work with innovative companies to create impactful marketing campaigns.',
  openGraph: {
    title: 'Our Clients - Adbeezs',
    description: 'Discover the brands that trust Adbeezs for their advertising needs.',
    url: `${siteUrl}/clients`,
  },
  twitter: {
    title: 'Our Clients - Adbeezs',
    description: 'Discover the brands that trust Adbeezs for their advertising needs.',
  },
  alternates: {
    canonical: `${siteUrl}/clients`,
  },
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

