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
  const listRef = useRef<HTMLDivElement>()
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
    if (!listRef.current) {
      return
    }

    const { current } = transitionData

    transitionData.result = Math.floor(
      clamp(current, listRef.current.offsetWidth - data.width, 0) * 10,
    ) / 10

    listRef.current.style.transform = `translateX(${transitionData.result}px)`
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
    const { current } = listRef
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
    if (!children) {
      return null
    }
    if (getDeviceType() !== 'desktop') {
      return null
    }
    initializeData()
    if (data.width <= containerRef.current.offsetWidth) {
      return null
    }
    transitionData.animation = requestAnimationFrame(animate)
    initializeEventListener()
    return () => cancelAnimationFrame(transitionData.animation)
  }, [children])

  if (!children) {
    return <></>
  }

  return (
    <section
      className={styles.container}
      ref={containerRef}
    >
      <div
        className={cn(styles.list, className)}
        ref={listRef}
      >
        {children.filter((child) => child).map((child, index) => (
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
