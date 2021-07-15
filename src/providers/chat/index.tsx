import communicate from 'lib/api'
import useForceUpdate from 'lib/hooks/force-update'
import Room from 'lib/model/room'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import {
  ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface ChatContextProps {
  rooms: Room[]
}

const ChatContext = createContext<ChatContextProps>(null)

export const useChat = () => useContext(ChatContext)

export default function ChatProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket>()

  const roomsRef = useRef<Room[]>([])

  const update = useForceUpdate()

  const connect = () => {
    socketRef.current = io(process.env.SOCKET_URL, {
      path: '/v1/socket/',
      auth: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    })
  }

  const onPayment = ({ roomId, ...props } : {
    roomId: number
    value: boolean
  }) => {
    roomsRef.current.find((room) => room.id === roomId).onPayment(props)
    update()
  }

  const onResponseEstimate = ({ roomId, ...props } : {
    roomId: number
    value: boolean
  }) => {
    roomsRef.current.find((room) => room.id === roomId).onResponseEstimate(props)
    update()
  }

  const onReceive = ({ roomId, ...props } : {
    roomId: number
    type: number
    msg: string
    price: number
    coordTitle: string
    coordImg: ArrayBuffer
  }) => {
    console.log('received something')
    roomsRef.current.find((room) => room.id === roomId).onReceive(props)
    update()
  }

  const disconnect = () => {
    socketRef.current.disconnect()
  }

  const attachEventListener = () => {
    socketRef.current.on('payment', onPayment)
    socketRef.current.on('responseEstimate', onResponseEstimate)
    socketRef.current.on('receiveMsg', onReceive)
  }

  const initializeRoom = async () => {
    const res = await communicate({
      url: '/chat',
    })

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    roomsRef.current = data.map(({ roomId, users }) => new Room(roomId, users, socketRef, update))
    update()
  }

  useEffect(() => {
    connect()
    attachEventListener()

    initializeRoom()
    return disconnect
  }, [])

  const value = {
    rooms: roomsRef.current,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
