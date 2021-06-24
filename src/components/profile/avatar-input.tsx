import styles from 'sass/components/profile/avatar-input.module.scss'
import Avatar from 'widgets/avatar'
import Icon from 'widgets/icon'

export default function AvatarInput({
  src,
  name,
} : {
  src: string,
  name: string,
}) {
  return (
    <section className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar src={src} size={96} />
        <button className={styles.input} type="button">
          <Icon src="camera.png" size={17} />
        </button>
      </div>
      <h2 className={styles.name}>{name}</h2>
    </section>
  )
}
