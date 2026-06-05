export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  categories?: string[];
  author: string;
  readTime: string;
  date?: string;
  isFeatured?: boolean;
  tagColor?: string;
}

export const CATEGORIES = [
  "All Posts",
  "Delegation",
  "Outsourcing",
  "Agency Growth",
  "Comparisons",
  "Pricing & Cost",
  "Scaling",
];

export const AUTHOR_INFO = {
  name: "Jeremy Kenerson",
  title: "Founder",
  image: "/images/blog/blog-jeremy-author.png",
  bio: "Jeremy Kenerson is the founder of DeskTeam360 and a former digital agency owner who spent over $1 million outsourcing work across 200+ freelancers over 12 years. In 2018, he built DeskTeam360 to give other business owners the dedicated, accountable team he wished he'd had. He's served 400+ clients and processed $2.5M+ through Stripe with zero chargebacks.",
};

export const FEATURED_POST: BlogPost = {
  id: "featured-1",
  slug: "how-to-delegate-tasks-effectively",
  title: "How to Delegate Tasks Effectively (Without Losing Your Mind)",
  excerpt: "Most people think they're bad at delegating. I used to think that too. Turns out, I wasn't bad at it - I was just doing it wrong. Here's the multi-sensory task delegation framework I developed after 12 years and 200+ overseas team members.",
  image: "/images/blog/blog-featured.png",
  category: "Delegation",
  author: "Jeremy Kenerson",
  readTime: "8 min read",
  isFeatured: true,
  tagColor: "bg-[#f0573a]",
};

export const LATEST_POSTS: BlogPost[] = [
  {
    id: "latest-1",
    slug: "how-to-delegate-without-losing-control",
    title: "How to Delegate Tasks Effectively Without Losing Control",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante. Sed id rutrum odio, sit amet auctor nibh. Integer lectus urna, dictum in mi sed.",
    image: "/images/blog/blog-delegate.png",
    category: "Delegation",
    author: "Jeremy Kenerson",
    readTime: "8 min read",
    tagColor: "bg-[#f0573a]",
  },
  {
    id: "latest-2",
    slug: "deskteam360-vs-design-pickle",
    title: "DeskTeam360 vs Design Pickle: Which Is Right For Your Business?",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante.",
    image: "/images/blog/blog-comparison.png",
    category: "Comparisons",
    author: "Jeremy Kenerson",
    readTime: "8 min read",
    tagColor: "bg-[#7547c5]",
  },
  {
    id: "latest-3",
    slug: "website-maintenance-cost",
    title: "How Much Does Website Maintenance Actually Cost? (2024 guide)",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante.",
    image: "/images/blog/blog-website.png",
    category: "Delegation",
    author: "Jeremy Kenerson",
    readTime: "8 min read",
    tagColor: "bg-[#f0573a]",
  },
  {
    id: "latest-4",
    slug: "outsourced-marketing-team",
    title: "Outsourced Marketing Team: What to Look for and When to Avoid",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante.",
    image: "/images/blog/blog-marketing.png",
    category: "Outsourcing",
    author: "Jeremy Kenerson",
    readTime: "8 min read",
    tagColor: "bg-[#e3058d]",
  },
  {
    id: "latest-5",
    slug: "scale-agency-without-hiring",
    title: "How to Scale Your Agency Without Hiring Full-time staff",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante.",
    image: "/images/blog/blog-scale.png",
    category: "Agency Growth",
    author: "Jeremy Kenerson",
    readTime: "8 min read",
    tagColor: "bg-[#f5b419]",
  },
];
