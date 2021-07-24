import React from 'react'
import DemanderBox from 'components/demander-box'
import styles from 'sass/components/list-box.module.scss'
import { useUserList } from 'providers/user-list'

export default function Demander() {
  const { userLists } = useUserList()

  return (
    <div className={styles.container}>
      { userLists.map((value) => (
        <DemanderBox info={value} key={value.id} />
      ))}
    </div>
  )
}
