import { useAuth } from 'providers/auth'
import Avatar from 'widgets/avatar'

export default function AppBarAvatar({
  size,
} : {
  size?: number
}) {
  const { user } = useAuth()
  const { img } = user || {}

  return (
    <Avatar src={img} size={size} />
  )
}

AppBarAvatar.defaultProps = {
  size: 31,
}
