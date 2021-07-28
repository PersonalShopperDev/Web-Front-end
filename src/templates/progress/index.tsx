import styles from 'sass/templates/progress/index.module.scss'
import Step from 'components/progress/step'
import { useAuth } from 'providers/auth'
import Steps from 'components/progress/steps'
import { useRoom } from 'providers/chat/room'
import { DEMANDER_MAX_PROGRESS, MIN_PROGRESS, SUPPLIER_MAX_PROGRESS } from 'components/chat/room'

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

  const maxProgress = userType === 'D' ? DEMANDER_MAX_PROGRESS : SUPPLIER_MAX_PROGRESS

  if (status < MIN_PROGRESS || status > maxProgress) {
    return <></>
  }

  const currentIndex = status - 2

  return (
    <section className={styles.container}>
      <ol className={styles.list}>
        {steps.map((value, index) => (
          <Step key={value} index={index + 1} active={index === currentIndex}>
            {value}
          </Step>
        ))}
      </ol>
      <Steps index={currentIndex} />
    </section>
  )
}
