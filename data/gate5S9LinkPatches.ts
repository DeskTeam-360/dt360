/**
 * Gate 5 Batch 6 — S9 link sentences added to LIVE pages (34 rows).
 * Source: DeskTeam360 website copy for developer 2026-10-06, piece S9-links.
 *
 * Each patch keeps the current sentence (`find`) and puts the new sentence right after it,
 * in the same paragraph. `replaceHtmlFragment` is the whole replacement for `find`
 * (current sentence + new sentence with the link wrapped in <a>).
 *
 * `find` is the NOW text exactly as printed in the copy file. Live blog posts use curly
 * quotes (’ “ ”), so match with normalizeQuotes() on both sides. In blog patches the new
 * sentence already uses curly apostrophes; page patches (/, /services, /how-it-works) use
 * straight ones, matching those pages.
 *
 * Not included:
 *  - S9-link-78: LEFT OUT in the copy file (nothing to add).
 *  - The 49 rows marked "already in the page copy" (links inside the new F11 pages and the
 *    new Batch 5 pages/posts). They are written into those pages' text; use them only to
 *    check each link after the page is built.
 *
 * Every target in this list answers 200 once Batch 5 is live (/small-business,
 * /services/white-label/marketing, /blog/what-is-insourcing,
 * /blog/virtual-assistant-vs-dedicated-team, /blog/tasks-a-team-can-take-off-your-plate).
 * Links to /services/website-maintenance and /services/white-label should ship with or
 * after the Batch 6 F11 service page text (S9-link-02, 04, 23, 26 say so in the copy).
 */

export type Gate5S9Patch = {
  /** e.g. S9-link-01 */
  id: string;
  /** Page path the sentence is added to. */
  path: string;
  /** Exact NOW sentence/snippet to find. */
  find: string;
  /** NOW + the new sentence, with the link as <a href>. */
  replaceHtmlFragment: string;
  anchor: string;
  href: string;
};

/** Straight-quote form of a string, for comparing `find` against live content. */
export function normalizeQuotes(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201F]/g, '"');
}

