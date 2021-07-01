import communicate from 'lib/api'
import { cn } from 'lib/util'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import {
  ReactNode, useEffect, useRef,
} from 'react'
import styles from 'sass/components/profile/career.module.scss'
import Icon from 'widgets/icon'
import StatefulSection, { useStatefulSection } from './stateful-section'

interface CareerData {
  value: string
  type: number
}

export default function Career({
  data = [{ value: '여기', type: 1 }, { value: '1년차 어쩌구', type: 1 }],
}: {
  data: CareerData[]
}) {
  return (
    <StatefulSection head="경력">
      <Inner data={data} />
    </StatefulSection>
  )
}

function Inner({ data }: { data: CareerData[] }) {
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()
  const { setState, setOnEdit } = useStatefulSection()

  const companyRef = useRef<HTMLInputElement>()
  const careerRef = useRef<HTMLInputElement>()

  const onEdit = async () => {
    const career = careerRef.current.value
    const company = companyRef.current.value

    if (!career || !company) {
      await createAlert({ text: '내용을 채워주세요' })
      return
    }

    await communicate({
      url: '/profile',
      payload: {
        careerList: [{
          value: company,
          type: 0,
        }, {
          value: career,
          type: 1,
        }],
      },
      method: 'PATCH',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        fetchUser()
      })
      .catch(async () => {
        await createAlert({ text: '에러가 발생했습니다' })
      })

    setState('default')
  }

  useEffect(() => {
    setOnEdit(onEdit)
  }, [])

  const company = data[0].value
  const career = data[1].value

  return (
    <section className={styles.container}>
      <Label
        id="company-input"
        icon="building.png"
        content={`${company}에서 근무 중`}
      >
        <input
          className={styles.field}
          id="company-input"
          ref={companyRef}
          type="text"
          placeholder="근무지"
          autoComplete="off"
        />
      </Label>
      <Label
        id="career-input"
        icon="briefcase.png"
        content={career}
      >
        <input
          className={styles.field}
          id="career-input"
          ref={careerRef}
          type="text"
          placeholder="스타일리스트 경력"
          autoComplete="off"
        />
      </Label>
    </section>
  )
}

function Label({
  id,
  children,
  icon,
  content,
} : {
  id: string,
  children: ReactNode
  icon: string
  content: string
}) {
  const { state } = useStatefulSection()

  return (
    <label className={cn(styles.label, state === 'edit' && styles.input)} htmlFor={id}>
      <Icon src={icon} />
      {state === 'edit' ? (
        children
      ) : (
        <p className={styles.field}>
          {content}
        </p>
      )}
    </label>
  )
}
