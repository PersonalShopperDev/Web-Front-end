import styles from 'sass/components/profile/input-field.module.scss'
import Field, { useField } from './field'

export default function InputField({
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
  const { state, inputRef } = useField()
  const defaultValue = '내용을 입력해주세요.'

  return (
    <>
      {state === 'default'
        ? <p className={styles.content}>{content || defaultValue}</p>
        : <input ref={inputRef} className={styles.input} type="text" />}
    </>
  )
}

InputField.defaultProps = {
  content: null,
}
