import React, {
  createContext, useContext, useRef, useEffect, useState,
} from 'react'
import communicate from 'lib/api'

interface NoticeProps {
    noticeLists: Notice[]
    fetchNoticeData: () => Promise<void>
}

interface Notice {
    id: number
    title: string
    content: string
    date: string
}
type NoticeRefProps = {
    value: Notice[]
}

const NoticeContext = createContext<NoticeProps>(null)

export const useNotice = () => useContext(NoticeContext)

export default function NoticeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [noticeLists, setNoticeLists] = useState([])
  const noticeRef = useRef<NoticeRefProps>({ value: [] })
  const pageNum = 20

  const fetchNoticeData = async () => {
    const page = noticeRef.current.value.length / pageNum
    if (Math.floor(noticeRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/notice?page=${page}` })
    if (res.status !== 200) return
    const newNotice = await res.json()
    noticeRef.current.value = noticeRef.current.value.concat(newNotice)
    setNoticeLists(noticeRef.current.value)
  }
  useEffect(() => {
    noticeRef.current.value = noticeLists
  }, [noticeLists])
  useEffect(() => {
    fetchNoticeData()
  }, [])
  const value = {
    noticeLists,
    fetchNoticeData,
  }
  return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>
}
