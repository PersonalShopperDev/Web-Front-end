import Modal from 'components/modal'
import Drawer from 'components/drawer'
import styles from 'sass/components/drawer.module.scss'
import { useAuth } from 'providers/auth'
import { useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'lib/util/cookie'
import { DRAWER_SHOULD_BE_OPEN } from './term'
import Avatar from './avatar'

export default function DrawerHandle() {
  const { user } = useAuth()
  const [shouldOpen, setShouldOpen] = useState<boolean>(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const drawerShouldBeOpen = getCookie(DRAWER_SHOULD_BE_OPEN)
    if (drawerShouldBeOpen) {
      setShouldOpen(true)
      deleteCookie(DRAWER_SHOULD_BE_OPEN)
    }
    setLoad(true)
  }, [])

  if (!load || !user) {
    return <Avatar />
  }

  return (
    <Modal
      className={styles.container}
      initializer={<Avatar />}
      immediate={shouldOpen}
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
