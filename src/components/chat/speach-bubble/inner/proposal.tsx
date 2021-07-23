import { useRoom } from 'providers/chat/room'
import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/proposal.module.scss'

export default function Proposal({
  id,
  children,
  price,
}: {
  id: number
  children: ReactNode
  price: number
}) {
  const { room } = useRoom()

  const response = (value: boolean) => {
    room.responseEstimate(id, value)
  }

  const resolve = () => response(true)

  const reject = () => response(false)

  return (
    <figure className={styles.container}>
      <h3 className={styles.caption}>코디견적 제안</h3>
      <p className={styles.content}>{children}</p>
      <div className={styles.priceWrapper}>
        <div className={styles.label}>코디가격</div>
        <div className={styles.price}>{`${price.toLocaleString('ko-KR')}원`}</div>
      </div>
      <p className={styles.notice}>
        코디를 제안 받으시려면 먼저 수락하기 버튼을 누르신 후 결제를
        진행해주세요.
      </p>
      <div className={styles.selection}>
        <button className={styles.resolve} type="button" onClick={resolve}>수락하기</button>
        <button className={styles.reject} type="button" onClick={reject}>거절하기</button>
      </div>
    </figure>
  )
}
