import styles from '../../sass/templates/stylistProfile.module.scss'
import Header from '../components/stylistProfileHeader'
import { StylistInfo } from '../components/stylist'
import StylistSimple from '../components/stylistSimple'
import StylistDetail from '../components/stylistDetail'

export default function StylistProfile({ info } : { info : StylistInfo }) {
  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <Header />
        <StylistSimple info={info} />
      </div>
      <StylistDetail info={info} />
    </section>
  )
}
