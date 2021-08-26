import { useCodySuggestion } from 'providers/cody-suggestion'
import Icon from 'widgets/icon'
import styles from 'sass/components/complete-suggesstion-app-bar.module.scss'
import AppBar from '.'

export default function CompleteSuggestionAppBar() {
  const { detailType, setDetailType } = useCodySuggestion()

  const typeLists = [{
    path: 'cody-group.png',
    title: '모아보기',
  }, {
    path: 'cody-detail.png',
    title: '상세보기',
  }]

  const onClickType = () => {
    if (detailType === 0) {
      setDetailType(1)
    } else {
      setDetailType(0)
    }
  }

  return (
    <AppBar
      title="코디"
      back
      actions={[
        <button key="gathering" type="button" onClick={onClickType} className={styles.container}>
          <Icon src={typeLists[detailType].path} size={20} className={styles.icon} />
          <span>{typeLists[detailType].title}</span>
        </button>,
      ]}
    />
  )
}
