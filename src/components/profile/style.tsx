import React from 'react'
import StyleText from 'components/information/style-text'
import styles from 'sass/components/profile-edit-section.module.scss'
import { useHeader } from './header'

export default function Style() {
  const { isEdit } = useHeader()
  return (
    <div className={styles.container}>
      <StyleText isEdit={isEdit} />
    </div>
  )
}
