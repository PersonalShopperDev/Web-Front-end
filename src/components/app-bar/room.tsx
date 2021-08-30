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

  const { user } = useAuth()

  const {
    userType, price, account, accountUser, bank,
  } = user

  const { createAlert } = useAlert()

  const { room } = useRoom()

  const { status, requestEditCoordId, latestCoordId } = room.payment

  const paymentRequestEnabled = status !== 1 && status !== 2

  const sendCoordEnabled = status === 2 && (!latestCoordId || requestEditCoordId)

  const requestPayment = async () => {
    const hasAccount = bank && account && accountUser

    if (!price) {
      const text = `${hasAccount ? '코디 가격을' : '코디 가격과 계좌 정보를'} 입력하신 다음 다시 시도해 주세요.`
      await createAlert({ text })
      router.push('/profile')
      return
    }

    if (!hasAccount) {
      await createAlert({ text: '계좌 정보를 입력하신 다음 다시 시도해 주세요.' })
      router.push('/profile/account')
      return
    }

    const res = await communicate({
      url: `/payment/${room.id}/request`,
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
