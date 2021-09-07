import { useProfile } from 'providers/profile'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/price.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

export default function Price() {
  const { user } = useProfile()
  const { price } = user

  return (
    <Field head="코디가격" name="price" type="number" content={price?.toLocaleString('ko-KR') || '0'}>
      <Inner />
    </Field>
  )
}

function Inner() {
  const { state } = useStatefulSection()
  const { onChange } = useField()
  const { user } = useProfile()
  const { price } = user
  const inputRef = useRef<HTMLInputElement>()

  const onKeyUp = () => {
    inputRef.current.value = inputRef.current.value.replace(/[^0-9]/g, '')
  }

  useEffect(() => {
    if (state === 'edit') {
      inputRef.current.value = price?.toString()
    }
  }, [state])

  return (
    <>
      {state === 'default' ? (
        <>
          {price && <p className={styles.content}>{`${price?.toLocaleString('ko-KR') || 0}원`}</p>}
        </>
      ) : (
        <input ref={inputRef} className={styles.input} type="number" onChange={onChange} onKeyUp={onKeyUp} pattern="\d*" />
      )}
    </>
  )
}
