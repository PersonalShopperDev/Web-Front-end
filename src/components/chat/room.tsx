import Message from 'lib/model/entity/message.entity'
import MyMessage from 'lib/model/entity/my-message.entity'
import YourMessage from 'lib/model/entity/your-message.entity'
import Room from 'lib/model/room'
import {
  useEffect, ChangeEvent, FormEvent, useRef,
} from 'react'
import styles from 'sass/components/chat/room.module.scss'
import Icon from 'widgets/icon'
import MySpeachBubble from './speach-bubble/my'
import YourSpeachBubble from './speach-bubble/your'

export default function ChatRoom({
  room,
} : {
  room: Room
}) {
  const innerRef = useRef<HTMLDivElement>()

  const { messages } = room

  const inputRef = useRef<HTMLInputElement>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputRef.current.value) {
      return
    }
    room.sendMessage(inputRef.current.value)
    inputRef.current.value = ''
  }

  const upload = (e: ChangeEvent<HTMLInputElement>) => {

  }

  const getMessage = (message : Message) => {
    const { content, timestamp } = message
    if (message instanceof MyMessage) {
      return <MySpeachBubble key={timestamp} content={content} timestamp={timestamp} />
    }
    if (message instanceof YourMessage) {
      return <YourSpeachBubble key={timestamp} content={content} timestamp={timestamp} image="/images/sample-image.jpg" />
    }
    return null
  }

  useEffect(() => {
    innerRef.current.scrollTo({
      behavior: 'smooth',
      top: innerRef.current.scrollHeight,
    })
  }, [messages.length])

  return (
    <section className={styles.container}>
      <section ref={innerRef} className={styles.inner}>
        <div className={styles.list}>
          {messages?.map(getMessage)}
        </div>
      </section>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.imagePicker} htmlFor="image-picker">
          <Icon src="camera.png" size={25} />
          <input
            id="image-picker"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={upload}
            style={{ display: 'none' }}
          />
        </label>
        <input ref={inputRef} className={styles.input} type="text" placeholder="문의할 내용을 입력해 주세요" autoComplete="off" />
        <input className={styles.submit} type="submit" value="보내기" />
      </form>
    </section>
  )
}
