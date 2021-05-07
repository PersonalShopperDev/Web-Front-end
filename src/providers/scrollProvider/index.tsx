import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import useWindowSize from 'src/hooks/window'
import styles from 'sass/providers/scrollProvider.module.scss'

type scrollCallback = () => void

interface ScrollProviderProps {
  attachScrollCallback : (callback : scrollCallback) => void
  detachScrollCallback : (callback : scrollCallback) => void
}

const ScrollContext = createContext<ScrollProviderProps>(null)
export const useScroll = () => useContext(ScrollContext)

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>()

  const size = useWindowSize()

  const data = {
    ease: 0.05,
    curr: 0,
    prev: 0,
    result: 0,
  }

  const callbacks : scrollCallback[] = []

  const attachScrollCallback = (callback : () => void) : void => {
    callbacks.push(callback)
  }

  const detachScrollCallback = (callback : () => void) : void => {
    callbacks.splice(callbacks.findIndex((child) => child !== callback), 1)
  }

  const notifyScrollCallback = () : void => {
    callbacks.forEach((callback) => {
      callback.call(null)
    })
  }

  const setBodyHeight = () : void => {
    document.body.style.height = `${
      containerRef.current.getBoundingClientRect().height * 0.5
    }px`
  }

  const smoothScroll = useCallback(() => {
    requestAnimationFrame(() => smoothScroll())
    data.curr = window.scrollY
    data.prev += (data.curr - data.prev) * data.ease
    data.result = Math.round(data.prev * 100) / 100
    if (Math.abs(data.result - data.prev) < 1) {
      notifyScrollCallback()
    }
    containerRef.current.style.transform = `translateY(-${data.result}px)`
  }, [data])

  useEffect(() => {
    requestAnimationFrame(() => smoothScroll())
  }, [])

  useEffect(() => {
    setBodyHeight()
  }, [size.height])

  const value = {
    attachScrollCallback,
    detachScrollCallback,
  }

  return (
    <ScrollContext.Provider value={value}>
      <div ref={containerRef} className={styles.container}>
        {children}
      </div>
    </ScrollContext.Provider>
  )
}
