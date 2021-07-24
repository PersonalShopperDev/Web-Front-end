import React from 'react'
import styles from 'sass/components/style-list.module.scss'
import Icon from 'widgets/icon'

interface StyleLists {
  id: number,
  value: string
}
export default function StyleList({
  styleLists,
  clickedStyleList,
  isOverLength,
  styleClick,
}: {
  isOverLength: boolean
  styleLists: StyleLists[]
  clickedStyleList: Array<number>
  styleClick: (value: number) => void
}) {
  return (
    <>
      <div className={styles.styleContainer}>
        { styleLists.map(({ id, value }) => (
          <button
            type="button"
            onClick={() => styleClick(id)}
            className={clickedStyleList.includes(id)
              ? styles.selectedBox : styles.notSelectedBox}
            key={value}
          >
            <span className={clickedStyleList.includes(id)
              ? styles.selectedText : styles.notSelectedText}
            >
              {value}
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
