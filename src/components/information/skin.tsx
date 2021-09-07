import React, { useState, useEffect, useRef } from 'react'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/skin.module.scss'
import communicate from 'lib/api'

export default function Skin({
  isOnboarding,
  isEdit,
}: {
  isOnboarding?: boolean
  isEdit?: boolean
}) {
  const {
    information, setOnEdit, fetchInformationData, setData,
  } = useOnboarding()
  const [skinId, setSkinId] = useState<number>()
  const [skinValue, setSkinValue] = useState<string>()
  const skinRef = useRef(null)
  const skinTypeLists = [{
    path: '/icons/skinA.png',
  }, {
    path: '/icons/skinB.png',
  }, {
    path: '/icons/skinC.png',
  }, {
    path: '/icons/skinD.png',
  }]

  const onSkinClick = (index: number) => {
    setSkinId(index)
    if (isOnboarding) {
      setData('skin', index)
    } else {
      skinRef.current = index
    }
  }

  const onEditSkin = async () => {
    const payload: any = {}
    payload.skin = skinRef.current
    await communicate({ url: '/profile', payload, method: 'PATCH' })
    fetchInformationData()
  }

  useEffect(() => {
    if (information.skin && information.skin.value) {
      const { id, value } = information.skin
      setSkinId(id)
      setSkinValue(value)
      skinRef.current = id
    }
  }, [information])

  useEffect(() => {
    if (isEdit) setOnEdit(onEditSkin)
  }, [isEdit])

  return (
    <>
      {isEdit
        ? (
          <div className={styles.container}>
            {skinTypeLists.map((item, index) => (
              <div key={Math.random()}>
                <button
                  type="button"
                  className={skinId === index
                    ? styles.selectedPalette : styles.notSelectedPalette}
                  onClick={() => onSkinClick(index)}
                >
                  <img src={item.path} alt="skintype" className={styles.palette} />
                </button>
              </div>
            ))}
          </div>
        )
        : (
          <span className={styles.skinToneText}>
            {skinValue}
          </span>
        ) }
    </>
  )
}

Skin.defaultProps = {
  isOnboarding: false,
  isEdit: true,
}
