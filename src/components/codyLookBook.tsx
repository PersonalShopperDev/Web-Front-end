import styles from 'sass/components/codyLookBook.module.scss'
import Image from 'next/image'

export default function CodyLookBook({
  cody,
} : {
  cody : Array<string>,
}) {
  return (
    <div className={styles.container}>
      <div>
        {cody.map((item) => (
          <Image src={item} width="104" height="104" className={styles.clothImage} />
        ))}
      </div>
    </div>
  )
}
