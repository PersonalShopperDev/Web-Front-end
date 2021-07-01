import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/price.module.scss'
import Field, { useField } from './field'
import { useStatefulSection } from './stateful-section'

export default function Price({
  data = 20110,
}: {
  data: number
}) {
  return (
    <Field head="코디가격" name="price" type="number" content={data.toString()}>
      <Inner data={data} />
    </Field>
  )
}

function Inner({ data }: { data: number }) {
  const { state } = useStatefulSection()
  const { onChange } = useField()
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (state === 'edit') {
      inputRef.current.value = data.toString()
    }
  }, [state])

  return (
    <>
      {state === 'default' ? (
        <p className={styles.content}>{data}</p>
      ) : (
        <input ref={inputRef} className={styles.input} type="number" onChange={onChange} />
      )}
    </>
  )
}
