"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "회사소개", href: "/company" },
  { name: "제품소개", href: "/products" },
  { name: "견적서 의뢰하기", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-300 mx-auto px-6 flex items-center justify-between py-4">
          {/* 로고 */}
          <Link className="flex items-center" href="/">
            <div className="relative w-48 h-12">
              <Image src="/image/logo2.png" alt="유진전원시스템 로고" fill priority className="object-contain object-left" />
            </div>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xl font-medium transition-colors hover:text-[#4d8ef0] ${pathname.startsWith(item.href) ? "text-[#1a4fa0] font-semibold" : "text-[#333]"}`}
              >
                {item.name}
              </Link>
            ))}
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
        <nav className="flex flex-col flex-1 justify-center items-center gap-2 px-8">
          {navItems.map((item, i) => (
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
          ))}

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
