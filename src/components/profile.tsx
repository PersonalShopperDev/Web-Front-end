import Link from 'next/link'
import { useAuth } from '../providers/authProvider'

export default function Profile() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <>
        <Link href="/login">
          <a href="replace">로그인</a>
        </Link>
      </>
    )
  }

  return (
    <>
      <p>{user.token}</p>
      <button type="submit" onClick={signOut}>
        Sign Out
      </button>
    </>
  )
}
