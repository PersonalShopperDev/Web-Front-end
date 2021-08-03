import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import AppBar from '.'

export default function IntroAppBar() {
  const router = useRouter()

  const onExit = () => {
    router.back()
  }

  return (
    <AppBar
      title="서비스 소개"
      actions={[
        <button key="button" type="button" onClick={onExit}>
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
