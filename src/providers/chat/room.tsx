import Room, { Other, RecieveMessageProps } from 'lib/model/room'
import {
  ReactNode, useState, useEffect, useContext, createContext,
} from 'react'
import { useChat } from '.'

interface RoomContextProps {
  room: Room
}

const RoomContext = createContext<RoomContextProps>(null)

export const useRoom = () => useContext(RoomContext)

interface Props {
  children: ReactNode
  id: string
  data: {
    targetUser: Other
    chatList: RecieveMessageProps[]
  }
}

export default function RoomProvider({
  children,
  id,
  data,
} : Props) {
  const { rooms, open } = useChat()

  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    if (!rooms) {
      return
    }

    const roomId = parseInt(id, 10)

    const assigned = rooms.find((element) => element.id === roomId)

    if (assigned) {
      setRoom(assigned)
      return
    }

    const created = open({ id, other: data.targetUser })
    setRoom(created)
  }, [rooms])

  if (!room) {
    return <></>
  }

  const value = {
    room,
  }

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  )
}
