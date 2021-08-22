import styles from 'sass/components/chat/notice.module.scss'
import Child from './child'

export default function Notice({ status }: { status: number }) {
  return (
    <section className={styles.container}>
      <Child>
        <b>안내:&nbsp;</b>
        <span>결제 요청중</span>
      </Child>
    </section>
  )
}
