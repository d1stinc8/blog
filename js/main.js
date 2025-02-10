// main.js
async function fetchPosts() {
  const postsDirectory = 'posts';

  try {
    // First, fetch the posts directory listing
    const response = await fetch(`https://api.github.com/repos/d1stinc8/blog/contents/${postsDirectory}`);
    const files = await response.json();

    // Filter HTML files and create posts list
    const posts = files
      .filter(file => file.name.endsWith('.html'))
      .map(file => ({
        title: file.name.replace('.html', ''),
        path: file.path,
        url: file.download_url
      }));

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById('posts-list');

  const postsList = posts.map(post => `
        <article>
            <h2><a href="posts/${post.title}.html">${post.title}</a></h2>
        </article>
    `).join('');

  postsContainer.innerHTML = postsList;
}

// Initialize the blog
async function initBlog() {
  const posts = await fetchPosts();
  displayPosts(posts);
}

// Call when page loads
document.addEventListener('DOMContentLoaded', initBlog);
