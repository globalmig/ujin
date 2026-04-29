import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          background: "linear-gradient(rgba(10,30,70,0.30), rgba(10,30,70,0.70)), url('/image/bg_contact.jpg') center/cover no-repeat",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-15 -right-15 w-80 h-80 rounded-full border border-white/10" />
      <div className="absolute -top-7.5 -right-7.5 w-60 h-60 rounded-full border border-white/10" />

      <div className="relative z-10 max-w-300 mx-auto px-6 text-center">
        <p className="text-white/60 text-xs tracking-widest uppercase mb-4">CUSTOMER CENTER</p>
        <h2 className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-3">궁금하신 사항이나 필요한 자료가 있으시다면</h2>
        <p className="text-white text-xl md:text-2xl font-bold mb-10">언제든지 문의해주세요.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:028948057" className="flex items-center justify-center gap-3 bg-[#1a4fa0] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#0d3070] transition-colors">
            <Image src="/image/icon_line_call.svg" alt="전화 문의" width={20} height={20} style={{ width: "20px", height: "20px" }} />
            02-894-8057
          </a>
          <a href="mailto:ups8057@naver.com" className="flex items-center justify-center gap-3 bg-[#4d8ef0] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3a7ae0] transition-colors">
            <Image src="/image/icon_line_mail.svg" alt="이메일 문의" width={20} height={20} style={{ width: "20px", height: "20px" }} />
            ups8057@naver.com
          </a>
          <Link href="/contact" className="flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
            <Image src="/image/icon_line_list.svg" alt="" width={20} height={20} style={{ width: "20px", height: "20px" }} />
            고객 문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
