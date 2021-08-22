import styles from 'sass/components/chat/notice.module.scss'
import BuiltInNotice from './built-in'

export default function Notice() {
  return (
    <section className={styles.container}>
      <BuiltInNotice />
    </section>
  )
}
