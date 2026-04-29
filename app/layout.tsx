import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "유진전원시스템 - UPS 전문기업",
  description: "유진UPS는 외부의 어떤 변화에도 365일 안심하고 지켜드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full`} style={{ scrollBehavior: "smooth" }}>
      <head>
        {/* 렌더링 전 동기 실행 — 브라우저 스크롤 자동복원 비활성화 */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1 pt-[60px]">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
