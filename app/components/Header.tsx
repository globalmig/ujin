"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "회사소개", href: "/company" },
  { name: "제품소개", href: "/products" },
  { name: "문의하기", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between py-4">
        <Link className="flex items-center" href={"/"}>
          <Image src="/image/logo.png" alt="유진전원시스템 로고" width={180} height={120} className="object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <a key={index} href={item.href} className={`text-sm font-medium transition-colors hover:text-[#4d8ef0] text-[#333]`}>
              {item.name}
            </a>
          ))}
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">
          <span className={`block w-5 h-0.5 bg-[#1a4fa0] transition-all duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4fa0] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4fa0] transition-all duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="block py-8 text-md text-center text-[#333] border-b border-gray-100 last:border-0" onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
