/** Schema.org Organization fields (JSON-LD). */

export const organizationSlogan = "Your Digital Team, All in One Place.";

export const organizationDescription =
  "DeskTeam360 provides flat-rate digital marketing and technical services, including web design and development, graphic design, video editing, email and funnels, CRM and automation, social media content, and website maintenance.";

export const organizationSameAs = [
  "https://www.instagram.com/deskteam360/",
  "https://www.facebook.com/deskteam360",
  "https://www.linkedin.com/company/deskteam360/",
  "https://deskteam360.com/",
  "https://www.google.com/search?kgmid=/g/11wg2gkmjg",
] as const;

export const organizationKnowsAbout = [
  "Web Design",
  "Web Development",
  "Graphic Design",
  "Video Editing",
  "Email Marketing",
  "Sales Funnels",
  "CRM",
  "Marketing Automation",
  "Social Media Content",
  "Website Maintenance",
  "AI Automation",
  "Whitelabel",
  "Insourcing",
  "Outsourcing",
] as const;

export type OrganizationAreaServed = {
  "@type": "AdministrativeArea";
  name: string;
  url: readonly [string, string];
};

export const organizationAreaServed: readonly OrganizationAreaServed[] = [
  {
    "@type": "AdministrativeArea",
    name: "Alabama",
    url: [
      "https://en.wikipedia.org/wiki/Alabama",
      "https://www.google.com/maps/place/Alabama,+USA/@32.5486049,-89.3218107,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Alaska",
    url: [
      "https://en.wikipedia.org/wiki/Alaska",
      "https://www.google.com/maps/place/Alaska,+USA/@59.6764645,-179.4659212,4z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Arizona",
    url: [
      "https://en.wikipedia.org/wiki/Arizona",
      "https://www.google.com/maps/place/Arizona,+USA/@34.1397481,-114.571673,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Arkansas",
    url: [
      "https://en.wikipedia.org/wiki/Arkansas",
      "https://www.google.com/maps/place/Arkansas,+USA/@34.7235065,-94.7702978,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "California",
    url: [
      "https://en.wikipedia.org/wiki/California",
      "https://www.google.com/maps/place/California,+USA/@37.151776,-124.5953578,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Colorado",
    url: [
      "https://en.wikipedia.org/wiki/Colorado",
      "https://www.google.com/maps/place/Colorado,+USA/@38.9681835,-108.1913094,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Connecticut",
    url: [
      "https://en.wikipedia.org/wiki/Connecticut",
      "https://www.google.com/maps/place/Connecticut,+USA/@41.4988438,-73.4169165,9z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Delaware",
    url: [
      "https://en.wikipedia.org/wiki/Delaware",
      "https://www.google.com/maps/place/Delaware,+USA/@39.1434661,-76.0460137,9z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Florida",
    url: [
      "https://en.wikipedia.org/wiki/Florida",
      "https://www.google.com/maps/place/Florida,+USA/@27.4942544,-89.0986287,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Georgia",
    url: [
      "https://en.wikipedia.org/wiki/Georgia_(U.S._state)",
      "https://www.google.com/maps/place/Georgia,+USA/@32.650863,-85.8351273,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Hawaii",
    url: [
      "https://en.wikipedia.org/wiki/Hawaii",
      "https://www.google.com/maps/place/Hawaii,+USA/@20.4400513,-160.1470208,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Idaho",
    url: [
      "https://en.wikipedia.org/wiki/Idaho",
      "https://www.google.com/maps/place/Idaho,+USA/@45.3725448,-119.426894,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Illinois",
    url: [
      "https://en.wikipedia.org/wiki/Illinois",
      "https://www.google.com/maps/place/Illinois,+USA/@39.7094741,-91.9068764,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Indiana",
    url: [
      "https://en.wikipedia.org/wiki/Indiana",
      "https://www.google.com/maps/place/Indiana,+USA/@39.7365994,-89.0815801,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Iowa",
    url: [
      "https://en.wikipedia.org/wiki/Iowa",
      "https://www.google.com/maps/place/Iowa,+USA/@41.9080688,-96.0299095,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Kansas",
    url: [
      "https://en.wikipedia.org/wiki/Kansas",
      "https://www.google.com/maps/place/Kansas,+USA/@38.4684421,-100.9605758,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Kentucky",
    url: [
      "https://en.wikipedia.org/wiki/Kentucky",
      "https://www.google.com/maps/place/Kentucky,+USA/@37.7929147,-88.4085622,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Louisiana",
    url: [
      "https://en.wikipedia.org/wiki/Louisiana",
      "https://www.google.com/maps/place/Louisiana,+USA/@30.9105263,-94.042092,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Maine",
    url: [
      "https://en.wikipedia.org/wiki/Maine",
      "https://www.google.com/maps/place/Maine,+USA/@45.1580637,-71.6244536,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Maryland",
    url: [
      "https://en.wikipedia.org/wiki/Maryland",
      "https://www.google.com/maps/place/Maryland,+USA/@38.7974027,-78.5562818,8z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Massachusetts",
    url: [
      "https://en.wikipedia.org/wiki/Massachusetts",
      "https://www.google.com/maps/place/Massachusetts,+USA/@42.0293615,-73.0027855,8z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Michigan",
    url: [
      "https://en.wikipedia.org/wiki/Michigan",
      "https://www.google.com/maps/place/Michigan,+USA/@44.8788672,-91.554549,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Minnesota",
    url: [
      "https://en.wikipedia.org/wiki/Minnesota",
      "https://www.google.com/maps/place/Minnesota,+USA/@46.3201036,-98.6444744,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Mississippi",
    url: [
      "https://en.wikipedia.org/wiki/Mississippi",
      "https://www.google.com/maps/place/Mississippi,+USA/@32.5403541,-92.5175236,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Missouri",
    url: [
      "https://en.wikipedia.org/wiki/Missouri",
      "https://www.google.com/maps/place/Missouri,+USA/@38.2750602,-95.0773536,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Montana",
    url: [
      "https://en.wikipedia.org/wiki/Montana",
      "https://www.google.com/maps/place/Montana,+USA/@46.5577605,-115.3272906,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Nebraska",
    url: [
      "https://en.wikipedia.org/wiki/Nebraska",
      "https://www.google.com/maps/place/Nebraska,+USA/@41.4706225,-102.3210854,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Nevada",
    url: [
      "https://en.wikipedia.org/wiki/Nevada",
      "https://www.google.com/maps/place/Nevada,+USA/@38.3828512,-122.3109795,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "New Hampshire",
    url: [
      "https://en.wikipedia.org/wiki/New_Hampshire",
      "https://www.google.com/maps/place/New+Hampshire,+USA/@43.9938204,-72.8853177,8z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "New Jersey",
    url: [
      "https://en.wikipedia.org/wiki/New_Jersey",
      "https://www.google.com/maps/place/New+Jersey,+USA/@40.0656491,-76.0436131,8z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "New Mexico",
    url: [
      "https://en.wikipedia.org/wiki/New_Mexico",
      "https://www.google.com/maps/place/New+Mexico,+USA/@34.1379113,-108.6671628,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "New York",
    url: [
      "https://en.wikipedia.org/wiki/New_York_(state)",
      "https://www.google.com/maps/place/New+York,+NY,+USA/@40.6966727,-74.3091547,10z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "North Carolina",
    url: [
      "https://en.wikipedia.org/wiki/North_Carolina",
      "https://www.google.com/maps/place/North+Carolina,+USA/@35.1418465,-82.5017995,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "North Dakota",
    url: [
      "https://en.wikipedia.org/wiki/North_Dakota",
      "https://www.google.com/maps/place/North+Dakota,+USA/@47.4375152,-102.9412365,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Ohio",
    url: [
      "https://en.wikipedia.org/wiki/Ohio",
      "https://www.google.com/maps/place/Ohio,+USA/@40.3333677,-85.3098091,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Oklahoma",
    url: [
      "https://en.wikipedia.org/wiki/Oklahoma",
      "https://www.google.com/maps/place/Oklahoma,+USA/@35.2803395,-101.3575294,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Oregon",
    url: [
      "https://en.wikipedia.org/wiki/Oregon",
      "https://www.google.com/maps/place/Oregon,+USA/@44.1151855,-123.223298,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Pennsylvania",
    url: [
      "https://en.wikipedia.org/wiki/Pennsylvania",
      "https://www.google.com/maps/place/Pennsylvania,+USA/@41.086833,-80.2449289,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Rhode Island",
    url: [
      "https://en.wikipedia.org/wiki/Rhode_Island",
      "https://www.google.com/maps/place/Rhode+Island,+USA/@41.5554329,-72.1573238,9z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "South Carolina",
    url: [
      "https://en.wikipedia.org/wiki/South_Carolina",
      "https://www.google.com/maps/place/South+Carolina,+USA/@33.5776577,-83.5675931,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "South Dakota",
    url: [
      "https://en.wikipedia.org/wiki/South_Dakota",
      "https://www.google.com/maps/place/South+Dakota,+USA/@44.1821246,-102.8870647,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Tennessee",
    url: [
      "https://en.wikipedia.org/wiki/Tennessee",
      "https://www.google.com/maps/place/Tennessee,+USA/@35.8017012,-88.6194607,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Texas",
    url: [
      "https://en.wikipedia.org/wiki/Texas",
      "https://www.google.com/maps/place/Texas,+USA/@31.0606265,-105.3690415,6z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Utah",
    url: [
      "https://en.wikipedia.org/wiki/Utah",
      "https://www.google.com/maps/place/Utah,+USA/@39.4698112,-114.1876229,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Vermont",
    url: [
      "https://en.wikipedia.org/wiki/Vermont",
      "https://www.google.com/maps/place/Vermont,+USA/@43.8642072,-73.7706874,8z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Virginia",
    url: [
      "https://en.wikipedia.org/wiki/Virginia",
      "https://www.google.com/maps/place/Virginia,+USA/@37.9739049,-82.0614633,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Washington",
    url: [
      "https://en.wikipedia.org/wiki/Washington_(state)",
      "https://www.google.com/maps/place/Washington,+USA/@47.2426761,-123.5220696,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "West Virginia",
    url: [
      "https://en.wikipedia.org/wiki/West_Virginia",
      "https://www.google.com/maps/place/West+Virginia,+USA/@38.8904247,-82.8225094,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Wisconsin",
    url: [
      "https://en.wikipedia.org/wiki/Wisconsin",
      "https://www.google.com/maps/place/Wisconsin,+USA/@44.8703541,-92.2093036,7z",
    ],
  },
  {
    "@type": "AdministrativeArea",
    name: "Wyoming",
    url: [
      "https://en.wikipedia.org/wiki/Wyoming",
      "https://www.google.com/maps/place/Wyoming,+USA/@42.9699468,-110.1934233,7z",
    ],
  },
];
