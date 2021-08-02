import Section from 'components/profile/section'
import styles from 'sass/components/profile-preview/description.module.scss'

export default function Description({ head, content } : { head : string, content: string }) {
  return (
    <Section
      head={head}
    >
      <p className={styles.paragraph}>{content}</p>
    </Section>
  )
}
