import Modal from 'components/modal'
import Drawer from 'components/drawer'
import styles from 'sass/components/drawer.module.scss'
import Avatar from './avatar'

export default function DrawerHandle() {
  return (
    <Modal
      className={styles.container}
      initializer={<Avatar />}
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
