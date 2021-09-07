import React, {
  useState, useContext, createContext, Dispatch, SetStateAction, ReactNode,
} from 'react'

import styles from 'sass/components/profile/header.module.scss'
import { useOnboarding } from 'providers/onboarding'
import { useProfile } from 'providers/profile'

interface HeaderContextProps {
    isEdit: boolean,
    setIsEdit: Dispatch<SetStateAction<boolean>>
}
const HeaderContext = createContext<HeaderContextProps>(null)
export const useHeader = () => useContext(HeaderContext)

export default function ProfileHeader({
  title,
  type,
  children,
}: {
  title: string
  type: string
  children: ReactNode
}) {
  const [isEdit, setIsEdit] = useState(false)
  const { onClickEdit } = useOnboarding()
  const { editable } = useProfile()

  const value = {
    isEdit,
    setIsEdit,
  }
  const onClick = () => {
    if (isEdit) {
      onClickEdit()
    }
    setIsEdit(!isEdit)
  }
  return (
    <>
      <div className={styles.container}>
        <span>{title}</span>
        {editable
        && (
        <button
          type="button"
          onClick={onClick}
        >
          <span className={styles.button}>{isEdit ? '확인' : '수정'}</span>
        </button>
        ) }
      </div>
      <HeaderContext.Provider value={value}>
        {children}
      </HeaderContext.Provider>
    </>
  )
}
