import React, {
  useContext, createContext, useState, useRef, useEffect,
} from 'react'
import communicate from 'lib/api'

export interface History {
  paymentId: number
  paymentTime: Date
  price: number
  status: number
  targetUser: {
    userId: number
    name: string
    img: string
  }
}

interface HistoryProps {
  historyLists: History[]
  fetchHistoryData: () => Promise<void>
}

type HistoryRefProps = {
  value: History[],
}

const HistoryContext = createContext<HistoryProps>(null)

export const useHistory = () => useContext(HistoryContext)

export default function HistoryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [historyLists, setHistoryLists] = useState([])
  const HistoryRef = useRef<HistoryRefProps>({ value: [] })
  const pageNum = 20
  const fetchHistoryData = async () => {
    const page = HistoryRef.current.value.length / pageNum
    if (Math.floor(HistoryRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/payment?page=${page}` })
    const newHistory = await res.json()
    HistoryRef.current.value = HistoryRef.current.value.concat(newHistory)
    setHistoryLists(HistoryRef.current.value)
  }
  useEffect(() => {
    HistoryRef.current.value = historyLists
  }, [HistoryRef])
  useEffect(() => {
    fetchHistoryData()
  }, [])

  const value = {
    historyLists,
    fetchHistoryData,
  }
  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
