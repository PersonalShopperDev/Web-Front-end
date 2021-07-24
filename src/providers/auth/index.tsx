import communicate from 'lib/api'
import { deleteCookie, getCookie, setCookie } from 'lib/util/cookie'
import parseJwt from 'lib/util/jwt'
import { useRouter } from 'next/dist/client/router'
import React, {
  createContext, useContext, useEffect, useState,
} from 'react'

export const ACCESS_TOKEN = 'personalshopper_accessToken'
export const REFRESH_TOKEN = 'personalshopper_refreshToken'

export type UserType = 'N' | 'D' | 'S' | 'W'

export interface User {
  userType: UserType
  userId: number
  name: string
  introduction: string
  styles: string[]
  img: string
  closet: {id: number, img: string}[]
  careerList: { value: string, type: number }[]
  price: number
  coord: {id: number, img: string}[]
  hopeToSupplier: string
  bodyStat: {
    isPublic: boolean
    height: number
    weight: number
  }
}

interface AuthProps {
  user: User
  fetchUser: () => Promise<boolean>
  authenticate: (provider: string, token: string) => Promise<void>
  signOut: (redirect?: string) => Promise<void>
  requestAccessToken: () => Promise<void>
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

  const [load, setLoad] = useState<boolean>()

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
      onFail('/login/error')
      return
    }

    await onResponse(res)
    router.push('/')
  }

  const isValidToken = (token : string) : boolean => token !== null && typeof token !== 'undefined' && token !== 'undefined'

  const requestAccessToken = async () : Promise<void> => {
    const refreshToken = getCookie(REFRESH_TOKEN)

    if (!isValidToken(refreshToken)) {
      if (user) {
        await signOut()
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

    if (res.status !== 200) {
      await onFail()
      return
    }

    await onResponse(res)
  }

  const onResponse = async (res: Response) : Promise<void> => {
    const { accessToken, refreshToken } = await res.json()
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    await fetchUser()
    setTimeout(requestAccessToken, silentRefreshInterval)
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

  const fetchUser = async () : Promise<boolean> => {
    const res = await communicate({
      url: '/profile',
    })

    if (res.status === 200) {
      const data = await res.json()
      const { userId } = parseJwt(getCookie(ACCESS_TOKEN))
      setUser({ ...data, userId: parseInt(userId, 10) })
      return true
    }
    return false
  }

  const onFail = async (redirect?: string) : Promise<void> => {
    if (redirect) {
      router.push(redirect)
    }
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

  const initialize = async () => {
    await requestAccessToken()
    setLoad(true)
  }

  useEffect(() => {
    initialize()
  }, [])

  if (!load) {
    return <></>
  }

  const value = {
    user,
    fetchUser,
    authenticate,
    signOut,
    requestAccessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
