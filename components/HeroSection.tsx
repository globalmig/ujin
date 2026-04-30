"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    pc: "/image/home/slide-1-pc.jpg",
    mobile: "/image/home/slide-1-mobile.jpg",
    alt: "유진전원시스템 메인 슬라이드 1",
    overlay: "bg-black/0",
  },
  {
    pc: "/image/home/slide-2.jpg",
    mobile: "/image/home/slide-2.jpg",
    alt: "유진전원시스템 메인 슬라이드 2",
    overlay: "bg-black/20",
  },
  // {
  //   pc: "/image/home/slide-3.jpg",
  //   mobile: "/image/home/slide-3.jpg",
  //   alt: "유진전원시스템 메인 슬라이드 3",
  //   overlay: "bg-black/20",
  // },
  {
    pc: "/image/home/slide-4.jpg",
    mobile: "/image/home/slide-4.jpg",
    alt: "유진전원시스템 메인 슬라이드 4",
    overlay: "bg-black/20",
  },
  {
    pc: "/image/home/slide-5.jpg",
    mobile: "/image/home/slide-5.jpg",
    alt: "유진전원시스템 메인 슬라이드 5",
    overlay: "bg-black/20",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-125 max-h-175 overflow-hidden">
      {/* 슬라이드 이미지 — 크로스페이드 */}
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== current}>
          {/* PC */}
          <div className="absolute inset-0 hidden md:block">
            <Image src={slide.pc} alt={slide.alt} fill sizes="100vw" className="object-cover object-center" priority={i === 0} />
          </div>
          {/* Mobile */}
          <div className="absolute inset-0 block md:hidden">
            <Image src={slide.mobile} alt={slide.alt} fill sizes="100vw" className="object-cover object-center" priority={i === 0} />
          </div>
          {/* 슬라이드별 어두운 오버레이 */}
          <div className={`absolute inset-0 ${slide.overlay}`} />
        </div>
      ))}

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-16 max-w-360 mx-auto text-center">
        <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-3 [text-shadow:0_2px_8px_rgba(30,58,138,0.8)]">WELCOME TO YUJIN COMPANY</p>
        <h1 className="text-white text-2xl break-keep md:text-4xl lg:text-[42px] font-bold leading-snug mb-6 [text-shadow:0_2px_16px_rgba(30,58,138,0.9)]">
          유진UPS는 외부의 어떤 변화에도
          <br />
          365일 안심하고 지켜드립니다.
        </h1>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`슬라이드 ${i + 1}로 이동`} aria-current={i === current ? "true" : undefined} className="py-5 px-2 flex items-center">
            <span className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-5" : "bg-white/50 w-2"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
