"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const total = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[500px] max-h-[700px] overflow-hidden">
      {/* Background image - PC */}
      <div className="absolute inset-0 hidden md:block">
        <Image src="/image/main_pc_hero.png" alt="hero background" fill className="object-cover object-center" priority />
      </div>
      {/* Background image - Mobile */}
      <div className="absolute inset-0 block md:hidden">
        <Image src="/image/main_mo_hero.png" alt="hero background" fill className="object-cover object-center" priority />
      </div>

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/25" /> */}

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-16 max-w-[1440px] mx-auto text-center">
        <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-3 [text-shadow:0_2px_8px_rgba(30,58,138,0.8)]">WELCOME TO YUJIN COMPANY</p>
        <h1 className="text-white text-2xl break-keep md:text-4xl lg:text-[42px] font-bold leading-snug mb-6 max-w-[1440px] [text-shadow:0_2px_16px_rgba(30,58,138,0.9)]">
          유진UPS는 외부의 어떤 변화에도
          <br />
          365일 안심하고 지켜드립니다.
        </h1>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-10">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`슬라이드 ${i + 1}로 이동`}
            aria-current={i === current ? "true" : undefined}
            className="py-5 px-2 flex items-center"
          >
            <span className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50 w-2"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
