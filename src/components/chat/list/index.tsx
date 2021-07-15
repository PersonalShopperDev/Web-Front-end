import { useChat } from 'providers/chat'
import styles from 'sass/components/chat/list/index.module.scss'
import Room from './room'

export default function ChatList() {
  const { rooms } = useChat()

  return (
    <section className={styles.container}>
      {rooms?.map((room) => {
        const { id } = room
        return <Room key={id} id={id} img="/images/sample-avatar.jpg" name={`오진수${id}`} />
      })}
    </section>
  )
}
