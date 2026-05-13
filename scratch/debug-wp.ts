import { getPostBySlug } from '../lib/wordpress';

async function test() {
  const post = await getPostBySlug('automate-marketing-with-ai');
  console.log(post?.content?.substring(0, 2000));
}

test();
