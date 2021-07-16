import AppBar from '.'
import DrawerHandle from './drawer-handle'

export default function StylistHomeAppBar({
  title,
} : {
  title: string,
}) {
  return (
    <AppBar
      title={title}
      actions={[
        <DrawerHandle key="drawerHandle" />,
      ]}
    />
  )
}
