import ProductGrid from "@/components/ProductGrid"
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName"


async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{
    search: string
  }>
}) {
    const { search } = await searchParams
    const products = await searchProductsByName(search)

    if (!products.length) {
      return <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold">No products found for: {search}</h1>
          <p className="text-gray-500 text-center">Try searching for a different keyword</p>
        </div>
      </div>
    }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for {search}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default SearchPage