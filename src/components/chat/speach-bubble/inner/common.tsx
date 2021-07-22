import { ReactNode } from 'react'

export default function CommonMessage({
  children,
  className,
} : {
  children: ReactNode,
  className: string,
}) {
  return <p className={className}>{children}</p>
}
