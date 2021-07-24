import Modal from 'components/modal'
import { useAuth } from 'providers/auth'
import { useRoom } from 'providers/chat/room'
import { ChangeEvent, FormEvent, useRef } from 'react'
import styles from 'sass/components/chat/form.module.scss'
import Icon from 'widgets/icon'
import Link from 'next/link'

export default function ChatRoom() {
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
              <Link href={`/propose/new?uid=${room.other.id}`}>
                <a className={styles.button} href={`/propose/new?uid=${room.other.id}`}>
                  <Icon src="credit.png" size={24} />
                  <div>코디 보내기</div>
                </a>
              </Link>
              <Link href={`/suggestion/new?uid=${room.other.id}`}>
                <a className={styles.button} href={`/suggestion/new?uid=${room.other.id}`}>
                  <Icon src="shopping.png" size={24} />
                  <div>코디 보내기</div>
                </a>
              </Link>
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
      />
      <input className={styles.submit} type="submit" value="보내기" />
    </form>
  )
}
