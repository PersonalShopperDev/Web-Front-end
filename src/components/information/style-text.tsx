import React, { useEffect, useState, useRef } from 'react'
import communicate from 'lib/api'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/style-text.module.scss'

export default function StyleText({
  isEdit,
}: {
  isEdit: boolean
}) {
  const { information, setOnEdit, fetchInformationData } = useOnboarding()
  const [styleLists, setStyleLists] = useState([])
  const [isOverLength, setIsOverLength] = useState(false)
  const [styleText, setStyleText] = useState(null)
  const styleRef = useRef([])

  const onEditStyle = async () => {
    await communicate({ url: '/style', payload: { list: styleRef.current }, method: 'PUT' })
    fetchInformationData()
  }

  useEffect(() => {
    async function fetchData() {
      const query = information.gender === 'F' ? '?female=true' : '?male=true'
      const res = await communicate({ url: `/style${query}` })
      const data = await res.json()
      setStyleLists(information.gender === 'F' ? data.female : data.male)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isEdit) setOnEdit(onEditStyle)
  }, [isEdit])

  useEffect(() => {
    if (styleLists.length !== 0) {
      setStyleText(information.styles?.map(({ id }) => id))
      styleRef.current = information.styles?.map(({ id }) => id)
    }
  }, [styleLists])

  const onClickStyle = (id: number) => {
    if (styleText.includes(id)) {
      if (isOverLength) {
        setIsOverLength(false)
      }
      setStyleText((list) => list.filter((item) => item !== id))
      styleRef.current = styleRef.current.filter((item) => item !== id)
      return
    }
    if (styleText.length < 3) {
      setStyleText((list) => [...list, id])
      styleRef.current.push(id)
      return
    }
    setIsOverLength(true)
  }

  return (
    <div className={styles.container}>
      {isEdit
        ? (
          <>
            <span className={isOverLength ? styles.over : styles.limit}>최대 3개 선택</span>
            <div>
              {styleLists.map(({ value, id }) => (
                <button
                  type="button"
                  className={styleText.includes(id)
                    ? styles.selectedBox : styles.notSelectedBox}
                  key={Math.random()}
                  onClick={() => onClickStyle(id)}
                >
                  <span className={styles.styleText}>
                    {value}
                  </span>
                </button>
              ))}
            </div>
          </>
        )
        : (
          <>
            {information.styles && information.styles.map(({ value }) => (
              <div
                key={Math.random()}
                className={styles.notSelectedBox}
              >
                <span className={styles.styleText}>{value}</span>
              </div>
            ))}
          </>
        )}
    </div>
  )
}
