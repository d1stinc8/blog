const fs = require('fs')
const path = require('path')

function getAllPosts(directory = './posts') {
  const posts = []

  try {
    const files = fs.readdirSync(directory)

    files.forEach(file => {
      if (path.extname(file) === '.html') {
        posts.push({
          filename: file,
          path: path.join(directory, file),
          title: file.replace('.html', '')
        })
      }
    })

    return posts
  } catch (error) {
    console.error('Error reading posts directory', error)
    return []
  }
}

const posts = getAllPosts()
posts.forEach(post => {
  console.log(`Title: ${post.title}`)
  console.log(`Path: ${post.path}`)
  console.log(`---`)
})

