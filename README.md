# 유진전원시스템 웹사이트

UPS 전문기업 유진전원시스템(주)의 공식 웹사이트입니다.

## 기술 스택

| 분류       | 기술                    |
| ---------- | ----------------------- |
| 프레임워크 | Next.js 16 (App Router) |
| 언어       | TypeScript 5            |
| 스타일     | Tailwind CSS 4          |
| 백엔드     | Supabase (PostgreSQL)   |
| 배포       | Vercel                  |

---

## 폴더 구조

```
ujin/
├── app/                          # Next.js App Router 루트
│   ├── layout.tsx                # 전역 레이아웃 (Header, Footer, SEO 메타데이터)
│   ├── page.tsx                  # 홈페이지
│   ├── globals.css               # 전역 CSS (Tailwind, CSS 변수, 폰트)
│   ├── robots.ts                 # robots.txt 생성
│   ├── sitemap.ts                # sitemap.xml 생성
│   │
│   ├── company/
│   │   └── page.tsx              # 회사소개 페이지
│   │
│   ├── contact/
│   │   ├── layout.tsx            # 견적서 페이지 메타데이터
│   │   └── page.tsx              # 견적서 의뢰 폼
│   │
│   ├── products/
│   │   ├── page.tsx              # /products → 첫 카테고리로 리다이렉트
│   │   ├── [categoryId]/
│   │   │   └── page.tsx          # 제품 상세 페이지 (동적 라우트)
│   │   └── _components/          # products 라우트 전용 컴포넌트
│   │       └── ProductSidebar.tsx
│   │
│   ├── admin/
│   │   └── page.tsx              # 문의 관리 페이지 (비공개)
│   │
│   └── api/
│       ├── contact/
│       │   └── route.ts          # POST /api/contact (문의 접수)
│       └── admin/contacts/
│           ├── route.ts          # GET /api/admin/contacts (문의 목록)
│           └── [id]/
│               └── route.ts      # DELETE /api/admin/contacts/:id
│
├── components/                   # 전역 공유 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx           # 메인 슬라이드 배너
│   ├── PageHero.tsx              # 서브 페이지 상단 배너
│   ├── ProductsSection.tsx       # 홈 제품 카드 슬라이더
│   ├── PromiseSection.tsx        # 홈 기업 약속 섹션
│   ├── ContactSection.tsx        # 홈 고객센터 섹션
│   └── ScrollToTop.tsx
│
├── lib/                          # 서버 로직 및 공유 데이터
│   ├── products.ts               # 제품 카테고리 데이터 + 유틸 함수
│   ├── contacts.ts               # Supabase contacts 테이블 CRUD
│   ├── supabase.ts               # Supabase 클라이언트 초기화
│   └── auth.ts                   # 관리자 인증 유틸
│
├── public/
│   └── image/
│       ├── common/               # 사이트 전반 공용 (로고, SEO, 공유 배경)
│       ├── icons/                # SVG 아이콘 (shield, battery, setting, call, mail, list)
│       ├── home/                 # 홈페이지 전용 (히어로 슬라이드, 제품 카드)
│       ├── company/              # 회사소개 페이지
│       ├── contact/              # 문의 페이지
│       └── products/             # 제품 이미지 (카테고리별 하위 폴더)
│           ├── SPT-301K_single-ups/
│           ├── SPT-100AK_three-single-ups/
│           ├── SPT-3300_three-three-ups/
│           ├── HP-900C_server-ups/
│           ├── AVR/
│           ├── NFS-2000_frequency/
│           ├── ES-Series_battery-es/
│           └── RP-Series_battery-rp/
│
├── next.config.ts                # Next.js 설정 (보안 헤더)
└── .env.local                    # 환경변수 (git 제외)
```

---

## 시스템 설계

### 컴포넌트 배치 원칙

**전역 컴포넌트** (`components/`)
여러 페이지에서 공유하는 UI를 둡니다. `Header`, `Footer`, `PageHero` 처럼 2개 이상의 라우트에서 import되는 컴포넌트가 여기에 속합니다.

**라우트 전용 컴포넌트** (`app/[route]/_components/`)
언더스코어(`_`) 접두사로 인해 Next.js가 해당 폴더를 라우트로 인식하지 않습니다. 특정 라우트 안에서만 사용하는 컴포넌트를 해당 라우트 폴더 안에 co-locate합니다. `ProductSidebar`는 `app/products/` 안에서만 쓰이므로 `app/products/_components/`에 위치합니다.

### 데이터 레이어 (`lib/`)

```
lib/
├── products.ts     # 정적 데이터 — 카테고리 목록, 이미지 매핑, 유틸 함수
├── contacts.ts     # 동적 데이터 — Supabase contacts 테이블 CRUD
├── supabase.ts     # DB 클라이언트 (Service Role Key 사용)
└── auth.ts         # Bearer 토큰 검증 (관리자 API 보호)
```

`lib/products.ts`는 DB를 쓰지 않는 순수 정적 데이터입니다. 제품 카테고리와 이미지 경로를 코드로 관리하며, 빌드 시점에 `generateStaticParams`와 `sitemap.ts`에서 참조합니다.

### 제품 페이지 동작 방식

```
/products                    → 첫 번째 카테고리로 redirect
/products/battery            → 첫 번째 자식(battery-es)으로 redirect
/products/battery-es         → 제품 이미지 갤러리 렌더링
```

이미지 경로는 `lib/products.ts`의 `productImageMap`에서 폴더명과 파일명 배열로 관리합니다.

```ts
// lib/products.ts
productImageMap["battery-es"] = {
  folder: "ES-Series_battery-es",
  images: ["1_product-profile.png", "2_product-intro.png", ...],
};

// 이미지 URL 조합
getImageSrc(folder, filename) → `/image/products/${folder}/${filename}`
```

모든 제품 페이지는 `generateStaticParams`로 빌드 시 정적 생성(SSG)됩니다.

### 문의 접수 흐름

```
[사용자] 폼 작성 → POST /api/contact
    → lib/contacts.ts saveContact()
    → Supabase contacts 테이블 INSERT

[관리자] /admin 접속 → 비밀번호 입력
    → GET /api/admin/contacts (Bearer 토큰 인증)
    → lib/contacts.ts getContacts()
    → 문의 목록 표시 / 개별 삭제 가능
```

관리자 페이지(`/admin`)는 `robots.ts`에서 크롤링 차단되어 있습니다.

### SEO 구조

- `app/layout.tsx`: 사이트 전역 메타데이터, OG 태그, JSON-LD 구조화 데이터
- 각 페이지의 `export const metadata` / `generateMetadata()`: 페이지별 메타데이터
- `app/sitemap.ts`: 전체 URL 자동 생성 (제품 카테고리 포함)
- `app/robots.ts`: `/admin` 크롤링 차단

---

## 환경변수

`.env.local` 파일을 프로젝트 루트에 생성합니다.

공개되면 안 되는 키(API Secret, DB 비밀번호 등)는
PUBLIC, REACT*APP*, NEXT*PUBLIC*, VITE\_ 와 같은
클라이언트 노출용 prefix를 사용하면 안 됩니다.

---

## 개발 시작

```bash
npm install
npm run dev
```
