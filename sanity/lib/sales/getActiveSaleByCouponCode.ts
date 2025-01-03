import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALES = defineQuery(`
    *[
      _type == "sale"
      && isActive == true
      && couponCode == $couponCode
    ] | order(validFrom desc)[0]
  `)

  try {
    const activeSale = await sanityFetch({ 
      query: ACTIVE_SALES,
      params: { 
        couponCode
      } 
    })

    return activeSale ? activeSale.data : null
  } catch (error) {
    console.error("Error fetching active sale by coupon code", error)
    return null
  }
}