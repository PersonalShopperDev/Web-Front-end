import AvatarInput from 'components/profile/avatar-input'
import Link from 'next/link'
import { useProfile } from 'providers/profile'
import styles from 'sass/templates/profile/header.module.scss'

export interface HeaderData {
  name : string,
  email : string,
}

export default function ProfileHeader() {
  const { user, editable } = useProfile()
  const { name, email, userType } = user

  return (
    <section className={styles.container}>
      {editable && (
        <h1 className={styles.title}>My 프로필</h1>
      )}
      <div className={styles.inner}>
        <AvatarInput />
        <div className={styles.detail}>
          <div className={styles.row}>
            <h2 className={styles.name}>
              {name}
            </h2>
            {editable && (
              <Link href="/profile/info">
                <a href="/profile/info" className={styles.edit}>
                  편집
                </a>
              </Link>
            )}
          </div>
          <div className={styles.userType}>
            {user.userType === 'S' ? '스타일리스트' : '일반쇼퍼'}
          </div>
          <div className={styles.email}>
            {email || 'sdasd@asdas.dcom'}
          </div>
        </div>
      </div>
      {userType && (
        <div className={styles.stylistCounter}>
          <div className={styles.cell}>
            <div className={styles.property}>평점</div>
            <div>0</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.property}>리뷰</div>
            <div>0</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.property}>코디</div>
            <div>0</div>
          </div>
        </div>
      )}
    </section>
  )
}
