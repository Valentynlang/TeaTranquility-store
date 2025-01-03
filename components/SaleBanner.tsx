import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes"
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode"


export default async function SaleBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.SUMMER24)

  if (!sale?.isActive) {
    return null
  }

  return (
    <div className="bg-gradient-to-t from-green-700 to-black text-white px-16 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl text-left mb-4 font-bold">{sale.title}</h1>

          <p className="text-left text-xl sm:text-2xl font-semibold mb-6">{sale.description}</p>

          <div className="flex">
            <div className="bg-white text-black px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="text-base sm:text-xl font-semibold">Use code: {" "}
                <span className="font-bold text-green-700">{sale.couponCode}</span>
              </span>

              <span className="text-base ml-2 sm:text-xl font-semibold">
                for {sale.discountAmount} %OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
