import Icon from 'widgets/icon'
import Link from 'next/link'
import AppBar from '.'

export default function TermAppBar({
  title,
} : {
  title: string
}) {
  return (
    <AppBar
      title={title}
      back
      backUrl="/?drawer=open"
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
