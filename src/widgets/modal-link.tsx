import { useModalProvider } from 'providers/modal'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useModal } from 'components/modal'

export default function ModalLink({
  className,
  href,
  children,
}: {
  className?: string
  href: string
  children: ReactNode
}) {
  const { update } = useModalProvider()
  const { close } = useModal()

  const onClick = () => {
    close()
    update(false, 0)
  }

  return (
    <Link href={href}>
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
}

ModalLink.defaultProps = {
  className: null,
}
