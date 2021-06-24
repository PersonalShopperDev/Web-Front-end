import styles from 'sass/components/profile/textarea-field.module.scss'
import Field, { useField } from './field'

export default function TextareaField({
  head,
  content,
} : {
  head: string
  content?: string,
}) {
  return (
    <Field head={head} content={content}>
      <Inner content={content} />
    </Field>
  )
}

function Inner({
  content,
} : {
  content: string
}) {
  const { state, textareaRef } = useField()
  const defaultValue = '내용을 입력해주세요.'

  return (
    <>
      {state === 'default'
        ? <p className={styles.content}>{content || defaultValue}</p>
        : <textarea ref={textareaRef} className={styles.input} />}
    </>
  )
}

TextareaField.defaultProps = {
  content: null,
}
