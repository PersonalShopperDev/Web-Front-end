import React from 'react'
import { useOnboarding } from 'providers/onboarding'
import styles from 'sass/components/skin.module.scss'

export default function Skin({
  isEdit,
}: {
  isEdit?: boolean
}) {
  const { information, setData, editCheck } = useOnboarding()

  const skinTypeLists = [{
    path: '/icons/skinA.png',
  }, {
    path: '/icons/skinB.png',
  }, {
    path: '/icons/skinC.png',
  }, {
    path: '/icons/skinD.png',
  }]
  const onSkinClick = (item) => {
    setData('skin', item)
  }
  return (
    <div className={styles.container}>
      {skinTypeLists.map((value, index) => (
        <div key={Math.random()}>
          {isEdit || editCheck.skin
            ? (
              <button
                type="button"
                className={information.skin === index
                  ? styles.selectedPalette : styles.notSelectedPalette}
                onClick={() => onSkinClick(index)}
              >
                <img src={value.path} alt="skintype" className={styles.palette} />
              </button>
            )
            : (
              <div
                className={information.skin === index
                  ? styles.selectedPalette : styles.notSelectedPalette}
              >
                <img src={value.path} alt="skintype" className={styles.palette} />
              </div>
            )}
        </div>
      ))}
    </div>
  )
}

Skin.defaultProps = {
  isEdit: false,
}
