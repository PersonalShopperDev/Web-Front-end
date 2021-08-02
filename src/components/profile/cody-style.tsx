import styles from 'sass/components/profile/cody-style.module.scss'
import Link from 'next/link'
import Icon from 'widgets/icon'
import { useAuth } from 'providers/auth'
import Section from './section'

interface StyleData {
  styles: string[]
}

export default function CodyStyle({
  label,
  data,
}: {
  label: string
  data: StyleData
}) {
  const { user } = useAuth()

  const { styles: styleList } = user || data || {}

  return (
    <Section
      head={label}
      action={
        (
          <Link href="/profile/information/style">
            <a href="/profile/information/style">
              <Icon src="edit.png" size={17} />
            </a>
          </Link>
        )
      }
    >
      {styleList && styleList.length > 0 && (
        <section className={styles.container}>
          {styleList.map((value) => (
            <div key={value} className={styles.style}>
              {value}
            </div>
          ))}
        </section>
      )}
    </Section>
  )
}
