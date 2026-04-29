import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "견적서 의뢰하기",
  description:
    "UPS, AVR, 주파수변환기, 배터리 견적을 간편하게 의뢰하세요. 유진전원시스템이 빠르게 답변드립니다.",
  alternates: { canonical: "https://upscom.co.kr/contact" },
  openGraph: {
    title: "견적서 의뢰하기 | 유진전원시스템",
    description: "UPS, AVR, 주파수변환기, 배터리 견적 문의",
    url: "https://upscom.co.kr/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
