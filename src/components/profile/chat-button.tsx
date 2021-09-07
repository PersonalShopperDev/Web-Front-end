import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import { useAlert } from 'providers/dialog/alert/inner'
import styles from 'sass/components/profile/chat-button.module.scss'

export default function ProfileChatButton({ userId } : { userId: number}) {
  const router = useRouter()

  const { createAlert } = useAlert()

  const onClick = async () => {
    const res = await communicate({
      url: '/chat',
      payload: {
        targetId: userId,
      },
      method: 'POST',
    })

    if (res.status !== 200) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    const { roomId } = await res.json()

    router.push(`/chat/${roomId}`)
  }

  return (
    <section className={styles.container}>
      <div className={styles.recommend}>
        <p>대화 먼저 시작해 보세요!</p>
      </div>
      <button className={styles.button} type="button" onClick={onClick}>
        채팅하기
      </button>
    </section>
  )
}
