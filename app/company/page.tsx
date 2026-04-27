import Image from "next/image";
import PageHero from "../components/PageHero";
import ContactSection from "../components/ContactSection";

export default function CompanyPage() {
  return (
    <>
      <PageHero imageSrc="/image/company/bg_hero.png" imageAlt="회사소개 배경" eyebrow="COMPANY INTRODUCTION" title="회사소개" breadcrumbs={[{ label: "회사소개" }]} />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col gap-10">
            {/* <div className="w-full rounded-2xl overflow-hidden shadow-lg">
              <Image src="/image/company/main.jpg" alt="유진전원시스템 본사 전경" width={1100} height={500} className="object-cover w-full" />
            </div> */}

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
                  저희는 <strong className="text-[#F62CE9]">30여년간의 UPS 제조의 축적된 기술력과 풍부한 노하우</strong>로 제도권내 금융권 및 전국기업체, 정부기관 등에 약 2500여대의 중대형 UPS를
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
                {/* <p className="text-gray-600 text-sm leading-relaxed">
                  또한 1998년부터 도입한 <strong className="text-[#EE3636]">고객 무한대서비스</strong>의 시작으로 저희가 납품한 모든 UPS는 고객께서 책정하신 내용 연수가 끝날 때까지 무상A/S를 해드리고
                  있습니다.
                </p> */}
                <p className="text-gray-600 text-sm leading-relaxed font-bold text-[#6AAF35]">
                  궁금하신 사항이나 필요한 자료가 있으시면 언제든지 문의하여 주십시오. 친절하고 성실하게 상담해 드리겠습니다.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">감사합니다</p>
              </div>
            </div>

            <Image src="/image/company/ceoname.jpg" alt="대표이사 서명" width={260} height={200} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
