import { useRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import Api, { getApiUrl } from '../../lib/api'

interface User {
  accessToken: string
  refreshToken: string
}

interface AuthProps {
  user: User
  authenticate: (provider: string, token: string) => void
  signOut: () => void
}

export interface ThridPartyAuthProps {
  LoginButton: () => JSX.Element
}

const AuthContext = createContext<AuthProps>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [pending, setPending] = useState(true)
  const [user, setUser] = useState<User>(null)

  const ACCESS_TOKEN = 'accessToken'
  const REFRESH_TOKEN = 'refreshToken'

  const authenticate = async (provider: string, token: string) : Promise<void> => {
    const payload: any = {
      resource: provider,
      token,
    }
    const res = await Api.post(getApiUrl('auth/login'), payload)
    if (res.ok) {
      onResponse(res)
      return
    }
    onFail()
  }

  const isValidToken = (token : string) : boolean => token !== null && typeof token !== 'undefined' && token !== 'undefined'

  const silentRefresh = async () : Promise<void> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    if (!isValidToken(refreshToken)) {
      signOut()
      return
    }
    const payload: any = {
      refreshToken,
    }
    const res = await Api.post(getApiUrl('auth/token'), payload)
    if (res.ok) {
      onResponse(res)
      return
    }
    onFail()
  }

  const onResponse = async (res: Response) : Promise<void> => {
    const data = await res.json()
    const { accessToken, refreshToken } = data
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken)
    }
    setUser({
      accessToken,
      refreshToken,
    })
    setTimeout(silentRefresh, 1000 * 60 * 29)
    setPending(false)
  }

  const onFail = () : void => {
    router.push('/login/error')
  }

  const signOut = () : void => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    setUser(null)
    setPending(false)
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  useEffect(() => {
    silentRefresh()
  }, [])

  if (pending) {
    return <>pending....</>
  }

  const value = {
    user,
    authenticate,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
