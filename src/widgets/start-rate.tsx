import { cn } from 'lib/util'
import { useState, Dispatch, SetStateAction } from 'react'
import styles from 'sass/widgets/star-rate.module.scss'
import Icon from './icon'

export default function StartRate({
  className,
  value,
  setValue,
  size,
  gap,
}: {
  className?: string,
  value?: number
  setValue?: Dispatch<SetStateAction<number>>
  size: number
  gap?: number
}) {
  const [rate, setRate] = setValue ? [value, setValue] : useState(value)

  const onClick = (index: number) => {
    setRate(index)
  }

  return (
    <div className={cn(styles.container, className)}>
      {[...Array(5)].map((_, index) => (
        <div style={{ marginLeft: index > 0 ? gap : 0 }}>
          <Icon
            key={Math.random()}
            src={rate >= index ? 'accent-star.png' : 'blank-star.png'}
            size={size}
            onClick={setValue && (() => onClick(index))}
          />
        </div>
      ))}
    </div>
  )
}

StartRate.defaultProps = {
  className: null,
  value: 0,
  setValue: null,
  gap: 0,
}
