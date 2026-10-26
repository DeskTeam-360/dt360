import type { Gate5S9Patch } from "@/data/gate5S9LinkPatches";

/**
 * CMO P2 — contextual inbound links for orphan blog URLs (Oct 2026 checklist).
 * Same patch shape as Gate 5 S9: append a short sentence with an <a> after `find`.
 * Each orphan target gets >= 2 source pages.
 */
export const ORPHAN_INTERNAL_LINK_PATCHES: Gate5S9Patch[] = [
  // best-unlimited-video-editing-services
  {
    id: "orphan-video-unlimited-01",
    path: "/blog/outsource-video-editing-guide",
    find: "That’s not one person’s job. That’s a production line. And most small businesses aren’t set up to run a production line.",
    replaceHtmlFragment:
      "That’s not one person’s job. That’s a production line. And most small businesses aren’t set up to run a production line. If you’re comparing flat-rate options, start with our roundup of the <a href=\"/blog/best-unlimited-video-editing-services\">best unlimited video editing services</a>.",
    anchor: "best unlimited video editing services",
    href: "/blog/best-unlimited-video-editing-services",
  },
  {
    id: "orphan-video-unlimited-02",
    path: "/blog/outsource-social-media-management",
    find: "Over 60% of marketers say social media is their most time-consuming daily task. For agency owners? It’s even worse because we’re doing it for multiple brands.",
    replaceHtmlFragment:
      "Over 60% of marketers say social media is their most time-consuming daily task. For agency owners? It’s even worse because we’re doing it for multiple brands. Video is usually the bottleneck — here’s how the <a href=\"/blog/best-unlimited-video-editing-services\">best unlimited video editing services</a> stack up.",
    anchor: "best unlimited video editing services",
    href: "/blog/best-unlimited-video-editing-services",
  },

  // outsource-social-media-video-editing
  {
    id: "orphan-social-video-01",
    path: "/blog/outsource-video-editing-guide",
    find: "Here’s everything I know about the real costs, the hidden pitfalls, and the decision framework that’ll save you thousands of hours and tens of thousands of dollars.",
    replaceHtmlFragment:
      "Here’s everything I know about the real costs, the hidden pitfalls, and the decision framework that’ll save you thousands of hours and tens of thousands of dollars. For Reels, TikToks, and Shorts specifically, see <a href=\"/blog/outsource-social-media-video-editing\">how to outsource social media video editing</a>.",
    anchor: "how to outsource social media video editing",
    href: "/blog/outsource-social-media-video-editing",
  },
  {
    id: "orphan-social-video-02",
    path: "/blog/outsource-social-media-management",
    find: "Managing social media for just one brand takes 6-10 hours per week. That’s content creation, scheduling, community management, analytics, and strategy combined. Now multiply that by however many clients you have.",
    replaceHtmlFragment:
      "Managing social media for just one brand takes 6-10 hours per week. That’s content creation, scheduling, community management, analytics, and strategy combined. Now multiply that by however many clients you have. Short-form cuts are their own skill set — here’s <a href=\"/blog/outsource-social-media-video-editing\">how to outsource social media video editing</a>.",
    anchor: "how to outsource social media video editing",
    href: "/blog/outsource-social-media-video-editing",
  },

  // outsource-motion-graphics
  {
    id: "orphan-motion-01",
    path: "/blog/outsource-video-editing-guide",
    find: "But here’s what those stats don’t tell you: the volume required to actually compete has exploded.",
    replaceHtmlFragment:
      "But here’s what those stats don’t tell you: the volume required to actually compete has exploded. Need animation on top of cuts? Read <a href=\"/blog/outsource-motion-graphics\">how to outsource motion graphics and animation</a>.",
    anchor: "how to outsource motion graphics and animation",
    href: "/blog/outsource-motion-graphics",
  },
  {
    id: "orphan-motion-02",
    path: "/blog/outsource-graphic-design-agencies",
    find: "There are exactly two ways to outsource design work, and the choice you make determines everything that comes after.",
    replaceHtmlFragment:
      "There are exactly two ways to outsource design work, and the choice you make determines everything that comes after. Motion is a related handoff — see <a href=\"/blog/outsource-motion-graphics\">how to outsource motion graphics</a> when static design isn’t enough.",
    anchor: "how to outsource motion graphics",
    href: "/blog/outsource-motion-graphics",
  },

  // best-99designs-alternatives + best-48hourslogo-alternatives
  {
    id: "orphan-99designs-01",
    path: "/blog/logo-design-cost",
    find: "Forget everything you’ve read about “custom design processes” and “brand strategy sessions.” Here’s what you’re really paying for at each price level.",
    replaceHtmlFragment:
      "Forget everything you’ve read about “custom design processes” and “brand strategy sessions.” Here’s what you’re really paying for at each price level. Contest sites are another path — we compare them in <a href=\"/blog/best-99designs-alternatives\">best 99designs alternatives</a> and <a href=\"/blog/best-48hourslogo-alternatives\">best 48HoursLogo alternatives</a>.",
    anchor: "best 99designs alternatives",
    href: "/blog/best-99designs-alternatives",
  },
  {
    id: "orphan-99designs-02",
    path: "/blog/how-to-hire-graphic-designer",
    find: "Freelance designers excel for specific projects with defined scopes. Logo redesigns, website mockups, product packaging, or campaign-specific graphics where you need specialized skills for a limited time.",
    replaceHtmlFragment:
      "Freelance designers excel for specific projects with defined scopes. Logo redesigns, website mockups, product packaging, or campaign-specific graphics where you need specialized skills for a limited time. If you’re weighing contests instead, read our <a href=\"/blog/best-99designs-alternatives\">99designs alternatives</a> and <a href=\"/blog/best-48hourslogo-alternatives\">48HoursLogo alternatives</a> guides.",
    anchor: "99designs alternatives",
    href: "/blog/best-99designs-alternatives",
  },
  {
    id: "orphan-48hours-01",
    path: "/blog/how-to-choose-a-done-for-you-production-team",
    find: "Choosing a done-for-you marketing team comes down to a few plain questions. Who does the work? What's covered? How do you pay? Who checks it before you see it? And how hard is it to leave?",
    replaceHtmlFragment:
      "Choosing a done-for-you marketing team comes down to a few plain questions. Who does the work? What's covered? How do you pay? Who checks it before you see it? And how hard is it to leave? Contest marketplaces like 99designs and 48HoursLogo are a different bet — see our <a href=\"/blog/best-99designs-alternatives\">99designs alternatives</a> and <a href=\"/blog/best-48hourslogo-alternatives\">48HoursLogo alternatives</a> if that’s your comparison set.",
    anchor: "48HoursLogo alternatives",
    href: "/blog/best-48hourslogo-alternatives",
  },

  // website-content-audit
  {
    id: "orphan-content-audit-01",
    path: "/blog/website-copy-that-converts",
    find: "Here’s how to write website copy that actually converts visitors into paying customers, whether you tackle it yourself or hire someone who knows what they’re doing.",
    replaceHtmlFragment:
      "Here’s how to write website copy that actually converts visitors into paying customers, whether you tackle it yourself or hire someone who knows what they’re doing. Before you rewrite everything, run a <a href=\"/blog/website-content-audit\">website content audit</a> so you know what to keep, fix, or cut.",
    anchor: "website content audit",
    href: "/blog/website-content-audit",
  },
  {
    id: "orphan-content-audit-02",
    path: "/blog/website-maintenance-checklist",
    find: "These tasks should be non-negotiable. They catch problems before they become disasters.",
    replaceHtmlFragment:
      "These tasks should be non-negotiable. They catch problems before they become disasters. Pair the checklist with a <a href=\"/blog/website-content-audit\">website content audit</a> so the words on the site stay as healthy as the tech.",
    anchor: "website content audit",
    href: "/blog/website-content-audit",
  },

  // what-is-retargeting
  {
    id: "orphan-retargeting-01",
    path: "/blog/create-effective-landing-page",
    find: "A landing page has exactly one job: get the visitor to take a single, specific action. That’s it. Buy the thing, download the guide, book the call, start the trial. One action. Everything else is distraction.",
    replaceHtmlFragment:
      "A landing page has exactly one job: get the visitor to take a single, specific action. That’s it. Buy the thing, download the guide, book the call, start the trial. One action. Everything else is distraction. Visitors who leave without converting can still come back — here’s <a href=\"/blog/what-is-retargeting\">what retargeting is and how it works</a>.",
    anchor: "what retargeting is and how it works",
    href: "/blog/what-is-retargeting",
  },
  {
    id: "orphan-retargeting-02",
    path: "/blog/website-copy-that-converts",
    find: "Before we fix your copy, you need to understand why most of it doesn’t work. I see the same four mistakes on almost every website that lands on my desk.",
    replaceHtmlFragment:
      "Before we fix your copy, you need to understand why most of it doesn’t work. I see the same four mistakes on almost every website that lands on my desk. Even strong copy won’t win every first visit — use <a href=\"/blog/what-is-retargeting\">retargeting</a> to bring fence-sitters back.",
    anchor: "retargeting",
    href: "/blog/what-is-retargeting",
  },

  // digital-marketing-cleaning-companies + digital-marketing-saas
  {
    id: "orphan-cleaning-01",
    path: "/blog/digital-marketing-chiropractors",
    find: "Digital marketing for chiropractors requires a focused strategy that actually drives results.",
    replaceHtmlFragment:
      "Digital marketing for chiropractors requires a focused strategy that actually drives results. Local service brands face the same pattern — see <a href=\"/blog/digital-marketing-cleaning-companies\">digital marketing for cleaning companies</a> for another vertical playbook.",
    anchor: "digital marketing for cleaning companies",
    href: "/blog/digital-marketing-cleaning-companies",
  },
  {
    id: "orphan-cleaning-02",
    path: "/blog/digital-marketing-pet-businesses",
    find: "Digital marketing for pet businesses requires a focused strategy that actually drives results.",
    replaceHtmlFragment:
      "Digital marketing for pet businesses requires a focused strategy that actually drives results. Cleaning companies hit similar local-search dynamics in our <a href=\"/blog/digital-marketing-cleaning-companies\">digital marketing for cleaning companies</a> guide.",
    anchor: "digital marketing for cleaning companies",
    href: "/blog/digital-marketing-cleaning-companies",
  },
  {
    id: "orphan-saas-01",
    path: "/blog/digital-marketing-chiropractors",
    find: "That person just became your competitor’s patient, not because their service is better, but because their marketing doesn’t suck.",
    replaceHtmlFragment:
      "That person just became your competitor’s patient, not because their service is better, but because their marketing doesn’t suck. Selling software instead of appointments? See <a href=\"/blog/digital-marketing-saas\">digital marketing for SaaS companies</a>.",
    anchor: "digital marketing for SaaS companies",
    href: "/blog/digital-marketing-saas",
  },
  {
    id: "orphan-saas-02",
    path: "/blog/create-effective-landing-page",
    find: "I’ve built over 500 landing pages in 12 years. For DeskTeam360, for clients, for competitors I was analyzing. And the pattern never changes: 95% of landing pages suck because they try to do everything at once.",
    replaceHtmlFragment:
      "I’ve built over 500 landing pages in 12 years. For DeskTeam360, for clients, for competitors I was analyzing. And the pattern never changes: 95% of landing pages suck because they try to do everything at once. SaaS teams lean on that funnel hard — see <a href=\"/blog/digital-marketing-saas\">digital marketing for SaaS companies</a> for the wider growth stack.",
    anchor: "digital marketing for SaaS companies",
    href: "/blog/digital-marketing-saas",
  },

  // /blog/category/website-care (category orphan)
  {
    id: "orphan-website-care-01",
    path: "/blog/website-maintenance-cost-guide",
    find: "Real maintenance is preventive, not reactive. By the time you know something’s broken, you’ve already lost money, traffic, or both.",
    replaceHtmlFragment:
      "Real maintenance is preventive, not reactive. By the time you know something’s broken, you’ve already lost money, traffic, or both. Browse more in our <a href=\"/blog/category/website-care\">Website Care</a> category.",
    anchor: "Website Care",
    href: "/blog/category/website-care",
  },
  {
    id: "orphan-website-care-02",
    path: "/blog/outsource-wordpress-maintenance",
    find: "Estimated time commitment: 4-8 hours per month for basic maintenance, assuming nothing goes wrong. When something breaks, add 5-20 hours of troubleshooting.",
    replaceHtmlFragment:
      "Estimated time commitment: 4-8 hours per month for basic maintenance, assuming nothing goes wrong. When something breaks, add 5-20 hours of troubleshooting. More WordPress care guides live under <a href=\"/blog/category/website-care\">Website Care</a>.",
    anchor: "Website Care",
    href: "/blog/category/website-care",
  },
  {
    id: "orphan-website-care-03",
    path: "/blog/wordpress-security-best-practices",
    find: "Every one of these disasters was 100% preventable with basic security hygiene. Here’s the playbook.",
    replaceHtmlFragment:
      "Every one of these disasters was 100% preventable with basic security hygiene. Here’s the playbook. Related posts are collected in <a href=\"/blog/category/website-care\">Website Care</a>.",
    anchor: "Website Care",
    href: "/blog/category/website-care",
  },
];
