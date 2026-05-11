"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/products";

export default function ProductSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const activeCategoryId = (() => {
    for (const cat of categories) {
      if (cat.children) {
        for (const child of cat.children) {
          if (child.href && pathname === child.href) return child.id;
        }
      }
    }
    return segments[1] ?? categories[0].id;
  })();

  const activeTopLevel = categories.find(
    (c) => c.id === activeCategoryId || c.children?.some((ch) => ch.id === activeCategoryId)
  );

  const allFlatCategories = categories.flatMap((c) =>
    c.children ? [c, ...c.children] : [c]
  );
  const activeFlat = allFlatCategories.find((c) => c.id === activeCategoryId);

  return (
    <>
      {/* PC: 세로 사이드바 */}
      <aside className="hidden md:block w-50 shrink-0">
        <ul className="border border-gray-200">
          {categories.map((category) => {
            const isActive = activeTopLevel?.id === category.id;
            const firstChildId = category.children?.[0]?.id;
            const href = category.selfPage
              ? `/products/${category.id}`
              : firstChildId
              ? `/products/${firstChildId}`
              : `/products/${category.id}`;

            return (
              <li key={category.id}>
                <Link
                  href={href}
                  className={`flex items-center justify-between px-4 py-3 text-base font-semibold transition-colors border-b border-gray-200 ${
                    isActive
                      ? "bg-[#009fe8] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                  {category.children && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${isActive ? "rotate-180 text-white" : "text-gray-400"}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {isActive && category.children && (
                  <ul className="bg-[#f0f4fb] border-b border-gray-200">
                    {category.children.map((child) => {
                      const isChildActive = child.href
                        ? pathname === child.href
                        : activeCategoryId === child.id;
                      return (
                        <li key={child.id}>
                          <Link
                            href={child.href ?? `/products/${child.id}`}
                            className={`flex items-center gap-2 px-6 py-2.5 text-sm border-b border-gray-200 last:border-b-0 transition-colors ${
                              isChildActive
                                ? "text-[#009fe8] font-semibold"
                                : "text-gray-500 hover:text-[#009fe8]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isChildActive ? "bg-[#009fe8]" : "bg-gray-400"
                              }`}
                            />
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 모바일/태블릿: 드롭다운 */}
      <div className="md:hidden w-full relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-[#009fe8] text-white text-base font-semibold"
        >
          <span>{activeFlat?.label}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute top-full left-0 right-0 z-20 border border-t-0 border-gray-200 bg-white shadow-lg">
            {categories.map((category) => {
              if (category.children) {
                return (
                  <li key={category.id}>
                    {category.selfPage ? (
                      <button
                        onClick={() => {
                          router.push(`/products/${category.id}`);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2 text-xs font-semibold uppercase tracking-wide border-b border-gray-100 bg-gray-50 transition-colors ${
                          activeCategoryId === category.id ? "text-[#009fe8]" : "text-gray-400 hover:text-[#009fe8]"
                        }`}
                      >
                        {category.label}
                      </button>
                    ) : (
                      <div className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                        {category.label}
                      </div>
                    )}
                    {category.children.map((child) => {
                      const isActive = child.href
                        ? pathname === child.href
                        : activeCategoryId === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => {
                            router.push(child.href ?? `/products/${child.id}`);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left pl-8 pr-5 py-3 text-sm border-b border-gray-100 last:border-b-0 transition-colors ${
                            isActive
                              ? "bg-gray-50 text-[#009fe8] font-semibold"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          · {child.label}
                        </button>
                      );
                    })}
                  </li>
                );
              }

              const isActive = activeCategoryId === category.id;
              return (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      router.push(`/products/${category.id}`);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-4 text-base font-medium border-b border-gray-100 last:border-b-0 transition-colors ${
                      isActive
                        ? "bg-gray-50 text-[#009fe8] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
