/** Demo call scheduled thank-you page — copy and asset paths */

export const demoCallScheduledThankYouPage = {
  hero: {
    title: "Congrats! Your Consultation Is Booked.",
    subtitle: "Please Do The Following Before Your Call:",
    videoLabel: "Watch This Video Explaining What To Expect On The Call",
    videoAriaLabel: "Video explaining what to expect on your consultation call",
  },
  stepsIntro: {
    beforeAccent: "Follow ",
    accentSteps: "Steps 1, 2, and 3",
    middle: " Below To Be Prepared For ",
    accentCall: "Our Call",
  },
  steps: [
    {
      id: "step-1",
      stepLabel: "STEP 1:",
      titleBefore: "Watch This Video To See What You Can Expect ",
      titleAccent: "DeskTeam360 Will Do For You",
      body: "Understanding This Will Give You Some Ideas Of What We Can Help you With That You Haven’t Thought Of Yet",
      videoAriaLabel: "Video overview of what DeskTeam360 can do for you",
      layout: "text-left" as const,
    },
    {
      id: "step-2",
      stepLabel: "STEP 2:",
      titleBefore: "Watch This Video To See How DeskTeam360 Was Able To ",
      titleAccent: "Help WomenInWhiteCoats Scale",
      body: "To The Point An Emergency Room Physician Was Able To Quit Her Day Job.",
      videoAriaLabel: "Case study video: how DeskTeam360 helped WomenInWhiteCoats scale",
      layout: "video-left" as const,
    },
    {
      id: "step-3",
      stepLabel: "STEP 3:",
      titleBefore: "Click the confirmation in your ",
      titleAccent: "email inbox",
      bullets: [
        { icon: "trash" as const, text: "(check your spam or junk folder)" },
        { icon: "calendar" as const, text: "and add the appointment to your calendar.", bold: true },
      ],
      illustrationSrc: "/images/Contact - Calendar.png",
      illustrationAlt: "Illustration of people adding an appointment to a calendar",
      layout: "text-left" as const,
    },
  ],
  stepBadgeBgSrc: "/images/book-a-call/step-bg-clip.png",
} as const;
