import communicate from 'lib/api'
import { useRouter } from 'next/router'
import React, {
  useContext, createContext, useState, useEffect, useRef,
} from 'react'

interface ListProps {
  userLists: Array<any>
  fetchUserData: (type?: string, sort?: string) => void
  setStyleType: (value: any) => void
  setSortType: (value: string) => void
  setGenderType: (value: string) => void
  setUserType: (value:string) => void
}

type userListsRefProps = {
  value: any[],
  type: string,
  sort: string,
  gender: string,
  user: string,
}
const UserListContext = createContext<ListProps>(null)

export const useUserList = () => useContext(UserListContext)

export default function UserListProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { query } = useRouter()
  const sortTypeInit = typeof query.sort === 'string' && ['recommend', 'hireCount', 'priceLow', 'professional'].includes(query.sort) ? query.sort : undefined

  const [userLists, setUserLists] = useState([])
  const [styleType, setStyleType] = useState('')
  const [sortType, setSortType] = useState(sortTypeInit || 'recommend')
  const [genderType, setGenderType] = useState('M')
  const [userType, setUserType] = useState(null)
  const userListsRef = useRef<userListsRefProps>({
    value: [], type: '', sort: 'recommend', gender: 'M', user: null,
  })
  const pageNum = 20
  const fetchDemander = async () => {
    const page = userListsRef.current.value.length / pageNum
    if (Math.floor(userListsRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/user/demander?gender=${userListsRef.current.gender}&page=${page}` })
    const lists = await res.json()
    const newLists = userListsRef.current.value.concat(lists)
    setUserLists(newLists)
  }
  const fetchSupplier = async () => {
    let res
    let newLists
    const page = userListsRef.current.value.length / pageNum
    if (Math.floor(userListsRef.current.value.length / pageNum) !== page) return
    if (userListsRef.current.type !== '') {
      res = await communicate({ url: `/user/supplier/filter?styleType=${userListsRef.current.type}&sort=${userListsRef.current.sort}&page=${page}` })
    } else if (userListsRef.current.sort === 'professional') {
      res = await communicate({ url: `/user/supplier?supplierType=2&page=${page}` })
    } else {
      res = await communicate({ url: `/user/supplier?sort=${userListsRef.current.sort}&page=${page}` })
    }
    const lists = await res.json()
    if (userListsRef.current.type !== '') {
      if (lists.list === undefined) return
      newLists = userListsRef.current.value.concat(lists.list)
    } else {
      newLists = userListsRef.current.value.concat(lists)
    }
    setUserLists(newLists)
  }
  const fetchUserData = async () => {
    if (!userListsRef.current.user) return
    if (userListsRef.current.user === 'D') {
      fetchDemander()
    } else {
      fetchSupplier()
    }
  }

  useEffect(() => {
    userListsRef.current.value = userLists
  }, [userLists])

  useEffect(() => {
    userListsRef.current.type = styleType
    userListsRef.current.sort = sortType
    userListsRef.current.gender = genderType
    userListsRef.current.value = []
    userListsRef.current.user = userType
    fetchUserData()
  }, [styleType, sortType, genderType, userType])

  useEffect(() => {
    userListsRef.current.type = styleType
    userListsRef.current.sort = sortType
    userListsRef.current.gender = genderType
  }, [])

  const value = {
    userLists,
    fetchUserData,
    setStyleType,
    setSortType,
    setGenderType,
    setUserType,
  }
  return <UserListContext.Provider value={value}>{children}</UserListContext.Provider>
}
