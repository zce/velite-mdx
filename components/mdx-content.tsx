import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'

const components = {
  Image
}

interface MdxProps {
  code: string
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
