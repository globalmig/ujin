import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";

export const metadata: Metadata = {
  title: "유진전원시스템 - UPS 전문기업",
  description:
    "30년의 기술력과 2,500여 대 납품 실적을 보유한 UPS 전문기업 유진전원시스템입니다. UPS, AVR, 주파수변환기, 배터리 제조·유지보수.",
  alternates: { canonical: "https://upscom.co.kr" },
};
import ProductsSection from "./components/ProductsSection";
import PromiseSection from "./components/PromiseSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <PromiseSection />
      <ContactSection />
    </>
  );
}
