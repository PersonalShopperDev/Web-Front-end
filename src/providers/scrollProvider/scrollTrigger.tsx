import React, { useEffect, useRef, useState } from 'react'
import useWindowSize from 'src/hooks/window'
import { useScroll } from './index'

type State = 'before' | 'in' | 'after'

interface Props {
  children?: React.ReactNode
  transform?: {
    from: string
    to: string
    outro?: string
  }
  defaultStyle?: string
  transition?: string
  className?: string
  inClassName? : string
  outClassName? : string
  inCallback?: () => void
  outCallback?: () => void
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
  inClassName,
  outClassName,
  inCallback,
  outCallback,
}: Props) {
  const containerRef = useRef<HTMLDivElement>()

  const [state, setState] = useState<State>('before')

  const { attachScrollCallback, detachScrollCallback } = useScroll()

  const size = useWindowSize()

  const setCondition = () => {
    const calculate = (): State => {
      const clientRect = containerRef.current.getBoundingClientRect()
      if (clientRect.top < -0.5 * clientRect.height) {
        return 'after'
      }
      if (size.height < clientRect.top) {
        return 'before'
      }
      return 'in'
    }
    setState(calculate())
  }

  const getClassName = () : string => {
    switch (state) {
      case 'in':
        return `${className} ${inClassName}`
      case 'after':
        return `${className} ${outClassName}`
      default:
        return className
    }
  }

  const getTransform = (): string => {
    if (!transform) {
      return null
    }
    const { from, to, outro } = transform
    switch (state) {
      case 'before':
        return from
      case 'after':
        return outro || to
      default:
        return to
    }
  }

  const notify = () => {
    switch (state) {
      case 'before':
        return null
      case 'after':
        return outCallback?.call(null)
      default:
        return inCallback?.call(null)
    }
  }

  useEffect(() => {
    attachScrollCallback(setCondition)
    return () => detachScrollCallback(setCondition)
  }, [])

  useEffect(() => {
    notify()
    containerRef.current.style.cssText = `transition: ${transition}; ${defaultStyle} ${getTransform()}`
  }, [state])

  return <div ref={containerRef} className={getClassName()}>{children}</div>
}

ScrollTrigger.defaultProps = {
  children: null,
  transition: 'all 1s',
  defaultStyle: '',
  className: null,
  inClassName: null,
  outClassName: null,
  inCallback: null,
  outCallback: null,
  transform: null,
}
