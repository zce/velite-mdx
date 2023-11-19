import { compile } from '@mdx-js/mdx'
import { s } from 'velite'

export const mdx = () => {
  return s.string().transform(async (value, ctx) => {
    const path = ctx.path[0] as string
    const file = await compile({ value, path }, { outputFormat: 'function-body', recmaPlugins: [] })
    return file.toString()
  })
}
