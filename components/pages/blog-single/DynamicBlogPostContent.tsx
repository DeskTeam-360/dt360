'use client';

import React from 'react';
import svgPaths from "./svg-blog-single";
import { CaseStudiesSafeImage } from "@/components/pages/case-studies/shared/CaseStudiesSafeImage";
import { SafeImage } from "@/components/shared/SafeImage";
import Link from "next/link";
import { DownloadCTA } from "@/components/pages/blog/DownloadCTA";
import { AUTHOR_INFO, BlogPost } from "@/data/blog";
import parse, { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser';
import { DOMNode } from 'html-react-parser';
import { cn } from '@/lib/utils';
import {
  getWordPressInternalHostnames,
  rewriteWordPressContentHtml,
  rewriteWordPressMediaUrl,
} from '@/lib/wp-public';

type WpElementAttribs = { class?: string; style?: string };

/** Gutenberg classes + inline `text-align` from WordPress visual editor */
function wpTextAlignClass(attribs?: WpElementAttribs): string {
  const cls = attribs?.class ?? '';
  const style = attribs?.style ?? '';
  if (cls.includes('has-text-align-center') || /text-align\s*:\s*center/i.test(style)) {
    return 'text-center';
  }
  if (cls.includes('has-text-align-right') || /text-align\s*:\s*right/i.test(style)) {
    return 'text-right';
  }
  if (cls.includes('has-text-align-left') || /text-align\s*:\s*left/i.test(style)) {
    return 'text-left';
  }
  if (cls.includes('has-text-align-justify') || /text-align\s*:\s*justify/i.test(style)) {
    return 'text-justify';
  }
  return '';
}

/** Preserve inline styles from WordPress HTML (e.g. style="text-align: center;") */
function parseHtmlStyleAttribute(style?: string): React.CSSProperties | undefined {
  if (!style?.trim()) return undefined;
  const result: Record<string, string> = {};
  for (const part of style.split(';')) {
    const colon = part.indexOf(':');
    if (colon === -1) continue;
    const key = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    if (!key || !value) continue;
    const camelKey = key.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());
    result[camelKey] = value;
  }
  return Object.keys(result).length > 0 ? (result as React.CSSProperties) : undefined;
}

function wpElementPresentation(attribs?: WpElementAttribs) {
  return {
    alignClass: wpTextAlignClass(attribs),
    style: parseHtmlStyleAttribute(attribs?.style),
  };
}

/** Alignment on wrapper div (Gutenberg) — inherit for child `p` / headings */
const BLOG_BODY_PARAGRAPH_CLASS =
  'blog-body-paragraph text-black leading-[1.9em] mb-8 font-montserrat font-semibold text-[18px]';

const BLOG_BODY_LINK_CLASS =
  'text-[#fe652b] underline hover:opacity-80 transition-colors font-montserrat font-semibold';

const BLOG_INLINE_LINK_CLASS =
  'text-black underline hover:text-[#E6236D] transition-colors font-montserrat';

const BLOG_TOC_LINK_CLASS =
  'text-[#45108B] no-underline hover:text-[#E6236D] transition-colors font-montserrat font-semibold text-lg md:text-xl inline-block';

/** “Watch full video” CTA — orange button on its own row, body font size (18px) */
const BLOG_VIDEO_CTA_BUTTON_CLASS =
  'blog-video-cta-button block w-fit max-w-full mx-auto my-8 bg-[#F0573A] text-white no-underline hover:bg-[#e04a2f] hover:text-white transition-colors font-montserrat font-bold text-[18px] leading-[1.9em] px-8 py-3 rounded-[10px] text-center';

function isFullVideoCtaHref(href?: string): boolean {
  if (!href) return false;
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return false;
  const hash = href.slice(hashIndex).split('?')[0]?.split('&')[0] ?? '';
  return hash === '#fullvideo';
}

