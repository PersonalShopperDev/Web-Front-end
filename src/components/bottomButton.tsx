import styles from 'sass/components/bottomButton.module.scss'

export default function BottomButton({
  text,
  onClick,
} : {
  text : string,
  onClick: () => void,
}) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.buttonText}>{text}</span>
    </button>
  )
}
