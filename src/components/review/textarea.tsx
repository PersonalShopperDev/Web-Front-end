import styles from 'sass/components/review/textarea.module.scss'
import Section from './section'

export default function Textarea() {
  return (
    <Section
      head="코디에 대해 리뷰 남기기"
    >
      <textarea className={styles.container} placeholder="리뷰를 작성해 보세요." />
    </Section>
  )
}
