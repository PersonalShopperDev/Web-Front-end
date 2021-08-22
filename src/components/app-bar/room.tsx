import Icon from 'widgets/icon'
import styles from 'sass/components/app-bar/room.module.scss'
import AppBar from '.'

export default function RoomAppBar({
  title,
} : {
  title: string,
}) {
  return (
    <AppBar
      title={title}
      centerTitle={false}
      back
      backUrl="/chat"
      actions={[
        <button className={styles.action} type="button">
          <Icon src="payment-enabled.png" size={23} />
          <p className={styles.label}>결제요청</p>
        </button>,
        <button className={styles.action} type="button">
          <Icon src="coord-enabled.png" size={23} />
          <p className={styles.label}>코디보내기</p>
        </button>,
      ]}
    />
  )
}
