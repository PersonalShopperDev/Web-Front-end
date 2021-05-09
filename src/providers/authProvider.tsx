import { useRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'

interface authContext {
  user: any
  setUser: React.Dispatch<any>
  signOut: () => void
}

const AuthContext = createContext<authContext>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)

  const signOut = () => {
    switch (user.provider) {
      case 'naver':
        setUser(null)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  const value = {
    user,
    setUser,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
