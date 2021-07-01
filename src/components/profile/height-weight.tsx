import communicate from 'lib/api'
import { cn } from 'lib/util'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { useEffect, useState, useRef } from 'react'
import styles from 'sass/components/profile/height-weight.module.scss'
import StatefulSection, { useStatefulSection } from './stateful-section'

export default function Wardrobe() {
  return (
    <StatefulSection head="내 체형">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const [publicState, setPublicState] = useState(false)

  const publicStateRef = useRef<boolean>()
  const heightRef = useRef<HTMLInputElement>()
  const weightRef = useRef<HTMLInputElement>()

  const { fetchUser } = useAuth()
  const { setOnEdit, setState } = useStatefulSection()
  const { createAlert } = useAlert()

  const onSwitch = () => {
    setPublicState((state) => !state)
  }

  const onEdit = async () => {
    const height = heightRef.current.value
    const weight = weightRef.current.value
    if (!height || !weight) {
      await createAlert({ text: '내용을 채워주세요' })
      return
    }

    const isPublic = publicStateRef.current

    console.log({
      bodyStat: {
        isPublic,
        height,
        weight,
      },
    })
    await communicate({
      url: '/profile',
      payload: {
        bodyStat: {
          isPublic,
          height,
          weight,
        },
      },
      method: 'PATCH',
    }).then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      fetchUser()
    }).catch(async () => {
      await createAlert({ text: '에러가 발생했습니다' })
    })

    setState('default')
  }

  useEffect(() => {
    publicStateRef.current = publicState
  }, [publicState])

  useEffect(() => {
    setOnEdit(onEdit)
  }, [])

  return (
    <>
      <div className={styles.header}>
        <p className={styles.notice}>
          공개에 동의해주실 경우, 더 만족스러운 코디를 제안받을 수 있어요.
        </p>
        <button
          className={cn(styles.switchWrapper, publicState && styles.active)}
          type="button"
          onClick={onSwitch}
        >
          <div className={styles.switch} />
        </button>
      </div>
      <div className={styles.container}>
        <table>
          <tbody>
            <tr>
              <th className={styles.head}>키</th>
              <td className={styles.cell}>
                <div className={styles.inputWrapper}>
                  <input className={styles.input} type="number" ref={heightRef} />
                  kg
                </div>
              </td>
            </tr>
            <tr>
              <th className={styles.head}>몸무게</th>
              <td className={styles.cell}>
                <div className={styles.inputWrapper}>
                  <input className={styles.input} type="number" ref={weightRef} />
                  kg
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
