export type SubCategory = { id: string; label: string; href?: string };
export type Category = {
  id: string;
  label: string;
  selfPage?: boolean;
  children?: SubCategory[];
};

export const categories: Category[] = [
  { id: "single-ups", label: "단상 UPS" },
  { id: "three-single-ups", label: "삼상 / 단상 UPS" },
  {
    id: "three-three-ups",
    label: "삼상 / 삼상 UPS",
    selfPage: true,
    children: [
      { id: "three-three-ups-display", label: "디스플레이 상세보기", href: "/products/three-three-ups/display" },
    ],
  },
  { id: "server-ups", label: "PC서버용 UPS" },
  { id: "avr", label: "자동 전압 조정기 (AVR)" },
  { id: "frequency", label: "주파수 변환기" },
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
    folder: "SPT-301K_single-ups",
    images: ["1_product-profile.png", "2_product-intro.png", "3_field-cases.png", "4_display.png", "5_rear.png", "6_tech-specs.png"],
  },
  "three-single-ups": {
    folder: "SPT-100AK_three-single-ups",
    images: ["1_product-profile.png", "2_problem.png", "3_strengths.png", "4_features.png", "5_field-cases.png", "6_maintenance.png", "7_rear.png", "8_tech-specs.png"],
  },
  "three-three-ups": {
    folder: "SPT-3300_three-three-ups",
    images: ["1_product-profile.png", "2_problem.png", "3_strengths.png", "4_features.png", "5_field-cases.png", "6_maintenance.png", "7_display2.png", "8_tech-specs.png"],
  },
  "server-ups": {
    folder: "HP-900C_server-ups",
    images: [
      "1_product-profile.png",
      "2_problem.png",
      "3_strengths.png",
      "4_maintenance.png",
      "5_display.png",
      "6_io-connections.png",
      "7_rear.png",
      "8_comm-interface.png",
      "9_specifications.png",
      "10_tech-specs.png",
      "11_caution.png",
    ],
  },
  avr: {
    folder: "AVR",
    images: ["1_product-profile.png", "2_product-intro.png", "3_features.png", "4_field-cases.png", "5_maintenance.png", "6_tech-specs.png", "7_tech-specs.png"],
  },
  frequency: {
    folder: "NFS-2000_frequency",
    images: ["1_product-profile.png", "2_problem.png", "3_strengths.png", "4_features.png", "5_field-cases.png", "6_maintenance.png", "7_tech-specs.png"],
  },
  "battery-es": {
    folder: "ES-Series_battery-es",
    images: ["1_product-profile.png", "2_product-intro.png", "3_strengths.png", "4_product-features.png", "5_features.png", "6_field-cases.png", "7_maintenance.png", "8_tech-specs.png"],
  },
  "battery-rp": {
    folder: "RP-Series_battery-rp",
    images: ["1_product-profile.png", "2_product-intro.png", "3_product-intro.png", "4_features.png", "5_field-cases.png", "6_maintenance.png", "7_tech-specs.png", "8_maintenance-map.png"],
  },
};

export const getImageSrc = (folder: string, filename: string) => `/image/products/${folder}/${filename}`;
