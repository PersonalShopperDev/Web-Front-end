import Icon from 'widgets/icon'
import styles from 'sass/components/app-bar/room.module.scss'
import { useRoom } from 'providers/chat/room'
import { cn } from 'lib/util'
import { useAuth } from 'providers/auth'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRouter } from 'next/router'
import AppBar from '.'

export default function RoomAppBar({
  title,
} : {
  title: string,
}) {
  const router = useRouter()

  const { userType } = useAuth().user

  const { createAlert } = useAlert()

  const { room } = useRoom()

  const { status: paymentStatus, requestEditCoordId } = room.payment

  const paymentRequestEnabled = paymentStatus === 0

  const sendCoordEnabled = paymentStatus === 2

  const requestPayment = async () => {
    const res = await communicate({
      url: `/payment/${room.id}/account`,
      method: 'POST',
    })

    if (res.status !== 201) {
      await createAlert({ text: ERROR_MESSAGE })
    }
  }

  const sendCoord = () => {
    router.push(`/suggestion/new?uid=${room.other.id}`)
  }

  const isStylist = userType === 'S' || userType === 'W'

  const actions = [
    <button
      key="request-payment"
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
      key="send-coord"
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
        {sendCoordEnabled && requestEditCoordId ? '코디 수정하기' : '코디보내기'}
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
