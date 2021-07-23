import React, {
  useContext, createContext, useState, useRef, useEffect,
} from 'react'
import communicate from 'lib/api'

interface LookBookProps {
  lookBookLists: Array<any>
  fetchLookBookData: () => Promise<void>
  setId: (value: number) => void
}

type lookBookRefProps = {
  value: any[],
  id: number,
}

const LookBookContext = createContext<LookBookProps>(null)

export const useLookBook = () => useContext(LookBookContext)

export default function Inner({
  children,
}: {
  children: React.ReactNode
}) {
  const [lookBookLists, setLookBookLists] = useState([])
  const [id, setId] = useState(0)
  const lookBookRef = useRef<lookBookRefProps>({ value: [], id: 0 })
  const pageNum = 20
  const fetchLookBookData = async () => {
    const page = lookBookRef.current.value.length / pageNum
    if (Math.floor(lookBookRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/profile/${lookBookRef.current.id}/lookbook?page=${page}` })
    const newLookBook = await res.json()
    lookBookRef.current.value = lookBookRef.current.value.concat(newLookBook.list)
    setLookBookLists(lookBookRef.current.value)
  }
  useEffect(() => {
    lookBookRef.current.value = lookBookLists
  }, [lookBookLists])
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
