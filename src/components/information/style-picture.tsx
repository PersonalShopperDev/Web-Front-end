import React, {
  useState,
  useEffect,
} from 'react'
import styles from 'sass/components/style-picture.module.scss'
import communicate from 'lib/api/index'
import { useOnboarding } from 'providers/onboarding'

export default function StylePicture() {
  const { stylePicture, setStylePicture, information } = useOnboarding()
  const [styleImageLists, setStyleImageLists] = useState([])
  const [isOverLength, setIsOverLength] = useState(false)
  const onClick = (id) => {
    if (stylePicture.includes(id)) {
      if (isOverLength) {
        setIsOverLength(false)
      }
      setStylePicture((list) => list.filter((item) => item !== id))
      return
    }
    if (stylePicture.length < 3) {
      setStylePicture((list) => [...list, id])
      return
    }
    setIsOverLength(true)
  }
  useEffect(() => {
    async function fetchStylistData() {
      const res = await communicate({ url: `/style/img?gender=${information.gender}` })
      const styleImage = await res.json()
      setStyleImageLists(styleImage)
    }
    if (information) fetchStylistData()
  }, [information])
  return (
    <div className={styles.container}>
      {styleImageLists.map((value, index) => (
        <button type="button" onClick={() => onClick(value.id)} className={styles.buttonImg} key={Math.random()}>
          {stylePicture.includes(value.id) && <div className={styles.selectedImg} /> }
          <img src={value.img} alt="styleImg" width="159" height="159" className={styles.img} />
          {stylePicture.includes(value.id) && <span className={styles.selectedText}>선택</span>}
        </button>
      ))}
    </div>
  )
}
