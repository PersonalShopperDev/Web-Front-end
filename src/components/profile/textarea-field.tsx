import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/textarea-field.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

export default function TextareaField({
  head,
  name,
  content,
  maxLength,
} : {
  head: string
  name: string,
  content?: string,
  maxLength?: number
}) {
  return (
    <Field
      head={head}
      name={name}
      content={content}
      maxLength={maxLength}
    >
      <Inner content={content} maxLength={maxLength} />
    </Field>
  )
}

TextareaField.defaultProps = {
  content: null,
  maxLength: null,
}

function Inner({
  content,
  maxLength,
} : {
  content: string,
  maxLength: number,
}) {
  const { state } = useStatefulSection()
  const { text, onChange } = useField()
  const defaultValue = '내용을 입력해주세요.'
  const textareaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    if (state === 'edit') {
      textareaRef.current.value = content
    }
  }, [state])

  return (
    <>
      {state === 'default'
        ? <p className={styles.content}>{content || defaultValue}</p>
        : (
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              maxLength={maxLength}
              onChange={onChange}
            />
            {maxLength && (
              <div className={styles.limit}>
                <strong className={styles.strong}>
                  {text.length || 0}
                </strong>
                {`/${maxLength}자`}
              </div>
            )}
          </div>
        )}
    </>
  )
}
