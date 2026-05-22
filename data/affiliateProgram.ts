export const affiliateAssets = {
  hero: "/images/Affiliate - Hero.png",
  body: "/images/Affiliate - Body.png",
  howItWorks: "/images/Affiliate - How It Works.png",
  easyAccess: "/images/Affiliate - Easy Access.png",
  ornament: "/images/Affiliate - Ornament.png",
} as const;

/** Matches live partner-program CTAs (both link to /affiliate-area). */
export const affiliateUrls = {
  signUp: "https://deskteam360.com/affiliate-area/",
  partnerArea: "https://deskteam360.com/affiliate-area/",
} as const;

export const affiliateProgramHero = {
  titleBefore: "Can We Send You a",
  titleHighlight: "Check?",
  description: "Earn income by joining the free DeskTeam360 partner program.",
  ctaLabel: "Sign Up Now!",
  ctaHref: affiliateUrls.signUp,
  existingUserPrefix: "Already a DeskTeam360 user?",
  existingUserLinkLabel: "View your partner area here",
  existingUserLinkHref: affiliateUrls.partnerArea,
  heroImageSrc: affiliateAssets.hero,
  heroImageAlt: "Partners shaking hands with commission growth graphics",
} as const;

export const affiliateProgramPartner = {
  eyebrow: "BECOME AN PARTNER",
  title: "Why would you choose DeskTeam360 - The best partner program in the industry?",
  body: "We pay 10% commission recurring each month for your referrals that do not cancel within 30 days, as long as they continue as a DeskTeam360 client. Just imagine – you could earn thousands each month from a single email or blog post.",
  ctaLabel: "Sign Up Now!",
  ctaHref: affiliateUrls.signUp,
  coinImageSrc: affiliateAssets.body,
  coinImageAlt: "10% commission recurring for the life of the client",
} as const;

export const affiliateProgramHowItWorks = {
  title: "How It Works",
  body: "When you share your unique partner link with your audience, a cookie will be placed on the prospective customer’s browser for 60 days. As long as the customer visits your unique link and purchases using the same browser within that 60 day time period, we’ll deposit money straight into your PayPal account. Hassle-free and guaranteed.",
  imageSrc: affiliateAssets.howItWorks,
  imageAlt: "Affiliate referral link and dashboard illustration",
} as const;

export const affiliateProgramEasyAccess = {
  title: "Easy-Access Affiliate Code",
  body: "Your unique partner code is always accessible in your affiliate portal and we track every page on deskteam360.com (including our blog!), making it easy to earn commission off any page.",
  imageSrc: affiliateAssets.easyAccess,
  imageAlt: "Affiliate working at desk with rewards illustration",
} as const;
