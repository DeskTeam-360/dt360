/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient, gql } from 'graphql-request';

const API_URL = 'https://clone.deskteam360.com/endpoint';
const auth = Buffer.from('devteamsetup:mhh9 fuj7 Nepl f2Lu fpHX U8ol').toString('base64');
const client = new GraphQLClient(API_URL, {
  headers: { Authorization: `Basic ${auth}` },
});

type ScratchPostsQuery = {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor?: string | null };
    nodes: Array<{ id: string }>;
  };
};

async function test() {
  const query = gql`
    query GetAllBlogData {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
        }
      }
    }
  `;

  try {
    const data = await client.request<ScratchPostsQuery>(query);
    console.log(`Has next page: ${data.posts.pageInfo.hasNextPage}`);
    console.log(`Returned nodes: ${data.posts.nodes.length}`);
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : error);
  }
}

test();
