import Avatar from 'widgets/avatar'
import styles from 'sass/components/review/preview.module.scss'

export interface PreviewData {
  supplierId: number
  img: string,
  profile: string,
  title: string,
  styleTypeList: {
    id: number,
    value: string,
  }[]
}

export default function Preview({ data } : { data: PreviewData }) {
  const {
    img, profile, title, styleTypeList,
  } = data || {}
  return (
    <figure className={styles.container}>
      <img className={styles.image} src={img} alt="" />
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
