import React, { useState } from 'react'
import Modal from 'components/modal'
import styles from 'sass/components/filter-modal.module.scss'
import Icon from 'widgets/icon'
import { useUserList } from 'providers/infinityScroll/userList'

export default function FilterModal() {
  const { setSortType } = useUserList()
  const filterLists = ['고용순', '저가순', '전문 스타일리스트']
  const sortType = ['popular', 'priceLow', 'professional']
  const [currentFilter, setCurrentFilter] = useState(null)
  const onClickFilter = (index) => {
    setCurrentFilter(index)
    setSortType(sortType[index])
  }
  return (
    <Modal
      className={styles.modalContainer}
      initializer={(
        <Icon
          key="filter"
          src="filter.png"
          size={23}
        />
      )}
      transition={{
        default: {
          transform: 'translateY(100%)',
        },
        onActive: {
          transform: 'translateX(0%)',
          duration: 500,
        },
      }}
    >
      <div className={styles.modalBox}>
        {filterLists.map((value, index) => (
          <div className={styles.eachModalContent} key={value}>
            <span className={styles.filterText}>{value}</span>
            {currentFilter === index ? <Icon src="selectedFilterCheck.png" onClick={() => onClickFilter(index)} key="selectedFilterCheck" /> : <Icon src="filterCheck.png" onClick={() => onClickFilter(index)} key="filterCheck" /> }
          </div>
        ))}
      </div>
    </Modal>
  )
}
