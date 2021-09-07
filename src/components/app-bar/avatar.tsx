import { useAuth } from 'providers/auth'
import Avatar from 'widgets/avatar'

export default function AppBarAvatar({
  size,
} : {
  size?: number
}) {
  const { user } = useAuth()
  const { profileImg: img } = user || {}

  return (
    <Avatar src={img || '/images/default-avatar.png'} size={size} />
  )
}

AppBarAvatar.defaultProps = {
  size: 31,
}
