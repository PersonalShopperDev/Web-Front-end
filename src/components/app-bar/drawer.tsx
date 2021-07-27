import Icon from 'widgets/icon'
import { setCookie } from 'lib/util/cookie'
import { useRouter } from 'next/router'
import AppBar from '.'

export const DRAWER_SHOULD_BE_OPEN = 'ps-drawer-should-be-open'

export default function DrawerAppBar({
  title,
  isLogined,
} : {
  title: string
  isLogined : boolean,
}) {
  const router = useRouter()

  const onBack = () => {
    setCookie(DRAWER_SHOULD_BE_OPEN, 'true', 1000 * 30)
  }

  const onExit = () => {
    router.back()
  }

  return (
    <AppBar
      title={title}
      back={isLogined}
      onBack={onBack}
      actions={[
        <button type="button" onClick={onExit}>
          <Icon
            key="exit"
            src="exit.png"
            size={24}
          />
        </button>,
      ]}
    />
  )
}
