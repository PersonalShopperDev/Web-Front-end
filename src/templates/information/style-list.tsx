import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/information/style-list.module.scss'
import BottomButton from 'src/components/bottom-button'
import communicate from 'lib/api'
import StyleList from 'components/style-list'
import { useRouter } from 'next/router'

export default function StyleLists() {
  const [maleStyleLists, setMaleStyleLists] = useState()
  const [femaleStyleLists, setFemaleStyleLists] = useState()
  const [clickedMaleStyleList, setClickedMaleStyleList] = useState([])
  const [clickedFemaleStyleList, setClickedFemaleStyleList] = useState([])
  const [isMaleOverLength, setIsMaleOverLength] = useState(false)
  const [isFemaleOverLength, setIsFemaleOverLength] = useState(false)
  const router = useRouter()
  const maleStyleClick = (style: number) => {
    if (clickedMaleStyleList.includes(style)) {
      if (isMaleOverLength) {
        setIsMaleOverLength(false)
      }
      setClickedMaleStyleList((list) => list.filter((item) => item !== style))
      return
    }
    if (clickedMaleStyleList.length < 3) {
      setClickedMaleStyleList((list) => [...list, style])
      return
    }
    setIsMaleOverLength(true)
  }
  const femaleStyleClick = (style: number) => {
    if (clickedFemaleStyleList.includes(style)) {
      if (isFemaleOverLength) {
        setIsFemaleOverLength(false)
      }
      setClickedFemaleStyleList((list) => list.filter((item) => item !== style))
      return
    }
    if (clickedFemaleStyleList.length < 3) {
      setClickedFemaleStyleList((list) => [...list, style])
      return
    }
    setIsFemaleOverLength(true)
  }

  const fetchStyleListData = async () => {
    const res = await communicate({ url: '/style/supply' })
    if (res.status !== 200) {
      return
    }
    const { male, female } = await res.json()
    setMaleStyleLists(male)
    setFemaleStyleLists(female)
  }
  useEffect(() => {
    fetchStyleListData()
  }, [])
  const onClickButton = async () => {
    const payload = {
      list: clickedFemaleStyleList.concat(clickedMaleStyleList),
    }
    await communicate({ url: '/style', payload, method: 'PUT' })
    router.back()
  }
  return (
    <div className={styles.searchContainer}>
      <span className={styles.title}>
        {maleStyleLists === undefined || femaleStyleLists === undefined
          ? '최대 3개 선택 가능' : '각각 최대 3개 선택 가능'}
      </span>
      {maleStyleLists !== undefined && femaleStyleLists !== undefined
      && <div className={styles.female}>여자</div>}
      {femaleStyleLists !== undefined
      && (
      <StyleList
        styleLists={femaleStyleLists}
        isOverLength={isFemaleOverLength}
        clickedStyleList={clickedFemaleStyleList}
        styleClick={femaleStyleClick}
      />
      )}
      {maleStyleLists !== undefined && femaleStyleLists !== undefined
      && <div className={styles.male}>남자</div>}
      {maleStyleLists !== undefined
      && (
      <StyleList
        styleLists={maleStyleLists}
        isOverLength={isMaleOverLength}
        clickedStyleList={clickedMaleStyleList}
        styleClick={maleStyleClick}
      />
      )}
      <BottomButton text="확인" onClick={onClickButton} />
    </div>
  )
}
