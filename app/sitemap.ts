import type { MetadataRoute } from "next";
import { categories } from "./products/_components/categories";

const BASE_URL = "https://upscom.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    cat.children
      ? cat.children.map((child) => ({
          url: `${BASE_URL}/products/${child.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : [{ url: `${BASE_URL}/products/${cat.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }]
  );

  return [
    { url: BASE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/company`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...productPages,
  ];
}
