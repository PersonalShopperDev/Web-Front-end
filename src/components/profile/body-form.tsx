import React from 'react'
import Body from 'components/information/body'
import styles from 'sass/components/profile-edit-section.module.scss'
import { useHeader } from './header'

export default function BodyForm() {
  const { isEdit } = useHeader()
  return (
    <div className={styles.container}>
      <Body isEdit={isEdit} />
    </div>
  )
}
