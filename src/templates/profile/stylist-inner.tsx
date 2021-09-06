import Account from 'components/profile/account'
import CodyStyle from 'components/profile/cody-style'
import Introduction from 'components/profile/introduction'
import Represent from 'components/profile/represents'
import Divider from 'widgets/divider'
import styles from 'sass/templates/profile/inner.module.scss'
import { useProfile } from 'providers/profile'
import Price from 'components/profile/price'

export default function ProfileStylistInner() {
  const { editable } = useProfile()

  return (
    <section className={styles.container}>
      <Introduction />
      <Divider />
      <CodyStyle />
      <Divider />
      <Represent />
      {editable && (
        <>
          <Divider />
          <Account />
        </>
      )}
      <Divider />
      <Price />
    </section>
  )
}
