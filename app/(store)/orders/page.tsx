import { getMyOrders } from "@/sanity/lib/orders/getMyOrders"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { formatCurrency } from "@/lib/formatCurrency"
import { imageUrl } from "@/lib/imageUrl"
import Image from "next/image"

async function Orders() {
  const {userId} = await auth()

  if (!userId) {
    redirect("/")
  }

  const orders = await getMyOrders(userId)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl w-full bg-white p-4 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 tracking-tight text-gray-900">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {orders.map(order => (
              <div key={order.orderNumber}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1 sm:items-center">
                    <div>
                      <p className="text-sm font-bold mb-1 text-gray-600">Order Number:</p>
                      <p className="text-sm font-mono break-all text-green-600">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm mb-1 text-gray-600">
                        Order Date:
                      </p>
                      <p className="font-medium">
                        {order.orderDate ? new Date(order.orderDate).toLocaleDateString("ru-RU") : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-sm mr-2">
                        Status:
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm mb-1 text-gray-600">
                        Total:
                      </p>
                      <p className="font-bold text-lg">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>

                  {order.amountDiscounted ? (
                    <div className="mt-3 p-3 sm:p-4 bg-red-50 rounded-lg">
                      <p className="text-sm sm:text-base font-medium mb-1 text-red-600">
                        Discount Applied:{" "}
                        {formatCurrency(order.amountDiscounted, order.currency)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Original Subtotal:{" "}
                        {formatCurrency((order.totalPrice ?? 0) + order.amountDiscounted, order.currency)}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="px-4 sm:px-6 py-4">
                  <p className="text-sm font-semibold mb-3 sm:mb-4 text-gray-600">
                    Order Items:
                  </p>

                  <div className="space-y-2 sm:space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-2 border-b last:border-b-0"
                      >
                        <div className="w-full flex items-center justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            {product.product?.image && (
                              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md flex-shrink-0 overflow-hidden">
                                <Image
                                  src={imageUrl(product.product.image).url()}
                                  alt={product.product?.name ?? ""}
                                  className="object-cover"
                                  fill
                                />
                              </div>
                            )}

                            <div>
                              <p className="text-sm sm:text-base font-medium text-gray-600">
                                {product.product?.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {product.quantity ?? "N/A"}
                              </p>
                            </div>
                          </div>

                          <p className="text-right font-medium ml-4">
                            {product.product?.price && product.quantity ? formatCurrency(product.product.price * product.quantity, order.currency) : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders