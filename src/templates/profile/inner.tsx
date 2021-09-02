import Hope from 'components/profile/hope'
import Introduction from 'components/profile/introduction'
import Phonenumber from 'components/profile/phonenumber'
import Divider from 'widgets/divider'
import styles from 'sass/templates/profile/inner.module.scss'

export default function ProfileInner() {
  return (
    <section className={styles.container}>
      <Introduction />
      <Divider />
      <Hope />
      <Divider />
      <Phonenumber />
    </section>
  )
}
