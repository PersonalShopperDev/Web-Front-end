import communicate from 'lib/api'
import { useRoom } from 'providers/chat/room'
import {
  useState, useEffect, useRef,
} from 'react'
import styles from 'sass/components/chat/room.module.scss'
import DateDivider from './date-divider'
import Message from './message'
import Form from './form'

type State = 'default' | 'pending'

export default function ChatRoom() {
  const { room } = useRoom()

  const [state, setState] = useState<State>('default')

  const stateRef = useRef<State>(state)

  const innerRef = useRef<HTMLDivElement>()

  const { messages } = room

  const loadMoreMessages = async () => {
    setState('pending')

    const roomId = room.id
    const olderChatId = room.messages[0].id

    const res = await communicate({
      url: `/chat/history?roomId=${roomId}&olderChatId=${olderChatId}`,
    })

    if (res.status !== 200) {
      setState('default')
      return
    }

    const { chatList } = await res.json()

    const previousHeight = innerRef.current.scrollHeight

    room.appendMessage(chatList)

    scrollTo(innerRef.current.scrollHeight - previousHeight)

    setState('default')
  }

  const scrollTo = (top: number, behavior : 'auto' | 'smooth' = 'auto') => {
    innerRef.current.scrollTo({ behavior, top })
  }

  const scrollDown = (behavior : 'auto' | 'smooth' = 'auto') => {
    scrollTo(innerRef.current.scrollHeight, behavior)
  }

  const onScroll = () => {
    if (innerRef.current.scrollTop > 0) {
      return
    }

    if (stateRef.current === 'pending') {
      return
    }

    loadMoreMessages()
  }

  useEffect(() => {
    if (stateRef.current === 'pending') {
      return
    }

    scrollDown('smooth')
  }, [messages.length])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    scrollDown()
    innerRef.current.addEventListener('scroll', onScroll)

    return () => innerRef.current?.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.container}>
      <section ref={innerRef} className={styles.inner}>
        <div className={styles.list}>
          {messages?.map((props, index, array) => {
            if (index > 0) {
              const currentDate = new Date(props.timestamp).getDate()
              const previousDate = new Date(array[index - 1].timestamp).getDate()
              if (currentDate !== previousDate) {
                return (
                  <div key={props.id}>
                    <DateDivider timestamp={props.timestamp} />
                    <Message message={props} />
                  </div>
                )
              }
            }
            return <Message key={props.id} message={props} />
          })}
        </div>
      </section>
      <Form />
    </section>
  )
}
