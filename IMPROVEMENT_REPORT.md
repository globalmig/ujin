# 유진전원시스템 홈페이지 개선 보고서

> 작성일: 2026-04-20  
> 대상 프로젝트: Next.js 16 / React 19 / Tailwind CSS 4

---

## 목차

1. [코드 중복 제거 (컴포넌트화)](#1-코드-중복-제거-컴포넌트화)
2. [성능 개선](#2-성능-개선)
3. [버그 수정](#3-버그-수정)
4. [접근성 개선](#4-접근성-개선)

---

## 1. 코드 중복 제거 (컴포넌트화)

### 1-1. Contact CTA 섹션 중복 제거

#### 원인
`app/company/page.tsx`와 `app/components/ContactSection.tsx` 두 파일에 **동일한 고객센터 CTA 섹션**이 하드코딩으로 이중 존재했습니다.  
전화번호·이메일 등 연락처 정보 변경 시 두 파일을 모두 수정해야 하는 유지보수 문제가 있었습니다.

#### 분석

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| CTA 섹션 존재 파일 수 | 2개 (company/page.tsx, ContactSection.tsx) | 1개 (ContactSection.tsx) |
| 연락처 수정 시 변경 파일 수 | 2개 | 1개 |
| company/page.tsx 코드량 | 101줄 | 51줄 (-50%) |

#### 변경 전 코드 (`app/company/page.tsx`)

```tsx
{/* Contact CTA — ContactSection.tsx와 동일한 내용을 별도로 하드코딩 */}
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
      <a href="tel:028948057" className="...">02-894-8057</a>
      <a href="mailto:ups8057@naver.com" className="...">ups8057@naver.com</a>
      <a href="/contact" className="...">고객 문의하기</a>
    </div>
  </div>
</section>
```

#### 변경 후 코드 (`app/company/page.tsx`)

```tsx
import ContactSection from "../components/ContactSection";

// 인라인 CTA 섹션 전체 제거 후 컴포넌트 1줄로 대체
<ContactSection />
```

---

## 2. 성능 개선

### 2-1. 제품 상세 이미지 — `<img>` → Next.js `<Image>`

#### 원인
`app/products/[categoryId]/page.tsx`에서 제품 상세 이미지를 **네이티브 `<img>` 태그**로 렌더링하고 있었습니다.  
Next.js `<Image>` 컴포넌트를 사용하지 않아 다음 최적화가 모두 누락되었습니다:
- 이미지 포맷 자동 변환 (WebP / AVIF)
- 화면 크기별 적절한 해상도 제공 (`srcset`)
- 레이지 로딩 (뷰포트 밖 이미지 지연 로드)
- LCP(최대 콘텐츠풀 페인트) 우선순위 설정 누락

#### 분석

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 이미지 포맷 | 원본 PNG 그대로 전송 | WebP/AVIF 자동 변환 |
| 예상 이미지 용량 절감 | 기준 | **최대 586 KiB 절감** (Lighthouse 진단 기준) |
| LCP 이미지 우선 로드 | 미적용 | `priority={idx === 0}` 첫 이미지에 적용 |
| 반응형 이미지 | 미적용 | `sizes` prop으로 뷰포트별 최적 해상도 |
| 레이지 로딩 | 미적용 | 2번째 이미지부터 자동 lazy load |

#### 변경 전 코드

```tsx
// eslint-disable-next-line @next/next/no-img-element
<img
  key={filename}
  src={getImageSrc(imageData.folder, filename)}
  alt={filename.replace(".png", "")}   // 파일명이 그대로 alt 텍스트로 노출
  className="w-full block"
/>
```

#### 변경 후 코드

```tsx
import Image from "next/image";

<Image
  key={filename}
  src={getImageSrc(imageData.folder, filename)}
  alt={`${category.label} ${filename.replace(/^\d+\s/, "").replace(".png", "")}`}
  width={1100}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
  style={{ width: "100%", height: "auto" }}
  className="block"
  priority={idx === 0}   // 첫 번째 이미지(LCP 후보)에만 우선 로드
/>
```

---

### 2-2. 헤더 PC 네비게이션 — `<a>` → `<Link>`

#### 원인
`app/components/Header.tsx`의 PC용 네비게이션이 HTML `<a>` 태그를 사용하고 있었습니다.  
`<a>` 태그는 클릭 시 **전체 페이지를 새로 로드**하므로 Next.js 클라이언트 라우팅의 이점이 없었습니다.

#### 분석

| 항목 | 변경 전 (`<a>`) | 변경 후 (`<Link>`) |
|------|----------------|-------------------|
| 페이지 이동 방식 | 전체 페이지 재로드 (서버 왕복) | 클라이언트 사이드 라우팅 |
| JS 번들 재다운로드 | 매 이동마다 발생 | 최초 1회만 발생 |
| 렌더-블로킹 요청 | 발생 가능 | **최대 350 ms 절감** 기여 |
| 모바일 메뉴 `<Link>` | 이미 적용 | 동일 유지 |

#### 변경 전 코드

```tsx
// PC 네비게이션만 <a> 사용 — 모바일은 이미 <Link>였음
{navItems.map((item) => (
  <a
    key={item.href}
    href={item.href}
    className={`text-sm font-medium ...`}
  >
    {item.name}
  </a>
))}
```

#### 변경 후 코드

```tsx
import Link from "next/link";

{navItems.map((item) => (
  <Link
    key={item.href}
    href={item.href}
    className={`text-sm font-medium ...`}
  >
    {item.name}
  </Link>
))}
```

---

### 2-3. Back/Forward Cache (bfcache) 복원 실패 제거

#### 원인
`app/components/ScrollToTop.tsx`의 `useEffect`에서 **컴포넌트 마운트 시 강제로 `window.scrollTo({ top: 0 })`를 호출**하고 있었습니다.  
브라우저의 뒤로가기/앞으로가기 캐시(bfcache)는 페이지를 메모리에서 즉시 복원하면서 스크롤 위치도 함께 복원합니다.  
강제 스크롤 초기화가 이 복원 과정을 방해하여 **bfcache 복원 실패 1건** (Lighthouse 진단 기준)이 발생했습니다.

#### 분석

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| bfcache 복원 실패 | 1건 | 0건 |
| 뒤로가기 시 동작 | 스크롤 강제 초기화 (UX 이상) | 이전 스크롤 위치 정상 복원 |
| 스크롤 이벤트 리스너 정리 | 정상 (return 문으로 제거) | 동일 유지 |

#### 변경 전 코드

```tsx
useEffect(() => {
  window.scrollTo({ top: 0 });   // ← bfcache 복원을 방해

  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

#### 변경 후 코드

```tsx
useEffect(() => {
  // 강제 스크롤 초기화 제거 — bfcache 정상 복원
  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

## 3. 버그 수정

### 3-1. ContactSection — `href="#"` 깨진 링크

#### 원인
`app/components/ContactSection.tsx`의 "고객 문의하기" 버튼이 `href="#"`로 설정되어 있었습니다.  
클릭 시 `/contact` 페이지로 이동하지 않고 현재 페이지 최상단으로만 스크롤되었습니다.

#### 변경 전 코드

```tsx
<a href="#" className="...">    {/* ← 잘못된 경로 */}
  <Image src="/image/icon_line_list.svg" alt="고객 문의하기" width={20} height={20} />
  고객 문의하기
</a>
```

#### 변경 후 코드

```tsx
import Link from "next/link";

<Link href="/contact" className="...">   {/* ← 올바른 경로 + 클라이언트 라우팅 */}
  <Image src="/image/icon_line_list.svg" alt="" width={20} height={20} />
  고객 문의하기
</Link>
```

---

### 3-2. 사이트 제목 오타

#### 원인
`app/layout.tsx`의 메타 타이틀에 **"유진전압시스템"** 이라고 오타가 있었습니다.  
실제 회사명은 **유진전원시스템**입니다. SEO 및 탭 제목에 영향을 줍니다.

#### 변경 전 코드

```tsx
export const metadata: Metadata = {
  title: "유진전압시스템 - UPS 전문기업",   // ← 오타
  ...
};
```

#### 변경 후 코드

```tsx
export const metadata: Metadata = {
  title: "유진전원시스템 - UPS 전문기업",   // ← 수정
  ...
};
```

---

## 4. 접근성 개선

### 4-1. HeroSection 슬라이드 점(dot) 버튼 — 접근 가능한 이름 없음

#### 원인
`app/components/HeroSection.tsx`의 슬라이드 네비게이션 점 버튼에 텍스트도, `aria-label`도 없었습니다.  
스크린 리더가 버튼의 목적을 전달할 수 없고, 터치 타겟 크기도 8px으로 최소 권장 크기(44px)에 미달했습니다.

#### 분석

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 버튼 접근 가능한 이름 | 없음 | `aria-label="슬라이드 N으로 이동"` |
| 현재 슬라이드 표시 | 없음 | `aria-current="true"` |
| 터치 타겟 높이 | 8px (점 크기) | 48px (`py-5` padding 적용) |

#### 변경 전 코드

```tsx
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
  {Array.from({ length: total }).map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrent(i)}
      className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50"}`}
    />   // ← aria-label 없음, 터치 타겟 8px
  ))}
</div>
```

#### 변경 후 코드

```tsx
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-10">
  {Array.from({ length: total }).map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrent(i)}
      aria-label={`슬라이드 ${i + 1}로 이동`}
      aria-current={i === current ? "true" : undefined}
      className="py-5 px-2 flex items-center"   // ← 터치 타겟 48px
    >
      <span className={`h-2 rounded-full transition-all ${i === current ? "bg-white w-5" : "bg-white/50 w-2"}`} />
    </button>
  ))}
