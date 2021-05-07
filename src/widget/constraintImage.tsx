import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from 'sass/widget/constraintImage.module.scss'

interface Props {
  src: string
  className?: string
  objectFit? : NonNullable<JSX.IntrinsicElements['img']['style']>['objectFit']
}

interface WithWidth extends Props { width: string | number }
interface WithHeight extends Props { height: string | number }

export default function ContraintImage({
  src, className, objectFit, ...props
}: Props & (WithWidth | WithHeight)) {
  const processProperty = (): {imageStyle : string, style : CSSProperties} => {
    if ('width' in props && 'height' in props) {
      const { width, height } = props
      return {
        imageStyle: styles.imageDefault,
        style: {
          width,
          height,
        },
      }
    }
    if ('width' in props) {
      const { width } = props
      return {
        imageStyle: styles.imageByWidth,
        style: { width },
      }
    }
    if ('height' in props) {
      const { height } = props
      return {
        imageStyle: styles.imageByHeight,
        style: { height },
      }
    }
    return null
  }

  const { imageStyle, style } = processProperty()

  return (
    <div className={`${imageStyle} ${className}`} style={style}>
      <Image src={src} layout="fill" objectFit={objectFit} />
    </div>
  )
}

ContraintImage.defaultProps = {
  objectFit: 'cover',
  className: null,
}
