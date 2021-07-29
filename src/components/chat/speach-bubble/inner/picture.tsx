import { cn } from 'lib/util'
import styles from 'sass/components/chat/speach-bubble/inner/picture.module.scss'

export default function PictureMessage({
  src,
  className,
} : {
  src: string,
  className: string,
}) {
  return (
    <div className={cn(className, styles.container)}>
      <img src={src} alt="" className={styles.image} />
    </div>
  )
}
