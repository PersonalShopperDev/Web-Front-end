import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import {
  ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface ChatContextProps {
  sendMessage: (id: number, message: string) => void
  sendEstimate: (id: number, message: string, price: number) => void
  sendCoord: (id: number, title: string, image: ArrayBuffer) => void
  responseEstimate: (id: number, value: boolean) => void
}

const ChatContext = createContext<ChatContextProps>(null)

export const useChat = useContext(ChatContext)

export default function ChatProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket>()

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

  useEffect(() => {
    connect()
    attachEventListener()

    return disconnect
  }, [])

  const value = {
    sendMessage,
    sendEstimate,
    sendCoord,
    responseEstimate,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