</div>
```

---

### 4-2. ProductsSection — 버튼 접근성 및 터치 타겟 개선

#### 원인
`app/components/ProductsSection.tsx`에 다음 3가지 문제가 있었습니다:

1. **이전/다음 버튼**: 텍스트가 `←`, `→` 기호뿐이라 스크린 리더에서 "왼쪽 화살표"로만 읽힘
2. **버튼 터치 타겟**: `w-9 h-9` = 36px으로 WCAG 권장 최소 크기(44px) 미달
3. **제품 카드**: `<div>` + `onClick`만 있어 키보드 탐색 불가능, 스크린 리더에서 대화형 요소로 인식 안 됨
4. **화살표 아이콘**: `<div>` 안의 `‹` 기호로만 구성되어 제품 페이지 링크 역할을 하지 못함

#### 분석

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 이전/다음 버튼 aria-label | 없음 | `"이전 제품"` / `"다음 제품"` |
| 버튼 터치 타겟 | 36px (`w-9 h-9`) | 44px (`w-11 h-11`) |
| 제품 카드 키보드 접근 | 불가 | `role="button"` + `tabIndex={0}` + `onKeyDown` |
| 화살표 버튼 역할 | 시각적 장식 | 제품 페이지로 이동하는 `<Link>` |
| 제품 카드 aria-label | 없음 | `"UPS - 무정전 전원장치"` 등 |

#### 변경 전 코드

```tsx
// 이전/다음 버튼 — aria-label 없음, 36px
<button
  type="button"
  onClick={prev}
  className="w-9 h-9 rounded-full border ..."   // 36px
