import { imageUrl } from "@/lib/imageUrl"
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug"
import { notFound } from "next/navigation"
import Image from "next/image"
import { PortableText } from "next-sanity"
import { Button } from "@/components/ui/button"
import AddToBasketButton from "@/components/AddToBasketButton"

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  const isOutStock = product.stock != null && product.stock <= 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutStock ? "opacity-50" : ""}`}>
          {product.image && (
            <Image src={imageUrl(product.image).url()} alt={product.name ?? "Product Image"} fill className="object-contain transition-transform duration-300 hover:scale-105"
        />
          )}
          {isOutStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-2xl font-bold">Out of Stock</span>
            </div>
          )}
        </div>
        

        <div className="flex flex-col justify-between">
          <div >
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>
          </div>

          <div>
            <AddToBasketButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage