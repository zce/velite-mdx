import { defineConfig, s } from 'velite'

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const icon = s.enum(['github', 'instagram', 'medium', 'twitter', 'youtube'])
const count = s.object({ total: s.number(), posts: s.number() }).default({ total: 0, posts: 0 })

const meta = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    keywords: s.array(s.string()).optional()
  })
  .default({})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    static: 'public',
    filename: '/static/[name]-[hash:6].[ext]'
  },
  clean: true,
  verbose: false,
  schemas: {
    pages: {
      name: 'Page',
      pattern: 'pages/**/*.mdx',
      fields: s.object({
        title: s.string().max(99),
        slug: s.slug(),
        description: s.string(),
        code: s.mdx()
      })
    },
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      fields: s.object({
        title: s.string().max(99),
        slug: s.slug(),
        description: s.string(),
        date: s.isodate(),
        code: s.mdx()
      })
    }
  }
})
