import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'

const components = {
  Image
}

interface MdxProps {
  code: string
}
function runSync(code: string, options: any) {
  // eslint-disable-next-line no-new-func
  return new Function(String(code))(options)
}
const useMDXComponent = (code: string) => {
  const { default: Component } = runSync(code, { ...runtime } as any)
  return Component
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
