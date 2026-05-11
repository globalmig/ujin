import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductSidebar from "../../_components/ProductSidebar";
import { getImageSrc } from "@/lib/products";

export const metadata: Metadata = {
  title: "삼상 / 삼상 UPS 디스플레이 상세",
  description: "유진전원시스템의 삼상/삼상 UPS 디스플레이 상세 정보를 확인하세요. 30년 기술력의 고품질 전원장치.",
  alternates: { canonical: "https://upscom.co.kr/products/three-three-ups/display" },
  openGraph: {
    title: "삼상 / 삼상 UPS 디스플레이 상세 | 유진전원시스템",
    description: "유진전원시스템의 삼상/삼상 UPS 디스플레이 상세 정보를 확인하세요.",
    url: "https://upscom.co.kr/products/three-three-ups/display",
  },
};

const FOLDER = "SPT-3300_three-three-ups";

export default function ThreeThreeUpsDisplayPage() {
  return (
    <>
      <PageHero
        imageSrc="/image/products/bg-hero.jpg"
        imageAlt="제품 배경"
        eyebrow="PRODUCTS"
        title="제품 소개"
        breadcrumbs={[
          { label: "제품소개", href: "/products" },
          { label: "삼상 / 삼상 UPS", href: "/products/three-three-ups" },
          { label: "디스플레이" },
        ]}
      />

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <ProductSidebar />

        <div className="flex-1">
          <div className="flex flex-col">
            <Image
              src={getImageSrc(FOLDER, "9_display_detail.png")}
              alt="삼상 / 삼상 UPS 디스플레이 상세"
              width={1100}
              height={800}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              style={{ width: "100%", height: "auto" }}
              className="block"
              priority
            />
            <Link
              href="/contact"
              className="w-full py-5 bg-[#3d7bd4] text-white text-center font-semibold text-base hover:bg-[#2f6bbf] transition-colors block"
            >
              견적서 의뢰하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