/** Table of Contents panel (lavender card) — keep purple links, not body orange/black */
function isInsideTocPanel(domNode: { parent?: unknown }): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parent = domNode.parent as any;
  while (parent?.type === 'tag') {
    const cls = parent.attribs?.class || '';
    if (
      cls.includes('blog-toc-panel') ||
      cls.includes('dt360-toc') ||
      (cls.includes('bg-[#F8F9FF]') &&
        cls.includes('rounded-[35px]') &&
        cls.includes('md:max-w-[75%]'))
    ) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

function cleanCalloutText(nodes: DOMNode[]): DOMNode[] {
  return nodes.map((node) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeAsAny = node as any;
    if (nodeAsAny.type === 'text') {
      let data = nodeAsAny.data || '';
      // Remove > CALLOUT (tip): or CALLOUT (tip):
      data = data.replace(/^>\s*CALLOUT\s*\([^)]+\):\s*/i, '');
      data = data.replace(/^CALLOUT\s*\([^)]+\):\s*/i, '');
      return { ...nodeAsAny, data };
    }
    if (nodeAsAny.children) {
      return {
        ...nodeAsAny,
        children: cleanCalloutText(nodeAsAny.children as DOMNode[]),
      };
    }
    return node;
  });
}

function isCtaPrimaryElement(attribs?: { class?: string; id?: string }): boolean {
  const cls = attribs?.class || '';
  const elementId = attribs?.id || '';
  return cls.includes('dt360-cta-primary') || elementId === 'dt360-cta-primary';
}

const HTML_VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/** Re-serialize a parsed DOM node back to HTML — preserves every attribute and inline style */
function domNodeToHtml(node: DOMNode): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeAsAny = node as any;

  if (nodeAsAny.type === 'text') {
    return nodeAsAny.data ?? '';
  }

  if (nodeAsAny.type === 'tag') {
    const tagName = nodeAsAny.name as string;
    const attribs = (nodeAsAny.attribs ?? {}) as Record<string, string>;
    const attrString = Object.entries(attribs)
      .map(([key, value]) => `${key}="${String(value).replace(/"/g, '&quot;')}"`)
      .join(' ');
    const openTag = attrString ? `<${tagName} ${attrString}>` : `<${tagName}>`;

    if (HTML_VOID_ELEMENTS.has(tagName)) {
      return openTag;
    }

    const children = ((nodeAsAny.children as DOMNode[] | undefined) ?? [])
      .map(domNodeToHtml)
      .join('');

    return `${openTag}${children}</${tagName}>`;
  }

  return '';
}

/** Preserve WordPress HTML inside primary CTA — do not re-style child nodes */
function isInsideCtaPrimary(domNode: { parent?: unknown }): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parent = domNode.parent as any;
  while (parent?.type === 'tag') {
    if (isCtaPrimaryElement(parent.attribs)) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

/** Next.js `<Link>` often skips in-page hash scrolling — use a native anchor instead */
function isInPageAnchorHref(href?: string): boolean {
  if (!href) return false;
  return href.startsWith('#') || href.includes('#');
}

/** Orange links only when the direct parent is a body `<p>`, not `div` / `li` / special blocks */
function isInsideBodyParagraph(domNode: { parent?: unknown }): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directParent = domNode.parent as any;
  if (directParent?.type !== 'tag' || directParent.name !== 'p') {
    return false;
  }

  let ancestor = directParent.parent;
  while (ancestor?.type === 'tag') {
    const name = ancestor.name;
    const cls = ancestor.attribs?.class || '';
    if (name === 'blockquote' || name === 'li') return false;
    if (
      cls.includes('blog-toc-panel') ||
      cls.includes('dt360-toc') ||
      cls.includes('dt360-author-box') ||
      cls.includes('dt360-callout-') ||
      cls.includes('dt360-cta-') ||
      cls.includes('dt360-related-posts')
    ) {
      return false;
    }
    ancestor = ancestor.parent;
  }
  return true;
}

