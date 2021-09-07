import { ReactNode, useEffect, useRef } from 'react'
import styles from 'sass/components/profile/input-field.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

export default function InputField({
  head,
  name,
  content,
  placeholder,
}: {
  head: ReactNode
  name: string
  content?: string
  placeholder?: string,
}) {
  return (
    <Field head={head} name={name} content={content}>
      <Inner content={content} placeholder={placeholder} />
    </Field>
  )
}

function Inner({ content, placeholder }: { content: string, placeholder: string }) {
  const defaultValue = placeholder || '내용을 입력해주세요.'
  const { state } = useStatefulSection()
  const { onChange, setText } = useField()
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (state === 'edit') {
      inputRef.current.value = content
    }
  }, [state])

  useEffect(() => {
    setText(content || '')
  }, [])

  return (
    <>
      {state === 'default' ? (
        <p className={styles.content}>{content || defaultValue}</p>
      ) : (
        <input ref={inputRef} className={styles.input} type="text" onChange={onChange} placeholder={placeholder} />
      )}
    </>
  )
}

InputField.defaultProps = {
  content: null,
  placeholder: null,
}
