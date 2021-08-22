import Icon from 'widgets/icon'
import styles from 'sass/components/app-bar/room.module.scss'
import { useRoom } from 'providers/chat/room'
import { cn } from 'lib/util'
import { useAuth } from 'providers/auth'
import AppBar from '.'

export default function RoomAppBar({
  title,
} : {
  title: string,
}) {
  const { userType } = useAuth().user

  const { room } = useRoom()

  const { status } = room

  const paymentRequestEnabled = status === 0

  const sendNewEnabled = status === 2

  const sendFixedEnabled = status === 4

  const sendCoordEnabled = sendNewEnabled || sendFixedEnabled

  const requestPayment = () => {

  }

  const sendCoord = () => {

  }

  const isStylist = userType === 'S' || userType === 'W'

  const actions = [
    <button
      className={styles.action}
      type="button"
      onClick={requestPayment}
      disabled={!paymentRequestEnabled}
    >
      <Icon
        src={`payment-${paymentRequestEnabled
          ? 'enabled'
          : 'disabled'}.png`}
        size={23}
      />
      <p className={cn(styles.label, paymentRequestEnabled && styles.enabled)}>
        결제요청
      </p>
    </button>,
    <button
      className={styles.action}
      type="button"
      onClick={sendCoord}
      disabled={!sendCoordEnabled}
    >
      <Icon
        src={`coord-${sendCoordEnabled
          ? 'enabled'
          : 'disabled'}.png`}
        size={23}
      />
      <p className={cn(styles.label, sendCoordEnabled && styles.enabled)}>
        코디보내기
      </p>
    </button>,
  ]

  return (
    <AppBar
      title={title}
      centerTitle={false}
      back
      backUrl="/chat"
      actions={isStylist ? actions : []}
    />
  )
}
