/* eslint-disable react/no-danger */
import React from 'react'
import styles from 'sass/components/notice.module.scss'
import { NoticeData } from 'pages/notice/[id]'

export default function Notice({
  data,
}: {
  data: NoticeData
}) {
  const { title, date, content } = data
  return (
    <div className={styles.container} id="NOTICE">
      <span className={styles.title}>{title}</span>
      <span className={styles.date}>{date}</span>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
