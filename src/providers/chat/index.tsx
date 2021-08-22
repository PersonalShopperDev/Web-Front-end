import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import useForceUpdate from 'lib/hooks/force-update'
import Room, { OnRecieveMessageProps, OnChangePaymentStatusProps, RoomProps } from 'lib/model/room'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN, useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import {
  useState, ReactNode, useContext, createContext, useRef, useEffect,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface OnReceive extends OnRecieveMessageProps {
  roomId: number
}

type OpenProps = Omit<RoomProps, 'socketRef' | 'update'>

interface ChatContextProps {
  rooms: Room[]
  open: (props : OpenProps) => Room
  appendRooms: (page: number) => Promise<boolean>
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

  const onReceive = async ({ roomId, ...props } : OnReceive) => {
    const room = await getReceivedRoom(roomId)

    room?.onReceive(props)
  }

  const onRead = async ({ roomId } : { roomId: number}) => {
    const room = await getReceivedRoom(roomId)

    room?.onRead()
  }

  const onChangePaymentStatus = async ({
    roomId, ...props
  } : { roomId: number } & OnChangePaymentStatusProps) => {
    const room = await getReceivedRoom(roomId)

    room?.onChangePaymentStatus(props)
  }

  const disconnect = () => {
    socketRef.current.disconnect()
  }

  const attachListener = () => {
    socketRef.current.on('receiveMsg', onReceive)
    socketRef.current.on('readMsg', onRead)
    socketRef.current.on('onChangePaymentStatus', onChangePaymentStatus)
  }

  const getReceivedRoom = async (id: number, fail : number = 0) : Promise<Room> => {
    if (fail === 5) {
      await createAlert({ text: ERROR_MESSAGE })
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

  const assignRoom = ({
    roomId,
    targetUser,
    unreadCount,
    lastChat,
    lastChatTime,
    lastChatType,
  }) => {
    const { userId } = user
    return new Room({
      id: roomId,
      unreadCount,
      userId,
      other: targetUser,
      lastChat: lastChatType === 6 ? Room.PICTURE_LAST_CHAT : lastChat,
      lastChatTime,
      socketRef,
      update,
    })
  }

  const initializeRoom = async () => {
    const res = await communicate({
      url: '/chat',
    })

    if (res.status !== 200) {
      createAlert({ text: ERROR_MESSAGE })
      return
    }

    const data = await res.json()

    roomsRef.current = data.map(assignRoom)

    update()
  }

  const appendRooms = async (page: number) => {
    const res = await communicate({
      url: `/chat?page=${page}`,
    })

    if (res.status !== 200) {
      createAlert({ text: ERROR_MESSAGE })
      return false
    }

    const data = await res.json()

    if (data.length === 0) {
      return false
    }

    roomsRef.current = [...roomsRef.current, ...data.map(assignRoom)]

    update()

    return true
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
    appendRooms,
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
