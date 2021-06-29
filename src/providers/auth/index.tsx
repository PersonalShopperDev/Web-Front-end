import communicate from 'lib/api'
import { deleteCookie, getCookie, setCookie } from 'lib/util/cookie'
import { useRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'

interface User {
  userType: 'N' | 'D' | 'S' | 'W'
  name: string
  introduction: string
  styles: string[]
  profileImg: string
  careerList: { value: string, type: number }[]
  price: number
  coord: string[]
}

interface AuthProps {
  user: User
  fetchUser: () => Promise<boolean>
  authenticate: (provider: string, token: string) => Promise<void>
  signOut: (redirect?: string) => Promise<void>
}

const AuthContext = createContext<AuthProps>(null)

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [user, setUser] = useState<User>(null)

  const tokenExpiration = 1000 * 60 * 30
  const refreshTokenExpiration = 1000 * 60 * 60 * 24 * 7
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

    if (res.status !== 200) {
      onFail()
      return
    }

    await onResponse(res)
    router.push('/')
  }

  const isValidToken = (token : string) : boolean => token !== null && typeof token !== 'undefined' && token !== 'undefined'

  const silentRefresh = async () : Promise<void> => {
    const refreshToken = getCookie(REFRESH_TOKEN)

    if (!isValidToken(refreshToken)) {
      if (user) {
        signOut()
      }
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

    if (res.status === 200) {
      onResponse(res)
      return
    }

    onFail()
  }

  const setAccessToken = (token: string) => {
    if (token) {
      setCookie(ACCESS_TOKEN, token, tokenExpiration)
    }
  }

  const setRefreshToken = (token: string) => {
    if (token) {
      setCookie(REFRESH_TOKEN, token, refreshTokenExpiration)
    }
  }

  const onResponse = async (res: Response) : Promise<void> => {
    const { accessToken, refreshToken } = await res.json()
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    fetchUser()
    setTimeout(silentRefresh, silentRefreshInterval)
  }

  const fetchUser = async () : Promise<boolean> => {
    const res = await communicate({
      url: '/profile',
    })

    if (res.status === 200) {
      const data = await res.json()
      setUser(data)
      return true
    }
    return false
  }

  const onFail = () : void => {
    router.push('/login/error')
  }

  const signOut = async (redirect?: string) : Promise<void> => {
    deleteCookie(ACCESS_TOKEN)
    deleteCookie(REFRESH_TOKEN)
    setUser(null)
    if (redirect) {
      router.push(redirect)
      return
    }
    router.reload()
  }

  useEffect(() => {
    silentRefresh()
  }, [])

  const value = {
    user,
    fetchUser,
    authenticate,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
