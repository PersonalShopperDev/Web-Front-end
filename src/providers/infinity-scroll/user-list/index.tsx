import communicate from 'lib/api'
import React, {
  useContext, createContext, useState, useEffect, useRef,
} from 'react'

interface ListProps {
  userLists: Array<any>
  fetchUserData: (type?: string, sort?: string) => void
  setStyleType: (value: any) => void
  setSortType: (value: string) => void
}

const UserListContext = createContext<ListProps>(null)

export const useUserList = () => useContext(UserListContext)

export default function UserListProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userLists, setUserLists] = useState([])
  const [styleType, setStyleType] = useState('')
  const [sortType, setSortType] = useState('popular')
  const userListsRef = useRef<any>([])
  const pageNum = 20
  const fetchUserData = async () => {
    let res
    let newLists
    const page = userListsRef.current.value.length / pageNum
    if (Math.floor(userListsRef.current.value.length / pageNum) !== page) return
    if (userListsRef.current.type !== '') {
      res = await communicate({ url: `/supplier/search?type=${userListsRef.current.type}&sort=${userListsRef.current.sort}&page=${page}` })
    } else {
      res = await communicate({ url: `/supplier?sort=${userListsRef.current.sort}&page=${page}` })
    }
    const lists = await res.json()
    if (userListsRef.current.type !== '') {
      newLists = userListsRef.current.value.concat(lists.list)
    } else {
      newLists = userListsRef.current.value.concat(lists)
    }
    setUserLists(newLists)
  }
  useEffect(() => {
    userListsRef.current.value = userLists
  }, [userLists])
  useEffect(() => {
    userListsRef.current.type = styleType
    if (userListsRef.current.type !== '') {
      userListsRef.current.value = []
      fetchUserData()
    }
  }, [styleType])
  useEffect(() => {
    userListsRef.current.sort = sortType
    if (userListsRef.current.sort !== 'popular') {
      userListsRef.current.value = []
      fetchUserData()
    }
  }, [sortType])
  useEffect(() => {
    userListsRef.current.type = styleType
    userListsRef.current.sort = sortType
    fetchUserData()
  }, [])
  const value = {
    userLists,
    fetchUserData,
    setStyleType,
    setSortType,
  }
  return <UserListContext.Provider value={value}>{children}</UserListContext.Provider>
}
