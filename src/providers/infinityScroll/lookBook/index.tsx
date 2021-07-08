import React, {
  useContext, createContext, useState, useRef, useEffect,
} from 'react'
import communicate from 'lib/api'

  interface LookBookProps {
    lookBookLists: Array<any>
    fetchLookBookData: () => Promise<void>
    setId: (value: number) => void
  }

const LookBookContext = createContext<LookBookProps>(null)

export const useLookBook = () => useContext(LookBookContext)

export default function LookBookProvider({
  children,
}: {
    children: React.ReactNode
  }) {
  const [lookBookLists, setLookBookLists] = useState([])
  const [id, setId] = useState(0)
  const lookBookRef = useRef<any>([])
  const pageNum = 20
  const fetchLookBookData = async () => {
    const page = lookBookRef.current.value.length / pageNum
    if (Math.floor(lookBookRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/profile/${id}/lookbook?page=${page}` })
    if (res.status !== 200) {
      return
    }
    const newLookBook = await res.json()
    lookBookRef.current.value = lookBookRef.current.value.concat(newLookBook.list)
    setLookBookLists(lookBookRef.current.value)
  }
  useEffect(() => {
    lookBookRef.current.value = lookBookLists
  }, [lookBookRef])
  useEffect(() => {
    lookBookRef.current.id = id
    fetchLookBookData()
  }, [id])
  const value = {
    lookBookLists,
    fetchLookBookData,
    setId,
  }
  return <LookBookContext.Provider value={value}>{children}</LookBookContext.Provider>
}
