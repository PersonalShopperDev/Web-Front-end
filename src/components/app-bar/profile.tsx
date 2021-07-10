import { getCookie } from 'lib/util/cookie'
import parseJwt from 'lib/util/jwt'
import Link from 'next/dist/client/link'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import { useEffect, useState } from 'react'
import styles from 'sass/components/profile-app-bar.module.scss'
import AppBar from '.'

export default function ProfileAppBar() {
  const { user } = useAuth()
  const [id, setId] = useState()

  const previewLink = user?.userType === 'S' ? `/stylist/profile/${id}` : '/profile/preview'

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN)
    const { userId } = parseJwt(token)
    setId(userId)
  }, [])

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
