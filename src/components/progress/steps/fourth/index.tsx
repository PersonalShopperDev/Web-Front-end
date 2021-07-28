import Link from 'next/link'
import { useRoom } from 'providers/chat/room'
import styles from 'sass/components/progress/steps/fourth.module.scss'
import BaseStep from '../base'

export default function FourthStep() {
  const { room } = useRoom()

  const { latestEstimate } = room

  const href = `/review/new/${latestEstimate.estimateId}`

  return (
    <BaseStep
      title="STEP4. 코디 진행 중"
    >
      <p>코디 서비스가 진행 중입니다.</p>
      <p>
        최종 코디를 받아 보신 후, 코디가 맘에 드셨다면 아래의 코디 확정 버튼을 눌러주세요! 혹시 코디 결과가 맘에 드지 않는 경우, 1 회 수정을 요청할 수 있어요
      </p>
      <Link href={href}>
        <a className={styles.button} href={href}>
          리뷰쓰러 가기
        </a>
      </Link>
    </BaseStep>
  )
}
