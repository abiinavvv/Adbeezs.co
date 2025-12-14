import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Bebas_Neue, Oswald } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./components/ErrorBoundary";
import ViewTransition from "./components/ViewTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adbeezs.co';
const siteName = 'Adbeezs';
const siteDescription = 'The new way of advertising. We transform static spaces into storytelling platforms and everyday moments into marketing opportunities.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Where Creativity Meets Attention`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "advertising",
    "digital marketing",
    "creative agency",
    "branding",
    "advertising company",
    "outdoor advertising",
    "bus advertising",
    "digital displays",
    "marketing solutions",
    "brand awareness",
  ],
  authors: [{ name: "Adbeezs", url: siteUrl }],
  creator: "Adbeezs",
  publisher: "Adbeezs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - Where Creativity Meets Attention`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/adbeesz.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Where Creativity Meets Attention`,
    description: siteDescription,
    creator: "@adbeezs",
    images: [`${siteUrl}/images/adbeesz.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
  category: 'Advertising & Marketing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Adbeezs',
    url: siteUrl,
    logo: `${siteUrl}/images/adbeesz.png`,
    description: siteDescription,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-790-707-5236',
      contactType: 'Customer Service',
      email: 'adbeezs.co@gmail.com',
      areaServed: ['IN', 'AU'],
      availableLanguage: ['en'],
    },
    sameAs: [
      'https://instagram.com/adbeezs',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bebasNeue.variable} ${oswald.variable} antialiased`}
      >
        <ErrorBoundary>
          <ViewTransition />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
