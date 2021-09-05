/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react'
import styles from 'sass/components/body.module.scss'
import { useOnboarding } from 'providers/onboarding'
import communicate from 'lib/api'

export default function Body({
  isOnboarding,
  isEdit,
}: {
  isOnboarding?: boolean
  isEdit?: boolean
}) {
  const {
    information, setData, setOnEdit, fetchInformationData,
  } = useOnboarding()
  const [bodyType, setBodyType] = useState(null)
  const [bodyId, setBodyId] = useState(0)
  const bodyRef = useRef()

  const onEditBody = async () => {
    await communicate({ url: '/profile', payload: { body: bodyRef.current }, method: 'PATCH' })
    fetchInformationData()
  }

  const onBodyClick = (id) => {
    setBodyId(id)
    if (isOnboarding) {
      setData('body', id)
    } else {
      bodyRef.current = id
    }
  }

  useEffect(() => {
    const fetchBodyData = async () : Promise<void> => {
      const res = await communicate({
        url: `/profile/body?gender=${information.gender}`,
      })
      if (res.status === 200) {
        const data = await res.json()
        setBodyType(data)
      }
    }
    fetchBodyData()
    if (information.body) {
      setBodyId(information.body.id)
    }
  }, [])

  useEffect(() => {
    if (isEdit) setOnEdit(onEditBody)
  }, [isEdit])

  return (
    <>
      {isEdit
        ? (
          <div className={isOnboarding ? styles.container : styles.infoContainer}>
            {bodyType && bodyType.map((item, index) => (
              <div key={item.id}>
                <button
                  type="button"
                  className={isOnboarding ? (bodyId === item.id
                    ? styles.selectedBodyForm
                    : styles.notSelectedBodyForm) : (bodyId === item.id
                    ? styles.infoSelectedBodyForm : styles.infoNotSelectedBodyForm)}
                  onClick={() => onBodyClick(item.id)}
                >
                  <div>
                    <img src={item.img} alt="bodyType" />
                  </div>
                  <span className={bodyId === item.id
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
        : (
          <span className={styles.bodyFormText}>
            {bodyType && bodyType.find((body) => body.id === bodyId).value}
          </span>
        ) }
    </>
  )
}

Body.defaultProps = {
  isOnboarding: false,
  isEdit: true,
}
