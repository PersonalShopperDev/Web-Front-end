import { useAuth, User } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { useEffect, useRef } from 'react'
import styles from 'sass/components/profile/temporary-submit.module.scss'

export default function TemporarySubmit() {
  const { user } = useAuth()

  const userRef = useRef<User>(user)

  const { createAlert } = useAlert()

  const onClick = async () => {
    if (!validate()) {
      createAlert({ text: '코디 룩북 외 모든 항목을 기입해주세요.' })
      return
    }

    createAlert({ text: '프로필 등록 완료! 공식 오픈 이후 쇼퍼 리스트 확인, 코디 제안, 채팅 등 다양한 기능이 제공됩니다. 많은 관심 부탁드립니다😃' })
  }

  const validate = () => {
    const {
      coord, introduction, name, careerList, price,
    } = userRef.current

    if (coord.length === 0
        || !introduction
        || !name
        || !careerList[0].value
        || !careerList[1].value
        || !price
    ) {
      return false
    }

    return true
  }

  useEffect(() => {
    userRef.current = user
  }, [user])

  return (
    <section className={styles.container}>
      <button className={styles.button} type="button" onClick={onClick}>확인</button>
    </section>
  )
}
