import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
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
  type,
  content,
  maxLength,
  children,
} : {
  head: string
  name: string,
  type?: 'text' | 'number'
  content?: string,
  maxLength?: number
  children: React.ReactNode
}) {
  return (
    <StatefulSection
      head={head}
    >
      <Inner
        name={name}
        type={type}
        content={content}
        maxLength={maxLength}
      >
        {children}
      </Inner>
    </StatefulSection>
  )
}

function Inner({
  name,
  type,
  maxLength,
  content,
  children,
} : {
  name: string,
  type: 'text' | 'number'
  maxLength: number
  content: string
  children: React.ReactNode
}) {
  const { setOnEdit, setState } = useStatefulSection()
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const [text, setText] = useState<string>(content || '')

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

  const getValue = () => {
    const result = textRef.current
    if (type === 'number') {
      return parseInt(result, 10)
    }
    return result
  }

  const onEdit = async () => {
    const value = getValue()
    if (!value) {
      await createAlert({ text: '내용을 입력해 주세요' })
      return
    }

    if (value === content) {
      setState('default')
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
      await createAlert({ text: ERROR_MESSAGE })
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
  type: 'text',
  content: null,
  maxLength: null,
}
