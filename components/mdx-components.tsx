import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'
import { run, runSync } from '@mdx-js/mdx'

const components = {
  Image
}

interface MdxProps {
  code: string
}

const useMDXComponent = (code: string) => {
  const { default: Component } = runSync(code, { ...runtime } as any)
  return Component
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
