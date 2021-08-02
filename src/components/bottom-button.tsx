import React from 'react'
import styles from 'sass/components/bottom-button.module.scss'

export default function BottomButton({
  text,
  onClick,
} : {
  text : string,
  onClick?: React.MouseEventHandler,
}) {
  return (
    <button type="button" className={styles.button} onClick={onClick} id="bottom_button">
      <span className={styles.buttonText}>{text}</span>
    </button>
  )
}

BottomButton.defaultProps = {
  onClick: null,
}
