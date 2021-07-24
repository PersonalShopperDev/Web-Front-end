import React from 'react'
import StylistBox from 'components/stylist-box'
import { useUserList } from 'providers/user-list'
import styles from 'sass/components/list-box.module.scss'

export default function Supplier() {
  const { userLists } = useUserList()

  return (
    <div className={styles.container}>
      { userLists.map((value) => (
        <StylistBox info={value} key={value.id} />
      ))}
    </div>
  )
}
