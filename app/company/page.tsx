import Image from "next/image";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden ">
        <div className="absolute inset-0">
          <Image src="/image/company/bg_hero.png" alt="회사소개 배경" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-white/70 text-xs tracking-[0.35em] uppercase mb-3">COMPANY INTRODUCTION</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold">회사소개</h1>
          <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span>›</span>
            <span className="text-white">회사소개</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col gap-10">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
              <Image src="/image/company/main.png" alt="유진전원시스템 회사 이미지" width={1100} height={500} className="object-cover w-full" />
            </div>

            <div>
              <p className="text-xs text-[#1a4fa0] tracking-widest uppercase mb-3">ABOUT US</p>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-5 bg-linear-to-r from-[#4d8ef0] to-[#1a4fa0] bg-clip-text text-transparent">
                유진전원시스템(주)
                <br />
                국산화에 앞장서는 UPS 전문기업
              </h2>
              <div className="w-10 h-0.5 bg-[#1a4fa0] mb-6" />
              <div className="flex flex-col gap-4">
                <h3 className="font-bold">안녕하십니까? 유진전원시스템의 홈페이지에 방문해주셔서 대단히 감사합니다.</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  저희는 <strong className="text-[#F62CE9]">20여년간의 UPS 제조의 축적된 기술력과 풍부한 노하우</strong>로 제도권내 금융권 및 전국기업체, 정부기관 등에 약 3000여대의 중대형 UPS를
                  최고의 품질로 공급하였으며, 성실과 신뢰를 생명으로 사후유지보수 및 철저한 애프터서비스로 고객 여러분들의 모든 니즈에 최선을 다하여 임해오고 있습니다. 급변하는 경제환경 및 시스템
                  변화에 능동적으로 대처할 수 있도록 저희의 위기 관리 및 운용시스템은 만전의 준비태세를 갖추고 있습니다.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  모든 주변장치 및 한전으로부터 일어날 수 있는 전기적 트러블 및 노이즈(Noise), 누전 써지(Surge), 과도전류, 송전사고 및 정전(Outage) 등 귀하가 예측할 수 없는 모든 요인들에 대해{" "}
                  <strong className="text-[#EE3636]">저희의 SPT-Series UPS는 완벽하게 대응할 수 있습니다.</strong>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  또한 순간적, 지속적인 손실에 대해서도 저희는 수많은 노하우와 풍부한 데이터를 가지고 있습니다. 따라서 전기적 트러블로 일어날 수 있는 모든 문제점을 가장 빠르고 짧은 시간내에 해결하여
                  <strong className="text-[#2980F3]">귀사의 시스템을 가장 안정적이고 완벽하게 운용할 수 있도록 도와드릴 것입니다.</strong>
                </p>
                <p className="text-gray-800 font-bold text-sm leading-relaxed">
                  저희의 기술력은 UPS제조사의 구분을 가리지 않고 국산 및 수입 UPS의 그 어떤 것이라도 보수, 정비 및 유지관리가 가능합니다.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  또한 1998년부터 도입한 <strong className="text-[#EE3636]">고객 무한대서비스</strong>의 시작으로 저희가 납품한 모든 UPS는 고객께서 책정하신 내용 연수가 끝날 때까지 무상A/S를 해드리고
                  있습니다.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed font-bold text-[#6AAF35]">
                  궁금하신 사항이나 필요한 자료가 있으시면 언제든지 문의하여 주십시오. 친절하고 성실하게 상담해 드리겠습니다.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">감사합니다</p>
              </div>
            </div>

            <Image src="/image/company/ceoname.jpg" alt="유진전원시스템 회사 이미지" width={260} height={200} />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(10,30,70,0.75), rgba(10,30,70,0.82)), url('/image/bg_contact.jpg') center/cover no-repeat",
          }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute top-[-30px] right-[-30px] w-60 h-60 rounded-full border border-white/10" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-4">CUSTOMER CENTER</p>
          <h2 className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-3">궁금하신 사항이나 필요한 자료가 있으시다면</h2>
          <p className="text-white text-xl md:text-2xl font-bold mb-10">언제든지 문의해주세요.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:028948057" className="flex items-center justify-center gap-3 bg-[#1a4fa0] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#0d3070] transition-colors">
              02-894-8057
            </a>
            <a
              href="mailto:ups8057@naver.com"
              className="flex items-center justify-center gap-3 bg-[#4d8ef0] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3a7ae0] transition-colors"
            >
              ups8057@naver.com
            </a>
            <a
              href="/contact"
              className="flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
            >
              고객 문의하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
