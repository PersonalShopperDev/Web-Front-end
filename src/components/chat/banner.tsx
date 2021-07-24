import styles from 'sass/components/chat/banner.module.scss'

export default function ChatBanner({
  src,
} : {
  src: string
}) {
  return (
    <section className={styles.container}>
      <img src={src} alt="" />
    </section>
  )
}
