import styles from 'sass/components/profile/cody-style.module.scss'
import { useProfile } from 'providers/profile'
import StatefulSection from './stateful-section'

export default function CodyStyle() {
  return (
    <StatefulSection head="자신있는 패션스타일">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const { user } = useProfile()
  const { styles: styleList } = user
  return (
    <section>
      {styleList && styleList.length > 0 && (
        <section className={styles.container}>
          {styleList.map((value) => (
            <div key={value} className={styles.style}>
              {value}
            </div>
          ))}
        </section>
      )}
    </section>
  )
}
