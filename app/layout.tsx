import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { getMetadataBase, getSiteUrl, siteConfig } from "@/config/site";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: [{ url: "/images/favicon.png", type: "image/png" }],
  },
  authors: [{ name: siteConfig.name, url: getSiteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: ["/opengraph-image"],
    ...(siteConfig.twitterCreator
      ? {
          creator: `@${siteConfig.twitterCreator.replace(/^@/, "")}`,
        }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: googleVerification
    ? {
        google: googleVerification,
      }
    : undefined,
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
