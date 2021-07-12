/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import styles from 'sass/components/body.module.scss'
import { useOnboarding } from 'providers/onboarding'
import communicate from 'lib/api'

export default function Body({
  isOnboarding,
}: {
  isOnboarding?: boolean
}) {
  const { information, setData, setEdit } = useOnboarding()
  const [bodyType, setBodyType] = useState(null)

  const onBodyClick = (id) => {
    setData('body', id)
    if (!isOnboarding) setEdit('body')
  }
  useEffect(() => {
    const fetchBodyData = async () : Promise<void> => {
      const res = await communicate({
        url: `/onboard/body?gender=${information.gender}`,
      })
      if (res.status === 200) {
        const data = await res.json()
        setBodyType(data)
      }
    }
    fetchBodyData()
  }, [])
  return (
    <div className={isOnboarding ? styles.container : styles.infoContainer}>
      {bodyType !== null && bodyType.map((item, index) => (
        <div key={item.id}>
          <button
            type="button"
            className={isOnboarding ? (information.body === item.id
              ? styles.selectedBodyForm
              : styles.notSelectedBodyForm) : (information.body === item.id
              ? styles.infoSelectedBodyForm : styles.infoNotSelectedBodyForm)}
            onClick={() => onBodyClick(item.id)}
          >
            <div>
              <img src={item.img} alt="bodyType" />
            </div>
            <span className={information.body === item.id
              ? styles.selectedText : null}
            >
              { String.fromCharCode(index + 65)}
              .
              {item.value}
            </span>
          </button>
        </div>
      ))}
    </div>
  )
}

Body.defaultProps = {
  isOnboarding: false,
}
