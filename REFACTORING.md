# 리팩토링 내역

## 1. 인증 로직 중복 제거 → `lib/auth.ts`

**이전:** `app/api/admin/contacts/route.ts`와 `app/api/admin/contacts/[id]/route.ts` 양쪽에 동일한 Bearer token 검증 코드가 중복 존재.

```ts
// 두 파일에 각각 존재하던 중복 코드
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin1234';
if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**이후:** `lib/auth.ts`로 추출하고 두 라우트에서 import.

```ts
// lib/auth.ts
export function isAuthorized(authHeader: string | null): boolean { ... }
export function unauthorized(): Response { ... }

// API route
if (!isAuthorized(request.headers.get('authorization'))) return unauthorized();
```

---

## 2. `ContactSubmission` 타입 중복 제거

**이전:** `lib/contacts.ts`에 선언된 인터페이스를 `app/admin/page.tsx`에서 동일하게 재선언.

**이후:** `app/admin/page.tsx`에서 직접 import.

```ts
import type { ContactSubmission } from "@/lib/contacts";
```

---

## 3. 폼 초기값 중복 제거 → `INITIAL_FORM` 상수

**이전:** `useState` 초기값과 제출 후 폼 리셋 시 동일한 객체 리터럴을 두 곳에 중복 작성.

**이후:** 컴포넌트 외부에 상수로 추출하고 두 곳 모두에서 참조.

```ts
const INITIAL_FORM = { company: "", position: "", ... };
type FormState = typeof INITIAL_FORM;

// useState
const [form, setForm] = useState<FormState>(INITIAL_FORM);

// 리셋
setForm(INITIAL_FORM);
```

---

## 4. Tailwind arbitrary value → canonical class 전환

Tailwind 4 기준, 임의값 표기를 단위 기반 canonical class로 통일. (1 unit = 4px)

| 파일 | 이전 | 이후 |
|---|---|---|
| `contact/page.tsx` | `max-w-[1100px]` | `max-w-275` |
| `contact/page.tsx` | `max-w-[1440px]` | `max-w-360` |
| `contact/page.tsx` | `h-[220px]` | `h-55` |
| `company/page.tsx` | `max-w-[1100px]` | `max-w-275` |
| `components/Footer.tsx` | `max-w-[1200px]` | `max-w-300` |
| `components/Footer.tsx` | `md:max-w-[860px]` | `md:max-w-215` |
| `components/PromiseSection.tsx` | `max-w-[1200px]` | `max-w-300` |
| `components/HeroSection.tsx` | `min-h-[500px]` | `min-h-125` |
| `components/HeroSection.tsx` | `max-h-[700px]` | `max-h-175` |
| `components/HeroSection.tsx` | `max-w-[1440px]` | `max-w-360` |
| `components/PageHero.tsx` | `h-[320px]` | `h-80` |
| `components/PageHero.tsx` | `md:h-[420px]` | `md:h-105` |

---

## 5. CSS 충돌 클래스 제거

**이전:** `company/page.tsx`에서 동일한 CSS 속성(`color`)을 덮어쓰는 클래스 중복 적용.

```tsx
// text-gray-600과 text-[#6AAF35]가 같은 color 속성 충돌
<p className="text-gray-600 text-sm leading-relaxed font-bold text-[#6AAF35]">
```

**이후:** 의도된 색상(`text-[#6AAF35]`)만 남기고 제거.

```tsx
<p className="text-[#6AAF35] text-sm leading-relaxed font-bold">
```

---

## 6. 죽은 주석 제거

**이전:** `company/page.tsx`에 실제로 사용하지 않는 코드 블록 3개가 주석으로 남아있었음.
- 본사 전경 이미지 (`main.jpg`)
- `<main>` 태그 주석
- "1998년부터 도입한 고객 무한대서비스" 단락

**이후:** 전부 제거.
