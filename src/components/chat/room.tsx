import {
  MyMessage, MyProposalMessage, YourMessage, YourProposalMessage,
} from 'lib/model/entity/message'
import Message from 'lib/model/entity/message/base.entity'
import { useRoom } from 'providers/chat/room'
import {
  useEffect, ChangeEvent, FormEvent, useRef,
} from 'react'
import styles from 'sass/components/chat/room.module.scss'
import Icon from 'widgets/icon'
import MyMessageSpeachBubble from './speach-bubble/my-message'
import MyProposalSpeachBubble from './speach-bubble/my-proposal'
import YourMessageSpeachBubble from './speach-bubble/your-message'
import YourProposalSpeachBubble from './speach-bubble/your-proposal'

export default function ChatRoom() {
  const { room } = useRoom()

  const innerRef = useRef<HTMLDivElement>()

  const { messages, other } = room

  const { profileImg } = other

  const inputRef = useRef<HTMLInputElement>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputRef.current.value) {
      return
    }
    room.sendMessage(inputRef.current.value)
    inputRef.current.value = ''
  }

  const upload = (e: ChangeEvent<HTMLInputElement>) => {}

  const getMessage = (message: Message) => {
    if (message instanceof MyProposalMessage) {
      const { content, price, timestamp } = message
      return (
        <MyProposalSpeachBubble
          key={timestamp}
          price={price}
          content={content}
          timestamp={timestamp}
        />
      )
    }
    if (message instanceof YourProposalMessage) {
      const { content, price, timestamp } = message
      return (
        <YourProposalSpeachBubble
          key={timestamp}
          price={price}
          content={content}
          timestamp={timestamp}
          image={profileImg}
        />
      )
    }
    if (message instanceof MyMessage) {
      const { content, timestamp } = message
      return (
        <MyMessageSpeachBubble
          key={timestamp}
          content={content}
          timestamp={timestamp}
        />
      )
    }
    if (message instanceof YourMessage) {
      const { content, timestamp } = message
      return (
        <YourMessageSpeachBubble
          key={timestamp}
          content={content}
          timestamp={timestamp}
          image={profileImg}
        />
      )
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
        <div className={styles.list}>{messages?.map(getMessage)}</div>
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
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="문의할 내용을 입력해 주세요"
          autoComplete="off"
        />
        <input className={styles.submit} type="submit" value="보내기" />
      </form>
    </section>
  )
}
