import React, {
  useState, useRef, createContext, useContext, SetStateAction, Dispatch, ReactNode,
} from 'react'
import styles from 'sass/components/profile/field.module.scss'
import Icon from 'widgets/icon'
import Section from './section'

type State = 'default' | 'edit' | 'pending'

type OnEditCallback = () => Promise<void>

interface StatefulSectionContextProps {
  state: State,
  setState: Dispatch<SetStateAction<State>>
  setOnEdit: (callback: OnEditCallback) => void
}

const StatefulSectionContext = createContext<StatefulSectionContextProps>(null)

export const useStatefulSection = () => useContext(StatefulSectionContext)

export default function StatefulSection({
  head,
  children,
} : {
  head: ReactNode
  children: React.ReactNode
}) {
  const [state, setState] = useState<State>('default')
  const onEdit = useRef<OnEditCallback>()

  const setOnEdit = (callback: OnEditCallback) => {
    onEdit.current = callback
  }

  const onClick = () => {
    if (state === 'default') {
      setState('edit')
      return
    }
    if (state === 'edit') {
      onEdit.current?.call(null)
    }
  }

  const value = {
    state,
    setState,
    setOnEdit,
  }

  return (
    <Section
      head={head}
      action={(
        <button
          type="button"
          className={styles.button}
          onClick={onClick}
        >
          {state === 'default'
            ? <Icon src="edit.png" size={17} />
            : '완료'}
        </button>
      )}
    >
      <StatefulSectionContext.Provider value={value}>
        {children}
      </StatefulSectionContext.Provider>
    </Section>
  )
}
