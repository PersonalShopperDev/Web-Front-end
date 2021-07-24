import AppBar from '.'

export default function RoomAppBar({
  title,
} : {
  title: string,
}) {
  return (
    <AppBar
      title={title}
      back
      backUrl="/chat"
    />
  )
}
