import { cn } from 'lib/util'
import { useState, Dispatch, SetStateAction } from 'react'
import styles from 'sass/widgets/star-rate.module.scss'
import Icon from './icon'

export default function StarRate({
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
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} style={{ marginLeft: index > 0 ? gap : 0 }}>
          <Icon
            src={rate >= index + 1 ? 'accent-star.png' : 'blank-star.png'}
            size={size}
            onClick={setValue && (() => onClick(index + 1))}
          />
        </div>
      ))}
    </div>
  )
}

StarRate.defaultProps = {
  className: null,
  value: 0,
  setValue: null,
  gap: 0,
}
