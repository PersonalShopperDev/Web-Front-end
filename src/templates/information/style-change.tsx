import React from 'react'
import StylePicture from 'components/information/style-picture'
import styles from 'sass/templates/information/style-change.module.scss'
import { useOnboarding } from 'providers/onboarding'
import { useRouter } from 'next/router'

export default function StyleChange() {
  const { setEdit } = useOnboarding()
  const router = useRouter()

  const onClickEdit = (key) => {
    setEdit(key)
    router.back()
  }
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>다음 사진 중 마음에 드는 스타일을 골라주세요</span>
        <StylePicture />
      </div>
      <footer>
        <section className={styles.tmp}>
          <div className={styles.gradient}>
            <button type="button" className={styles.completeButton} onClick={() => onClickEdit('style')}>
              <span className={styles.nextText}>수정하기</span>
            </button>
          </div>
        </section>
      </footer>
    </>
  )
}
