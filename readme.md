# Next.js + Velite

A template with Next.js 13 app dir, [Velite](https://github.com/zce/velite), Tailwind CSS and dark mode.

## MDX Bundle

```typescript
import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { globalExternals } from '@fal-works/esbuild-plugin-global-externals'
import mdxPlugin from '@mdx-js/esbuild'
import { build } from 'esbuild'

import type { Plugin } from 'esbuild'

const compileMdx = async (source: string): Promise<string> => {
  const virtualSourse: Plugin = {
    name: 'virtual-source',
    setup: build => {
      build.onResolve({ filter: /^__faker_entry/ }, args => {
        return {
          path: join(args.resolveDir, args.path),
          pluginData: { contents: source } // for mdxPlugin
        }
      })
    }
  }

  const bundled = await build({
    entryPoints: [`__faker_entry.mdx`],
    absWorkingDir: resolve('content'),
    write: false,
    bundle: true,
    target: 'node18',
    format: 'esm',
    globalName: 'VELITE_MDX_COMPONENT',
    treeShaking: true,
    // minify: true,
    plugins: [
      virtualSourse,
      mdxPlugin({}),
      globalExternals({
        react: {
          varName: 'React',
          type: 'cjs'
        },
        'react-dom': {
          varName: 'ReactDOM',
          type: 'cjs'
        },
        'react/jsx-runtime': {
          varName: '_jsx_runtime',
          type: 'cjs'
        }
      })
    ]
  })

  return bundled.outputFiles[0].text.replace('var VELITE_MDX_COMPONENT=', 'return ')
}
```
