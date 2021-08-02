import Icon from 'widgets/icon'
import Link from 'next/link'
import AppBar from '.'

export default function SubProfileAppBar({
  title,
} : {
  title: string
}) {
  return (
    <AppBar
      title={title}
      back
      actions={[
        <Link key="close" href="/profile">
          <a href="/profile">
            <Icon src="close-back.png" size={24} />
          </a>
        </Link>,
      ]}
    />
  )
}
