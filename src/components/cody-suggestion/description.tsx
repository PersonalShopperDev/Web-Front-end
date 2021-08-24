/* eslint-disable no-param-reassign */
import React, { ChangeEvent, useRef, useEffect } from 'react'
import styles from 'sass/components/description.module.scss'
import { useCodySuggestion } from 'providers/cody-suggestion'

export default function Description() {
  const { descriptionRef } = useCodySuggestion()
  const titleRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLTextAreaElement>()

  const update = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: string,
  ) => {
    descriptionRef.current[key] = e.target.value
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    update(e, e.target.id)
  }

  useEffect(() => {
    titleRef.current.value = descriptionRef.current.title
    contentRef.current.value = descriptionRef.current.content
  }, [])

  return (
    <>
      <div className={styles.title}>
        <input type="text" ref={titleRef} placeholder="코디제목" id="title" onChange={onChangeInput} />
      </div>
      <div className={styles.description}>
        <textarea
          ref={contentRef}
          placeholder="이 코디에 대한 설명을 써주세요"
          rows={20}
          id="content"
          onChange={onChangeInput}
        />
      </div>
    </>
  )
}
