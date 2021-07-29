import Modal from 'components/modal'
import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import { ChangeEvent, FormEvent, useRef } from 'react'
import styles from 'sass/components/chat/form.module.scss'
import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'
import { MIN_PROGRESS, SUPPLIER_MAX_PROGRESS } from './room'

export default function ChatRoom() {
  const router = useRouter()

  const { user } = useAuth()

  const { room } = useRoom()

  const { createAlert } = useAlert()

  const inputRef = useRef<HTMLInputElement>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputRef.current.value) {
      return
    }
    room.sendMessage(inputRef.current.value)
    inputRef.current.value = ''
  }

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const image = await resizeImageFile(file)

    const formData = new FormData()

    formData.append('img', image)

    await communicate({
      url: `/chat/${room.id}/img`,
      options: {
        body: formData,
      },
      method: 'POST',
    }).then((res) => {
      if (!res.ok) {
        throw new Error()
      }
    }).catch(async () => {
      await createAlert({ text: ERROR_MESSAGE })
    })
  }

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
    || latestEstimate.status > MIN_PROGRESS
    || latestEstimate.status === 0

  const suggestionDisabled = latestEstimate.status !== 4

  const inputDisabled = false

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {(user.userType === 'S' || user.userType === 'W') && (
        <Modal
          initializer={(
            <div className={styles.plus}>
              <Icon src="chat-plus.png" size={18} />
            </div>
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
