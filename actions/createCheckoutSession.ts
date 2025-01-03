"use server"

import {BasketItem} from "@/store/store"
import stripe from "@/lib/stripe"
import { imageUrl } from "@/lib/imageUrl"

export type Metadata = {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export type GroupedBasketItems = {
  product: BasketItem["product"]
  quantity: number
}

export async function createCheckoutSession(items: GroupedBasketItems[], metadata: Metadata) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price")
    }
    
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    })

    let customerId: string | undefined
    if (customer.data.length > 0) {
      customerId = customer.data[0].id
    } 

    const baseUrl = process.env.NODE_ENV === "production" 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL

    console.log("Environment:", process.env.NODE_ENV)
    console.log("VERCEL_URL:", process.env.VERCEL_URL)
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL)
    console.log("baseUrl:", baseUrl)

    if (!baseUrl) {
      throw new Error("Base URL is not configured. Please check environment variables.")
    }

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`

    const cancelUrl = `${baseUrl}/basket`

    console.log("successUrl", successUrl) 

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              productId: item.product._id,
            },
            images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
          },
        },
      })),
    })

    return session.url
  } catch (error) {
    console.error("Error creating checkout session", error)
    throw error
  }
}