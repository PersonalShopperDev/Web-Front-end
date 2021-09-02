import { useContext, createContext, ReactNode } from 'react'
import { User } from './auth'

export interface ProfileProviderContextProps {
  editable: boolean
  user: User
}

const ProfileContext = createContext<ProfileProviderContextProps>(null)

export const useProfile = () => useContext(ProfileContext)

export default function ProfileProvider({
  editable,
  children,
  user,
} : {
  editable : boolean,
  children : ReactNode,
  user : User
}) {
  const value = {
    editable,
    user,
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}
