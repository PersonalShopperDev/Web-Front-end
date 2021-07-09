import Icon from 'widgets/icon'
import AppBar from '.'

export default function InformationAppBar() {
  return (
    <AppBar
      title="내정보"
      back
      actions={[
        <Icon
          key="exit"
          src="exit.png"
          size={24}
        />,
      ]}
    />
  )
}
