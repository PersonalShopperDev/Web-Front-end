import AppBar from '.'
import DrawerHandle from './drawer-handle'

export default function StylistHomeAppBar() {
  return (
    <AppBar
      title="스타일리스트"
      actions={[
        <DrawerHandle key="drawerHandle" />,
      ]}
    />
  )
}
