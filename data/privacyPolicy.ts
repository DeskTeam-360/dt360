export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export const privacyPolicyMeta = {
  title: "Privacy Policy",
  lastUpdated: "August 09, 2018",
  intro:
    'DeskTeam360 LLC ("us", "we", or "our") operates the https://deskteam360.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://deskteam360.com/terms-conditions',
};

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: "information-collection-and-use",
    title: "Information Collection And Use",
    paragraphs: [
      "We collect several different types of information for various purposes to provide and improve our Service to you.",
    ],
  },
  {
    id: "types-of-data-collected",
    title: "Types of Data Collected",
    paragraphs: ["We may collect the following categories of data when you use our Service:"],
  },
  {
    id: "personal-data",
    title: "Personal Data",
    paragraphs: [
      'While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
    ],
    listItems: [
      "Email address",
      "First name and last name",
      "Phone number",
      "Address, State, Province, ZIP/Postal code, City",
      "Cookies and Usage Data",
    ],
  },
  {
    id: "usage-data",
    title: "Usage Data",
    paragraphs: [
      'We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer\'s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.',
    ],
  },
  {
    id: "tracking-cookies-data",
    title: "Tracking & Cookies Data",
    paragraphs: [
      "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.",
      "Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.",
      "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.",
      "Examples of Cookies we use:",
    ],
    listItems: [
      "Session Cookies. We use Session Cookies to operate our Service.",
      "Preference Cookies. We use Preference Cookies to remember your preferences and various settings.",
      "Security Cookies. We use Security Cookies for security purposes.",
    ],
  },
  {
    id: "use-of-data",
    title: "Use of Data",
    paragraphs: ["DeskTeam360 uses the collected data for various purposes:"],
    listItems: [
      "To provide and maintain the Service",
      "To notify you about changes to our Service",
      "To allow you to participate in interactive features of our Service when you choose to do so",
      "To provide customer care and support",
      "To provide analysis or valuable information so that we can improve the Service",
      "To monitor the usage of the Service",
      "To detect, prevent and address technical issues",
    ],
  },
  {
    id: "transfer-of-data",
    title: "Transfer Of Data",
    paragraphs: [
      "Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.",
      "If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.",
      "Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.",
      "DeskTeam360 will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.",
    ],
  },
  {
    id: "disclosure-of-data",
    title: "Disclosure Of Data",
    paragraphs: [
      "DeskTeam360 may disclose your Personal Data in the good faith belief that such action is necessary to:",
    ],
    listItems: [
      "To comply with a legal obligation",
      "To protect and defend the rights or property of DeskTeam360",
      "To prevent or investigate possible wrongdoing in connection with the Service",
      "To protect the personal safety of users of the Service or the public",
      "To protect against legal liability",
    ],
  },
  {
    id: "security-of-data",
    title: "Security Of Data",
    paragraphs: [
      "The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
    ],
  },
  {
    id: "text-messaging",
    title: "Text Messaging",
    paragraphs: [
      "All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    ],
  },
  {
    id: "service-providers",
    title: "Service Providers",
    paragraphs: [
      'We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.',
      "These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    paragraphs: [
      "We may use third-party Service Providers to monitor and analyze the use of our Service.",
      "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.",
      "You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.",
      "For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: https://policies.google.com/privacy?hl=en",
    ],
  },
  {
    id: "links-to-other-sites",
    title: "Links To Other Sites",
    paragraphs: [
      "Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.",
      "We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      'Our Service does not address anyone under the age of 18 ("Children").',
      "We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.",
    ],
  },
  {
    id: "changes-to-this-privacy-policy",
    title: "Changes To This Privacy Policy",
    paragraphs: [
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      'We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.',
      "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy, please contact us:",
      "By email: support@deskteam360.com",
      "By visiting this page on our website: https://deskteam360.com/contact",
    ],
  },
];
