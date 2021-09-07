import { cn } from 'lib/util'
import { useProfile } from 'providers/profile'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/textarea-field.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

export default function TextareaField({
  head,
  name,
  content,
  maxLength,
  placeholder,
} : {
  head: string
  name: string,
  content?: string,
  maxLength?: number
  placeholder? : string,
}) {
  return (
    <Field
      head={head}
      name={name}
      content={content}
      maxLength={maxLength}
    >
      <Inner content={content} maxLength={maxLength} placeholder={placeholder} />
    </Field>
  )
}

TextareaField.defaultProps = {
  content: null,
  maxLength: null,
  placeholder: null,
}

function Inner({
  content,
  maxLength,
  placeholder,
} : {
  content: string,
  maxLength: number,
  placeholder: string,
}) {
  const { editable } = useProfile()
  const { state } = useStatefulSection()
  const { text, setText, onChange } = useField()
  const textareaRef = useRef<HTMLTextAreaElement>()

  useEffect(() => {
    if (state === 'edit') {
      textareaRef.current.value = content
    }
  }, [state])

  useEffect(() => {
    setText(content || '')
  }, [])

  return (
    <>
      {state === 'default'
        ? (
          <p className={cn(styles.content, content || styles.placeholder)}>
            {content || (editable && placeholder)}
          </p>
        ) : (
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              maxLength={maxLength}
              onChange={onChange}
              placeholder={placeholder}
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
