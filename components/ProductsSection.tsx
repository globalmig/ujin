"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "UPS",
    desc: "무정전 전원장치",
    enName: "Uninterruptible Power Supply",
    image: "/image/home/card-ups.jpg",
    overlay: "rgba(26, 79, 160, 0.55)",
    href: "/products/single-ups",
  },
  {
    id: 2,
    name: "AVR",
    desc: "자동 전압 조정기",
    enName: "Automatic Voltage Regulator",
    image: "/image/home/card-avr.jpg",
    overlay: "rgba(170, 90, 30, 0.50)",
    href: "/products/avr",
  },
  {
    id: 3,
    name: "FC",
    desc: "주파수 변환기",
    enName: "Frequency Converter",
    image: "/image/home/card-fc.jpg",
    overlay: "rgba(50, 140, 130, 0.55)",
    href: "/products/frequency",
  },
  {
    id: 4,
    name: "배터리",
    desc: "완전 무누액 밀폐형 제품",
    enName: "Rectifier",
    image: "/image/home/card-rectifier.jpg",
    overlay: "rgba(50, 130, 120, 0.55)",
    href: "/products/battery-es",
  },
];

function NavButtons({ prev, next }: { prev: () => void; next: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={prev}
        aria-label="이전 제품"
        className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#1a4fa0] hover:text-[#1a4fa0] transition-colors text-sm"
      >
        ←
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={next}
        aria-label="다음 제품"
        className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#1a4fa0] hover:text-[#1a4fa0] transition-colors text-sm"
      >
        →
      </button>
    </div>
  );
}

export default function ProductsSection() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const prev = () => setCurrent((i) => (i - 1 + products.length) % products.length);
  const next = () => setCurrent((i) => (i + 1) % products.length);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.children[current] as HTMLElement;
    if (!card) return;

    if (isFirstRender.current) {
      el.scrollLeft = card.offsetLeft;
      isFirstRender.current = false;
    } else {
      el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  }, [current]);

  return (
    <section className="py-20 md:py-32 bg-white px-4">
      <div className="max-w-360 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
          {/* Left text */}
          <div className="lg:w-100 shrink-0">
            <p className="text-sm font-bold text-[#377AD0] tracking-widest uppercase mb-3">BUSINESS AREA</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-snug mb-4 md:mb-6">
              30년의 경험과 검증된 기술로
              <br /> 고객과 함께 합니다.
            </h2>
            <div className="hidden lg:flex">
              <NavButtons prev={prev} next={next} />
            </div>
          </div>

          {/* Cards */}
          <div className="flex-1 min-w-0">
            <div className="flex lg:hidden mb-4">
              <NavButtons prev={prev} next={next} />
            </div>
            <div ref={trackRef} className="relative flex gap-3 items-start overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {products.map((p, idx) => {
                const isActive = idx === current;
                const isEven = idx % 2 === 1;
                return (
                  <Link
                    key={p.id}
                    href={p.href}
                    onClick={() => setCurrent(idx)}
                    aria-label={`${p.name} - ${p.desc} 제품 페이지로 이동`}
                    className={`
                      shrink-0 relative overflow-hidden rounded-2xl cursor-pointer group
                      flex flex-col justify-between
                      transition-all duration-500
                      w-[65%] md:w-[38%] lg:w-[calc(25%-9px)]
                      ${isEven ? "lg:mt-12" : "mt-0"}
                      ${isActive ? "lg:scale-105 lg:shadow-2xl lg:ring-2 lg:ring-white/60 lg:-translate-y-2" : "lg:scale-100 lg:shadow-none"}
                    `}
                    style={{
                      height: "280px",
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: p.overlay, opacity: isActive ? 0.8 : 1 }} />
                    <div className="relative z-10 flex flex-col justify-between h-full p-5">
                      <div>
                        <h3 className="text-white text-xl font-bold leading-tight mb-1">{p.name}</h3>
                        <p className="text-white/80 text-xs mb-1">{p.desc}</p>
                        <p className="text-white/60 text-[10px] leading-snug">{p.enName}</p>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-11 h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center group-hover:bg-white/35 transition-colors">
                          <span className="text-white text-xs" aria-hidden="true">
                            ›
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="shrink-0 w-[35%] md:w-[62%] lg:hidden" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
