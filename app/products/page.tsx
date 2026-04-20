import { redirect } from "next/navigation";
import { categories } from "./_components/categories";

export default function ProductsPage() {
  redirect(`/products/${categories[0].id}`);
}
