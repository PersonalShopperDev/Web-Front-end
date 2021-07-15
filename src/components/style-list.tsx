import React from 'react'
import styles from 'sass/components/style-list.module.scss'
import Icon from 'widgets/icon'

interface StyleLists {
  id: number,
  value: string
}
export default function StyleList({
  isSearch,
  styleLists,
  clickedStyleList,
  isOverLength,
  styleClick,
}: {
  isSearch?: boolean
  isOverLength: boolean
  styleLists: Array<StyleLists>
  clickedStyleList: Array<number>
  styleClick: (value: number) => void
}) {
  return (
    <>
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
            <Icon src="warning.png" size={10} />
            <span className={styles.warningText}>최대 3개까지 선택가능합니다.</span>
          </div>
        ) : null}
    </>
  )
}

StyleList.defaultProps = {
  isSearch: false,
}
