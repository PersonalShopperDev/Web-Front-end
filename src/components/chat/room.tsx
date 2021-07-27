import { cn } from 'lib/util'
import communicate from 'lib/api'
import { useRoom } from 'providers/chat/room'
import {
  useState, useEffect, useRef,
} from 'react'
import styles from 'sass/components/chat/room.module.scss'
import DateDivider from './date-divider'
import Message from './message'
import Form from './form'

type State = 'ready' | 'default' | 'pending'

export default function ChatRoom() {
  const { room } = useRoom()

  const [state, setState] = useState<State>('ready')

  const stateRef = useRef<State>(state)

  const innerRef = useRef<HTMLDivElement>()

  const { messages } = room

  const loadMoreMessages = async () => {
    if (stateRef.current === 'ready') {
      return
    }

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

    if (messages.length === 0) {
      return
    }

    if (messages[messages.length - 1].id !== room.userId) {
      room.read()
    }

    scrollDown('smooth')
  }, [messages.length])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    scrollDown()
    innerRef.current.addEventListener('scroll', onScroll)

    setState('default')
    return () => innerRef.current?.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.container}>
      <section ref={innerRef} className={styles.inner}>
        <div className={cn(styles.list, state === 'ready' && styles.ready)}>
          {messages?.reduce((acc, cur, i, arr) => {
            if (i > 0) {
              const currentDate = new Date(cur.timestamp).getDate()
              const previousDate = new Date(arr[i - 1].timestamp).getDate()
              if (currentDate !== previousDate) {
                acc.push(<DateDivider key={`${cur.id}-t`} timestamp={cur.timestamp} />)
              }
            }
            return [...acc, <Message key={`${cur.id}-${1}`} message={cur} />]
          }, [])}
        </div>
      </section>
      <Form />
    </section>
  )
}
