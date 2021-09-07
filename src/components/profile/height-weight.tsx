import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { cn } from 'lib/util'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { useProfile } from 'providers/profile'
import { useEffect, useState, useRef } from 'react'
import styles from 'sass/components/profile/height-weight.module.scss'
import StatefulSection, { useStatefulSection } from './stateful-section'

export default function HeightWeight() {
  return (
    <StatefulSection head="내 체형">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const { user } = useProfile()
  const { fetchUser } = useAuth()
  const { state, setOnEdit, setState } = useStatefulSection()
  const { createAlert } = useAlert()

  const { bodyStat } = user

  const bodyStatRef = useRef(bodyStat)

  const { isPublic, height, weight } = bodyStat || {}

  const [publicState, setPublicState] = useState(isPublic)

  const publicStateRef = useRef<boolean>()
  const heightRef = useRef<HTMLInputElement>()
  const weightRef = useRef<HTMLInputElement>()

  const onSwitch = () => {
    setPublicState((currentState) => !currentState)
  }

  const onEdit = async () => {
    const heightValue = heightRef.current.value
    const weightValue = weightRef.current.value
    if (!heightValue || !weightValue) {
      await createAlert({ text: '내용을 채워주세요' })
      return
    }

    const isPublicValue = publicStateRef.current

    await communicate({
      url: '/profile',
      payload: {
        bodyStat: {
          isPublic: isPublicValue,
          height: parseInt(heightValue, 10),
          weight: parseInt(weightValue, 10),
        },
      },
      method: 'PATCH',
    }).then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return fetchUser()
    }).catch(async () => {
      await createAlert({ text: ERROR_MESSAGE })
    })

    setState('default')
  }

  useEffect(() => {
    if (state !== 'edit') {
      return
    }
    const { weight: weightValue, height: heightValue } = bodyStatRef.current || {}
    weightRef.current.value = weightValue?.toString() || ''
    heightRef.current.value = heightValue?.toString() || ''
  }, [state])

  useEffect(() => {
    publicStateRef.current = publicState
  }, [publicState])

  useEffect(() => {
    bodyStatRef.current = bodyStat
  }, [bodyStat])

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
          disabled={state !== 'edit'}
          style={{ cursor: state === 'edit' ? 'pointer' : 'default' }}
        >
          <div className={styles.switch} />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <span className={styles.head}>키</span>
          <div className={styles.content}>
            {state === 'edit' ? (
              <input className={styles.input} type="number" ref={heightRef} />
            ) : (
              <p className={styles.text}>
                {height}
              </p>
            )}
            &nbsp;cm
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.head}>몸무게</span>
          <div className={styles.content}>
            {state === 'edit' ? (
              <input className={styles.input} type="number" ref={weightRef} />
            ) : (
              <p className={styles.text}>
                {weight}
              </p>
            )}
            &nbsp;kg
          </div>
        </div>
      </div>
    </>
  )
}
