import Avatar from 'src/widget/avatar'
import AppBar from '.'

export default function StylistHomeAppBar() {
  return (
    <AppBar
      title="스타일리스트"
      actions={[
        <Avatar
          key="avatar"
          src="/images/sample-avatar.jpg"
          size={31}
          href="/"
        />,
      ]}
    />
  )
}
