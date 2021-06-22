import { useEffect, useState } from 'react'
import styles from 'sass/templates/stylist/list.module.scss'
import StylistBox from 'src/components/stylistBox'
import communicate from 'lib/api/index'

export default function List() {
  const [stylistLists, setStylistLists] = useState([])
  useEffect(() => {
    async function fetchStylistData() {
      const res = await communicate({ url: '/stylist' })
      const stylists = await res.json()
      setStylistLists(stylists.list)
    }
    fetchStylistData()
  }, [])
  return (
    <div className={styles.listContainer}>
      { stylistLists.map((item) => (
        <StylistBox info={item} />
      ))}
    </div>
  )
}
