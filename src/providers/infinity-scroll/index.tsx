import React, {
  useEffect, useContext, createContext, useRef, useState,
} from 'react'

import { useUserList } from './user-list'
import { useLookBook } from './look-book'

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
    if (document.getElementById('main').scrollTop + document.getElementById('main').clientHeight !== document.getElementById('main').scrollHeight) return
    scrollFuncRef.current()
  }
  useEffect(() => {
    if (scrollFunc !== undefined) {
      document.getElementById('main').addEventListener('scroll', scrollListener)
    }
    if (scrollFunc === 'lists') {
      scrollFuncRef.current = fetchUserData
    } else if (scrollFunc === 'lookBook') {
      scrollFuncRef.current = fetchLookBookData
    }
    return () => document.getElementById('main').removeEventListener('scroll', scrollListener)
  }, [scrollFunc])
  const value = {
    setScrollFunc,
  }
  return <InfinityScrollContext.Provider value={value}>{children}</InfinityScrollContext.Provider>
}
