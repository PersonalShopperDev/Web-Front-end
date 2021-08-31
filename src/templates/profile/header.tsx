import AvatarInput from 'components/profile/avatar-input'
import { useAuth } from 'providers/auth'
import styles from 'sass/templates/profile/header.module.scss'

export interface HeaderData {
  name : string,
  email : string,
}

export default function ProfileHeader() {
  const { user } = useAuth()

  const { name, email } = user

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>My 프로필</h1>
      <div className={styles.inner}>
        <AvatarInput />
        <div className={styles.detail}>
          <div className={styles.row}>
            <h2 className={styles.name}>
              {name}
            </h2>
          </div>
          <div className={styles.userType}>
            {user.userType === 'S' ? '스타일리스트' : '일반쇼퍼'}
          </div>
          <div className={styles.email}>
            {email || 'sdasd@asdas.dcom'}
          </div>
        </div>
      </div>
    </section>
  )
}
