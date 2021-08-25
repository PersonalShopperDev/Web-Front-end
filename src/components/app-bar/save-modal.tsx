import React from 'react'
import Modal from 'components/modal'
import Icon from 'widgets/icon'
import styles from 'sass/components/save-modal.module.scss'
import { useRouter } from 'next/router'
import { useCodySuggestion } from 'providers/cody-suggestion'

export default function SaveModal() {
  const { step, setStep } = useCodySuggestion()
  const router = useRouter()
  const onClickExit = () => {
    router.back()
  }
  const onClickBack = () => {
    setStep(1)
  }
  return (
    <>
      {step === 1
        ? (
          <Modal
            initializer={(
              <Icon src="back.png" size={17} />
            )}
          >
            <div className={styles.modalBox}>
              <span>잠깐!</span>
              <br />
              <span className={styles.content}>
                작성 중인 내용을
                {' '}
                <span className={styles.bold}>임시저장</span>
                하셨나요?
                저장하지 않고 페이지를 나가시면
                작성하신 코디 내용이 사라집니다😭
              </span>
              <br />
              <button type="button" onClick={onClickExit} className={styles.exit}>
                <span>확인하기</span>
              </button>
            </div>
          </Modal>
        ) : <Icon src="back.png" size={17} onClick={onClickBack} /> }
    </>
  )
}
