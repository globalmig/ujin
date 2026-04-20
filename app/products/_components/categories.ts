export const categories = [
  { id: "single-ups",       label: "단상 UPS" },
  { id: "three-single-ups", label: "삼상 / 단상 UPS" },
  { id: "three-three-ups",  label: "삼상 / 삼상 UPS" },
  { id: "server-ups",       label: "PC서버용 UPS" },
  { id: "avr",              label: "자동 전압 조정기 (AVR)" },
  { id: "frequency",        label: "주파수 변환기" },
  { id: "battery",          label: "베터리" },
];

type ImageEntry = { folder: string; images: string[] };

export const productImageMap: Record<string, ImageEntry> = {
  "single-ups": {
    folder: "SPT-301K_단상 UPS",
    images: [
      "1 제품프로필.png",
      "2 문제인식.png",
      "3 제품강점.png",
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 디스플레이.png",
      "8 후면.png",
      "9 기술 사양표.png",
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
      "7 디스플레이.png",
      "8 후면.png",
      "9 기술 사양표.png",
    ],
  },
  "three-three-ups": {
    folder: "SPT-3000_삼상삼상 UPS",
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
      "4 기술주요특징.png",
      "5 현장사례.png",
      "6 유지보수.png",
      "7 디스플레이.png",
      "8 후면.png",
      "9 입력 및 출력 연결.png",
      "10 통신 인터페이스.png",
      "11 제원.png",
      "12 기술 사양표.png",
      "13 주의.png",
    ],
  },
  "avr": {
    folder: "단상단권_AVR",
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
  "battery": {
    folder: "ES Series-ES_배터리",
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
};

export const getImageSrc = (folder: string, filename: string) =>
  `/image/products/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