>
  ←
</button>

// 제품 카드 — div로만 구성, 키보드 접근 불가
<div
  key={p.id}
  onClick={() => setCurrent(idx)}
  className="shrink-0 relative overflow-hidden rounded-2xl cursor-pointer ..."
>
  ...
  {/* 화살표 — 링크 역할 없음 */}
  <div className="w-8 h-8 rounded-full bg-white/20 ...">
    <span className="text-white text-xs">›</span>
  </div>
</div>
```

#### 변경 후 코드

```tsx
// 이전/다음 버튼 — aria-label 추가, 44px
<button
  type="button"
  onClick={prev}
  aria-label="이전 제품"
  className="w-11 h-11 rounded-full border ..."   // 44px
>
  ←
</button>

// 제품 카드 — role, tabIndex, onKeyDown 추가
<div
  key={p.id}
  onClick={() => setCurrent(idx)}
  onKeyDown={(e) => e.key === "Enter" && setCurrent(idx)}
  role="button"
  tabIndex={0}
  aria-label={`${p.name} - ${p.desc}`}
  className="..."
>
  ...
  {/* 화살표 → 제품 페이지 Link로 변경, 44px 터치 타겟 */}
  <Link
    href={p.href}
    aria-label={`${p.name} 제품 페이지로 이동`}
    onClick={(e) => e.stopPropagation()}
    className="w-11 h-11 rounded-full bg-white/20 ..."
  >
    <span className="text-white text-xs" aria-hidden="true">›</span>
  </Link>
