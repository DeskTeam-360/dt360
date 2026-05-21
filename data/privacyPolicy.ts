export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export const privacyPolicyMeta = {
  title: "Privacy Policy",
  lastUpdated: "May 19, 2026",
  intro:
    "DeskTeam360 (“we,” “us,” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, contact us, or use our services.",
};

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We may collect information you provide directly, such as your name, email address, company name, phone number, and any message you send through contact forms, booking links, or email.",
      "We may automatically collect certain technical data when you use our website, including IP address, browser type, device information, pages viewed, and approximate location derived from your IP address.",
      "If you subscribe to our blog or marketing communications, we collect your email address and related preferences.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    listItems: [
      "Respond to inquiries and provide customer support",
      "Deliver and improve our services",
      "Send administrative information, updates, and marketing communications (where permitted)",
      "Analyze website usage and improve user experience",
      "Maintain security and prevent fraud or abuse",
      "Comply with legal obligations",
    ],
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing (where applicable)",
    paragraphs: [
      "Where required by applicable law, we process personal data based on your consent, the performance of a contract, our legitimate interests (such as operating and improving our business), or compliance with legal obligations.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Information",
    paragraphs: [
      "We do not sell your personal information. We may share information with trusted service providers who assist us in operating our website, hosting, analytics, email delivery, or customer relationship tools—only as needed to perform their services and subject to appropriate safeguards.",
      "We may disclose information if required by law, court order, or governmental request, or when we believe disclosure is necessary to protect our rights, users, or the public.",
      "If our business undergoes a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember preferences, measure traffic, and improve performance. You can control cookies through your browser settings. Disabling cookies may affect certain features of the site.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We implement reasonable administrative, technical, and organizational measures designed to protect your information. No method of transmission over the Internet or electronic storage is completely secure; we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    paragraphs: [
      "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data, or to object to certain processing. You may also withdraw consent where processing is based on consent.",
      "To exercise these rights or opt out of marketing emails, contact us using the details below. We will respond within a reasonable timeframe as required by applicable law.",
    ],
  },
  {
    id: "children",
    title: "Children’s Privacy",
    paragraphs: [
      "Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us so we can delete it.",
    ],
  },
  {
    id: "international",
    title: "International Visitors",
    paragraphs: [
      "If you access our website from outside the United States, your information may be transferred to and processed in the United States or other countries where we or our service providers operate. Those locations may have different data protection laws than your country.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page indicates when the policy was last revised. Continued use of our website after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about this Privacy Policy or our data practices, contact us at:",
      "Email: privacy@deskteam360.com",
      "Website: https://deskteam360.com",
    ],
  },
];
