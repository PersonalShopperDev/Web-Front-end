import { ReactNode } from 'react'
import styles from 'sass/components/chat/speach-bubble/inner/proposal.module.scss'

export default function Proposal({
  children,
  price,
  owner,
}: {
  children: ReactNode
  price: number
  owner: 'mine' | 'yours'
}) {
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
        <button className={styles.resolve} type="button">수락하기</button>
        <button className={styles.reject} type="button">거절하기</button>
      </div>
    </figure>
  )
}
