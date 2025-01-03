export const COUPON_CODES = {
    "SUMMER24": "SUMMER24",
    "WINTER24": "WINTER24",
    "SPRING24": "SPRING24",
    "FALL24": "FALL24",
} as const;

export type CouponCode = keyof typeof COUPON_CODES