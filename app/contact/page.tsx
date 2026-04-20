"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);
  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/image/contact/bg_hero.jpg" alt="문의 배경" fill className="object-cover object-center " priority />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="text-white/70 text-xs tracking-[0.35em] uppercase mb-3">COMPANY Contact</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold">문의하기</h1>
          <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span>›</span>
            <span className="text-white">문의하기</span>
          </div>
        </div>
      </section>

      {/* form section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <form className="w-full border border-gray-300 text-sm">
            {/* 상호 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">
                상호 <span className="text-red-500 ml-0.5">*</span>
              </span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <input type="text" name="company" className="w-full border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 직책/담당자 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">
                직책/담당자 <span className="text-red-500 ml-0.5">*</span>
              </span>
              <div className="flex-1 px-4 py-2 flex items-center gap-3">
                <input type="text" name="position" className="flex-1 md:flex-none md:w-45 border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0]" />
                <input type="text" name="manager" className="flex-1 md:flex-none md:w-45 border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">
                전화번호 <span className="text-red-500 ml-0.5">*</span>
              </span>
              <div className="flex-1 px-4 py-2 flex items-center gap-1">
                <input type="text" name="tel1" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="tel2" maxLength={4} className="w-20 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="tel3" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 휴대폰 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">휴대폰</span>
              <div className="flex-1 px-4 py-2 flex items-center gap-1">
                <input type="text" name="mobile1" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="mobile2" maxLength={4} className="w-20 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="mobile3" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 팩스번호 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">팩스번호</span>
              <div className="flex-1 px-4 py-2 flex items-center gap-1">
                <input type="text" name="fax1" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="fax2" maxLength={4} className="w-20 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">-</span>
                <input type="text" name="fax3" maxLength={4} className="w-15 border border-gray-300 px-2 py-1 text-center outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">
                이메일 <span className="text-red-500 ml-0.5">*</span>
              </span>
              <div className="flex-1 px-4 py-2 flex items-center gap-1">
                <input type="text" name="email1" className="flex-1 md:flex-none md:w-35 border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0]" />
                <span className="text-gray-400">@</span>
                <input type="text" name="email2" className="flex-1 md:flex-none md:w-40 border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0]" />
              </div>
            </div>

            {/* 제품선택 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">
                제품선택 <span className="text-red-500 ml-0.5">*</span>
              </span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <select name="product" className="w-full md:w-auto border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] bg-white">
                  <option value="">제품을 선택하세요.</option>
                  <option value="ups">UPS</option>
                  <option value="avr">AVR</option>
                  <option value="fc">FC</option>
                  <option value="rectifier">정류기</option>
                </select>
              </div>
            </div>

            {/* 입력전압 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">입력전압</span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <select name="inputVoltage" className="w-full md:w-auto border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] bg-white">
                  <option value="">입력전압을 선택하세요.</option>
                  <option value="110">110V</option>
                  <option value="220">220V</option>
                  <option value="380">380V</option>
                </select>
              </div>
            </div>

            {/* 출력전압 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">출력전압</span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <select name="outputVoltage" className="w-full md:w-auto border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] bg-white">
                  <option value="">출력전압을 선택하세요.</option>
                  <option value="110">110V</option>
                  <option value="220">220V</option>
                  <option value="380">380V</option>
                </select>
              </div>
            </div>

            {/* 입력주파수 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">입력주파수</span>
              <div className="flex-1 px-4 py-2 flex items-center gap-5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="inputHz" value="50" className="accent-[#1a4fa0]" /> 50Hz
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="inputHz" value="60" className="accent-[#1a4fa0]" /> 60Hz
                </label>
              </div>
            </div>

            {/* 출력주파수 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">출력주파수</span>
              <div className="flex-1 px-4 py-2 flex items-center gap-5 flex-wrap">
                {["50Hz", "60Hz", "45~65Hz", "40~999Hz", "기타"].map((v) => (
                  <label key={v} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="outputHz" value={v} className="accent-[#1a4fa0]" /> {v}
                  </label>
                ))}
              </div>
            </div>

            {/* 용량 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">용량</span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <select name="capacity" className="w-full md:w-auto border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] bg-white">
                  <option value="">용량을 선택하세요.</option>
                  <option value="1kva">1KVA</option>
                  <option value="2kva">2KVA</option>
                  <option value="3kva">3KVA</option>
                  <option value="5kva">5KVA</option>
                  <option value="10kva">10KVA</option>
                  <option value="20kva">20KVA</option>
                  <option value="30kva">30KVA</option>
                  <option value="etc">기타</option>
                </select>
              </div>
            </div>

            {/* 백업시간 */}
            <div className="flex flex-col md:flex-row border-b border-gray-300">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-center">백업시간</span>
              <div className="flex-1 px-4 py-2 flex items-center">
                <select name="backup" className="w-full md:w-auto border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] bg-white">
                  <option value="">백업시간을 선택하세요.</option>
                  <option value="10">10분</option>
                  <option value="20">20분</option>
                  <option value="30">30분</option>
                  <option value="60">1시간</option>
                  <option value="etc">기타</option>
                </select>
              </div>
            </div>

            {/* 기타내용 */}
            <div className="flex flex-col md:flex-row">
              <span className="w-full md:w-35 shrink-0 bg-[#f5f7fa] px-4 py-3 font-medium text-gray-700 border-b border-gray-300 md:border-b-0 md:border-r flex items-start pt-3">기타내용</span>
              <div className="flex-1 px-4 py-2">
                <textarea name="message" rows={8} className="w-full border border-gray-300 px-2 py-1 outline-none focus:border-[#1a4fa0] resize-none" />
              </div>
            </div>
          </form>

          {/* 개인정보취급방침 */}
          <div className="py-10 bg-white w-full">
            <div className="max-w-[1440px] mx-auto ">
              <div className="border border-gray-300">
                <div className="bg-[#f5f7fa] px-4 py-3 border-b border-gray-300 font-medium text-gray-700 text-sm">
                  개인정보취급방침 <span className="text-red-500">*</span>
                </div>
                <div className="h-[220px] overflow-y-auto px-4 py-4 text-sm text-gray-700 leading-relaxed space-y-4">
                  <div>
                    <p>
                      1. 회원의 개인정보 수집목적 및 이용 당사는 고객님께서 당사에서 물품 및 서비스 상품에 대한 주문 및 접수, 대금 결제를 이용하고 주문 상품 배송 및 회원에게 제공되는 각종 편의
                      서비스를 이용하기 위해 필요한 최소한의 정보를 필수로 수집하고 있습니다. 당사 회원으로 등록하신 모든 고객의 개인정보는 위에서 밝힌 목적이외에는 절대로 사용될 수 없으나, 회원
                      개인정보의 사용 목적과 용도가 변경될 경우에 반드시 당사 회원으로 등록하신 모든 고객님께 동의를 구할 것입니다. <br /> <br />
                      2. 개인정보 수집 항목 및 보유, 이용 기간 당사 회원을 대상으로 각종 서비스를 제공하기 위해 제공 받는 필수 회원정보는 다음과 같습니다. ① 성명 ② 주민등록번호(회원의 경우) ③ 주소 ④
                      전화번호(일반전화와 핸드폰) ⑤ 희망ID(회원의 경우) ⑥ 비밀번호(회원의 경우) 이외에 회원가입시 고객님이 원하실 경우에 추가 정보를 선택하여 제공하실 수 있도록 되어 있으며 일부 물품
                      및 서비스 상품에 대한 주문 및 접수시에 고객님이 원하시는 정확한 주문 내용을 파악하여 원활한 주문 및 결제와 배송을 위하여 추가 정보를 요구하고 있습니다. 회원이 탈퇴하시거나 코센의
                      이용약관에 의한 회원 자격 상실의 경우에 당사가 보유한 해당 고객의 개인 정보는 지체 없이 파기됩니다. <br /> <br />
                      3. 아동의 개인 정보 보호 당사는 &quot;정보통신망이용 촉진 및 정보보호등에 관한 법률 제31조 제1항&quot;에 의하여 만14세미만의 아동의 개인정보 수집시 법정대리인의 동의를 받아야
                      합니다. 따라서, 당사는 만14세미만의 아동에 대해서는 개인정보를 받지 않을 뿐만 아니라, 회원으로 가입이 되지 않습니다. 단, 14세 미만의 아동은 법정대리인의 동의 및 서면 인증후에,
                      회원으로 가입할 수 있습니다. 또한, 만 14세 미만 아동의 법정 대리인은 아동의 개인정보의 열람, 정정, 동의 철회를 요청할수 있으며 이런 요청이 있을 경우 당사는 지체없이 필요한 조치를
                      취합니다. <br /> <br />
                      4. 개인정보 제공 및 공유 당사 회원의 고객 개인정보는 원칙적으로 제3기관 및 제3자에게 제공 될 수 없으며 당사가 회원님께 편의를 제공하기 위하여 특정 회사에 개인정보를 제공하고자 할
                      경우에는 반드시 회원님께 해당되는 합당한 절차를 통하여 동의를 구하도록 되어 있습니다. 단, 다음 경우에 한하여 고객의 동의 없이 개인정보를 제공할 수 있습니다. ① 업무상 배송업체에
                      배송에 필요한 최소한의 이용자정보(성명, 주소, 전화번호)를 알려주는 경우 ② 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는
                      경우 ③ 정부 기관의 공식적 요청이 있을 경우.
                      <br /> <br /> 5. 개인정보 열람, 정정 및 삭제 처리 회원님이 원하실 경우 언제라도 당사에서 개인정보를 열람하실 수 있으며 보관된 필수 정보를 수정하실 수 있습니다. 또한 회원가입시
                      요구된 필수 정보 외의 추가 정보는 언제나 열람, 수정, 삭제할 수 있습니다. 회원님의 개인정보 변경 및 삭제와 회원탈퇴는 당사의 고객센터에서 로그인(Login) 후 이용하실 수 있습니다.{" "}
                      <br /> <br />
                      6. 쿠키(Cookie) 운영 당사는 회원인증을 위하여 Cookie 방식을 이용하고 있습니다. 이는 로그아웃(Logout)시 자동으로 컴퓨터에 저장되지 않고 삭제되도록 되어 있으므로 공공장소나 타인이
                      사용할 수 있는 컴퓨터를 사용하 실 경우에는 로그인(Login)후 서비스 이용이 끝나시면 반드시 로그아웃(Logout)해 주시기 바랍니다.
                      <br /> <br /> 7. 비회원고객의 개인정보관리 ① 당사는 비회원 고객 또한 물품 및 서비스 상품의 구매를 하실 수 있습니다. 당사는 비회원 주문의 경우 배송 및 대금 결제, 상품 배송에
                      반드시 필요한 개인정보만을 고객님께 요청하고 있습니다. ② 당사에서 비회원으로 구입을 하신 경우 비회원 고객께서 입력하신 지불인 정보 및 수령인 정보는 대금 결제 및 상품 배송에
                      관련한 용도 외에는 다른 어떠한 용도로도 사용되지 않습니다.
                      <br /> <br /> 8. 네트워크 보안 당사는 서버 및 네트워크 관련 첨단 보안시스템을 갖추고 있습니다. 당사는 자체 방화벽 및 침입탐지 시스템, 침입방지 시스템을 갖추고 고객님의 개인정보
                      보호를 위해 최선의 방법을 취하고 있습니다. 또한, 전문 보안 솔루션 업체인 시큐아이닷컴(SecuI.com)을 통해 정기적, 부정기적으로 보안점검 및 컨설팅을 받고 있으며 자체 네트워크
                      보안규정에 따라 철저한 시스템 점검을 시행하고 있습니다. 전자 결제에 대해서는 SSL(Secure Socket Layer)방식의 보안 시스템을 탑재하고 있으며 미국 베리사인社(Verisign Inc.)를 통하여
                      인증받아 사용하고 있습니다. 9. 내부 보안 대책 당사는 고객의 개인정보를 취급할 수 있는 인력을 최소한으로 한정하고 해당 인원에게 정기적, 부정기적 보안교육을 실시하고 있습니다. 또한
                      고객님의 개인정보를 열람할 수 있는 시스템에는 2차 암호 체제를 갖추고 외부 네트워크로부터 철저하게 격리시켜 외부 침입 및 내부 침입에 대응하고 있습니다. 이상의 당사의 개인정보
                      보호정책은 사이트 오픈과 동시에 시행합니다. 당사는 개인정보 보호 관리책임자를 아래와 같이 지정합니다. - 부서: 시스템사업부 - 성명: 김 진 영 - E-mail: ups8057@hanmail.net
                    </p>
                  </div>
                </div>
              </div>
              <label className="mt-3 flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-[#1a4fa0] cursor-pointer" />
                개인정보취급방침에 동의합니다.
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={!agreed}
              className="bg-[#1a4fa0] text-white px-12 py-3 text-sm font-medium transition-colors hover:bg-[#0d3070] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              문의하기
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
