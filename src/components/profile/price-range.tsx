import React from 'react'
import Price from 'components/information/price'
import styles from 'sass/components/profile-edit-section.module.scss'
import { useHeader } from './header'

export default function PriceRange() {
  const { isEdit } = useHeader()
  return (
    <div className={styles.container}>
      <Price isEdit={isEdit} />
    </div>
  )
}
