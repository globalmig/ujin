import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a2030] text-white/60 py-10">
      <div className="max-w-300 mx-auto px-6">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-40 h-12 shrink-0">
              <Image src="/image/common/logo-white.svg" alt="유진전원시스템 로고" fill sizes="160px" className="object-contain object-left" />
            </div>
            <p className="text-xs leading-relaxed text-white/70 md:max-w-215">
              상호 : 유진전원시스템(주) &nbsp;|&nbsp; 대표자 : 손철기 &nbsp;|&nbsp; 사업자등록번호 : 138-02-68537 &nbsp;|&nbsp; 본사 : 서울시 금천구 시흥대로 97 &nbsp;|&nbsp; 공장 : 인천시 서구
              장고개로 117번길 &nbsp;|&nbsp; TEL : 02-894-8057(대) &nbsp;|&nbsp; FAX : 02-894-8058 &nbsp;|&nbsp; EMAIL : ups8057@naver.com
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 text-xs text-center text-white/60">Copyright © 2026 YUJIN POWER SOURCE SYSTEM All right reserved.</div>
        </div>
      </div>
    </footer>
  );
}
