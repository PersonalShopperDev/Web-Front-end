import { useAuth } from 'providers/auth'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/price.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

interface PriceData {
  price: number
}

export default function Price({
  data,
}: {
  data: PriceData
}) {
  const { user } = useAuth()
  const { price } = user || data || {}

  return (
    <Field head="코디가격" name="price" type="number" content={price?.toString()}>
      <Inner price={price} />
    </Field>
  )
}

function Inner({
  price,
}: {
  price: number
}) {
  const { state } = useStatefulSection()
  const { onChange } = useField()
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (state === 'edit') {
      inputRef.current.value = price?.toString()
    }
  }, [state])

  return (
    <>
      {state === 'default' ? (
        <>
          {price && <p className={styles.content}>{price}</p>}
        </>
      ) : (
        <input ref={inputRef} className={styles.input} type="number" onChange={onChange} />
      )}
    </>
  )
}
