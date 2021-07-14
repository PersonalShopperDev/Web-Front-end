import { useState, useEffect } from 'react'
import StarRate from 'widgets/star-rate'
import styles from 'sass/components/review/satisfaction.module.scss'
import { useReviewEditor } from 'templates/review-editor'
import Section from './section'

export default function Satisfaction() {
  const [rate, setRate] = useState(3)

  const { dataRef } = useReviewEditor()

  useEffect(() => {
    dataRef.current.statisfaction = rate
  }, [rate])

  return (
    <Section
      head="코디에 대한 만족도"
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
