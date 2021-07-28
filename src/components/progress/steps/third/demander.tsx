import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useRoom } from 'providers/chat/room'
import { useAlert } from 'providers/dialog/alert/inner'
import styles from 'sass/components/progress/steps/third.module.scss'

export default function ThirdStepForDemander() {
  const { room } = useRoom()

  const { latestEstimate } = room

  const { createAlert } = useAlert()

  const onConfirm = async () => {
    const res = await communicate({
      url: `/estimate/${latestEstimate.estimateId}/confirm`,
      method: 'PUT',
    })

    if (res.status !== 200) {
      await createAlert({ text: ERROR_MESSAGE })
    }
  }

  return (
    <>
      <p>고객님의 입금 내역을 확인하였습니다.</p>
      <p>옷.잘.알에 한걸음 가까워지셨네요😉</p>
      <p>이제 스타일리스트와 상담하고 코디를 받아보세요!</p>
      <br />
      <p>
        최종 코디를 받아 보신 후, 코디가 맘에 드셨다면 아래의 코디 확정 버튼을 눌러주세요! 혹시 코디 결과가 맘에 드지 않는 경우, 1회 수정을 요청할 수 있어요.
      </p>
      <button className={styles.button} type="button" onClick={onConfirm}>
        코디 확정하기
      </button>
    </>
  )
}
