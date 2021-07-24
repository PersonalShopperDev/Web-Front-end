import React, { useState } from 'react'
import Modal from 'components/modal'
import styles from 'sass/components/filter-modal.module.scss'
import Icon from 'widgets/icon'
import { useUserList } from 'providers/user-list'

export default function FilterModal({
  userType,
}: {
  userType:string
}) {
  const { setSortType } = useUserList()
  const filterLists = ['추천순', '고용순', '저가순', '전문 스타일리스트']
  const sortType = ['recommend', 'hireCount', 'priceLow', 'professional']
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
      {userType === 'D'
        ? (
          <div className={styles.modalBox}>
            {filterLists.map((value, index) => (
              <div className={styles.eachModalContent} key={value}>
                <button type="button" onClick={() => onClickFilter(index)}>
                  <span className={currentFilter === index
                    ? styles.selectedFilterText : styles.notSelectedFilterText}
                  >
                    {value}
                  </span>
                </button>
                {currentFilter === index && <Icon src="selectedFilterCheck.png" key="filter" />}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.demanderContainer}>
            기능 준비중입니다
          </div>
        ) }
    </Modal>
  )
}
