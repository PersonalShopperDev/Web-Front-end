import React, {
  useEffect, useContext, createContext, useRef,
} from 'react'

type FetchDataFunc = () => void

interface InfinityScrollProps {
  setOnScrollFunc: (callback: FetchDataFunc) => void
}

const InfinityScrollContext = createContext<InfinityScrollProps>(null)

export const useInfinityScroll = () => useContext(InfinityScrollContext)

export default function InfinityScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const scrollFuncRef = useRef<FetchDataFunc>()
  const mainDomRef = useRef<HTMLElement>()
  const setOnScrollFunc = (callback: FetchDataFunc) => {
    scrollFuncRef.current = callback
  }
  const scrollListener = () => {
    if (mainDomRef.current.scrollTop + mainDomRef.current.clientHeight
      !== mainDomRef.current.scrollHeight) return
    if (scrollFuncRef.current !== undefined) scrollFuncRef.current()
  }
  useEffect(() => {
    mainDomRef.current = document.getElementById('main')
  }, [])
  useEffect(() => {
    mainDomRef.current.addEventListener('scroll', scrollListener)
    return () => mainDomRef.current.removeEventListener('scroll', scrollListener)
  }, [scrollFuncRef])

  const value = {
    setOnScrollFunc,
  }
  return <InfinityScrollContext.Provider value={value}>{children}</InfinityScrollContext.Provider>
}
