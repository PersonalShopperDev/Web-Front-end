import AppBar from '.'
import DrawerHandle from './drawer-handle'

export default function HomeAppBar({
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
