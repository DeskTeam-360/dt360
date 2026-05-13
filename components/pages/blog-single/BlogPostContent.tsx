import svgPaths from "./svg-blog-single";
import { SafeImage } from "@/components/shared/SafeImage";
import { DownloadCTA } from "@/components/pages/blog/DownloadCTA";

export function BlogPostContent() {
  return (
    <div className="bg-white w-full overflow-x-hidden relative">
      {/* Header Background */}
      <div className="absolute inset-x-0 top-0 h-[500px] md:h-[819px] bg-[#C8CEFB] z-0 overflow-hidden">
        <div 
          className="absolute right-[-200px] top-[-200px] w-[807px] h-[768px] rounded-full"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(227, 5, 141, 0.4) 0%, rgba(227, 5, 141, 0) 100%)' }}
        />
        <div 
          className="absolute left-[-400px] top-[400px] w-[871px] h-[897px] rounded-full"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(117, 71, 197, 0.4) 0%, rgba(117, 71, 197, 0) 100%)' }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-32 pb-16 md:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block bg-[#F0573A] text-white px-5 py-1.5 rounded-[15px] font-bold text-base md:text-lg mb-6">
            INDUSTRY INSIGHT
          </div>

          <h1 className="text-[#11104C] text-3xl md:text-5xl lg:text-[63px] font-bold leading-tight mb-4 max-w-[1082px] font-poppins">
            AI Content Creation: What Works and What Doesn&apos;t in 2026
          </h1>

          <p className="text-[#11104C] text-lg md:text-2xl font-medium italic mb-8 font-montserrat">
            By Jeremy Kenerson   |    March 19, 2026
          </p>

          <div className="relative w-full aspect-[2/1] rounded-br-[50px] md:rounded-br-[100px] rounded-tl-[50px] md:rounded-tl-[100px] overflow-hidden">
            <SafeImage src="/images/blog/blog-ai-content-creation-hero.png" alt="AI Content Creation" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 -mt-16 md:-mt-24 mb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-l-[20px] p-6 md:p-12">
            {/* Background extension to the right */}
            <div className="absolute top-0 bottom-0 left-0 right-[-50vw] bg-[#5F69AD] rounded-l-[20px] z-0" />
            <p className="text-white text-lg md:text-2xl font-medium italic leading-relaxed font-montserrat relative z-10">
              The rise of AI content creation is changing the game for businesses of all sizes. I&apos;m going to tell you something that&apos;ll probably piss off the AI evangelists: Most AI-generated content is still garbage. But the content that&apos;s good? It&apos;s really, really good.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16 overflow-hidden">
        {/* Cyan/Blue Gradient Ellipse - Left Side */}
        <div 
          className="absolute left-[-300px] top-[20%] w-[676px] h-[661px] rounded-full pointer-events-none z-[-1]"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0, 200, 244, 0.15) 0%, rgba(1, 211, 252, 0) 100%)' }}
        />

        {/* Decorative Icon - Left Side */}
        <div className="absolute left-[-20px] md:left-[20px] top-[10%] w-[149px] h-[174px] pointer-events-none hidden lg:block z-[-1]">
          <SafeImage src="/images/blog/blog-icon-website-design.png" alt="" fill className="object-cover" />
        </div>

        {/* Rotated Decorative Image - Right Side */}
        <div className="absolute right-[-150px] top-[5%] w-[572px] h-[554px] pointer-events-none hidden xl:block z-[-1]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="rotate-[-42.51deg]">
              <div className="w-[542.557px] h-[254.598px] relative">
                <div className="absolute inset-0 opacity-50 overflow-hidden pointer-events-none">
                  <SafeImage src="/images/blog/blog-decorative-image.png" alt="" className="h-[264.83%] left-[-3.72%] max-w-none top-[-10.69%] w-[222.65%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto relative">
          {/* Main Article Content */}
          <article className="prose prose-lg max-w-none">
            <section id="brutal-truth" className="mb-12">
              <h2 className="text-[#11104C] text-3xl md:text-5xl font-bold mb-6 font-montserrat">
                The Brutal Truth About AI Content in 2026
              </h2>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                The rise of ai content creation is changing the game for businesses of all sizes. I&apos;m going to tell you something that&apos;ll probably piss off the AI evangelists: Most AI-generated content is still garbage. But the content that&apos;s good? It&apos;s really, really good.
              </p>
            </section>

            <section className="mb-12">
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                Here&apos;s what I&apos;ve learned after spending the last two years knee-deep in AI content workflows, testing every tool from ChatGPT to Claude to the latest marketing automation platforms, and integrating AI into our content operations at DeskTeam360. The difference between AI content that converts and AI content that gets ignored isn&apos;t the tool you use. It&apos;s how you use it.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                I&apos;ve seen companies blow $50K on AI writing platforms only to produce content that reads like it was written by a committee of robots. I&apos;ve also seen smart operators use basic AI tools <a href="https://clone.deskteam360.com/how-to-create-faq-page/" className="text-black underline hover:text-[#E6236D]" target="_blank" rel="noopener noreferrer">to create</a> content that outperforms anything their competitors are publishing. The gap is strategy, not technology.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                Let me show you exactly what works, what doesn&apos;t, and <a href="https://clone.deskteam360.com/outsource-content-creation/" className="text-black underline hover:text-[#E6236D]" target="_blank" rel="noopener noreferrer">how to</a> build a content operation that actually moves the needle on your <a href="https://hbr.org/topic/subject/ai-and-machine-learning" className="text-black underline hover:text-[#E6236D]" target="_blank" rel="noopener noreferrer">business</a>.
              </p>
            </section>

            <section id="dominates" className="mb-12">
              <h2 className="text-[#11104C] text-3xl md:text-5xl font-bold mb-6 font-montserrat">
                Where AI Content Actually Dominates
              </h2>
            </section>

            <section id="research" className="mb-12">
              <h3 className="text-[#11104C] text-2xl md:text-4xl font-bold mb-6 font-montserrat">
                Research and First Drafts
              </h3>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                This is where AI absolutely crushes it. The hardest part of any content project isn&apos;t writing, it&apos;s staring at a blank page trying to figure out where to start. AI eliminates that problem completely.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                I can give Claude or ChatGPT a topic, target audience, and key points to cover, and get a well-structured 2,000-word first draft in under 10 minutes. Not a final draft, obviously. But a solid foundation with research citations, logical flow, and comprehensive coverage of the topic. That same research and outlining process used to take our writers 3-4 hours.
              </p>
            </section>

            <div className="bg-[#45108B] rounded-[35px] p-8 md:p-12 my-12 text-center">
              <p className="text-white text-2xl md:text-3xl font-bold font-montserrat">
                AI reduces research and first-draft time by 70-80% for most content types.
              </p>
            </div>

            <p className="text-black leading-relaxed mb-12 font-montserrat font-semibold">
              The secret is in the prompting. Don&apos;t just say &quot;write about email marketing.&quot; Give it context, angle, audience, examples, and specific outcomes you want. Feed it good input, get good output. Feed it lazy prompts, get lazy content.
            </p>

            <section id="seo" className="mb-12">
              <h3 className="text-[#11104C] text-2xl md:text-4xl font-bold mb-6 font-montserrat">
                SEO-Optimized Content at Scale
              </h3>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                AI was basically built for SEO content. Here&apos;s why it works so well: it naturally integrates target keywords without the awkward stuffing that plagued early SEO writing. It covers topics comprehensively, which Google rewards. It generates clean structure and formatting automatically. And most importantly, it can produce 10 solid SEO articles in the time it takes a human to write two.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                But here&apos;s the thing most people miss about AI and SEO. The content still needs to be good. Google&apos;s algorithms are smart enough to detect thin, auto-generated content that adds no value. If you&apos;re using AI to pump out 50 mediocre blog posts hoping something sticks, you&apos;re doing it wrong.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                The companies winning <a href="https://clone.deskteam360.com/automate-marketing-with-ai/" className="text-black underline hover:text-[#E6236D]" target="_blank" rel="noopener noreferrer">with AI</a> SEO are the ones using it to create genuinely helpful content faster, not more bad content at scale. Our <a href="https://clone.deskteam360.com/how-to-do-keyword-research/" className="text-black underline hover:text-[#E6236D]" target="_blank" rel="noopener noreferrer">keyword research guide</a> still applies, AI just makes the execution faster.
              </p>
            </section>

            <section id="email" className="mb-12">
              <h3 className="text-[#11104C] text-2xl md:text-4xl font-bold mb-6 font-montserrat">
                Email Marketing and Social Media
              </h3>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                Email and social are perfect AI use cases because they require massive volume and constant iteration. You need 20 subject line variations for split testing. You need to adapt one piece of content for LinkedIn, Twitter, Instagram, and Facebook. You need to respond to trending topics while they&apos;re still relevant.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                AI handles all of this effortlessly. I can take one blog post and have AI generate email versions, social posts for four platforms, subject line variations, and even response templates for common comments. The human work becomes curation and optimization, not content creation.
              </p>
            </section>

            <div className="bg-[#E6236D] rounded-[35px] p-8 md:p-12 my-12">
              <p className="text-white text-lg md:text-2xl font-semibold font-montserrat">
                <span className="font-black">Pro tip:</span> Use AI to generate 15-20 email subject line variations, then A/B test the top 3-4 that sound most human. The data will tell you which AI suggestions actually work with your audience.
              </p>
            </div>

            <section id="product" className="mb-12">
              <h3 className="text-[#11104C] text-2xl md:text-4xl font-bold mb-6 font-montserrat">
                Product Descriptions and Technical Documentation
              </h3>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                For straightforward, factual content, AI often outperforms human writers. Product descriptions, feature documentation, FAQ pages, help center articles. These content types prioritize accuracy and consistency over creativity. AI delivers both at scale.
              </p>
              <p className="text-black leading-relaxed mb-4 font-montserrat font-semibold">
                If you&apos;re running an e-commerce business, AI can write 200 product descriptions in the time it takes to write five manually. For SaaS companies, AI can turn feature specs into user-friendly documentation faster than any technical writer. The key is feeding it accurate source information and having a human review for technical accuracy.
              </p>
            </section>
          </article>
        </div>
      </div>

      {/* Download CTA Section */}
      <DownloadCTA 
        title="Free Download:"
        subtitle="The Ultimate Task Delegation Template"
        description="Stop guessing what to hand off. This template shows you exactly what to delegate, how to brief it, and how to QA the results."
        buttonText="Get the Free Template"
        showSubtext={false}
      />

      {/* Related Articles */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto relative">
          <h2 className="text-[#11104C] text-3xl md:text-5xl font-bold mb-12 font-poppins">You Might Also Like</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="border border-[#11104C] rounded-[30px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative h-64 flex-shrink-0">
                <SafeImage src="/images/blog/blog-how-much-does-website-maintenance-cost.png" alt="How Much Does Website" fill className="object-cover rounded-t-[25px]" />
                <SafeImage src="/images/blog/blog-how-much-does-website-maintenance-cost-overlay.png" alt="Overlay" fill className="object-cover rounded-t-[25px]" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-[#F0573A] text-white px-4 py-1 rounded-[15px] text-sm font-bold uppercase font-montserrat">delegation</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F69AD] text-sm mb-4 font-montserrat font-semibold">
                  <span>8 min read</span>
                  <span>|</span>
                  <span>Jeremy Kenerson</span>
                </div>
                <h3 className="text-[#1B1464] text-xl md:text-2xl font-bold mb-6 leading-tight font-poppins flex-grow">
                  How Much Does Website Maintenance Actually Cost? (2026 Guide)
                </h3>
                <button className="border-2 border-[#7547C5] text-[#7547C5] px-8 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#7547C5] hover:text-white transition-colors font-montserrat w-fit">
                  Read Post
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 26 26">
                    <path d={svgPaths.p119efc00} />
                  </svg>
                </button>
              </div>
            </div>

            {/* Article 2 */}
            <div className="border border-[#11104C] rounded-[30px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative h-64 flex-shrink-0">
                <SafeImage src="/images/blog/blog-outsourced-marketing-team.png" alt="Outsourced Marketing Team" fill className="object-cover rounded-t-[25px]" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-[#E3058D] text-white px-4 py-1 rounded-[15px] text-sm font-bold uppercase font-montserrat">outsourcing</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F69AD] text-sm mb-4 font-montserrat font-semibold">
                  <span>8 min read</span>
                  <span>|</span>
                  <span>Jeremy Kenerson</span>
                </div>
                <h3 className="text-[#1B1464] text-xl md:text-2xl font-bold mb-6 leading-tight font-poppins flex-grow">
                  Outsourced Marketing Team: What to Look for and What to Avoid
                </h3>
                <button className="border-2 border-[#7547C5] text-[#7547C5] px-8 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#7547C5] hover:text-white transition-colors font-montserrat w-fit">
                  Read Post
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 26 26">
                    <path d={svgPaths.p119efc00} />
                  </svg>
                </button>
              </div>
            </div>

            {/* Article 3 */}
            <div className="border border-[#11104C] rounded-[30px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative h-64 flex-shrink-0">
                <SafeImage src="/images/blog/blog-how-to-scale-your-agency.png" alt="How to Scale Your Agency" fill className="object-cover rounded-t-[25px]" />
                <div className="absolute inset-0 overflow-hidden rounded-t-[25px]">
                  <SafeImage src="/images/blog/blog-how-to-scale-your-agency-overlay.png" alt="Overlay" fill className="object-cover" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-[#F5B419] text-white px-4 py-1 rounded-[15px] text-sm font-bold uppercase font-montserrat">agency growth</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F69AD] text-sm mb-4 font-montserrat font-semibold">
                  <span>8 min read</span>
                  <span>|</span>
                  <span>Jeremy Kenerson</span>
                </div>
                <h3 className="text-[#1B1464] text-xl md:text-2xl font-bold mb-6 leading-tight font-poppins flex-grow">
                  How to Scale Your Agency Without Hiring Full-Time Staff
                </h3>
                <button className="border-2 border-[#7547C5] text-[#7547C5] px-8 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#7547C5] hover:text-white transition-colors font-montserrat w-fit">
                  Read Post
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 26 26">
                    <path d={svgPaths.p119efc00} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
