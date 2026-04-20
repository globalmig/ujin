import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSidebar from "../_components/ProductSidebar";
import { categories } from "../_components/categories";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-80 md:h-105 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image/products/bg_hero.jpg"
            alt="제품 배경"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-white/70 text-xs tracking-[0.35em] uppercase mb-3">
            PRODUCTS
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            제품 소개
          </h1>
          <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span>›</span>
            <Link href="/products" className="hover:text-white transition-colors">
              제품소개
            </Link>
            <span>›</span>
            <span className="text-white">{category.label}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex gap-6 items-start">
        <ProductSidebar />

        <div className="flex-1 min-h-125 border border-gray-200 flex flex-col items-center justify-center bg-white p-10">
          <p className="text-gray-400 text-sm mb-4">{category.label}</p>
          <p className="text-gray-400 text-sm">준비 중입니다.</p>
        </div>
      </section>
    </>
  );
}
