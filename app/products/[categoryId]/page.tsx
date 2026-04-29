import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PageHero from "../../components/PageHero";
import ProductSidebar from "../_components/ProductSidebar";
import {
  categories,
  findCategory,
  getParentCategory,
  productImageMap,
  getImageSrc,
} from "../_components/categories";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const category = findCategory(categoryId);
  if (!category) return {};

  const title = `${category.label} 제품소개`;
  const description = `유진전원시스템의 ${category.label} 제품을 소개합니다. 30년 기술력의 고품질 전원장치.`;
  const url = `https://upscom.co.kr/products/${categoryId}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | 유진전원시스템`, description, url },
  };
}

export async function generateStaticParams() {
  return categories.flatMap((cat) =>
    cat.children
      ? cat.children.map((child) => ({ categoryId: child.id }))
      : [{ categoryId: cat.id }]
  );
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;

  // 부모 카테고리 접근 시 첫 번째 하위 카테고리로 리다이렉트
  const topLevel = categories.find((c) => c.id === categoryId);
  if (topLevel?.children) {
    redirect(`/products/${topLevel.children[0].id}`);
  }

  const category = findCategory(categoryId);
  if (!category) notFound();

  const parentCategory = getParentCategory(categoryId);
  const imageData = productImageMap[categoryId];

  return (
    <>
      <PageHero
        imageSrc="/image/products/bg_hero.jpg"
        imageAlt="제품 배경"
        eyebrow="PRODUCTS"
        title="제품 소개"
        breadcrumbs={[
          { label: "제품소개", href: "/products" },
          ...(parentCategory
            ? [{ label: parentCategory.label, href: `/products/${parentCategory.children![0].id}` }]
            : []),
          { label: category.label },
        ]}
      />

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <ProductSidebar />

        <div className="flex-1">
          {imageData ? (
            <div className="flex flex-col">
              {imageData.images.map((filename, idx) => (
                <Image
                  key={filename}
                  src={getImageSrc(imageData.folder, filename)}
                  alt={`${category.label} ${filename.replace(/^\d+\s/, "").replace(".png", "")}`}
                  width={1100}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                  style={{ width: "100%", height: "auto" }}
                  className="block"
                  priority={idx === 0}
                />
              ))}
              <Link
                href="/contact"
                className="w-full py-5 bg-[#3d7bd4] text-white text-center font-semibold text-base hover:bg-[#2f6bbf] transition-colors block"
              >
                견적서 의뢰하기
              </Link>
            </div>
          ) : (
            <div className="min-h-125 border border-gray-200 flex flex-col items-center justify-center bg-white p-10">
              <p className="text-gray-400 text-sm mb-4">{category.label}</p>
              <p className="text-gray-400 text-sm">준비 중입니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
