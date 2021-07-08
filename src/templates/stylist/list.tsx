import React, { useEffect } from 'react'
import styles from 'sass/templates/stylist/list.module.scss'
import ListBox from 'src/components/list-box'
import { useUserList } from 'providers/infinity-scroll/user-list'
import { useInfinityScroll } from 'providers/infinity-scroll'

export default function List() {
  const { userLists } = useUserList()
  const { setScrollFunc } = useInfinityScroll()

  useEffect(() => {
    setScrollFunc('lists')
  }, [])
  return (
    <div className={styles.listContainer}>
      { userLists.map((value) => (
        <ListBox info={value} key={value.id} />
      ))}
    </div>
  )
}
