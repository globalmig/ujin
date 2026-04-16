import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden mt-4">
        <div className="absolute inset-0">
          <Image src="/image/products/bg_hero.jpg" alt="제품 배경" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-white/70 text-xs tracking-[0.35em] uppercase mb-3">PRODUCTS</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold">제품 소개</h1>
          <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span>›</span>
            <span className="text-white">제품소개</span>
          </div>
        </div>
      </section>

      {/* 상품 탭*/}

      {/* 내용 */}
    </>
  );
}
