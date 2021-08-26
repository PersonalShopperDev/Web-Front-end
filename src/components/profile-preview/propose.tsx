import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import { useAlert } from 'providers/dialog/alert/inner'
import styles from 'sass/components/profile-preview/propose.module.scss'

export default function Propose({ id }: { id: string }) {
  const { createAlert } = useAlert()
  const router = useRouter()

  const onClick = async () => {
    const res = await communicate({
      url: '/chat',
      payload: {
        targetId: id,
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
      <div className={styles.buttonWrapper}>
        <button className={styles.button} type="button" onClick={onClick}>
          대화하기
        </button>
      </div>
    </section>
  )
}
