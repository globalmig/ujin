import { redirect } from "next/navigation";
import { categories, toSlug } from "./_components/categories";

export default function ProductsPage() {
  const first = categories[0];
  redirect(`/products/${first.id}/${toSlug(first.items[0])}`);
}
