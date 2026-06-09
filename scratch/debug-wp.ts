import * as fs from 'fs';

// Parse .env.local manually before importing wordpress lib
if (fs.existsSync('.env.local')) {
  const envLocal = fs.readFileSync('.env.local', 'utf-8');
  envLocal.split('\n').forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith('#')) return;
    const [key, ...valueParts] = cleanLine.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
}

// Use dynamic import or require to ensure process.env is set first
async function test() {
  const { getPostBySlug } = await import('../lib/wordpress');
  const post = await getPostBySlug('ai-for-marketing-agencies-2');
  if (post) {
    fs.writeFileSync('scratch/post-content.html', post.content || '');
    console.log('Post content saved to scratch/post-content.html');
  } else {
    console.log('Post not found');
  }
}

test();
