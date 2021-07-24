import Icon from 'widgets/icon'
import { useRouter } from 'next/router'
import { useAlert } from 'providers/dialog/alert/inner'
import FilterModal from './filter-modal'
import AppBar from '.'

export default function UserListAppBar({ userType }) {
  const router = useRouter()
  const { createAlert } = useAlert()

  const onClickSearch = async () => {
    if (userType === 'S') {
      router.push('/users/search')
    } else {
      await createAlert({ text: '준비중입니다' })
    }
  }

  return (
    <AppBar
      title={userType === 'S' ? '스타일리스트' : '쇼퍼'}
      back
      actions={[
        <Icon
          key="search"
          src="search.png"
          size={24}
          onClick={onClickSearch}
        />,
        <FilterModal key="filterModal" userType={userType} />,
      ]}
    />
  )
}
