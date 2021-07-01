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
  careerList: {
    type: number,
    value: string,
  }[]
}

export default function Career({
  data,
}: {
  data: CareerData
}) {
  return (
    <StatefulSection head="경력">
      <Inner data={data} />
    </StatefulSection>
  )
}

function Inner({
  data,
}: {
  data: CareerData
}) {
  const { user, fetchUser } = useAuth()
  const { createAlert } = useAlert()
  const { setState, setOnEdit } = useStatefulSection()

  const { careerList } = user || data

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

  const [company, career] = careerList || [{ type: 0, value: null }, { type: 1, value: null }]

  return (
    <section className={styles.container}>
      <Label
        id="company-input"
        icon="building.png"
        content={company?.value && `${company.value}에서 근무 중`}
        placeholder="근무지"
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
        content={career?.value}
        placeholder="스타일리스트 경력"
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
  placeholder,
} : {
  id: string,
  children: ReactNode
  icon: string
  content: string
  placeholder: string
}) {
  const { state } = useStatefulSection()

  return (
    <label className={cn(styles.label, state === 'edit' && styles.input)} htmlFor={id}>
      <Icon src={icon} />
      {state === 'edit' ? (
        children
      ) : (
        <p className={styles.field}>
          {content || placeholder}
        </p>
      )}
    </label>
  )
}
