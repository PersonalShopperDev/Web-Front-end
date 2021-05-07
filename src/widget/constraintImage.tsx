import Image from 'next/image'
import styles from 'sass/widget/constraintImage.module.scss'

export default function ContraintImage({
  src,
  width,
  className,
}: {
  src: string
  width: string | number
  className? : string
}) {
  return (
    <figure className={`${styles.container} ${className}`} style={{ width }}>
      <Image src={src} layout="fill" objectFit="cover" />
    </figure>
  )
}

ContraintImage.defaultProps = {
  className: null,
}
