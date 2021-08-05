import { useLayout } from 'layouts/default'
import { useChat } from 'providers/chat'
import { useRef, useEffect } from 'react'
import styles from 'sass/components/chat/list/index.module.scss'
import Room from './room'

export default function ChatList() {
  const { rooms, appendRooms } = useChat()

  const { mainRef } = useLayout()

  const pageRef = useRef<number>(0)

  const onScroll = async () => {
    const { scrollTop, scrollHeight, clientHeight } = mainRef.current
    if (scrollTop < scrollHeight - clientHeight) {
      return
    }

    const changed = await appendRooms(pageRef.current + 1)

    if (!changed) {
      return
    }

    pageRef.current += 1
  }

  const attachListener = () => {
    mainRef.current.addEventListener('scroll', onScroll)
  }

  const detachListener = () => {
    mainRef.current?.removeEventListener('scroll', onScroll)
  }

  useEffect(() => {
    attachListener()
    return detachListener
  }, [])

  return (
    <section className={styles.container}>
      {rooms?.map(({
        id, other, lastChat, lastChatTime, unreadCount,
      }) => {
        const { profileImg, name } = other
        return (
          <Room
            key={id}
            id={id}
            img={profileImg}
            unreadCount={unreadCount}
            name={name}
            lastChat={lastChat}
            lastChatTime={lastChatTime}
          />
        )
      })}
    </section>
  )
}
