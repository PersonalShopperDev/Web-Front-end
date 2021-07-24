import React, { useRef, useEffect } from 'react'
import styles from 'sass/components/description.module.scss'
import { ProductDescription } from 'templates/cody-suggestion/index'

export default function Description({
  id,
  description,
}: {
  id: number
  description: ProductDescription
}) {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLTextAreaElement>()
  const ClickEventListner = () => {
    const cookieData = {
      title: titleRef.current.value,
      content: descriptionRef.current.value,
    }
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData = JSON.parse(currentTempData)
    if (currentTempData === null) {
      localStorage.setItem(`cody${id}`, JSON.stringify({ description: cookieData }))
    } else {
      localStorage.setItem(`cody${id}`, JSON.stringify({ products: parsedData.products, description: cookieData }))
    }
    titleRef.current.value = ''
    descriptionRef.current.value = ''
  }
  useEffect(() => {
    document.getElementById('storage').addEventListener('click', ClickEventListner)
    document.getElementById('bottom_button').addEventListener('click', ClickEventListner)
    return () => {
      document.getElementById('storage').removeEventListener('click', ClickEventListner)
      document.getElementById('bottom_button').removeEventListener('click', ClickEventListner)
    }
  }, [])
  useEffect(() => {
    if (description !== undefined) {
      titleRef.current.value = description.title
      descriptionRef.current.value = description.content
    }
  }, [description])
  return (
    <>
      <div className={styles.title}>
        <input type="text" ref={titleRef} placeholder="제목" />
      </div>
      <div className={styles.description}>
        <textarea ref={descriptionRef} placeholder="이 코디에 대한 설명을 써주세요" rows={10} />
      </div>
    </>
  )
}
