import Room, { LatestEstimate, Other, RecieveMessageProps } from 'lib/model/room'
import { useAuth } from 'providers/auth'
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
  data: RoomProviderData
}

export interface RoomProviderData {
  latestEstimate: LatestEstimate
  targetUser: Other
  chatList: RecieveMessageProps[]
}

export default function RoomProvider({
  children,
  id,
  data,
} : Props) {
  const { user } = useAuth()

  const { rooms, open } = useChat()

  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    const { targetUser, chatList, latestEstimate } = data

    const roomId = parseInt(id, 10)

    const assigned = rooms.find((element) => element.id === roomId)

    if (assigned) {
      if (chatList) {
        assigned.initializeMessage(chatList)
      }

      if (latestEstimate) {
        assigned.initializeLatestEstimate(latestEstimate)
      }

      assigned.read()
      setRoom(assigned)
      return
    }

    const { userId } = user

    const created = open({
      id, userId, unreadCount: 0, other: targetUser, messages: chatList, latestEstimate,
    })

    setRoom(created)
  }, [])

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
