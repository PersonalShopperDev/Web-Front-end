import React, {
  useState,
  useEffect,
} from 'react'
import styles from 'sass/templates/onboarding/step6.module.scss'
import communicate from 'lib/api/index'
import { useOnboarding } from 'providers/onboarding'

export default function Step6() {
  const { information, stylePicture, setStylePicture } = useOnboarding()
  const [styleImageLists, setStyleImageLists] = useState([])
  const onClick = (index) => {
    if (!stylePicture.includes(index)) {
      setStylePicture([...stylePicture, index])
    } else {
      setStylePicture(stylePicture.filter((item) => item !== index))
    }
  }
  useEffect(() => {
    async function fetchStylistData() {
      const res = await communicate({ url: `/style/img?gender=${information.gender}` })
      const styleImage = await res.json()
      setStyleImageLists(styleImage)
    }
    fetchStylistData()
  }, [])
  return (
    <section>
      <h1 className={styles.title}>STEP 6</h1>
      <h2 className={styles.content}>다음 사진 중 마음에 드는 스타일을 골라주세요</h2>
      <div className={styles.container}>
        {styleImageLists.map((value, index) => (
          <button type="button" onClick={() => onClick(index)} className={styles.tmp} key={Math.random()}>
            {stylePicture.includes(index) && <div className={styles.selectedImg} /> }
            <img src={value.img} alt="styleImg" width="159" height="159" className={styles.img} />
            {stylePicture.includes(index) && <span className={styles.selectedText}>선택</span>}
          </button>
        ))}
      </div>
    </section>
  )
}