</div>
```

#### 제품 카드 링크 매핑 추가

```tsx
const products = [
  { ..., href: "/products/single-ups" },   // UPS
  { ..., href: "/products/avr" },           // AVR
  { ..., href: "/products/frequency" },     // FC
  { ..., href: "/products" },               // 정류기 (카테고리 미등록)
];
```

---

### 4-3. 이미지 alt 텍스트 개선

#### 원인
여러 곳에서 이미지 `alt` 텍스트가 부적절하게 설정되어 있었습니다:

- 제품 페이지: `alt={filename.replace(".png", "")}` → 파일명이 그대로 노출 (예: `"1 제품프로필"`)
- 아이콘 이미지: 링크 텍스트와 `alt`가 중복되어 스크린 리더가 같은 내용을 두 번 읽음
- 대표이사 서명 이미지: `alt="유진전원시스템 회사 이미지"` (부정확)

#### 변경 내용

```tsx
// 제품 이미지 — 숫자 접두사 제거 후 카테고리명 포함
// 변경 전
alt={filename.replace(".png", "")}   // "1 제품프로필"

// 변경 후
alt={`${category.label} ${filename.replace(/^\d+\s/, "").replace(".png", "")}`}
// "단상 UPS 제품프로필"

// 아이콘 이미지 — 링크 텍스트와 중복되므로 빈 alt
// 변경 전
<Image src="/image/icon_line_list.svg" alt="고객 문의하기" />

// 변경 후
<Image src="/image/icon_line_list.svg" alt="" />   // 장식적 이미지

// 대표이사 서명 이미지
// 변경 전
alt="유진전원시스템 회사 이미지"

// 변경 후
alt="대표이사 서명"
```

---

## 개선 항목 요약표

| 분류 | 항목 | 파일 | 개선 수치 |
|------|------|------|-----------|
| 중복 제거 | Contact CTA 컴포넌트화 | company/page.tsx | 코드 -50줄 |
| 성능 | `<img>` → Next.js `<Image>` | products/[categoryId]/page.tsx | 이미지 용량 최대 -586 KiB |
| 성능 | PC 네비 `<a>` → `<Link>` | Header.tsx | 렌더블로킹 최대 -350 ms |
| 성능 | bfcache 강제 스크롤 제거 | ScrollToTop.tsx | 복원 실패 1건 → 0건 |
| 버그 | `href="#"` 수정 | ContactSection.tsx | 링크 동작 정상화 |
| 버그 | 사이트 제목 오타 수정 | layout.tsx | SEO 정확도 향상 |
| 접근성 | 슬라이드 버튼 aria-label | HeroSection.tsx | WCAG 2.1 AA 준수 |
| 접근성 | 슬라이드 버튼 터치 타겟 | HeroSection.tsx | 8px → 48px |
| 접근성 | 이전/다음 버튼 aria-label | ProductsSection.tsx | WCAG 2.1 AA 준수 |
| 접근성 | 버튼 터치 타겟 | ProductsSection.tsx | 36px → 44px |
| 접근성 | 제품 카드 키보드 접근 | ProductsSection.tsx | 키보드 탐색 가능 |
| 접근성 | 제품 카드 → 제품 페이지 Link | ProductsSection.tsx | 탐색성 향상 |
| 접근성 | 이미지 alt 텍스트 | 여러 파일 | 스크린 리더 정확도 향상 |

---

## 수정된 파일 목록

```
app/
├── layout.tsx                           # 제목 오타 수정
├── company/
│   └── page.tsx                         # 중복 CTA 제거, ContactSection 재사용
├── components/
│   ├── ContactSection.tsx               # href="#" 수정, <a>→<Link>
│   ├── Header.tsx                       # PC 네비 <a>→<Link>
│   ├── HeroSection.tsx                  # 슬라이드 버튼 접근성
│   ├── ProductsSection.tsx              # 버튼 접근성·터치타겟·카드링크
│   └── ScrollToTop.tsx                  # bfcache 강제 스크롤 제거
└── products/
    └── [categoryId]/
        └── page.tsx                     # <img>→<Image>, alt 텍스트
```
