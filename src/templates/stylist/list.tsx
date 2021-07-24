import React, { useEffect } from 'react'
import styles from 'sass/templates/stylist/list.module.scss'
import ListBox from 'src/components/list-box'
import { useInfinityScroll } from 'providers/infinity-scroll'
import { useUserList } from 'providers/user-list'
import { useRouter } from 'next/router'

export default function List() {
  const { userLists, fetchUserData, setStyleType } = useUserList()
  const { setOnScrollFunc } = useInfinityScroll()
  const router = useRouter()
  useEffect(() => {
    setOnScrollFunc(fetchUserData)
    if (router.query.type !== undefined) {
      const params = (router.query.type as string).split('|')
      setStyleType(`${params.join('&styleType=')}`)
    }
  }, [])
  return (
    <div className={styles.listContainer}>
      { userLists.map((value) => (
        <ListBox info={value} key={value.id} />
      ))}
    </div>
  )
}