function wpElementPresentationFromTree(domNode: { attribs?: WpElementAttribs; parent?: unknown }) {
  const own = wpElementPresentation(domNode.attribs);
  if (own.alignClass) return own;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parent = domNode.parent as any;
  for (let depth = 0; parent && depth < 5; depth += 1) {
    if (parent.type === 'tag') {
      const inherited = wpElementPresentation(parent.attribs);
      if (inherited.alignClass) {
        return { alignClass: inherited.alignClass, style: own.style ?? inherited.style };
      }
    }
    parent = parent.parent;
  }
  return own;
}

// Helper to extract plain text from an HTML node for searching keywords like "Pro tip"
const extractText = (node: DOMNode): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeAsAny = node as any;
  if (nodeAsAny.type === 'text') return nodeAsAny.data || '';
  if (nodeAsAny.children) {
    return (nodeAsAny.children as DOMNode[]).map(extractText).join('');
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
  publishedSlugs: string[];
  /** Case study detail — optimize hero, author, and related thumbnails. */
  optimizeImages?: boolean;
}

export function DynamicBlogPostContent({
  post,
  relatedPosts,
  publishedSlugs,
  optimizeImages = false,
}: DynamicBlogPostContentProps) {
  const PostImage = optimizeImages ? CaseStudiesSafeImage : SafeImage;
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      const findRecursive = (nodes: DOMNode[] | undefined, names: string[]): Element[] => {
        let results: Element[] = [];
        if (!nodes) return results;
        for (const node of nodes) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nodeAsAny = node as any;
          if (nodeAsAny.type === 'tag' && names.includes(nodeAsAny.name)) {
            results.push(nodeAsAny);
          } else if (nodeAsAny.children) {
            results = results.concat(findRecursive(nodeAsAny.children as DOMNode[], names));
          }
        }
        return results;
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const domNodeAsAny = domNode as any;
      if (domNodeAsAny.type === 'tag') {
        const className = domNodeAsAny.attribs?.class || '';
        const id = domNodeAsAny.attribs?.id || '';

        // Primary CTA — render exact WordPress HTML (all tags, inline styles, onmouseover, etc.)
        if (isCtaPrimaryElement(domNodeAsAny.attribs)) {
          let html = domNodeToHtml(domNodeAsAny);
          // Enlarge "Free 5-Minute Video" title text size and add bottom margin
          html = html.replace(/font-size:\s*13px/g, 'font-size: 36px; font-weight: 800;');
          html = html.replace(/margin:\s*0\s+0\s+8px\s+0/g, 'margin: 0 0 24px 0');
          // Unify primary CTA description size/font with standard content
          html = html.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.85\);\s*font-size:\s*16px/g, 'color: #ffffff; font-size: 18px; font-family: var(--font-montserrat), sans-serif; font-weight: 600;');
          return (
            <div
              className="wp-cta-primary-passthrough"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        // Children already included in the serialized CTA block above
        if (isInsideCtaPrimary(domNodeAsAny)) {
          return null;
        }

        // Hide redundant WordPress related posts section and headings
        if (className.includes('dt360-related-posts')) {
          return null;
        }
        if (domNodeAsAny.name === 'h2' || domNodeAsAny.name === 'h3') {
          const text = extractText(domNodeAsAny).toLowerCase().trim();
          if (text === 'you might also like') {
            return null;
          }
        }

        // Handle Blockquote
        if (domNodeAsAny.name === 'blockquote') {
          const className = domNodeAsAny.attribs?.class || '';
          const textContent = extractText(domNodeAsAny).toLowerCase();
          
          const isCallout = className.includes('dt-callout') || textContent.includes('callout');
          
          // Determine the correct style card
          let cardBg = "bg-[#45108B]"; // Default Purple
          let cardTextClass = "text-white text-2xl md:text-3xl font-bold font-montserrat text-center";
          
          if (textContent.includes('pro tip:') || textContent.includes('(tip):')) {
            cardBg = "bg-[#E6236D]"; // Pink
            cardTextClass = "text-white text-lg md:text-2xl font-semibold font-montserrat";
          } else if (textContent.includes('(warning):')) {
            cardBg = "bg-[#F0573A]"; // Orange
            cardTextClass = "text-white text-lg md:text-2xl font-semibold font-montserrat";
          }

          // If it is a callout block, clean up the label prefix
          let children = domNodeAsAny.children as DOMNode[];
          if (isCallout) {
            children = cleanCalloutText(children);
          }

          return (
            <div className={`${cardBg} rounded-[35px] p-8 md:p-12 my-12`}>
              <div className={cardTextClass}>
                {domToReact(children, options)}
              </div>
            </div>
          );
        }

        // Handle Author Box
        if (className.includes('dt360-author-box')) {
          const images = findRecursive(domNodeAsAny.children as DOMNode[], ['img']);
          const textElements = findRecursive(domNodeAsAny.children as DOMNode[], ['h2', 'h3', 'p']);
          const actualImg = images[0];
          const authorName = post.author?.trim() || AUTHOR_INFO.name;
          const hasAuthorNameHeading = textElements.some(
            (child) =>
              (child.name === 'h2' || child.name === 'h3') &&
              extractText(child).trim().toLowerCase() === authorName.toLowerCase(),
          );

          return (
            <div className="author-box bg-[#F8F9FF] border border-[#C8CEFB] rounded-[30px] p-8 md:p-12 my-12 flex flex-col items-start gap-8 md:flex-row md:gap-12">
              {actualImg && (
                <div className="relative top-0 mx-auto mt-0 h-32 w-32 flex-shrink-0 self-start overflow-hidden rounded-full border-4 border-white shadow-lg md:mx-0 md:h-48 md:w-48">
                  <PostImage
                    src={rewriteWordPressMediaUrl(actualImg.attribs.src)}
                    alt={actualImg.attribs.alt || "Author"}
                    fill
                    sizes="(max-width: 768px) 128px, 192px"
                    className="object-cover object-top"
                  />
                </div>
              )}
              <div className="flex-grow self-start text-center md:text-left">
                {!hasAuthorNameHeading && (
                  <h3 className="text-[#5F69AD] text-2xl md:text-3xl font-bold font-poppins mb-2">
                    {authorName}
                  </h3>
                )}
                {textElements.map((child: Element, idx: number) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const childAsAny = child as any;
                  if (childAsAny.name === 'h2' || childAsAny.name === 'h3') {
                    return (
                      <h3 key={idx} className="text-[#5F69AD] text-2xl md:text-3xl font-bold font-poppins mb-2">
                        {domToReact(childAsAny.children as DOMNode[], options)}
                      </h3>
                    );
                  }
                  return (
                    <p key={idx} className="text-[#5F69AD] text-lg md:text-xl font-medium font-montserrat leading-relaxed mb-4 last:mb-0">
                      {domToReact(childAsAny.children as DOMNode[], options)}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }

        // Handle Table of Contents
        if (className.includes('dt360-toc')) {
          const links = findRecursive(domNodeAsAny.children as DOMNode[], ['a']);
          
          return (
            <div className="blog-toc-panel bg-[#F8F9FF] rounded-[35px] p-8 md:p-12 my-12 max-w-full md:max-w-[75%] mx-auto">
              <h2 className="text-[#11104C] text-2xl md:text-3xl font-bold font-poppins mb-8">
                Table of Contents
              </h2>
              <nav>
                <ul className="space-y-4">
                  {links.map((link: Element, idx: number) => {
                    const text = extractText(link);
                    const tocHref = link.attribs.href;
                    const tocLinkProps = { className: BLOG_TOC_LINK_CLASS };

                    return (
                      <li key={idx} className="list-none">
                        {isInPageAnchorHref(tocHref) ? (
                          <a href={tocHref} {...tocLinkProps}>
                            {text}
                          </a>
                        ) : (
                          <Link href={tocHref || '#'} {...tocLinkProps}>
                            {text}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          );
        }

        // WP TOC panel without dt360-toc class — same lavender card layout
        if (
          domNodeAsAny.name === 'div' &&
          className.includes('bg-[#F8F9FF]') &&
          className.includes('rounded-[35px]') &&
          className.includes('md:max-w-[75%]')
        ) {
          return (
            <div className={cn(className, 'blog-toc-panel')}>
              {domToReact(domNodeAsAny.children as DOMNode[], options)}
            </div>
          );
        }

        // Handle specific classes/IDs for callouts/CTAs (primary CTA handled above via passthrough)
        const isCallout =
          className.includes('dt360-callout-') ||
          (className.includes('dt360-cta-') && !isCtaPrimaryElement(domNodeAsAny.attribs));
        const isCtaSecondary = className.includes('dt360-cta-secondary') || id === 'dt360-cta-secondary';

        if (isCallout || isCtaSecondary) {
          // Determine Background Style
          let containerClass = "bg-[#45108B]"; // Default Purple
          const containerStyle = {};
          let shortTextColor = "text-[#F0573A]"; // Default Highlight color
          
          if (isCtaSecondary) {
            containerClass = "bg-gradient-to-br from-[#E01B89] to-[#F0603C]";
          } else if (className.includes('warning')) {
            containerClass = "bg-[#F0573A]";
            shortTextColor = "text-white underline";
          } else if (className.includes('tip')) {
            containerClass = "bg-[#E6236D]";
            shortTextColor = "text-[#11104C]";
          } else if (className.includes('outline')) {
            containerClass = "bg-transparent border-4 border-[#45108B]";
            shortTextColor = "text-[#45108B]";
          }

          const content = (domNodeAsAny.children as DOMNode[]).map((child: DOMNode, idx: number) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const childAsAny = child as any;
            if (childAsAny.type === 'tag') {
              if (childAsAny.name === 'h2') {
                return (
                  <h2 key={idx} className="text-white text-2xl md:text-4xl font-bold font-poppins mb-4">
                    {domToReact(childAsAny.children as DOMNode[], options)}
                  </h2>
                );
              }
              if (childAsAny.name === 'p') {
                const text = extractText(childAsAny).trim();
                const isShort = text.length > 0 && text.length < 100;
                const pColor = className.includes('outline') ? 'text-[#11104C]' : 'text-white';
                
                const { alignClass, style: rawStyle } = wpElementPresentation(childAsAny.attribs);
                let childStyle = rawStyle;
                
                let pClasses = "";
                if (isCtaSecondary && isShort) {
                  pClasses = "text-[#F8C25D] text-2xl md:text-3xl lg:text-[36px] font-extrabold uppercase tracking-widest";
                  if (childStyle) {
                    childStyle = { ...childStyle };
                    delete childStyle.fontSize;
                    delete childStyle.fontWeight;
                    delete childStyle.letterSpacing;
                  }
                } else {
                  pClasses = isShort ? `${shortTextColor} text-xl md:text-2xl font-bold` : `${pColor} text-[18px] font-semibold`;
                  if (isCtaSecondary && !isShort) {
                    if (childStyle) {
                      childStyle = { ...childStyle };
                      delete childStyle.fontSize;
                      delete childStyle.fontWeight;
                      delete childStyle.color;
                    }
                  }
                }

                return (
                  <p
                    key={idx}
                    className={cn(
                      'font-montserrat leading-relaxed mb-4',
                      pClasses,
                      alignClass,
                    )}
                    style={childStyle}
                  >
                    {domToReact(childAsAny.children as DOMNode[], options)}
                  </p>
                );
              }
              if (childAsAny.name === 'a') {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { href, class: _class, style: _style, ...linkProps } = childAsAny.attribs || {};
                
                let btnClasses = "";
                if (isCtaSecondary) {
                  btnClasses = "bg-white !text-[#E01B89] !no-underline hover:bg-[#11104C] hover:!text-white";
                } else {
                  const btnBg = className.includes('cta-secondary') ? 'bg-[#45108B]' : 'bg-[#e3058d]';
                  btnClasses = `${btnBg} !text-white !no-underline hover:!text-white hover:opacity-90`;
                }

                return (
                  <div key={idx} className="mt-6">
                    <Link 
                      href={href || '#'} 
                      {...linkProps}
                      className={`${btnClasses} px-8 py-4 md:px-10 md:py-5 rounded-[15px] font-bold text-xl md:text-2xl transition-all hover:scale-105 shadow-lg font-montserrat inline-block`}
                    >
                      {domToReact(childAsAny.children as DOMNode[], options)}
                    </Link>
                  </div>
                );
              }
            }
            if (childAsAny.type === 'text' && childAsAny.data.trim()) {
              const textColor = className.includes('outline') ? 'text-[#11104C]' : 'text-white';
              return (
                <p key={idx} className={`${textColor} text-lg md:text-xl font-medium font-montserrat mb-4`}>
                  {childAsAny.data.trim()}
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
        if (domNodeAsAny.name === 'h2') {
          const text = extractText(domNodeAsAny);
          const generatedId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          const idToUse = domNodeAsAny.attribs?.id || generatedId;
          const { alignClass, style: headingStyle } = wpElementPresentationFromTree(domNodeAsAny);

          return (
            <h2
              id={idToUse}
              className={cn(
                'text-[#11104C] text-[32px] md:text-[48px] font-bold mb-8 mt-16 font-poppins scroll-mt-24',
                alignClass,
              )}
              style={headingStyle}
            >
              {domToReact(domNodeAsAny.children as DOMNode[], options)}
            </h2>
          );
        }
        if (domNodeAsAny.name === 'h3') {
          const text = extractText(domNodeAsAny);
          const generatedId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          const idToUse = domNodeAsAny.attribs?.id || generatedId;
          const { alignClass, style: headingStyle } = wpElementPresentationFromTree(domNodeAsAny);

          return (
            <h3
              id={idToUse}
              className={cn(
                'text-[#11104C] text-2xl md:text-4xl font-bold mb-6 mt-8 font-poppins scroll-mt-24',
                alignClass,
              )}
              style={headingStyle}
            >
              {domToReact(domNodeAsAny.children as DOMNode[], options)}
            </h3>
          );
        }

        // Handle Paragraphs
        if (domNodeAsAny.name === 'p') {
          // Check if parent is blockquote
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isInsideBlockquote = domNodeAsAny.parent && (domNodeAsAny.parent as any).name === 'blockquote';
          const { alignClass, style: paragraphStyle } = wpElementPresentationFromTree(domNodeAsAny);

          if (isInsideBlockquote) {
            return (
              <p
                className={cn('text-white leading-[1.5em] mb-0 font-montserrat font-semibold', alignClass)}
                style={paragraphStyle}
              >
                {domToReact(domNodeAsAny.children as DOMNode[], options)}
              </p>
            );
          }

          return (
            <p
              className={cn(BLOG_BODY_PARAGRAPH_CLASS, alignClass)}
              style={paragraphStyle}
            >
              {domToReact(domNodeAsAny.children as DOMNode[], options)}
            </p>
          );
        }

        // Handle Strong/B
        if (domNodeAsAny.name === 'strong' || domNodeAsAny.name === 'b') {
          return (
            <strong className="font-extrabold">
              {domToReact(domNodeAsAny.children as DOMNode[], options)}
            </strong>
          );
        }

        // Handle Links
        if (domNodeAsAny.name === 'a') {
          const attribs = domNodeAsAny.attribs || {};
          const { href, class: linkHtmlClass, style: linkStyle, ...restAttribs } = attribs;
          const children = domToReact(domNodeAsAny.children as DOMNode[], options);
          const anchorStyle = parseHtmlStyleAttribute(linkStyle);

          let isDraftBlogLink = false;
          try {
            if (href) {
              const url = new URL(href, 'https://deskteam360.com');
              const isInternal = getWordPressInternalHostnames().includes(url.hostname);
              if (isInternal) {
                const path = url.pathname.replace(/\/$/, '');
                const linkSlug = path.slice(1);
                
                // If it is a blog post URL, extract the slug and check against published posts
                if (linkSlug.startsWith('blog/')) {
                  const actualSlug = linkSlug.slice(5);
                  if (actualSlug && !publishedSlugs.includes(actualSlug)) {
                    isDraftBlogLink = true;
                  }
                } else {
                  const knownPages = ['about', 'services', 'contact', 'how-it-works', 'showcase', 'blog', 'book-a-call', 'demo-call-scheduled-thank-you', 'privacy-policy', 'terms-conditions', 'case-studies', 'affiliate-program', ''];
                  const isKnownPage = knownPages.includes(linkSlug) || linkSlug.startsWith('services/') || linkSlug.startsWith('showcase/');
                  if (linkSlug && !isKnownPage && !linkSlug.startsWith('wp-content/') && !publishedSlugs.includes(linkSlug)) {
                    isDraftBlogLink = true;
                  }
                }
              }
            }
          } catch {
            // invalid URL parsing ignored
          }

          if (isDraftBlogLink) {
            return (
              <a className={cn(linkHtmlClass, 'font-semibold cursor-text', isInsideBodyParagraph(domNodeAsAny) ? 'text-black' : '')} style={anchorStyle}>
                {children}
              </a>
            );
          }

          if (isFullVideoCtaHref(href) && !isInsideTocPanel(domNodeAsAny)) {
            return (
              <a
                href={href}
                {...restAttribs}
                className={BLOG_VIDEO_CTA_BUTTON_CLASS}
                style={anchorStyle}
              >
                {children}
              </a>
            );
          }

          const linkClass = cn(
            isInsideTocPanel(domNodeAsAny)
              ? BLOG_TOC_LINK_CLASS
              : isInsideBodyParagraph(domNodeAsAny)
                ? BLOG_BODY_LINK_CLASS
                : BLOG_INLINE_LINK_CLASS,
            isInsideTocPanel(domNodeAsAny) ? undefined : linkHtmlClass,
          );

          if (isInPageAnchorHref(href)) {
            return (
              <a
                href={href}
                {...restAttribs}
                className={linkClass}
                style={anchorStyle}
              >
                {children}
              </a>
            );
          }

          return (
            <Link href={href || '#'} {...restAttribs} className={linkClass} style={anchorStyle}>
              {children}
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
          <div className="flex flex-wrap gap-3 mb-6">
            {(post.categories && post.categories.length > 0 ? post.categories : [post.category]).map((cat) => (
              <div key={cat} className="inline-block bg-[#F0573A] text-white px-5 py-1.5 rounded-[15px] font-bold text-base md:text-lg uppercase">
                {cat}
              </div>
            ))}
          </div>

          <h1 className="text-[#11104C] text-3xl md:text-5xl lg:text-[63px] font-bold leading-tight mb-4 max-w-[1082px] font-poppins">
            {post.title}
          </h1>

          <p className="text-[#11104C] text-lg md:text-2xl font-medium italic mb-8 font-montserrat">
            By {post.author}   |    {formatDate(post.date)}
          </p>

          <div className="relative w-full aspect-[2/1] rounded-br-[50px] md:rounded-br-[100px] rounded-tl-[50px] md:rounded-tl-[100px] overflow-hidden bg-gray-100 mb-8 md:mb-12 shadow-2xl">
            <PostImage
              src={rewriteWordPressMediaUrl(post.image)}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1082px"
              className="object-cover"
            />
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/blog/blog-icon-website-design.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Rotated Decorative Image - Right Side */}
        <div className="absolute right-[-150px] top-[5%] w-[572px] h-[554px] pointer-events-none hidden xl:block z-[-1]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="rotate-[-42.51deg]">
              <div className="w-[542.557px] h-[254.598px] relative">
                <div className="absolute inset-0 opacity-50 overflow-hidden pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/blog/blog-decorative-image.png" alt="" className="absolute h-[264.83%] left-[-3.72%] max-w-none top-[-10.69%] w-[222.65%]" />
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
              .dynamic-prose [id] {
                scroll-margin-top: 7rem;
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
              .dynamic-prose a {
                color: black;
                text-decoration: underline;
              }
              .dynamic-prose a:hover {
                color: #E6236D;
              }
              .dynamic-prose p.blog-body-paragraph a,
              .dynamic-prose p[class*="leading-[1.9em]"] a {
                color: #fe652b;
              }
              .dynamic-prose p.blog-body-paragraph a:hover,
              .dynamic-prose p[class*="leading-[1.9em]"] a:hover {
                color: #fe652b;
                opacity: 0.8;
              }
              .dynamic-prose div[class*="leading-[1.9em]"] a {
                color: black;
              }
              .dynamic-prose div[class*="leading-[1.9em]"] a:hover {
                color: #E6236D;
                opacity: 1;
              }
              .dynamic-prose a.blog-video-cta-button {
                display: block !important;
                width: fit-content !important;
                max-width: 100% !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-top: 2rem !important;
                margin-bottom: 2rem !important;
                color: #fff !important;
                background-color: #F0573A !important;
                font-size: 18px !important;
                line-height: 1.9em !important;
                font-weight: 700 !important;
                text-decoration: none !important;
                text-align: center !important;
              }
              .dynamic-prose a.blog-video-cta-button:hover {
                color: #fff !important;
                background-color: #e04a2f !important;
                opacity: 1 !important;
              }
              .dynamic-prose .blog-toc-panel a,
              .dynamic-prose .dt360-toc a {
                color: #45108B !important;
                text-decoration: none !important;
              }
              .dynamic-prose .blog-toc-panel a:hover,
              .dynamic-prose .dt360-toc a:hover {
                color: #E6236D !important;
                opacity: 1 !important;
              }
              .dynamic-prose .author-box a,
              .dynamic-prose blockquote a {
                color: inherit;
              }
              /* WordPress primary CTA — let inline styles from CMS win over blog link defaults */
              .dynamic-prose .wp-cta-primary-passthrough a {
                color: unset;
                text-decoration: unset;
              }
              .dynamic-prose .wp-cta-primary-passthrough a:hover {
                color: unset;
                opacity: unset;
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
              .dynamic-prose .author-box img {
                margin: 0;
                border-radius: 0;
                width: 100%;
                height: 100%;
              }
              /* Force H2 styles to match reference exactly (skip WordPress CTA blocks) */
              .dynamic-prose h2:not(:is(.wp-cta-primary-passthrough *)) {
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
              /* WordPress block editor alignment (unparsed wrapper elements) */
              .dynamic-prose .has-text-align-center,
              .dynamic-prose [style*="text-align: center"],
              .dynamic-prose [style*="text-align:center"] {
                text-align: center !important;
              }
              .dynamic-prose .has-text-align-right,
              .dynamic-prose [style*="text-align: right"],
              .dynamic-prose [style*="text-align:right"] {
                text-align: right !important;
              }
              .dynamic-prose .has-text-align-left,
              .dynamic-prose [style*="text-align: left"],
              .dynamic-prose [style*="text-align:left"] {
                text-align: left !important;
              }
              .dynamic-prose .has-text-align-justify,
              .dynamic-prose [style*="text-align: justify"],
              .dynamic-prose [style*="text-align:justify"] {
                text-align: justify !important;
              }
              @media (max-width: 767px) {
                .dynamic-prose h2:not(:is(.wp-cta-primary-passthrough *)) {
                  font-size: 32px !important;
                }
              }
            `}} />
            
            {parse(rewriteWordPressContentHtml(post.content || ''), options)}
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
                    <PostImage
                      src={rewriteWordPressMediaUrl(related.image)}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover rounded-t-[25px]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {(related.categories && related.categories.length > 0 ? related.categories : [related.category]).map((cat) => (
                        <span key={cat} className={`text-white px-4 py-1 rounded-[15px] text-sm font-bold uppercase font-montserrat ${related.tagColor || 'bg-[#F0573A]'}`}>
                          {cat}
                        </span>
                      ))}
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
