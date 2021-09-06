import React, { useEffect } from 'react'
import StylePicture from 'components/information/style-picture'
import styles from 'sass/templates/information/style-change.module.scss'
import { useOnboarding } from 'providers/onboarding'
import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'
import communicate from 'lib/api'

export default function StyleChange() {
  const { fetchUser } = useAuth()
  const { setOnEdit, fetchInformationData, stylePicture } = useOnboarding()
  const router = useRouter()

  const onEditStylePicture = async () => {
    await communicate({ url: '/style/img', payload: { list: stylePicture }, method: 'PUT' })
    fetchInformationData()
  }

  const onClickEdit = async () => {
    onEditStylePicture()
    await fetchUser()
    router.back()
  }

  useEffect(() => {
    setOnEdit(onEditStylePicture)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>다음 사진 중 마음에 드는 스타일을 골라주세요</span>
        <span className={styles.text}>(최대 3개)</span>
        <StylePicture />
      </div>
      <footer>
        <section className={styles.bottom}>
          <div className={styles.gradient}>
            <button type="button" className={styles.completeButton} onClick={onClickEdit}>
              <span className={styles.nextText}>수정하기</span>
            </button>
          </div>
        </section>
      </footer>
    </>
  )
}
