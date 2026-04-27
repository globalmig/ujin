export type SubCategory = { id: string; label: string };
export type Category = {
  id: string;
  label: string;
  children?: SubCategory[];
};

export const categories: Category[] = [
  { id: "single-ups",       label: "단상 UPS" },
  { id: "three-single-ups", label: "삼상 / 단상 UPS" },
  { id: "three-three-ups",  label: "삼상 / 삼상 UPS" },
  { id: "server-ups",       label: "PC서버용 UPS" },
  { id: "avr",              label: "자동 전압 조정기 (AVR)" },
  { id: "frequency",        label: "주파수 변환기" },
  {
    id: "battery",
    label: "배터리",
    children: [
      { id: "battery-es", label: "ES Series-ES" },
      { id: "battery-rp", label: "RP Series" },
    ],
  },
];

export function findCategory(id: string): Category | SubCategory | undefined {
  for (const cat of categories) {
    if (cat.id === id) return cat;
    const child = cat.children?.find((c) => c.id === id);
    if (child) return child;
  }
  return undefined;
}

export function getParentCategory(id: string): Category | undefined {
  return categories.find((cat) => cat.children?.some((c) => c.id === id));
}

type ImageEntry = { folder: string; images: string[] };

export const productImageMap: Record<string, ImageEntry> = {
  "single-ups": {
    folder: "SPT-301K_단상 UPS",
    images: [
      "1 제품프로필.png",
      "2 제품소개.png",
      "3 현장사례.png",
      "4 디스플레이.png",
      "5 후면.png",
      "6 기술 사양표.png",
    ],
  },
  "three-single-ups": {
    folder: "SPT-100AK_삼상단상 UPS",
    images: [
      "1 제품프로필.png",
      "2 문제인식.png",
      "3 제품강점.png",
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 후면.png",
      "8 기술 사양표.png",
    ],
  },
  "three-three-ups": {
    folder: "SPT-3300_삼상삼상 UPS",
    images: [
      "1 제품프로필.png",
      "2 문제인식.png",
      "3 제품강점.png",
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 디스플레이.png",
      "8 기술 사양표.png",
    ],
  },
  "server-ups": {
    folder: "HP 900C_PC서버용 UPS",
    images: [
      "1 제품프로필.png",
      "2 문제인식.png",
      "3 제품강점.png",
      "4 유지보수.png",
      "5 디스플레이.png",
      "6 후면.png",
      "7 입력 및 출력 연결.png",
      "8 통신 인터페이스.png",
      "9 제원.png",
      "10 기술 사양표.png",
      "11 주의.png",
    ],
  },
  "avr": {
    folder: "단상단권_AVR",
    images: [
      "1 제품프로필.png",
      "2 제품소개.png",
      "3 기술주요특징.png",
      "4 현장사례.png",
      "5 유지보수.png",
      "6 기술 사양표.png",
      "7 기술 사양표.png",
    ],
  },
  "frequency": {
    folder: "NFS 2000_주파수 변환기",
    images: [
      "1 제품프로필.png",
      "2 문제인식.png",
      "3 제품강점.png",
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 기술 사양표.png",
    ],
  },
  "battery-es": {
    folder: "ES Series-ES_배터리",
    images: [
      "1 제품프로필.png",
      "2 제품소개.png",
      "3 제품소개.png",
      "4 제품특징.png",
      "5 기술주요특징.png",
      "6 현장사례.png",
      "7 유지보수.png",
      "8 기술 사양표.png",
    ],
  },
  "battery-rp": {
    folder: "RP Series-ES_배터리",
    images: [
      "1 제품프로필.png",
      "2 제품소개.png",
      "3 제품소개.png",
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 기술 사양표.png",
      "8 보수도.png",
    ],
  },
};

export const getImageSrc = (folder: string, filename: string) =>
  `/image/products/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
