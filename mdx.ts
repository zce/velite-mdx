import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import { s } from 'velite'

import type { PluggableList } from 'unified'

export interface MdxOptions {
  /**
   * Enable GitHub Flavored Markdown (GFM).
   * @default true
   */
  gfm?: boolean
  /**
   * Remove html comments.
   * @default true
   */
  removeComments?: boolean
  /**
   * Flatten image paragraph.
   * @default true
   */
  flattenImage?: boolean
  /**
   * Remark plugins.
   */
  remarkPlugins?: PluggableList
  /**
   * Rehype plugins.
   */
  rehypePlugins?: PluggableList
}

export const mdx = ({ gfm = true, removeComments = true, flattenImage = true, remarkPlugins = [], rehypePlugins = [] }: MdxOptions = {}) => {
  if (gfm) remarkPlugins.push(remarkGfm)
  // if (removeComments) remarkPlugins.push(remarkRemoveComments)
  // if (flattenImage) remarkPlugins.push(remarkFlattenImage)
  return s.string().transform(async (value, ctx) => {
    const path = ctx.path[0] as string
    const file = await compile({ value, path }, { outputFormat: 'function-body', remarkPlugins, rehypePlugins })
    return file.toString()
  })
}
