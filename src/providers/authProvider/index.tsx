import communicate from 'lib/api'
import { deleteCookie, getCookie, setCookie } from 'lib/util/cookie'
import { useRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

interface User {
  accessToken: string
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

  const tokenExpiration = 1000 * 60 * 30
  const silentRefreshInterval = 1000 * 60 * 29

  const authenticate = async (provider: string, token: string) : Promise<void> => {
    const payload: any = {
      resource: provider,
      token,
    }
    const res = await communicate({
      url: '/auth/login',
      payload,
      method: 'POST',
    })
    if (res.ok) {
      onResponse(res)
      return
    }
    onFail()
  }

  const isValidToken = (token : string) : boolean => token !== null && typeof token !== 'undefined' && token !== 'undefined'

  const silentRefresh = async () : Promise<void> => {
    const refreshToken = getCookie(REFRESH_TOKEN)
    if (!isValidToken(refreshToken)) {
      signOut()
      return
    }
    const payload: any = {
      refreshToken,
    }
    const res = await communicate({
      url: '/auth/token',
      payload,
      method: 'POST',
    })
    if (res.ok) {
      onResponse(res)
      return
    }
    onFail()
  }

  const onResponse = async (res: Response) : Promise<void> => {
    const data = await res.json()
    const { accessToken, refreshToken } = data
    setCookie(ACCESS_TOKEN, accessToken, tokenExpiration)
    if (refreshToken) {
      setCookie(REFRESH_TOKEN, refreshToken, tokenExpiration)
    }
    setUser({
      accessToken,
    })
    setTimeout(silentRefresh, silentRefreshInterval)
    setPending(false)
  }

  const onFail = () : void => {
    router.push('/login/error')
  }

  const signOut = () : void => {
    deleteCookie(ACCESS_TOKEN)
    deleteCookie(REFRESH_TOKEN)
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
