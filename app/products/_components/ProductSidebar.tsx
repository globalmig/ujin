"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, toSlug } from "./categories";

export default function ProductSidebar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeCategoryId = segments[1] ?? categories[0].id;
  const activeItemSlug = segments[2] ?? "";

  return (
    <aside className="w-50 shrink-0">
      <ul className="border border-gray-200">
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          const firstItemSlug = category.items[0] ? toSlug(category.items[0]) : "";
          return (
            <li key={category.id}>
              <Link
                href={
                  firstItemSlug
                    ? `/products/${category.id}/${firstItemSlug}`
                    : `/products/${category.id}`
                }
                className={`block px-4 py-3 text-sm font-semibold transition-colors border-b border-gray-200 ${
                  isActive
                    ? "bg-[#1c2d4f] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category.label}
              </Link>

              {isActive && category.items.length > 0 && (
                <ul className="border-b border-gray-200">
                  {category.items.map((item) => {
                    const slug = toSlug(item);
                    const isItemActive = activeItemSlug === slug;
                    return (
                      <li key={item}>
                        <Link
                          href={`/products/${category.id}/${slug}`}
                          className={`w-full pl-6 pr-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
                            isItemActive
                              ? "bg-gray-100 text-[#1c6fc4] font-medium"
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isItemActive ? "bg-[#1c6fc4]" : "bg-gray-300"
                            }`}
                          />
                          {item}
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
  );
}
