import Link from 'next/link'
import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import styles from 'sass/components/chat/built-in-notice.module.scss'
import Child from './child'

export default function BuiltInNotice() {
  const { userType } = useAuth().user
  const { room } = useRoom()
  const { status } = room

  if (status === 1) {
    if (userType === 'D') {
      const href = `/pay/${room.id}`
      return (
        <Child
          bottom={(
            <Link href={href}>
              <a href={href} className={styles.button}>
                입금확인
              </a>
            </Link>
          )}
        >
          <span>카카오뱅크 서유빈 3333-20-4598971로 입금 후 입금자 이름을 알려주세요.</span>
        </Child>
      )
    }

    return (
      <Child>
        <span>결제 요청중</span>
      </Child>
    )
  }

  if (status === 2) {
    return <></>
  }

  if (status === 3) {
    return <></>
  }

  if (status === 4) {
    return <></>
  }

  return <></>
}
