import communicate from 'lib/api'
import Room from 'lib/entity/room.entity'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import {
  useState, ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface ChatContextProps {
  rooms: Room[]
  sendMessage: (id: number, message: string) => void
  sendEstimate: (id: number, message: string, price: number) => void
  sendCoord: (id: number, title: string, image: ArrayBuffer) => void
  responseEstimate: (id: number, value: boolean) => void
}

const ChatContext = createContext<ChatContextProps>(null)

export const useChat = () => useContext(ChatContext)

export default function ChatProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket>()

  const [rooms, setRooms] = useState<Room[]>([])

  const sendMessage = (id: number, message: string) => {
    socketRef.current.emit('sendMsg', { roomId: id, msg: message })
  }

  const sendEstimate = (id: number, message: string, price: number) => {
    socketRef.current.emit('sendEstimate', { roomId: id, msg: message, price })
  }

  const sendCoord = (id: number, title: string, image: ArrayBuffer) => {
    socketRef.current.emit('sendCoord', {
      roomId: id,
      coordTitle: title,
      coordImg: image,
    })
  }

  const responseEstimate = (id: number, value: boolean) => {
    socketRef.current.emit('responseEstimate', { roomId: id, value })
  }

  const connect = () => {
    socketRef.current = io(process.env.SOCKET_URL, {
      path: '/v1/socket/',
      auth: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    })
  }

  const onPayment = ({
    roomId: id,
    value,
  }: {
    roomId: number
    value: boolean
  }) => {}

  const onResponseEstimate = ({
    roomId: id,
    value,
  }: {
    roomId: number
    value: boolean
  }) => {}

  const onReceiveMessage = ({
    roomId: id,
    type,
    msg: message,
    price,
    coordTitle: title,
    coordImg: img,
  }: {
    roomId: number
    type: number
    msg: string
    price: number
    coordTitle: string
    coordImg: ArrayBuffer
  }) => {}

  const disconnect = () => {
    socketRef.current.disconnect()
  }

  const attachEventListener = () => {
    socketRef.current.on('payment', onPayment)
    socketRef.current.on('responseEstimate', onResponseEstimate)
    socketRef.current.on('receiveMsg', onReceiveMessage)
  }

  const initializeRoom = async () => {
    const res = await communicate({
      url: '/chat',
    })

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    const result = data.map(({ roomId, users }) => new Room(roomId, users))
    setRooms(result)
  }

  useEffect(() => {
    connect()
    attachEventListener()

    initializeRoom()
    return disconnect
  }, [])

  const value = {
    rooms,
    sendMessage,
    sendEstimate,
    sendCoord,
    responseEstimate,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
