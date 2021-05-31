import Icon from 'src/widget/icon'
import AppBar from '.'

export default function StylistListAppBar() {
  const onClickSearch = () => (
    console.log('move to stylist-search')
  )
  return (
    <AppBar
      title="스타일리스트"
      back
      actions={[
        <Icon
          key="icon"
          src="search.png"
          size={24}
          onClick={onClickSearch}
        />,
      ]}
    />
  )
}
