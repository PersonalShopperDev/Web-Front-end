import Avatar from 'widgets/avatar'

export default function AppBarAvatar({
  size,
} : {
  size?: number
}) {
  return (
    <Avatar src="/images/sample-avatar.jpg" size={size} />
  )
}

AppBarAvatar.defaultProps = {
  size: 31,
}
