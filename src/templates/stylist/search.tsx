import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/stylist/search.module.scss'
import BottomButton from 'src/components/bottom-button'
import { useOnboarding } from 'providers/onboarding'
import Link from 'next/link'
import StyleList from 'components/style-list'
import communicate from 'lib/api'

export default function Search() {
  const [styleLists, setStyleLists] = useState([])
  const [clickedStyleList, setClickedStyleList] = useState([])
  const [isOverLength, setIsOverLength] = useState(false)
  const { information } = useOnboarding()
  const styleClick = (style: number) => {
    if (clickedStyleList.includes(style)) {
      if (isOverLength) {
        setIsOverLength(false)
      }
      setClickedStyleList((list) => list.filter((item) => item !== style))
      return
    }
    if (clickedStyleList.length < 3) {
      setClickedStyleList((list) => [...list, style])
      return
    }
    setIsOverLength(true)
  }

  const fetchStylistData = async (gender) => {
    const res = await communicate({ url: `/style?${gender}=${true}` })
    if (res.status !== 200) return
    const styleList = await res.json()
    setStyleLists(styleList[gender])
  }
  useEffect(() => {

    if (information === null) return
    const gender = information.gender === 'F' ? 'female' : 'male'
    fetchStylistData(gender)
  }, [information])

  return (
    <div className={styles.searchContainer}>
      <span className={styles.title}>스타일로 검색해보세요.(최대 3개선택)</span>
      <StyleList
        styleLists={styleLists}
        isOverLength={isOverLength}
        clickedStyleList={clickedStyleList}
        styleClick={styleClick}
      />
      <Link href={{ pathname: '/stylist', query: { type: clickedStyleList.join('|') } }}>
        <BottomButton text="검색하기" />
      </Link>
    </div>
  )
}
