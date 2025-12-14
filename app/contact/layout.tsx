import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adbeezs.com';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Adbeezs. Reach out via email, phone, or Instagram. We\'re here to help transform your advertising strategy.',
  openGraph: {
    title: 'Contact Adbeezs - Get in Touch',
    description: 'Get in touch with Adbeezs. Reach out via email, phone, or Instagram.',
    url: `${siteUrl}/contact`,
  },
  twitter: {
    title: 'Contact Adbeezs - Get in Touch',
    description: 'Get in touch with Adbeezs. Reach out via email, phone, or Instagram.',
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

