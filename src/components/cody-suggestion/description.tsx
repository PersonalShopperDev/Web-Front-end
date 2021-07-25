/* eslint-disable no-param-reassign */
import React, { ChangeEvent, useRef, useEffect } from 'react'
import styles from 'sass/components/description.module.scss'
import { ProductDescription } from 'templates/cody-suggestion/index'

export default function Description({
  descriptionRef,
  description,
}: {
  descriptionRef: ProductDescription
  description: ProductDescription
}) {
  const titleRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLTextAreaElement>()
  const update = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: string,
  ) => {
    descriptionRef.current[key] = e.target.value
  }
  const onChangeInput = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.id === 'title') {
      update(e, 'title')
    } else if (e.target.id === 'content') {
      update(e, 'content')
    }
  }

  useEffect(() => {
    titleRef.current.value = description.title
    contentRef.current.value = description.content
  }, [description])
  return (
    <>
      <div className={styles.title}>
        <input type="text" ref={titleRef} placeholder="제목" id="title" onChange={onChangeInput} />
      </div>
      <div className={styles.description}>
        <textarea
          ref={contentRef}
          placeholder="이 코디에 대한 설명을 써주세요"
          rows={10}
          id="content"
          onChange={onChangeInput}
        />
      </div>
    </>
  )
}
