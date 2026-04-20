"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "./categories";

export default function ProductSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const activeCategoryId = segments[1] ?? categories[0].id;
  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  return (
    <>
      {/* PC: 세로 사이드바 */}
      <aside className="hidden md:block w-50 shrink-0">
        <ul className="border border-gray-200">
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;
            return (
              <li key={category.id}>
                <Link
                  href={`/products/${category.id}`}
                  className={`block px-4 py-3 text-sm font-semibold transition-colors border-b border-gray-200 last:border-b-0 ${
                    isActive
                      ? "bg-[#1c2d4f] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 모바일/태블릿: 드롭다운 */}
      <div className="md:hidden w-full relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-[#1c2d4f] text-white text-base font-semibold"
        >
          <span>{activeCategory?.label}</span>
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
                        ? "bg-gray-50 text-[#1c2d4f] font-semibold"
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
