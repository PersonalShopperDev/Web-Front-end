import Link from 'next/dist/client/link'
import styles from 'sass/components/profile-app-bar.module.scss'
import AppBar from '.'

export default function ProfileAppBar() {
  return (
    <AppBar
      title="프로필"
      actions={[
        <Link key="preview" href="/profile/preview">
          <a className={styles.preview} href="/profile/preview">
            미리보기
          </a>
        </Link>,
      ]}
    />
  )
}
