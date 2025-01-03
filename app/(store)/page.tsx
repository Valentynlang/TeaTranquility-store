import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductCard from "@/components/Products";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import SaleBanner from "@/components/SaleBanner";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts() 
  const categories = await getAllCategories() 
  return (
    <div >
      <SaleBanner />  

      <div className="flex flex-col items-center justify-top min-h-screen py-4">
        <ProductCard products={products} categories={categories} />
      </div>
    </div>
  );
}
