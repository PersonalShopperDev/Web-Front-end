import styles from 'sass/components/cody-suggestion-app-bar.module.scss'
import AppBar from '.'
import SaveModal from './save-modal'

export default function CodySuggestionAppBar() {
  return (
    <AppBar
      title="코디제안"
      landings={[
        <SaveModal key="save_modal" />,
      ]}
      actions={[
        <button type="button" className={styles.tempStorage} id="storage" key="storage_btn">
          <span>임시저장</span>
        </button>,
      ]}
    />
  )
}
