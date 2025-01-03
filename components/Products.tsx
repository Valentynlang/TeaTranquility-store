import {Category, Product } from "@/sanity.types"
import ProductGrid from "./ProductGrid"
import CategorySelectorComponent from "./CategorySelectorComponent"
interface ProductsProps {
    products: Product[]
    categories: Category[]
}

const Products = ({products, categories}: ProductsProps) => { 
  return (
    <div className="flex flex-col ">
      <div className=" sm:ml-4 w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      <div className=" sm:mx-4 flex flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
) }

export default Products  