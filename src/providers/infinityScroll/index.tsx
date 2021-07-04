import React, {
  useEffect, useContext, createContext, useRef, useState,
} from 'react'

import { useUserList } from './userList'
import { useLookBook } from './lookBook'

interface InfinityScrollProps {
  setScrollFunc: (value: any) => void
}

const InfinityScrollContext = createContext<InfinityScrollProps>(null)

export const useInfinityScroll = () => useContext(InfinityScrollContext)

export default function InfinityScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrollFunc, setScrollFunc] = useState<string>()
  const { fetchUserData } = useUserList()
  const { fetchLookBookData } = useLookBook()
  const scrollFuncRef = useRef<any>()
  const scrollListener = () => {
    if (window.scrollY < getDocumentHeight() - window.innerHeight) return
    scrollFuncRef.current()
  }
  const getDocumentHeight = () => {
    const { body } = document
    const html = document.documentElement
    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight,
    )
  }

  useEffect(() => {
    if (scrollFunc !== undefined) {
      window.addEventListener('scroll', scrollListener)
    }
    if (scrollFunc === 'lists') {
      scrollFuncRef.current = fetchUserData
    } else if (scrollFunc === 'lookBook') {
      scrollFuncRef.current = fetchLookBookData
    }
    return () => window.removeEventListener('scroll', scrollListener)
  }, [scrollFunc])
  const value = {
    setScrollFunc,
  }
  return <InfinityScrollContext.Provider value={value}>{children}</InfinityScrollContext.Provider>
}
