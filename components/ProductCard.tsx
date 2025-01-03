import { Product } from "@/sanity.types"
import Link from "next/link"
import Image from "next/image"
import { imageUrl } from "@/lib/imageUrl"

function ProductCard({product}: {product: Product}) {
  const isOutStock = product.stock != null && product.stock <= 0

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group overflow-hidden flex flex-col p-4 border border-gray-200 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ${isOutStock ? "opacity-50" : ""}`}
    > 
       <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image src={imageUrl(product.image).url()} alt={product.name || "Product Image"} fill className="object-contain transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />  
        )}
        {isOutStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-2xl font-bold">Out of Stock</span>
          </div>
        )}
       </div>
       <div className="p-4">
          <h2 className="text-lg text-gray-800 text-center font-semibold" >{product.name}</h2>
          <hr className="w-full my-4"/>
          <p className="mt-w text-sm text-gray-600 line-clamp-2">
            {product.description ?.map((block) => block._type === "block" ? block.children?.map((child) => child.text).join("") : "")
            .join(" ") || "No description available"}
          </p>
          <p className="mt-2 text-center text-lg font-bold text-gray-800">${product.price?.toFixed(2)}</p>
        </div>
    </Link>
  )
}

export default ProductCard