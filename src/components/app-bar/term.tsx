import Icon from 'widgets/icon'
import Link from 'next/link'
import { setCookie } from 'lib/util/cookie'
import AppBar from '.'

export const DRAWER_SHOULD_BE_OPEN = 'ps-drawer-should-be-open'

export default function TermAppBar({
  title,
} : {
  title: string
}) {
  const onBack = () => {
    setCookie(DRAWER_SHOULD_BE_OPEN, 'true', 1000 * 30)
  }

  return (
    <AppBar
      title={title}
      back
      onBack={onBack}
      actions={[
        <Link key="exit" href="/">
          <a href="/">
            <Icon
              key="exit"
              src="exit.png"
              size={24}
            />
          </a>
        </Link>,
      ]}
    />
  )
}
