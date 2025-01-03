"use client"

import { Product } from "@/sanity.types"
import useBasketStore from "@/store/store"
import { useState, useEffect } from "react"
interface AddToBasketButtonProps {
  product: Product
  disabled?: boolean
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem , getItemsCount , removeItem} = useBasketStore()
  const itemsCount = getItemsCount(product._id)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button onClick={() => removeItem(product._id)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${itemsCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={itemsCount === 0 || disabled}
      >
        <span className={`text-xl font-bold ${itemsCount === 0 ? "text-gray-400" : "text-gray-900"}`}>-</span>
      </button>
      <span className="w-8 text-center font-semibold">{itemsCount}</span>
      <button onClick={() => addItem(product)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${disabled ? "bg-gray-100 cursor-not-allowed" : " bg-green-200 hover:bg-green-400"}`}
        disabled={disabled}
      >
        <span className={`text-xl font-bold `}>+</span>
      </button>
    </div>
  )
}

export default AddToBasketButton