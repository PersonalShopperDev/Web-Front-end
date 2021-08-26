import { useRoom } from 'providers/chat/room'
import { ChangeEvent, FormEvent, useRef } from 'react'
import styles from 'sass/components/chat/form.module.scss'
import Icon from 'widgets/icon'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'

export default function ChatRoom() {
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

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
