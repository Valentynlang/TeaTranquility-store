"use client"

import { useEffect } from "react"
import useBasketStore from "@/store/store"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function SuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")
  const clearBasket = useBasketStore((state) => state.clearBasket)

  useEffect(() => {
    if(orderNumber){
      clearBasket()
    }
  }, [orderNumber, clearBasket])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex mb-8 justify-center">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round"
            strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">
        Thank you for your order
      </h1>

      <div className=" border-t border-b border-gray-200 py-6 mb-6">
        <p className="mb-4 text-lg text-gray-700 text-center">
          Your order has been confirmed.
        </p>

        <div className="space-y-2">
          {orderNumber && (
            <p className="text-gray-600 flex items-center space-x-5 justify-center">
              <span>
                Order number:
              </span>

              <span className="font-mono text-sm text-green-600">
                {orderNumber}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 text-center">
          We have received your payment and will process your order soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-600 hover:bg-green-700">
            <Link href="/orders">
              View Order Details
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}
export default SuccessPage
