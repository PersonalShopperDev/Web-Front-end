import { cn } from 'lib/util'
import { MouseEventHandler } from 'react'
import styles from 'sass/widgets/switch.module.scss'

export default function Switch({
  active,
  onClick,
  disabled,
  cursor,
} : {
  active: boolean
  onClick: MouseEventHandler,
  disabled?: boolean,
  cursor?: string,
}) {
  return (
    <button
      className={cn(styles.container, active && styles.active)}
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ cursor }}
    >
      <div className={styles.switch} />
    </button>
  )
}

Switch.defaultProps = {
  disabled: false,
  cursor: 'pointer',
}
