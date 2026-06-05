/** External URLs used across the site. */
export const externalUrls = {
  customerPortal: "https://portal.deskteam360.com/my-account",
} as const;

/** WooCommerce checkout URLs for homepage / services pricing plans. */
export const pricingCheckoutUrls = {
  entrepreneur:
    "https://portal.deskteam360.com/checkout?add-to-cart=37922&variation_id=37923",
  marketer:
    "https://portal.deskteam360.com/checkout?add-to-cart=37922&variation_id=37931",
  agency:
    "https://portal.deskteam360.com/checkout?add-to-cart=37922&variation_id=37934",
} as const;

/** Internal app routes shared across nav, CTAs, and legal pages. */
export const sitePaths = {
  contact: "/contact",
  bookACall: "/book-a-call",
  affiliateProgram: "/affiliate-program",
} as const;
