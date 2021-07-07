import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import AppBar from '.'

export default function StylistListAppBar() {
  const router = useRouter()
  const onClickSearch = () => (
    router.push('/stylist/search')
  )
  const onClickFilter = () => {
    console.log('onclick filter')
  }
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
        <Icon
          key="icon"
          src="filter.png"
          size={23}
          onClick={onClickFilter}
        />,
      ]}
    />
  )
}
