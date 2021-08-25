import React from 'react'
import styles from 'sass/components/cody-step1.module.scss'
import Icon from 'widgets/icon'
import CodyGrid from 'components/cody-suggestion/cody-grid'
import Product from 'components/cody-suggestion/product'
import { useCodySuggestion } from 'providers/cody-suggestion'

export default function Step1() {
  const { productNum, onClickPlus } = useCodySuggestion()
  return (
    <>
      <span className={styles.title}>Step 1</span>
      <span>보낼 코디 사진 추가해보세요.</span>
      <div className={styles.gridContainer}>
        {productNum !== 9
        && (
        <button className={productNum < 4 ? styles.bigPlusBox : styles.smallPlusBox} type="button" onClick={() => onClickPlus()}>
          <Icon src="gridPlus.png" size={28} key="plus" />
        </button>
        ) }
        {[...Array(productNum)].map((value, index) => {
          const isBigGrid = productNum < 4
          return (
            <CodyGrid index={index + 1} isBigGrid={isBigGrid} key={Math.random()} />
          )
        })}
      </div>
      <Product />
    </>
  )
}
