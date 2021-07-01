import communicate from 'lib/api'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import React, {
  useState,
  useRef,
  createContext,
  useContext,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import StatefulSection, { useStatefulSection } from './stateful-section'

interface FieldContextProps {
  text: string,
  setText: Dispatch<SetStateAction<string>>
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const FieldContext = createContext<FieldContextProps>(null)

export const useField = () => useContext(FieldContext)

export default function Field({
  head,
  name,
  maxLength,
  children,
} : {
  head: string
  name: string,
  maxLength?: number
  children: React.ReactNode
}) {
  return (
    <StatefulSection
      head={head}
    >
      <Inner
        name={name}
        maxLength={maxLength}
      >
        {children}
      </Inner>
    </StatefulSection>
  )
}

function Inner({
  name,
  maxLength,
  children,
} : {
  name: string,
  maxLength: number
  children: React.ReactNode
}) {
  const { setOnEdit, setState } = useStatefulSection()
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const [text, setText] = useState<string>('')

  const textRef = useRef<string>(text)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength) {
      if (e.target.value.length > maxLength) {
        setText(e.target.value.substring(0, 100))
        return
      }
    }
    setText(e.target.value)
  }

  const onEdit = async () => {
    const value = textRef.current
    if (!value) {
      await createAlert({ text: '내용을 입력해 주세요' })
      return
    }

    await communicate({
      url: '/profile',
      payload: {
        [name]: value,
      },
      method: 'PATCH',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('error')
      }
      fetchUser()
    }).catch(async () => {
      await createAlert({ text: 'error' })
    })

    setState('default')
  }

  useEffect(() => {
    textRef.current = text
  }, [text])

  useEffect(() => {
    setOnEdit(onEdit)
  }, [])

  const value = {
    text,
    setText,
    onChange,
  }

  return (
    <FieldContext.Provider value={value}>
      {children}
    </FieldContext.Provider>
  )
}

Field.defaultProps = {
  maxLength: null,
}
