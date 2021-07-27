import styles from 'sass/templates/progress/index.module.scss'
import Step from 'components/progress/step'
import { useAuth } from 'providers/auth'
import Steps from 'components/progress/steps'
import { useRoom } from 'providers/chat/room'

export default function Progress() {
  const { room } = useRoom()

  const { status } = room.latestEstimate

  const { userType } = useAuth().user

  const defaultSteps = [
    '입금 요청',
    '입금 확인 중',
  ]

  const steps = userType === 'D'
    ? defaultSteps.concat('코디 진행', '리뷰 작성')
    : defaultSteps.concat('입금 확정')

  const maxProgress = userType === 'D' ? 4 : 3

  if (status === 0 || status > maxProgress) {
    return <></>
  }

  return (
    <section className={styles.container}>
      <ol className={styles.list}>
        {steps.map((value, index) => (
          <Step key={value} index={index + 1} active={index + 1 === status}>
            {value}
          </Step>
        ))}
      </ol>
      <Steps index={status - 1} />
    </section>
  )
}
