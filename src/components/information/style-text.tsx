import React, { useEffect, useState } from 'react'
import communicate from 'lib/api'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/style-text.module.scss'

export default function StyleText() {
  const { information } = useOnboarding()
  const [styleLists, setStyleLists] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await communicate({ url: '/style' })
      const data = await res.json()
      setStyleLists(information.gender === 'F' ? data.female : data.male)
    }
    fetchData()
  }, [])
  return (
    <div className={styles.container}>
      {styleLists.map((value) => (
        <div
          className={information.styles.findIndex((e) => e.id === value.id) !== -1
            ? styles.selectedBox : styles.notSelectedBox}
          key={Math.random()}
        >
          {value.value}
        </div>
      ))}
    </div>
  )
}
