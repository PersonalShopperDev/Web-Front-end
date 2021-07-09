import Modal from 'components/modal'
import Drawer from 'components/drawer'
import styles from 'sass/components/drawer.module.scss'
import { useAuth } from 'providers/auth'
import { useRouter } from 'next/router'
import Avatar from './avatar'

export default function DrawerHandle() {
  const { user } = useAuth()
  const router = useRouter()

  const { drawer } = router.query

  if (!user) {
    return <Avatar />
  }

  return (
    <Modal
      className={styles.container}
      initializer={<Avatar />}
      immediate={drawer === 'open'}
      transition={{
        default: {
          transform: 'translateX(100%)',
        },
        onActive: {
          transform: 'translateX(0%)',
          duration: 500,
        },
        onInactive: {
          transform: 'translateX(100%)',
          duration: 500,
        },
      }}
    >
      <Drawer />
    </Modal>
  )
}
