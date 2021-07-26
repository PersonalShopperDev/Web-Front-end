import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import AppBar from '.'

export default function ProgressAppBar() {
  const router = useRouter()

  const onExit = () => {
    router.back()
  }

  return (
    <AppBar
      title="진행사항"
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
