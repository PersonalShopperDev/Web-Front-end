import { useState } from 'react'
import Image from 'next/image'
import styles from 'sass/templates/stylist/search.module.scss'
import BottomButton from 'src/components/bottomButton'

export default function Search() {
  const styleList = ['캐주얼', '모던', '스트릿', '에스닉', '빈티지', '프레피', '아메카지', '그런지', '오피스', '섹시글램', '히피']
  const [clickedStyleList, setClickedStyleList] = useState([])
  const [isOverLength, setIsOverLength] = useState(false)
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

  const onButtonClick = () => {

  }

  return (
    <div className={styles.searchContainer}>
      <span className={styles.title}>스타일로 검색해보세요.(최대 3개선택)</span>
      <div className={styles.styleContainer}>
        { styleList.map((style) => (
          <button
            type="button"
            onClick={() => styleClick(style)}
            className={clickedStyleList.includes(style)
              ? styles.selectedBox : styles.notSelectedBox}
          >
            <span className={styles.styleText}>{style}</span>
          </button>
        ))}
      </div>
      { isOverLength
        ? (
          <div>
            <Image src="/icons/warning.png" width="10" height="10" />
            <span className={styles.warningText}>최대 3개까지 선택가능합니다.</span>
          </div>
        ) : null}
      <BottomButton text="검색하기" onClick={onButtonClick} />
    </div>
  )
}
