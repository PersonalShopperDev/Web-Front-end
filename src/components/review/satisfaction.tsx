import { useState } from 'react'
import StarRate from 'widgets/star-rate'
import styles from 'sass/components/review/satisfaction.module.scss'
import Section from './section'

export default function Satisfaction() {
  const [rate, setRate] = useState(3)

  return (
    <Section
      head="코디에 대한만족도"
    >
      <StarRate
        className={styles.container}
        value={rate}
        setValue={setRate}
        size={22}
        gap={7}
      />
    </Section>
  )
}
