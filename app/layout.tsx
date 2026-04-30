import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const BASE_URL = "https://upscom.co.kr";

const SITE_TITLE = "유진전원시스템 - UPS 전문기업";
const SITE_DESC = "30년의 기술력으로 UPS, AVR, 주파수변환기(FC), 배터리를 " + "공급하는 유진전원시스템입니다. 국산 및 수입 UPS 제조·유지보수 전문.";
const SHORT_DESC = "30년의 기술력으로 UPS, AVR, 주파수변환기, " + "배터리를 공급하는 UPS 전문기업";
const OG_IMAGE = "/image/common/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | 유진전원시스템",
  },
  description: SITE_DESC,
  keywords: ["UPS", "무정전전원장치", "AVR", "자동전압조정기", "주파수변환기", "배터리", "유진전원시스템", "유진UPS", "SPT", "정류기", "전원장치", "UPS전문기업"],
  authors: [{ name: "유진전원시스템(주)", url: BASE_URL }],
  creator: "유진전원시스템(주)",
  publisher: "유진전원시스템(주)",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "유진전원시스템",
    title: SITE_TITLE,
    description: SHORT_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "유진전원시스템 UPS 전문기업",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SHORT_DESC,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    other: { "naver-site-verification": "1a4f2727abb8c9544d3d471adb42d251b5011419" },
  },
};

const makeOffer = (name: string) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Product", name },
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "유진전원시스템(주)",
  description: SHORT_DESC,
  url: BASE_URL,
  telephone: "02-894-8057",
  faxNumber: "02-894-8058",
  email: "ups8057@naver.com",
  foundingDate: "1994",
  address: {
    "@type": "PostalAddress",
    streetAddress: "시흥대로 97",
    addressLocality: "금천구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  sameAs: [BASE_URL],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "전원장치 제품",
    itemListElement: [makeOffer("UPS (무정전전원장치)"), makeOffer("AVR (자동전압조정기)"), makeOffer("FC (주파수변환기)"), makeOffer("배터리")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full`} style={{ scrollBehavior: "smooth" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual'",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1 pt-15">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
