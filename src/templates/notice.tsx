import React, { useEffect } from 'react'
import styles from 'sass/templates/notice.module.scss'
import { useRouter } from 'next/router'
import { useNotice } from 'providers/notice'
import { useInfinityScroll } from 'providers/infinity-scroll'
import Link from 'next/link'

export default function Notice() {
  const { noticeLists, fetchNoticeData } = useNotice()
  const { setOnScrollFunc } = useInfinityScroll()
  const router = useRouter()
  const onClickNotice = (id) => {
    // router.push({ pathname: `/notice/${id}`, query: { notice: JSON.stringify(noticeLists.filter((notice) => notice.id === id)[0]) } })
  }
  useEffect(() => {
    setOnScrollFunc(fetchNoticeData)
  }, [])
  return (
    <div className={styles.container}>
      {noticeLists.map(({
        id, title, date,
      }) => (
        <div key={id}>
          <span className={styles.date}>{date.substr(0, 10)}</span>
          <Link href={`/notice/${id}`}>
            <a href={`/notice/${id}`}>
              <button type="button" className={styles.btn} onClick={() => onClickNotice(id)}>
                <span className={styles.content}>{title}</span>
              </button>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
