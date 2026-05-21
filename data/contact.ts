export const contactAssets = {
  hero: "/images/Contact - Hero.png",
  formIllustration: "/images/Contact - Form.png",
  calendarIcon: "/images/Contact - Calendar.png",
  clockIcon: "/images/Contact - Clock.png",
  ornament: "/images/Affiliate - Ornament.png",
} as const;

const contactOrnamentClass =
  "pointer-events-none absolute z-[15] h-auto w-[min(320px,32vw)] max-w-[360px] object-contain";

export const contactOrnamentStyles = {
  intro: `${contactOrnamentClass} top-0 -left-[20em]`,
  officeHoursCard: `${contactOrnamentClass} top-1/2 -right-[20em] -translate-y-1/2`,
} as const;

export const contactHero = {
  title: "Contact Us",
  heroImageSrc: contactAssets.hero,
  heroImageAlt: "Support agent with headset working on a laptop",
} as const;

export const contactIntro = {
  line1: "Please send us a message and we will respond ASAP. 😀",
  line2: "You may also try our active chat to get a quick response.",
} as const;

export const contactForm = {
  nameLabel: "Name",
  firstNamePlaceholder: "First Name",
  lastNamePlaceholder: "Last Name",
  phoneLabel: "Phone",
  phonePlaceholder: "Phone",
  emailLabel: "Email Address",
  emailPlaceholder: "Email",
  messageLabel: "Message",
  messagePlaceholder: "Your message",
  submitLabel: "Send Message",
  successMessage: "Thank you! Your message has been received. We will respond ASAP.",
} as const;

/** Gravity Forms — https://clone.deskteam360.com/wp-admin/admin.php?page=gf_edit_forms&id=1 */
export const contactGravityForm = {
  formId: 1,
  fieldIds: {
    firstName: "input_7.3",
    lastName: "input_7.6",
    phone: "input_4",
    email: "input_5",
    message: "input_6",
  },
} as const;

export const contactOfficeHours = {
  titleLine1: "Office",
  titleLine2: "Hours",
  daysLabel: "Monday - Friday:",
  hoursLine1: "6:30 am - 3:30 pm (PST)",
  hoursLine2: "6:00 pm - 03:00 am (PST)",
  calendarIconSrc: contactAssets.calendarIcon,
  clockIconSrc: contactAssets.clockIcon,
} as const;
