import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import FilterModal from './filter-modal'
import AppBar from '.'

export default function StylistListAppBar() {
  const router = useRouter()
  const onClickSearch = () => (
    router.push('/stylist/search')
  )

  return (
    <>
      <AppBar
        title="스타일리스트"
        back
        actions={[
          <Icon
            key="search"
            src="search.png"
            size={24}
            onClick={onClickSearch}
          />,
          <FilterModal key="filterModal" />,
        ]}
      />
    </>
  )
}