/** Live blog post patches (/blog/* targets). */
export const GATE5_S9_BLOG_PATCHES: Gate5S9Patch[] = [
  {
    id: "S9-link-01",
    path: "/blog/outsource-wordpress-maintenance",
    find: "No separate contracts, no vendor juggling, just professional WordPress management that actually works.",
    replaceHtmlFragment: "No separate contracts, no vendor juggling, just professional WordPress management that actually works. Here’s exactly what our <a href=\"/services/website-maintenance\">website maintenance services</a> cover.",
    anchor: "website maintenance services",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-02",
    path: "/blog/website-maintenance-cost-guide",
    find: "It’s the model we use at DeskTeam360 because it makes more sense for growing businesses.",
    replaceHtmlFragment: "It’s the model we use at DeskTeam360 because it makes more sense for growing businesses. You can see what’s covered on our <a href=\"/services/website-maintenance\">website care and tech support</a> page.",
    anchor: "website care and tech support",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-03",
    path: "/blog/wordpress-security-best-practices",
    find: "Or hand the entire responsibility to people who manage WordPress security every single day.",
    replaceHtmlFragment: "Or hand the entire responsibility to people who manage WordPress security every single day. Our <a href=\"/services/website-maintenance\">WordPress maintenance services</a> cover the updates, the security monitoring and the backups.",
    anchor: "WordPress maintenance services",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-04",
    path: "/blog/white-label-web-development-guide",
    find: "The process is straightforward once you’ve got the right partner in place.",
    replaceHtmlFragment: "The process is straightforward once you’ve got the right partner in place. Our <a href=\"/services/white-label\">white label web design services</a> page lays out our own steps.",
    anchor: "white label web design services",
    href: "/services/white-label",
  },
  {
    id: "S9-link-05",
    path: "/blog/agency-white-label-services",
    find: "The client pays you, you pay your partner, and you keep the margin.",
    replaceHtmlFragment: "The client pays you, you pay your partner, and you keep the margin. That partner role is what we do at DeskTeam360: <a href=\"/services/white-label\">behind-the-scenes web builds for agencies</a>.",
    anchor: "behind-the-scenes web builds for agencies",
    href: "/services/white-label",
  },
  {
    id: "S9-link-11",
    path: "/blog/what-is-white-label-marketing",
    find: "Same quality, different packaging.",
    replaceHtmlFragment: "Same quality, different packaging. Our <a href=\"/services/white-label/marketing\">white label marketing services</a> page shows what our team builds under your brand.",
    anchor: "white label marketing services",
    href: "/services/white-label/marketing",
  },
  {
    id: "S9-link-13",
    path: "/blog/gohighlevel-website-design",
    find: "The integration benefits outweigh the limitations, especially if your website traffic goals are modest.",
    replaceHtmlFragment: "The integration benefits outweigh the limitations, especially if your website traffic goals are modest. If you’re looking for <a href=\"/services/crm-automation\">GoHighLevel expert help</a> with the pipelines and workflows, our team builds both.",
    anchor: "GoHighLevel expert help",
    href: "/services/crm-automation",
  },
  {
    id: "S9-link-14",
    path: "/blog/marketing-automation-small-business",
    find: "The cost of getting automation wrong, broken workflows, data loss, missed leads, is always more expensive than professional setup.",
    replaceHtmlFragment: "The cost of getting automation wrong, broken workflows, data loss, missed leads, is always more expensive than professional setup. Our <a href=\"/services/crm-automation\">marketing automation services</a> cover the setup, the workflows and getting your tools to talk to each other.",
    anchor: "marketing automation services",
    href: "/services/crm-automation",
  },
  {
    id: "S9-link-15",
    path: "/blog/web-design-for-small-business",
    find: "With a flat-rate design service, you get professional web design without the big upfront cost, plus ongoing support for updates and changes when you need them.",
    replaceHtmlFragment: "With a flat-rate design service, you get professional web design without the big upfront cost, plus ongoing support for updates and changes when you need them. At DeskTeam360, that means <a href=\"/small-business\">a full team for small businesses</a>, with developers and technical Virtual Assistants as well as designers.",
    anchor: "a full team for small businesses",
    href: "/small-business",
  },
  {
    id: "S9-link-17",
    path: "/blog/how-to-delegate-tasks-effectively",
    find: "That’s not delegation, that’s telepathy testing.",
    replaceHtmlFragment: "That’s not delegation, that’s telepathy testing. The <a href=\"https://start.deskteam360.com/ultimate-task-delegation-template\">Ultimate Task Delegation Template</a> shows you exactly what to delegate, how to brief it, and how to check the results.",
    anchor: "Ultimate Task Delegation Template",
    href: "https://start.deskteam360.com/ultimate-task-delegation-template",
  },
  {
    id: "S9-link-20",
    path: "/blog/marketing-agency-vs-in-house-team",
    find: "A subscription eliminates the management overhead while maintaining professional output quality.",
    replaceHtmlFragment: "A subscription eliminates the management overhead while maintaining professional output quality. Our How It Works page shows how you get <a href=\"/how-it-works\">a dedicated team that works like staff</a>.",
    anchor: "a dedicated team that works like staff",
    href: "/how-it-works",
  },
  {
    id: "S9-link-23",
    path: "/blog/website-maintenance-checklist",
    find: "Outsource it if you don’t have technical expertise on staff, your developer is already maxed out on other projects, or you want guaranteed, systematic maintenance instead of hoping someone remembers to do it.",
    replaceHtmlFragment: "Outsource it if you don’t have technical expertise on staff, your developer is already maxed out on other projects, or you want guaranteed, systematic maintenance instead of hoping someone remembers to do it. If that’s you, here’s <a href=\"/services/website-maintenance\">how our website care works</a>.",
    anchor: "how our website care works",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-26",
    path: "/blog/steps-to-take-if-your-website-is-unavailable",
    find: "By keeping your website updated and monitored, you can help ensure it stays online and runs efficiently.",
    replaceHtmlFragment: "By keeping your website updated and monitored, you can help ensure it stays online and runs efficiently. If you’d rather hand this off, our <a href=\"/services/website-maintenance\">website care and tech support page</a> shows what our team covers each month.",
    anchor: "website care and tech support page",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-28",
    path: "/blog/essential-wordpress-plugins-business",
    find: "Most plugin updates are minor bug fixes, but occasionally they break functionality or create conflicts.",
    replaceHtmlFragment: "Most plugin updates are minor bug fixes, but occasionally they break functionality or create conflicts. Plugin updates and backups are both part of our <a href=\"/services/website-maintenance\">WordPress website maintenance</a>.",
    anchor: "WordPress website maintenance",
    href: "/services/website-maintenance",
  },
  {
    id: "S9-link-36",
    path: "/blog/white-label-vs-in-house-agency-production",
    find: "You can get that from a well-built white-label partner, and you keep your overhead flexible while you do.",
    replaceHtmlFragment: "You can get that from a well-built white-label partner, and you keep your overhead flexible while you do. Here’s how our <a href=\"/services/white-label\">white label services for agencies</a> work.",
    anchor: "white label services for agencies",
    href: "/services/white-label",
  },
  {
    id: "S9-link-42",
    path: "/blog/outsource-email-marketing-guide",
    find: "It’s the best of both worlds.",
    replaceHtmlFragment: "It’s the best of both worlds. If you run an agency, our page on <a href=\"/services/white-label/marketing\">white label marketing for agencies</a> shows how we build client emails under your brand.",
    anchor: "white label marketing for agencies",
    href: "/services/white-label/marketing",
  },
  {
    id: "S9-link-44",
    path: "/blog/cost-to-outsource-marketing",
    find: "Our clients get access to designers, developers, video editors, and marketers working together in one office, eliminating the vendor management overhead that kills productivity and inflates real costs.",
    replaceHtmlFragment: "Our clients get access to designers, developers, video editors, and marketers working together in one office, eliminating the vendor management overhead that kills productivity and inflates real costs. If you run an agency and need this done under your brand, see our <a href=\"/services/white-label/marketing\">white label marketing services</a>.",
    anchor: "white label marketing services",
    href: "/services/white-label/marketing",
  },
  {
    id: "S9-link-50",
    path: "/blog/outsource-crm-setup-guide",
    find: "Integration setup that doesn’t break when one system updates.",
    replaceHtmlFragment: "Integration setup that doesn’t break when one system updates. The workflows and the integrations are the part our team builds, and it’s all listed on our <a href=\"/services/crm-automation\">CRM and automation page</a>.",
    anchor: "CRM and automation page",
    href: "/services/crm-automation",
  },
  {
    id: "S9-link-52",
    path: "/blog/outsource-hubspot-setup",
    find: "You’re building automation workflows that nurture leads at exactly the right cadence for your market.",
    replaceHtmlFragment: "You’re building automation workflows that nurture leads at exactly the right cadence for your market. HubSpot setup and workflow builds are part of our <a href=\"/services/crm-automation\">CRM and automation services</a>.",
    anchor: "CRM and automation services",
    href: "/services/crm-automation",
  },
  {
    id: "S9-link-55",
    path: "/blog/how-to-delegate-tasks-effectively",
    find: "See how it feels to have that thing done without you touching it.",
    replaceHtmlFragment: "See how it feels to have that thing done without you touching it. If you can’t think of one, here’s a list of <a href=\"/blog/tasks-a-team-can-take-off-your-plate\">tasks a team can take off your plate</a>.",
    anchor: "tasks a team can take off your plate",
    href: "/blog/tasks-a-team-can-take-off-your-plate",
  },
  {
    id: "S9-link-56",
    path: "/blog/outsource-marketing-tasks-guide",
    find: "You need enough structure that the person doing the work isn’t guessing.",
    replaceHtmlFragment: "You need enough structure that the person doing the work isn’t guessing. Our guide on <a href=\"/blog/how-to-delegate-tasks-effectively\">how to delegate tasks</a> walks through writing that brief.",
    anchor: "how to delegate tasks",
    href: "/blog/how-to-delegate-tasks-effectively",
  },
  {
    id: "S9-link-57",
    path: "/blog/how-to-delegate-tasks-effectively",
    find: "This prevents me from defaulting back to “I’ll just do it myself” when things get busy.",
    replaceHtmlFragment: "This prevents me from defaulting back to “I’ll just do it myself” when things get busy. For marketing work, we have a guide on <a href=\"/blog/outsource-marketing-tasks-guide\">which marketing tasks to outsource first</a>.",
    anchor: "which marketing tasks to outsource first",
    href: "/blog/outsource-marketing-tasks-guide",
  },
  {
    id: "S9-link-59",
    path: "/blog/how-to-delegate-tasks-effectively",
    find: "That’s the difference between owning a business and having a business own you.",
    replaceHtmlFragment: "That’s the difference between owning a business and having a business own you. If you run an agency, we have a guide on <a href=\"/blog/how-to-scale-a-marketing-agency-without-hiring\">how to scale a marketing agency without hiring</a>.",
    anchor: "how to scale a marketing agency without hiring",
    href: "/blog/how-to-scale-a-marketing-agency-without-hiring",
  },
  {
    id: "S9-link-61",
    path: "/blog/how-to-delegate-tasks-effectively",
    find: "A good content creator costs more than a virtual assistant, but the output quality difference is massive.",
    replaceHtmlFragment: "A good content creator costs more than a virtual assistant, but the output quality difference is massive. If you’re stuck between one assistant and a whole team, read our guide on <a href=\"/blog/virtual-assistant-vs-dedicated-team\">a virtual assistant vs a dedicated team</a>.",
    anchor: "a virtual assistant vs a dedicated team",
    href: "/blog/virtual-assistant-vs-dedicated-team",
  },
  {
    id: "S9-link-62",
    path: "/blog/marketing-agency-vs-in-house-team",
    find: "Subscription services provide professional execution without the overhead, strategic flexibility without the commitment, and predictable costs without the surprises.",
    replaceHtmlFragment: "Subscription services provide professional execution without the overhead, strategic flexibility without the commitment, and predictable costs without the surprises. We call our version insourcing, and our guide explains <a href=\"/blog/what-is-insourcing\">what insourcing is</a>.",
    anchor: "what insourcing is",
    href: "/blog/what-is-insourcing",
  },
  {
    id: "S9-link-64",
    path: "/blog/marketing-team-as-a-service",
    find: "This is about paying someone to do the work you already know needs doing.",
    replaceHtmlFragment: "This is about paying someone to do the work you already know needs doing. We have our own word for the way we do it, and here’s <a href=\"/blog/what-is-insourcing\">what we mean by insourcing</a>.",
    anchor: "what we mean by insourcing",
    href: "/blog/what-is-insourcing",
  },
  {
    id: "S9-link-66",
    path: "/blog/cost-to-outsource-marketing",
    find: "After testing all three extensively, I built DeskTeam360 around the subscription model because most businesses need ongoing design, development, video, and marketing support rather than occasional large projects.",
    replaceHtmlFragment: "After testing all three extensively, I built DeskTeam360 around the subscription model because most businesses need ongoing design, development, video, and marketing support rather than occasional large projects. We call the way we run it insourcing, and our <a href=\"/blog/what-is-insourcing\">guide to insourcing</a> explains the word.",
    anchor: "guide to insourcing",
    href: "/blog/what-is-insourcing",
  },
  {
    id: "S9-link-68",
    path: "/blog/outsourced-marketing-team-guide",
    find: "You get specialists who work together every day, know each other’s strengths and weaknesses, and have systems in place to handle your work efficiently.",
    replaceHtmlFragment: "You get specialists who work together every day, know each other’s strengths and weaknesses, and have systems in place to handle your work efficiently. Our version of this is called insourcing, and our post explains <a href=\"/blog/what-is-insourcing\">what insourcing is</a>.",
    anchor: "what insourcing is",
    href: "/blog/what-is-insourcing",
  },
  {
    id: "S9-link-73",
    path: "/blog/build-remote-marketing-team",
    find: "But “easier” in the short term often means “much more expensive” in the long term.",
    replaceHtmlFragment: "But “easier” in the short term often means “much more expensive” in the long term. If you don’t want to build it yourself, our <a href=\"/small-business\">small business page</a> shows the team you’d get instead.",
    anchor: "small business page",
    href: "/small-business",
  },
  {
    id: "S9-link-75",
    path: "/blog/outsourced-marketing-services-small-business",
    find: "Find a partner that can handle multiple services under one roof.",
    replaceHtmlFragment: "Find a partner that can handle multiple services under one roof. That’s how we built DeskTeam360, and here’s <a href=\"/small-business\">how the team works for small businesses</a>.",
    anchor: "how the team works for small businesses",
    href: "/small-business",
  },
];

