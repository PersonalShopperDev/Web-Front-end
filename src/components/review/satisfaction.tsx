import { useState } from 'react'
import StartRate from 'widgets/start-rate'
import styles from 'sass/components/review/satisfaction.module.scss'
import Section from './section'

export default function Satisfaction() {
  const [rate, setRate] = useState(3)

  return (
    <Section
      head="코디에 대한만족도"
    >
      <StartRate
        className={styles.container}
        value={rate}
        setValue={setRate}
        size={22}
        gap={7}
      />
    </Section>
  )
}
