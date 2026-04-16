import Image from "next/image";

const promises = [
  {
    icon: "/image/icon_sild.svg",
    title: "전원 안정",
    desc: "예기치 못한 정전과 전력 이상 상황에서도 안정적인 전원 공급을 유지합니다.",
    bg: "#3a5ca8",
  },
  {
    icon: "/image/icon_battery.svg",
    title: "전력 보호",
    desc: "노이즈, 서지, 정전 등 다양한 전력 문제로부터 장비와 시스템을 안전하게 보호합니다.",
    bg: "#4a7bc8",
  },
  {
    icon: "/image/icon_setting.svg",
    title: "유지관리",
    desc: "국산 및 수입 UPS를 포함한 전문적인 유지보수와 지속적인 관리 서비스를 제공합니다.",
    bg: "#6aaee0",
  },
];

export default function PromiseSection() {
  return (
    <section className="py-20 md:py-32 bg-[#f0f4fa]">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-sm font-bold text-[#377AD0] tracking-widest uppercase mb-4">BUSINESS PROMISE</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">유진전원시스템의 약속</h2>
        <p className="text-gray-700 text-md leading-relaxed mb-14 max-w-md mx-auto">
          수많은 노하우와 축적된 데이터를 바탕으로 안정적이고
          <br className="hidden md:block" />
          완벽하게 운용할 수 있는 전원 시스템을 제공합니다.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {promises.map((p, i) => (
            <div
              key={i}
              className="w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center gap-3 px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shrink-0"
              style={{ backgroundColor: p.bg }}
            >
              <Image src={p.icon} alt={p.title} width={44} height={44} className="object-contain" />
              <h3 className="font-bold text-white text-base">{p.title}</h3>
              <p className="text-white/80 text-[11px] leading-relaxed text-center break-keep">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
