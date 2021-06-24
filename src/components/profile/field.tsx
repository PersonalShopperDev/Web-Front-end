import React, {
  useState, useRef, createContext, useContext, MutableRefObject, useEffect,
} from 'react'
import styles from 'sass/components/profile/field.module.scss'
import Icon from 'widgets/icon'
import Section from './section'

type State = 'default' | 'edit' | 'pending'

interface FieldContextProps {
  state: State,
  inputRef: MutableRefObject<HTMLInputElement>
  textareaRef:MutableRefObject<HTMLTextAreaElement>
}

const FieldContext = createContext<FieldContextProps>(null)

export const useField = () => useContext(FieldContext)

export default function Field({
  head,
  content,
  children,
} : {
  head: string
  content: string,
  children: React.ReactNode
}) {
  const [state, setState] = useState<State>('default')

  const inputRef = useRef<HTMLInputElement>()
  const textareaRef = useRef<HTMLTextAreaElement>()

  const onEdit = () => {
    if (state === 'default') {
      setState('edit')
      return
    }
    if (state === 'edit') {
      setState('default')
    }
  }

  useEffect(() => {
    if (state === 'edit') {
      if (inputRef.current) {
        inputRef.current.value = content
      }
      if (textareaRef.current) {
        textareaRef.current.value = content
      }
    }
  }, [state])

  const value = {
    state,
    inputRef,
    textareaRef,
  }

  return (
    <Section
      head={head}
      action={(
        <button
          type="button"
          className={styles.button}
          onClick={onEdit}
        >
          {state === 'default'
            ? <Icon src="edit.png" size={17} />
            : '수정'}
        </button>
      )}
    >
      <FieldContext.Provider value={value}>
        {children}
      </FieldContext.Provider>
    </Section>
  )
}
