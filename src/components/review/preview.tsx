import Avatar from 'widgets/avatar'
import styles from 'sass/components/review/preview.module.scss'
import { cn } from 'lib/util'

export interface PreviewData {
  supplierId: number
  imgList: string[],
  profile: string,
  title: string,
  styleTypeList: {
    id: number,
    value: string,
  }[]
}

export default function Preview({ data } : { data: PreviewData }) {
  const {
    imgList, profile, title, styleTypeList,
  } = data || {}
  return (
    <figure className={styles.container}>
      <div
        className={cn(
          styles.imageContainer,
          // eslint-disable-next-line no-nested-ternary
          imgList?.length > 4 ? styles.x9 : imgList?.length > 1 ? styles.x4 : null,
        )}
      >
        {imgList?.map((img) => (
          <div key={img} className={styles.imageWrapper}>
            <img key={img} className={styles.image} src={img} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar src={profile} size={36} />
        </div>
        <div className={styles.title}>
          <span className={styles.caption}>{title}</span>
          <div className={styles.tagContainer}>
            {styleTypeList?.map(({ id, value }) => (
              <span key={id} className={styles.tag}>{`#${value}`}</span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  )
}
