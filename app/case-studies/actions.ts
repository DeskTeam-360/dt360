"use server";

import { getCaseStudyPosts, CaseStudyPageData } from "@/lib/wordpress";

export async function loadMoreCaseStudies(after: string): Promise<CaseStudyPageData> {
  return getCaseStudyPosts(9, after);
}