/** Live page patches (/, /services, /how-it-works). */
export const GATE5_S9_PAGE_PATCHES: Gate5S9Patch[] = [
  {
    id: "S9-link-06",
    path: "/",
    find: "Agencies: We work under your brand as your invisible back-office. Your clients never know we exist.",
    replaceHtmlFragment: "Agencies: We work under your brand as your invisible back-office. Your clients never know we exist. If you run an agency, <a href=\"/services/white-label\">see how agencies use the team</a>.",
    anchor: "see how agencies use the team",
    href: "/services/white-label",
  },
  {
    id: "S9-link-07",
    path: "/services",
    find: "Pick the plan that fits. We handle the rest.",
    replaceHtmlFragment: "Pick the plan that fits. We handle the rest. If you want it task by task, <a href=\"/blog/tasks-a-team-can-take-off-your-plate\">see everything the team can do</a>.",
    anchor: "see everything the team can do",
    href: "/blog/tasks-a-team-can-take-off-your-plate",
  },
  {
    id: "S9-link-08",
    path: "/how-it-works",
    find: "Examples of what people submit: \"Redesign our homepage,\" \"Cut this 45-minute webinar into 5 social clips,\" \"Build this GoHighLevel workflow,\" \"Create 10 social graphics for next month.\"",
    replaceHtmlFragment: "Examples of what people submit: \"Redesign our homepage,\" \"Cut this 45-minute webinar into 5 social clips,\" \"Build this GoHighLevel workflow,\" \"Create 10 social graphics for next month.\" If you run out of ideas, here's <a href=\"/blog/tasks-a-team-can-take-off-your-plate\">the big list of tasks to hand off</a>.",
    anchor: "the big list of tasks to hand off",
    href: "/blog/tasks-a-team-can-take-off-your-plate",
  },
  {
    id: "S9-link-09",
    path: "/how-it-works",
    find: "Not an algorithm. Not a freelancer marketplace. A real team in a real office in Indonesia that shows up every single day.",
    replaceHtmlFragment: "Not an algorithm. Not a freelancer marketplace. A real team in a real office in Indonesia that shows up every single day. That's <a href=\"/blog/what-is-insourcing\">what we mean by insourcing</a>.",
    anchor: "what we mean by insourcing",
    href: "/blog/what-is-insourcing",
  },
];
