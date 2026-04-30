import { redirect } from "next/navigation";
import { categories } from "@/lib/products";

export default function ProductsPage() {
  redirect(`/products/${categories[0].id}`);
}
