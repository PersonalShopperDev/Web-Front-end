import { useChat } from 'providers/chat'
import styles from 'sass/components/chat/list/index.module.scss'
import Room from './room'

export default function ChatList() {
  const { rooms } = useChat()

  return (
    <section className={styles.container}>
      {rooms?.map(({
        id, other, lastChat, lastChatTime,
      }) => {
        const { profileImg, name } = other
        return (
          <Room
            key={id}
            id={id}
            img={profileImg}
            name={name}
            lastChat={lastChat}
            lastChatTime={lastChatTime}
          />
        )
      })}
    </section>
  )
}