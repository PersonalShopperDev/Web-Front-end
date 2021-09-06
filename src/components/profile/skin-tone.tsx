import React from 'react'
import Skin from 'components/information/skin'
import styles from 'sass/components/profile-edit-section.module.scss'
import { useHeader } from './header'

export default function SkinTone() {
  const { isEdit } = useHeader()
  return (
    <div className={styles.container}>
      <Skin isEdit={isEdit} />
    </div>
  )
}
