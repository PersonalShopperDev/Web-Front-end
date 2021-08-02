import Link from 'next/dist/client/link'
import { useAuth } from 'providers/auth'
import styles from 'sass/components/profile-app-bar.module.scss'
import AppBar from '.'

export default function ProfileAppBar() {
  const { user } = useAuth()

  const { userId } = user

  const previewLink = `/profile/${userId}`

  return (
    <AppBar
      title="프로필"
      actions={[
        <Link key="preview" href={previewLink}>
          <a className={styles.preview} href={previewLink}>
            미리보기
          </a>
        </Link>,
      ]}
    />
  )
}
