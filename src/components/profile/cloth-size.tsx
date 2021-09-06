import React from 'react'
import Size from 'components/information/size'
import styles from 'sass/components/profile-edit-section.module.scss'
import { useHeader } from './header'

export default function ClothSize() {
  const { isEdit } = useHeader()
  return (
    <div className={styles.container}>
      <Size isEdit={isEdit} />
    </div>
  )
}
