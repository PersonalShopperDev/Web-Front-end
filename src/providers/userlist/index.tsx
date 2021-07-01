import communicate from 'lib/api'
import React, {
  useContext, createContext, useState, useEffect,
} from 'react'

interface ListProps {
  userLists: Array<any>
  setUserLists: (value: any) => void
}

const UserListContext = createContext<ListProps>(null)

export const useUserList = () => useContext(UserListContext)

export default function UserListProvider({
  children,
}: {
    children: React.ReactNode
}) {
  const [userLists, setUserLists] = useState([])
  useEffect(() => {
    async function fetchSupplierData() {
      const res = await communicate({ url: '/supplier' })
      const suppliers = await res.json()
      setUserLists(suppliers)
    }
    fetchSupplierData()
  }, [])
  const value = {
    userLists,
    setUserLists,
  }
  return <UserListContext.Provider value={value}>{children}</UserListContext.Provider>
}
