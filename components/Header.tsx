"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/products";

const navItems = [
  { name: "회사소개", href: "/company" },
  { name: "제품소개", href: "/products" },
  { name: "견적서 의뢰하기", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const productsHoverRef = useRef(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleProductsEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setProductsDropdownOpen(true);
  };

  const handleProductsLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-300 mx-auto px-6 flex items-center justify-between py-4">
          {/* 로고 */}
          <Link className="flex items-center" href="/">
            <div className="relative w-48 h-12">
              <Image src="/image/common/logo.png" alt="유진전원시스템 로고" fill sizes="192px" priority className="object-contain object-left" />
            </div>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.href === "/products") {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleProductsEnter}
                    onMouseLeave={handleProductsLeave}
                  >
                    <Link
                      href={item.href}
                      className={`text-xl font-medium transition-colors hover:text-[#4d8ef0] ${pathname.startsWith(item.href) ? "text-[#1a4fa0] font-semibold" : "text-[#333]"}`}
                    >
                      {item.name}
                    </Link>

                    {/* 드롭다운 */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${productsDropdownOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"}`}
                    >
                      <ul className="bg-white shadow-lg rounded-lg overflow-hidden min-w-max border border-gray-100">
                        {categories.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/products/${cat.id}`}
                              onClick={() => setProductsDropdownOpen(false)}
                              className={`block px-6 py-3 text-base transition-colors hover:bg-[#eef3fb] hover:text-[#1a4fa0] ${pathname === `/products/${cat.id}` ? "bg-[#eef3fb] text-[#1a4fa0] font-semibold" : "text-[#333]"}`}
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xl font-medium transition-colors hover:text-[#4d8ef0] ${pathname.startsWith(item.href) ? "text-[#1a4fa0] font-semibold" : "text-[#333]"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">
            <span className={`block w-6 h-0.5 bg-[#1a4fa0] transition-all duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a4fa0] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a4fa0] transition-all duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 오버레이 */}
      <div className={`fixed inset-0 z-40 bg-white flex flex-col md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* 상단 여백 (헤더 높이만큼) */}
        <div className="h-17 shrink-0" />

        {/* 메뉴 링크 */}
        <nav className="flex flex-col flex-1 overflow-y-auto justify-center items-center gap-2 px-8">
          {navItems.map((item, i) => {
            if (item.href === "/products") {
              return (
                <div key={item.href} className="w-full border-b border-gray-100">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className={`w-full text-center py-5 text-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${pathname.startsWith(item.href) ? "text-[#1a4fa0] font-bold" : "text-[#333]"}`}
                    style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                  >
                    {item.name}
                    <span className={`text-sm transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-screen" : "max-h-0"}`}>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products/${cat.id}`}
                        onClick={() => { setMenuOpen(false); setMobileProductsOpen(false); }}
                        className={`block text-center py-3 text-base transition-colors hover:text-[#1a4fa0] ${pathname === `/products/${cat.id}` ? "text-[#1a4fa0] font-semibold" : "text-[#555]"}`}
                      >
                        {cat.label}
                      </Link>
                    ))}
                    <div className="pb-3" />
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center py-5 text-xl font-medium border-b border-gray-100 transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${
                  pathname.startsWith(item.href) ? "text-[#1a4fa0] font-bold" : "text-[#333]"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={`mt-8 w-full py-4 bg-[#1a4fa0] text-white text-center text-base font-semibold rounded transition-all duration-300 hover:bg-[#0d3070] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? `${navItems.length * 60}ms` : "0ms" }}
          >
            견적서 의뢰하기
          </Link>
        </nav>
      </div>
    </>
  );
}
