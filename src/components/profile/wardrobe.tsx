import HorizontalList from 'components/horizontal-list'
import styles from 'sass/components/profile/wardrobe.module.scss'
import Icon from 'widgets/icon'
import Section from './section'

export default function Wardrobe() {
  const images = ['/a', '/b', '/c', '/d', '/e', '/f']

  return (
    <Section
      head="내 옷장"
      action={(
        <button className={styles.button} type="button">
          <Icon src="add.png" size={14} />
        </button>
      )}
    >
      <HorizontalList
        className={styles.container}
        gap={12}
      >
        {images.map((value) => (
          <img
            key={value}
            className={styles.figure}
            src={value}
            alt=""
            draggable="false"
          />
        ))}
      </HorizontalList>
    </Section>
  )
}
