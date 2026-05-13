'use client';

import React from 'react';
import svgPaths from "./svg-blog-single";
import { SafeImage } from "@/components/shared/SafeImage";
import Link from "next/link";
import { DownloadCTA } from "@/components/pages/blog/DownloadCTA";
import { BlogPost } from "@/data/blog";
import parse, { HTMLReactParserOptions, Element, Text, domToReact } from 'html-react-parser';
import { DOMNode } from 'html-react-parser';

// Helper to extract plain text from an HTML node for searching keywords like "Pro tip"
const extractText = (node: DOMNode): string => {
  if (node instanceof Text) return node.data || '';
  if (node instanceof Element && node.children) {
    return (node.children as DOMNode[]).map(extractText).join('');
  }
  return '';
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

interface DynamicBlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function DynamicBlogPostContent({ post, relatedPosts }: DynamicBlogPostContentProps) {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      const findRecursive = (nodes: DOMNode[] | undefined, names: string[]): Element[] => {
        let results: Element[] = [];
        if (!nodes) return results;
        for (const node of nodes) {
          if (node instanceof Element && names.includes(node.name)) {
            results.push(node);
          } else if (node instanceof Element && node.children) {
            results = results.concat(findRecursive(node.children as DOMNode[], names));
          }
        }
        return results;
      };

      if (domNode instanceof Element) {
        const className = domNode.attribs?.class || '';
        const id = domNode.attribs?.id || '';

        // Hide redundant WordPress related posts section and headings
        if (className.includes('dt360-related-posts')) {
          return null;
        }
        if (domNode.name === 'h2' || domNode.name === 'h3') {
          const text = extractText(domNode).toLowerCase().trim();
          if (text === 'you might also like') {
            return null;
          }
        }

        // Handle Blockquote
        if (domNode.name === 'blockquote') {
          const textContent = extractText(domNode).toLowerCase();
          
          if (textContent.includes('pro tip:')) {
            // Pro Tip Style
            return (
              <div className="bg-[#E6236D] rounded-[35px] p-8 md:p-12 my-12">
                <div className="text-white text-lg md:text-2xl font-semibold font-montserrat">
                  {domToReact(domNode.children as DOMNode[], options)}
                </div>
              </div>
            );
          } else {
            // Standard Quote Style
            return (
              <div className="bg-[#45108B] rounded-[35px] p-8 md:p-12 my-12 text-center">
                <div className="text-white text-2xl md:text-3xl font-bold font-montserrat">
                  {domToReact(domNode.children as DOMNode[], options)}
                </div>
              </div>
            );
          }
        }

        // Handle Author Box
        if (className.includes('dt360-author-box')) {
          const images = findRecursive(domNode.children as DOMNode[], ['img']);
          const textElements = findRecursive(domNode.children as DOMNode[], ['h2', 'h3', 'p']);
          const actualImg = images[0];

          return (
            <div className="bg-[#F8F9FF] border border-[#C8CEFB] rounded-[30px] p-8 md:p-12 my-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {actualImg && (
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg relative">
                  <SafeImage 
                    src={actualImg.attribs.src} 
                    alt={actualImg.attribs.alt || "Author"} 
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-grow text-center md:text-left">
                {textElements.map((child: Element, idx: number) => {
                  if (child.name === 'h2' || child.name === 'h3') {
                    return (
                      <h3 key={idx} className="text-[#11104C] text-2xl md:text-3xl font-bold font-poppins mb-2">
                        {domToReact(child.children as DOMNode[], options)}
                      </h3>
                    );
                  }
                  return (
                    <p key={idx} className="text-[#5F69AD] text-lg md:text-xl font-medium font-montserrat leading-relaxed mb-4 last:mb-0">
                      {domToReact(child.children as DOMNode[], options)}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }

        // Handle Table of Contents
        if (className.includes('dt360-toc')) {
          const links = findRecursive(domNode.children as DOMNode[], ['a']);
          
          return (
            <div className="bg-[#F8F9FF] rounded-[35px] p-8 md:p-12 my-12 max-w-full md:max-w-[75%] mx-auto">
              <h2 className="text-[#11104C] text-2xl md:text-3xl font-bold font-poppins mb-8">
                Table of Contents
              </h2>
              <nav>
                <ul className="space-y-4">
                  {links.map((link: Element, idx: number) => {
                    const text = extractText(link);
                    
                    return (
                      <li key={idx} className="list-none">
                        <Link 
                          href={link.attribs.href}
                          className="text-[#45108B] hover:text-[#E6236D] transition-colors font-montserrat font-semibold text-lg md:text-xl inline-block"
                        >
                          {text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          );
        }

        // Handle specific classes/IDs for callouts/CTAs
        const isCallout = className.includes('dt360-callout-') || className.includes('dt360-cta-');
        const isCtaPrimary = className.includes('dt360-cta-primary') || id === 'dt360-cta-primary';
        const isCtaSecondary = className.includes('dt360-cta-secondary') || id === 'dt360-cta-secondary';

        if (isCallout || isCtaPrimary || isCtaSecondary) {
          // Determine Background Style
          let containerClass = "bg-[#45108B]"; // Default Purple
          const containerStyle = {};
          let shortTextColor = "text-[#F0573A]"; // Default Highlight color
          
          if (className.includes('warning')) {
            containerClass = "bg-[#F0573A]";
            shortTextColor = "text-white underline";
          } else if (className.includes('tip')) {
            containerClass = "bg-[#E6236D]";
            shortTextColor = "text-[#11104C]";
          } else if (className.includes('outline')) {
            containerClass = "bg-transparent border-4 border-[#45108B]";
            shortTextColor = "text-[#45108B]";
          }

          const content = (domNode.children as DOMNode[]).map((child: DOMNode, idx: number) => {
            if (child instanceof Element) {
              if (child.name === 'h2') {
                return (
                  <h2 key={idx} className="text-white text-2xl md:text-4xl font-bold font-poppins mb-4">
                    {domToReact(child.children as DOMNode[], options)}
                  </h2>
                );
              }
              if (child.name === 'p') {
                const text = extractText(child).trim();
                const isShort = text.length > 0 && text.length < 100;
                const pColor = className.includes('outline') ? 'text-[#11104C]' : 'text-white';
                
                return (
                  <p key={idx} className={`font-montserrat leading-relaxed mb-4 ${isShort ? `${shortTextColor} text-xl md:text-2xl font-bold` : `${pColor} text-lg md:text-xl font-medium`}`}>
                    {domToReact(child.children as DOMNode[], options)}
                  </p>
                );
              }
              if (child.name === 'a') {
                const { href, ...linkProps } = child.attribs || {};
                const btnBg = className.includes('cta-secondary') ? 'bg-[#45108B]' : 'bg-[#e3058d]';
                return (
                  <div key={idx} className="mt-6">
                    <Link 
                      href={href || '#'} 
                      {...linkProps}
                      className={`${btnBg} text-white px-8 py-4 md:px-10 md:py-5 rounded-[15px] font-bold text-xl md:text-2xl transition-all hover:opacity-90 hover:scale-105 shadow-lg font-montserrat inline-block`}
                    >
                      {domToReact(child.children as DOMNode[], options)}
                    </Link>
                  </div>
                );
              }
            }
            if (child instanceof Text && child.data.trim()) {
              const textColor = className.includes('outline') ? 'text-[#11104C]' : 'text-white';
              return (
                <p key={idx} className={`${textColor} text-lg md:text-xl font-medium font-montserrat mb-4`}>
                  {child.data.trim()}
                </p>
              );
            }
            return null;
          }).filter(Boolean);

          return (
            <div className={`${containerClass} rounded-[35px] p-8 md:p-12 my-12 text-center flex flex-col items-center`} style={containerStyle}>
              {content}
            </div>
          );
        }

        // Handle Headings
        if (domNode.name === 'h2') {
          const text = extractText(domNode);
          const generatedId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          const idToUse = domNode.attribs?.id || generatedId;
          
          return (
            <h2 id={idToUse} className="text-[#11104C] text-[32px] md:text-[48px] font-bold mb-8 mt-16 font-poppins scroll-mt-24">
              {domToReact(domNode.children as DOMNode[], options)}
            </h2>
          );
        }
        if (domNode.name === 'h3') {
          const text = extractText(domNode);
          const generatedId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          const idToUse = domNode.attribs?.id || generatedId;

          return (
            <h3 id={idToUse} className="text-[#11104C] text-2xl md:text-4xl font-bold mb-6 mt-8 font-poppins scroll-mt-24">
              {domToReact(domNode.children as DOMNode[], options)}
            </h3>
          );
        }

        // Handle Paragraphs
        if (domNode.name === 'p') {
          // Check if parent is blockquote
          const isInsideBlockquote = domNode.parent && (domNode.parent as Element).name === 'blockquote';
          
          if (isInsideBlockquote) {
            return (
              <p className="text-white leading-[1.5em] mb-0 font-montserrat font-semibold">
                {domToReact(domNode.children as DOMNode[], options)}
              </p>
            );
          }

          return (
            <p className="text-black leading-[1.9em] mb-8 font-montserrat font-semibold text-[18px]">
              {domToReact(domNode.children as DOMNode[], options)}
            </p>
          );
        }

        // Handle Strong/B
        if (domNode.name === 'strong' || domNode.name === 'b') {
          return (
            <strong className="font-extrabold">
              {domToReact(domNode.children as DOMNode[], options)}
            </strong>
          );
        }

        // Handle Links
        if (domNode.name === 'a') {
          const { href, ...props } = domNode.attribs || {};
          return (
            <Link href={href || '#'} {...props} className="text-black underline hover:text-[#E6236D] transition-colors font-montserrat">
              {domToReact(domNode.children as DOMNode[], options)}
            </Link>
          );
        }
      }
    }
  };

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
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-32 pb-4 md:pb-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block bg-[#F0573A] text-white px-5 py-1.5 rounded-[15px] font-bold text-base md:text-lg mb-6 uppercase">
            {post.category}
          </div>

          <h1 className="text-[#11104C] text-3xl md:text-5xl lg:text-[63px] font-bold leading-tight mb-4 max-w-[1082px] font-poppins">
            {post.title}
          </h1>

          <p className="text-[#11104C] text-lg md:text-2xl font-medium italic mb-8 font-montserrat">
            By {post.author}   |    {formatDate(post.date)}
          </p>

          <div className="relative w-full aspect-[2/1] rounded-br-[50px] md:rounded-br-[100px] rounded-tl-[50px] md:rounded-tl-[100px] overflow-hidden bg-gray-100 mb-8 md:mb-12 shadow-2xl">
            <SafeImage src={post.image} alt={post.title} fill className="object-cover" />
          </div>

          {post.excerpt && (
            <div className="bg-[#5F69AD] rounded-l-[30px] rounded-r-none p-8 md:p-12 shadow-xl -mr-[100vw] pr-[100vw]">
              <p className="text-white text-lg md:text-2xl font-medium italic leading-relaxed font-montserrat max-w-[1082px]">
                {post.excerpt}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-4 pb-16 overflow-hidden">
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
          <article className="dynamic-prose max-w-none">
            {/* Custom CSS only for specific cases like images or lists that are harder to target via parser */}
            <style dangerouslySetInnerHTML={{__html: `
              .dynamic-prose {
                scroll-behavior: smooth;
              }
              .dynamic-prose ul, .dynamic-prose ol {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin-bottom: 2rem;
              }
              .dynamic-prose li {
                color: black;
                font-family: var(--font-montserrat), sans-serif;
                font-weight: 600;
                font-size: 18px;
                line-height: 1.9em;
                margin-bottom: 0.75rem;
              }
              .dt360-blog-header, .dt360-blog-featured-img {
                display: none !important;
              }
              /* Internal images style */
              .dynamic-prose img {
                border-radius: 20px;
                margin: 3rem 0;
                width: 100%;
                height: auto;
              }
              /* Force H2 styles to match reference exactly */
              .dynamic-prose h2 {
                font-size: 48px !important;
                font-weight: 700 !important;
                margin-top: 4rem !important;
                margin-bottom: 2rem !important;
                color: #11104C !important;
                font-family: var(--font-poppins), sans-serif !important;
                line-height: 1.2 !important;
              }
              .dt360-related-posts {
                display: none !important;
              }
              @media (max-width: 767px) {
                .dynamic-prose h2 {
                  font-size: 32px !important;
                }
              }
            `}} />
            
            {parse(post.content || '', options)}
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
      {relatedPosts.length > 0 && (
        <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16 overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative">
            <h2 className="text-[#11104C] text-3xl md:text-5xl font-bold mb-12 font-poppins">You Might Also Like</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <div key={related.id} className="border border-[#11104C] rounded-[30px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full bg-white">
                  <div className="relative h-64 flex-shrink-0 bg-gray-100">
                    <SafeImage src={related.image} alt={related.title} fill className="object-cover rounded-t-[25px]" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span className={`text-white px-4 py-1 rounded-[15px] text-sm font-bold uppercase font-montserrat ${related.tagColor || 'bg-[#F0573A]'}`}>
                        {related.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5F69AD] text-sm mb-4 font-montserrat font-semibold">
                      <span>{related.readTime}</span>
                      <span>|</span>
                      <span>{related.author}</span>
                    </div>
                    <Link href={`/blog/${related.slug}`} className="group flex-grow flex flex-col">
                      <h3 className="text-[#1B1464] text-xl md:text-2xl font-bold mb-6 leading-tight font-poppins group-hover:text-[#F0573A] transition-colors flex-grow">
                        {related.title}
                      </h3>
                    </Link>
                    <Link href={`/blog/${related.slug}`}>
                      <button className="border-2 border-[#7547C5] text-[#7547C5] px-8 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#7547C5] hover:text-white transition-colors font-montserrat w-fit">
                        Read Post
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 26 26">
                          <path d={svgPaths.p119efc00} />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
