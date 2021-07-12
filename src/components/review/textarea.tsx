import { ChangeEvent, useEffect, useState } from 'react'
import styles from 'sass/components/review/textarea.module.scss'
import { useReviewEditor } from 'templates/review-editor'
import Section from './section'

export default function Textarea() {
  const { dataRef } = useReviewEditor()

  const [value, setValue] = useState<string>()

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    dataRef.current.textarea = value
  }, [value])

  return (
    <Section
      head="코디에 대해 리뷰 남기기"
    >
      <textarea
        className={styles.container}
        placeholder="리뷰를 작성해 보세요."
        maxLength={700}
        onChange={onChange}
      />
    </Section>
  )
}
