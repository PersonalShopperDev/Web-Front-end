import Link from 'next/link'
import { useAuth } from '../providers/authProvider'

export default function Login() {
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
      <p>{user.accessToken}</p>
      <button type="submit" onClick={signOut}>
        Sign Out
      </button>
      <Link href="/test">
        <a href="replace"><p>go to test</p></a>
      </Link>
      <Link href="/">
        <a href="replace"><p>go to index</p></a>
      </Link>
    </>
  )
}
