import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    static: 'public',
    filename: '/static/[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    pages: {
      name: 'Page',
      pattern: 'pages/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.slug(),
        description: s.string(),
        code: s.mdx()
      })
    },
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        slug: s.slug(),
        description: s.string(),
        date: s.isodate(),
        code: s.mdx()
      })
    }
  }
})
