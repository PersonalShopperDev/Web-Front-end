import { useRoom } from 'providers/chat/room'
import { ChangeEvent, FormEvent, useRef } from 'react'
import styles from 'sass/components/chat/room.module.scss'
import Icon from 'widgets/icon'

export default function ChatRoom() {
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
      <label className={styles.imagePicker} htmlFor="image-picker">
        <Icon src="camera.png" size={25} />
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
