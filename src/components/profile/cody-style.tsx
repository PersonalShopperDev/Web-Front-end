import styles from 'sass/components/profile/cody-style.module.scss'
import Link from 'next/link'
import Icon from 'widgets/icon'
import Section from './section'

interface StyleData {
  male: Style[],
  female: Style[],
}

interface Style {
  id: number
  value: string
}

export default function CodyStyle({
  data = {
    male: [{ id: 0, value: '뭐' }, { id: 1, value: '아니' }, { id: 2, value: '야리ㄹ리' }],
    female: null,
  },
}: {
  data: StyleData
}) {
  const { male, female } = data

  const mapping = ({ value }) => (
    <div key={value} className={styles.style}>
      {value}
    </div>
  )

  return (
    <Section
      head="자신있는 코디 스타일"
      action={(
        <Link href="/profile/style-select">
          <a href="/profile/style-select">
            <Icon src="edit.png" size={17} />
          </a>
        </Link>
      )}
    >
      <section className={styles.container}>
        {male?.map(mapping)}
        {female?.map(mapping)}
      </section>
    </Section>
  )
}
