import Products from "@/components/Products"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory"


async function CategoryPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const products = await getProductsByCategory(slug)
  const categories = await getAllCategories()

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center">
          {slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}{" "} Results
        </h1>
        <Products products={products} categories={categories} />
      </div>
    </div>
  )
}

export default CategoryPage