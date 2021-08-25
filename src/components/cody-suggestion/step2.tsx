import React from 'react'
import styles from 'sass/components/cody-step2.module.scss'
import Description from './description'

export default function Step2() {
  return (
    <>
      <span className={styles.title}>Step 2</span>
      <span className={styles.sub}>코디설명</span>
      <Description />
    </>
  )
}
