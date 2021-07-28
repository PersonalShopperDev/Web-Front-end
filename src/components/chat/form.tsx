import Modal from 'components/modal'
import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import { ChangeEvent, FormEvent, useRef } from 'react'
import styles from 'sass/components/chat/form.module.scss'
import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import { MIN_PROGRESS, SUPPLIER_MAX_PROGRESS } from './room'

export default function ChatRoom() {
  const router = useRouter()

  const { user } = useAuth()

  const { room } = useRoom()

  const inputRef = useRef<HTMLInputElement>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputRef.current.value) {
      return
    }
    room.sendMessage(inputRef.current.value)
    inputRef.current.value = ''
  }

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {}

  const uploadProposal = () => {
    if (proposalDisabled) {
      return
    }

    router.push(`/propose/new?uid=${room.other.id}`)
  }

  const uploadSuggestion = () => {
    if (suggestionDisabled) {
      return
    }

    router.push(`/suggestion/new?uid=${room.other.id}`)
  }

  const { latestEstimate } = room

  const proposalDisabled = latestEstimate.status === SUPPLIER_MAX_PROGRESS
    || latestEstimate.status < MIN_PROGRESS

  const suggestionDisabled = latestEstimate.status !== 3

  const inputDisabled = false

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {(user.userType === 'S' || user.userType === 'W') && (
        <Modal
          initializer={(
            <button className={styles.plus} type="button">
              <Icon src="chat-plus.png" size={18} />
            </button>
          )}
        >
          <section className={styles.dialog}>
            <h2 className={styles.title}>원하는 양식을 선택하세요</h2>
            <div className={styles.options}>
              <button className={styles.button} type="button" onClick={uploadProposal} disabled={proposalDisabled}>
                <Icon src="credit.png" size={24} />
                <div>견적 보내기</div>
              </button>
              <button className={styles.button} type="button" onClick={uploadSuggestion} disabled={suggestionDisabled}>
                <Icon src="shopping.png" size={24} />
                <div>코디 보내기</div>
              </button>
            </div>
          </section>
        </Modal>
      )}
      <label className={styles.imagePicker} htmlFor="image-picker">
        <Icon src="camera-black.png" size={25} />
        <input
          id="image-picker"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={uploadImage}
          style={{ display: 'none' }}
        />
      </label>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="문의할 내용을 입력해 주세요"
        autoComplete="off"
        disabled={inputDisabled}
      />
      <input className={styles.submit} type="submit" value="보내기" disabled={inputDisabled} />
    </form>
  )
}
