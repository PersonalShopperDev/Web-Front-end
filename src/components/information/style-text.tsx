import React, { useEffect, useState } from 'react'
import communicate from 'lib/api'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/style-text.module.scss'

export default function StyleText() {
  const { information } = useOnboarding()
  const [styleLists, setStyleLists] = useState([])
  const [selectedIdLists, setSelectedIdLists] = useState([])
  useEffect(() => {
    async function fetchData() {
      const gender = information.gender === 'F' ? 'female' : 'male'
      const res = await communicate({ url: `/style?${gender}=${true}` })
      const data = await res.json()
      setStyleLists(information.gender === 'F' ? data.female : data.male)
    }
    fetchData()
    for (let i = 0; i < information.styles.length; i++) {
      setSelectedIdLists([...selectedIdLists, information.styles[i].id])
    }
  }, [])

  return (
    <div className={styles.container}>
      {styleLists.map((value) => (
        <div
          className={selectedIdLists.includes(value.id)
            ? styles.selectedBox : styles.notSelectedBox}
          key={Math.random()}
        >
          {value.value}
        </div>
      ))}
    </div>
  )
}
