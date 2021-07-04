import { useState, useEffect } from 'react'
import styles from 'sass/templates/stylist/search.module.scss'
import BottomButton from 'src/components/bottom-button'
import communicate from 'lib/api'
import { useOnboarding } from 'providers/onboarding'
import { useRouter } from 'next/router'
import { useUserList } from 'providers/infinityScroll/userList'

export default function Search() {
  const [styleLists, setStyleLists] = useState([])
  const [clickedStyleList, setClickedStyleList] = useState([])
  const [isOverLength, setIsOverLength] = useState(false)
  const { information } = useOnboarding()
  const router = useRouter()
  const { setStyleType } = useUserList()
  const styleClick = (style) => {
    if (clickedStyleList.includes(style)) {
      if (isOverLength) setIsOverLength(false)
      setClickedStyleList(clickedStyleList.filter((item) => item !== style))
    } else if (clickedStyleList.length < 3) {
      setClickedStyleList([...clickedStyleList, style])
    } else {
      setIsOverLength(true)
    }
  }

  const onButtonClick = async () => {
    const type = clickedStyleList.join('|')
    setStyleType(type)
    router.back()
  }

  useEffect(() => {
    const gender = information.gender === 'F' ? 'femal' : 'male'
    async function fetchStylistData() {
      const res = await communicate({ url: `/style?${gender}=${true}` })
      const styleList = await res.json()
      setStyleLists(styleList[gender])
    }
    fetchStylistData()
  }, [])
  return (
    <div className={styles.searchContainer}>
      <span className={styles.title}>스타일로 검색해보세요.(최대 3개선택)</span>
      <div className={styles.styleContainer}>
        { styleLists.map((item) => (
          <button
            type="button"
            onClick={() => styleClick(item.id)}
            className={clickedStyleList.includes(item.id)
              ? styles.selectedBox : styles.notSelectedBox}
            key={item.value}
          >
            <span className={clickedStyleList.includes(item.id)
              ? styles.selectedText : styles.notSelectedText}
            >
              {item.value}
            </span>
          </button>
        ))}
      </div>
      { isOverLength
        ? (
          <div className={styles.flexRow}>
            <img src="/icons/warning.png" alt="warning" width="10" height="10" />
            <span className={styles.warningText}>최대 3개까지 선택가능합니다.</span>
          </div>
        ) : null}
      <BottomButton text="검색하기" onClick={onButtonClick} />
    </div>
  )
}
