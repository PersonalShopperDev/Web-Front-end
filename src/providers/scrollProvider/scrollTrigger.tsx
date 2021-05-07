import React, { useEffect, useRef, useState } from 'react'
import useWindowSize from 'src/hooks/window'
import { useScroll } from './index'

type State = 'before' | 'in' | 'after'

interface Props {
  children: React.ReactNode
  transform: {
    from: string
    to: string
    outro?: string
  }
  defaultStyle?: string
  transition?: string
  className?: string
}

/**
 * Every css propertiy needs semi.
 */

export default function ScrollTrigger({
  children,
  transform,
  transition,
  defaultStyle,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>()

  const [state, setState] = useState<State>('before')

  const { attachScrollCallback, detachScrollCallback } = useScroll()

  const size = useWindowSize()

  const { from, to, outro } = transform

  const setCondition = () => {
    const calculate = (): State => {
      const clientRect = containerRef.current.getBoundingClientRect()
      if (clientRect.top < 0) {
        return 'after'
      }
      if (size.height < clientRect.top) {
        return 'before'
      }
      return 'in'
    }
    setState(calculate())
  }

  useEffect(() => {
    attachScrollCallback(setCondition)
    return () => detachScrollCallback(setCondition)
  }, [])

  useEffect(() => {
    const getStyleByCSS = (): string => {
      switch (state) {
        case 'before':
          return from
        case 'after':
          return outro || to
        default:
          return to
      }
    }
    containerRef.current.style.cssText = `transition: ${transition}; ${defaultStyle} ${getStyleByCSS()}`
  }, [state])

  return <div ref={containerRef} className={className}>{children}</div>
}

ScrollTrigger.defaultProps = {
  transition: 'all 1s',
  defaultStyle: '',
  className: null,
}
