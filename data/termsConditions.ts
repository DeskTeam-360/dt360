export type TermsConditionsSection = {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export const termsConditionsMeta = {
  title: "Terms & Conditions",
  lastUpdated: "May 19, 2026",
  intro:
    "These Terms & Conditions (“Terms”) govern your access to and use of the DeskTeam360 website and subscription-based creative and marketing services. By using our website or engaging our services, you agree to these Terms.",
};

export const termsConditionsSections: TermsConditionsSection[] = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    paragraphs: [
      "DeskTeam360 (“DeskTeam360,” “we,” “us,” or “our”) provides subscription-based design, development, and marketing support services. These Terms form a binding agreement between you (“Client,” “you,” or “your”) and DeskTeam360.",
      "If you do not agree to these Terms, do not use our website or services. If you are entering into these Terms on behalf of a company, you represent that you have authority to bind that organization.",
    ],
  },
  {
    id: "services",
    title: "Our Services",
    paragraphs: [
      "DeskTeam360 offers a flat-rate subscription model that provides access to a dedicated remote team for tasks such as web design, graphic design, video editing, funnels, CRM support, and related marketing deliverables, as described on our website and in your service agreement or order form.",
      "Specific scope, turnaround expectations, and plan features may vary by subscription tier. We will use commercially reasonable efforts to complete requested tasks within stated timelines, but delivery dates are estimates unless expressly guaranteed in writing.",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions, Billing, and Payment",
    paragraphs: [
      "Subscription fees are billed according to the plan you select (for example, monthly or annual). Fees are due in advance unless otherwise agreed in writing.",
      "You authorize us to charge your payment method on a recurring basis until you cancel. Failed payments may result in suspension of service until the account is brought current.",
      "Prices may change with reasonable notice. Continued use after a price change constitutes acceptance of the new pricing for subsequent billing periods.",
    ],
    listItems: [
      "Fees are generally non-refundable except where required by law or explicitly stated in your agreement",
      "You are responsible for applicable taxes, duties, or government charges unless we state otherwise",
      "Pausing or canceling a subscription must be done through the process described in your client agreement or by contacting your account manager",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Client Responsibilities",
    paragraphs: ["To receive timely deliverables, you agree to:"],
    listItems: [
      "Provide clear briefs, assets, logins, and feedback in a timely manner",
      "Ensure you have rights to any content, trademarks, or materials you supply",
      "Designate an authorized point of contact for approvals and requests",
      "Use services only for lawful purposes and in compliance with these Terms",
      "Maintain the security of any credentials or access you share with our team",
    ],
  },
  {
    id: "revisions",
    title: "Requests, Revisions, and Approvals",
    paragraphs: [
      "Work is performed based on tasks submitted through our agreed workflow (for example, a task board or queue). Revision allowances depend on your subscription plan.",
      "Delays caused by incomplete briefs, missing assets, or late feedback may extend timelines. We are not responsible for launch dates or third-party dependencies outside our control.",
      "Final approval of deliverables is your responsibility. Once approved for publication or implementation, you assume responsibility for how materials are used.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Upon full payment of applicable fees, you receive ownership or a license to final deliverables created specifically for you under your subscription, as defined in your service agreement. We retain the right to use pre-existing tools, templates, code libraries, and general know-how.",
      "Until fees are paid in full, deliverables remain our property or licensed to us. We may display non-confidential work in our portfolio or marketing unless you request otherwise in writing before project completion.",
      "You may not resell, sublicense, or misrepresent our services as your own agency offering without a separate written partnership agreement.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "Each party may receive confidential business information from the other. We will use reasonable care to protect your non-public materials and account details. You agree not to disclose our proprietary processes, pricing, or internal tools without consent.",
      "Confidentiality obligations do not apply to information that is public, independently developed, or lawfully obtained from a third party without restriction.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    paragraphs: [
      "You may not use our services to create or distribute illegal, infringing, defamatory, harassing, or misleading content. We may refuse or discontinue work on requests that violate law, platform policies, or these Terms.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "Our website and services are provided “as is” and “as available.” Except as expressly stated in a written agreement, we disclaim all warranties, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not guarantee specific business outcomes, rankings, revenue, or performance from creative or technical work. Third-party platforms (hosting, ad networks, email tools, etc.) are subject to their own terms and availability.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, DeskTeam360 and its team members will not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption.",
      "Our total liability for any claim arising from these Terms or the services will not exceed the fees paid by you to DeskTeam360 in the twelve (12) months preceding the event giving rise to the claim.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless DeskTeam360 from claims, damages, and expenses (including reasonable legal fees) arising from your content, your use of deliverables, violation of these Terms, or infringement of third-party rights related to materials you provide.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and Termination",
    paragraphs: [
      "Either party may terminate a subscription according to the cancellation terms in your plan or agreement. We may suspend or terminate access immediately for non-payment, abuse, or material breach of these Terms.",
      "Upon termination, you remain responsible for fees incurred through the end of the current billing period unless otherwise agreed. Sections that by nature should survive (payment, IP, confidentiality, liability, dispute resolution) will survive termination.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and Disputes",
    paragraphs: [
      "These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict-of-law principles, unless mandatory local law requires otherwise.",
      "Parties will attempt in good faith to resolve disputes informally before pursuing formal remedies. Any litigation shall be brought in courts located in Delaware, unless applicable law requires a different venue.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. The “Last updated” date above reflects the latest revision. Material changes may be communicated via email or notice on our website. Continued use after changes constitutes acceptance.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      "For questions about these Terms, contact:",
      "Email: legal@deskteam360.com",
      "Website: https://deskteam360.com",
    ],
  },
];
