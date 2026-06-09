/* eslint-disable */
const { GraphQLClient, gql } = require('graphql-request');

const API_URL = 'https://clone.deskteam360.com/endpoint';

const client = new GraphQLClient(API_URL);

async function run() {
  const query = gql`
    query GetSlugs {
      posts(first: 300, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `;
  try {
    const data = await client.request(query);
    console.log(data.posts.nodes.map(n => n.slug).slice(0, 5));
  } catch (err) {
    console.error(err.message);
  }
}

run();
