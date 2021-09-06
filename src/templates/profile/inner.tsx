import Hope from 'components/profile/hope'
import Introduction from 'components/profile/introduction'
import Phonenumber from 'components/profile/phonenumber'
import Divider from 'widgets/divider'
import styles from 'sass/templates/profile/inner.module.scss'
import { useProfile } from 'providers/profile'

export default function ProfileInner() {
  const { editable } = useProfile()
  return (
    <section className={styles.container}>
      <Introduction />
      <Divider />
      <Hope />
      {editable && (
        <>
          <Divider />
          <Phonenumber />
        </>
      )}
    </section>
  )
}
