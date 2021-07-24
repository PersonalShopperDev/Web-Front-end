import communicate from 'lib/api'
import useForceUpdate from 'lib/hooks/force-update'
import Room, { RecieveMessageProps, RoomProps } from 'lib/model/room'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import {
  useState, ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface OnPayment {
  roomId: number
  value: boolean
}

interface OnResponseEstimate {
  roomId: number
  estimateId: number
  value: boolean
}

interface OnReceive extends RecieveMessageProps {
  roomId: number
}

type OpenProps = Omit<RoomProps, 'socketRef' | 'update'>

interface ChatContextProps {
  rooms: Room[]
  open: (props : OpenProps) => Room
}

const ChatContext = createContext<ChatContextProps>(null)

export const useChat = () => useContext(ChatContext)

export default function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const { createAlert } = useAlert()

  const socketRef = useRef<Socket>()

  const roomsRef = useRef<Room[]>([])

  const update = useForceUpdate()

  const [load, setLoad] = useState<boolean>(false)

  const connect = () => {
    socketRef.current = io(process.env.SOCKET_URL, {
      path: '/v1/socket/',
      auth: {
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
      },
    })
  }

  const isConnected = () => socketRef.current?.connected

  const onPayment = async ({ roomId, ...props } : OnPayment) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onPayment(props)
  }

  const onResponseEstimate = async ({ roomId, ...props } : OnResponseEstimate) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onResponseEstimate(props)
  }

  const onReceive = async ({ roomId, ...props } : OnReceive) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onReceive(props)
  }

  const onRead = async ({ roomId } : { roomId: number}) => {
    const room = await getReceivedRoom(roomId)

    if (!room) {
      return
    }

    room.onRead()
  }

  const disconnect = () => {
    socketRef.current.disconnect()
  }

  const attachListener = () => {
    socketRef.current.on('payment', onPayment)
    socketRef.current.on('responseEstimate', onResponseEstimate)
    socketRef.current.on('receiveMsg', onReceive)
    socketRef.current.on('readMsg', onRead)
  }

  const getReceivedRoom = async (id: number, fail : number = 0) : Promise<Room> => {
    if (fail === 5) {
      await createAlert({ text: '오류가 발생했습니다' })
      return null
    }

    const result = roomsRef.current.find((room) => room.id === id)

    if (!result) {
      await initializeRoom()
      return getReceivedRoom(id, fail + 1)
    }

    return result
  }

  const open = (props : OpenProps) => {
    const { userId } = user

    const room = new Room({
      socketRef, userId, update, ...props,
    })
    roomsRef.current.push(room)
    return room
  }

  const initializeRoom = async () => {
    const res = await communicate({
      url: '/chat',
    })

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    const { userId } = user

    roomsRef.current = data.map(({
      roomId, targetUser, unreadCount, lastChat, lastChatTime,
    }) => new Room({
      id: roomId, unreadCount, userId, other: targetUser, lastChat, lastChatTime, socketRef, update,
    }))

    update()
  }

  const initialize = async () => {
    connect()
    attachListener()
    await initializeRoom()
    setLoad(true)
  }

  useEffect(() => {
    if (isConnected()) {
      setLoad(true)
      return null
    }

    if (!user) {
      setLoad(true)
      return null
    }

    initialize()

    return disconnect
  }, [user])

  const value = {
    rooms: roomsRef.current,
    open,
  }

  if (!load) {
    return <></>
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}
