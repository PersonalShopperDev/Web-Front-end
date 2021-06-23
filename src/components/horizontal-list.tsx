import getDeviceType from 'lib/util/device'
import getPosition from 'lib/util/mouseEvent'
import React, { useRef, useEffect } from 'react'
import styles from 'sass/components/horizontal-list.module.scss'
import clamp from 'lib/util/mathf'
import { cn } from 'lib/util'

export default function HorizontalList({
  className,
  children,
  gap,
} : {
  className?: string,
  children: React.ReactNode[]
  gap?: number
}) {
  const containerRef = useRef<HTMLDivElement>()
  const childrenRef = useRef<HTMLDivElement[]>([])

  const data = {
    width: 0,
  }

  const transitionData = {
    animation: null,
    current: 0,
    result: 0,
  }

  const dragData = {
    origin: 0,
    from: 0,
    control: false,
    threshold: 120,
  }

  const animate = () => {
    transitionData.animation = requestAnimationFrame(animate)
    if (!containerRef.current) {
      return
    }

    const { current } = transitionData

    transitionData.result = Math.floor(
      clamp(current, containerRef.current.offsetWidth - data.width, 0) * 10,
    ) / 10

    containerRef.current.style.transform = `translateX(${transitionData.result}px)`
  }

  const onMouseDown = (e: MouseEvent) => {
    document.body.addEventListener('mouseup', onDragEnd)
    document.body.addEventListener('mousemove', onDrag)
    onDragStart(e)
  }

  const onDragStart = (e: MouseEvent | TouchEvent) => {
    dragData.control = true
    dragData.origin = transitionData.result
    dragData.from = getPosition(e).x
  }

  const onDrag = (e: MouseEvent | TouchEvent) => {
    const { origin, from } = dragData
    transitionData.current = origin + getPosition(e).x - from
  }

  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    document.body.removeEventListener('mouseup', onDragEnd)
    document.body.removeEventListener('mousemove', onDrag)
  }

  const initializeEventListener = () => {
    const { current } = containerRef
    if (getDeviceType() === 'desktop') {
      current.addEventListener('mousedown', onMouseDown)
      return
    }
    current.addEventListener('touchstart', onDragStart)
    current.addEventListener('touchmove', onDrag)
    current.addEventListener('touchend', onDragEnd)
  }

  const initializeData = () => {
    data.width = childrenRef.current.reduce((acc, cur, index) => (
      acc + cur.getBoundingClientRect().width + (index > 0 ? gap : 0)
    ), 0)
  }

  useEffect(() => {
    initializeData()
    transitionData.animation = requestAnimationFrame(animate)
    initializeEventListener()
    return () => cancelAnimationFrame(transitionData.animation)
  }, [])

  return (
    <section className={styles.container}>
      <div
        className={cn(styles.list, className)}
        ref={containerRef}
      >
        {children.map((child, index) => (
          <div
            key={Math.random()}
            className={styles.wrapper}
            ref={(ref) => {
              childrenRef.current[index] = ref
            }}
            style={{
              marginLeft: index > 0 && gap,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </section>
  )
}

HorizontalList.defaultProps = {
  className: null,
  gap: 0,
}
