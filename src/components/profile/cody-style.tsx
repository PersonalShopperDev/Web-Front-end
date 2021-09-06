import styles from 'sass/components/profile/cody-style.module.scss'
import { useProfile } from 'providers/profile'
import { useEffect, useRef, useState } from 'react'
import communicate from 'lib/api'
import Icon from 'widgets/icon'
import { Style, useAuth } from 'providers/auth'
import { cn } from 'lib/util'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import StatefulSection, { useStatefulSection } from './stateful-section'

export default function CodyStyle() {
  return (
    <StatefulSection head="자신있는 패션스타일">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const { createAlert } = useAlert()

  const { state, setState, setOnEdit } = useStatefulSection()

  const { user } = useProfile()
  const { fetchUser } = useAuth()

  const { styles: styleList } = user

  const [everyStyles, setEveryStyles] = useState<{
    male: Style[]
    female: Style[]
  }>()

  const [selectedStyles, setSelectedStyles] = useState<{
    male: Style[]
    female: Style[]
  }>(styleList)

  const [isMaleOpen, setMaleOpen] = useState<boolean>(selectedStyles.male.length > 0)
  const [isFemaleOpen, setFemaleOpen] = useState<boolean>(selectedStyles.female.length > 0)

  const selectedStylesRef = useRef<{
    male: Style[]
    female: Style[]
  }>()

  const maleStyles = styleList.male
  const femaleStyles = styleList.female

  const initializeStyles = async () => {
    const res = await communicate({
      url: '/style?female=true&male=true',
    })

    if (res.status !== 200) {
      return
    }

    const data = await res.json()

    setEveryStyles(data)
  }

  const onEdit = async () => {
    const list = []
    selectedStylesRef.current.male.forEach((element) => list.push(element.id))
    selectedStylesRef.current.female.forEach((element) => list.push(element.id))

    const res = await communicate({
      url: '/style',
      payload: {
        list,
      },
      method: 'PUT',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
      return
    }

    await fetchUser()

    setState('default')
  }

  const onFemaleStyleClick = (id: number) => {
    const style = everyStyles.female.find((element) => element.id === id)

    const already = selectedStyles.female.find((element) => element.id === id)

    if (already) {
      setSelectedStyles(({
        female, ...props
      }) => ({ ...props, female: female.filter((element) => element.id !== id) }))
      return
    }

    if (selectedStyles.female.length > 5) {
      return
    }

    setSelectedStyles(({ female, ...props }) => ({ ...props, female: [...female, style] }))
  }

  const onMaleStyleClick = (id: number) => {
    const style = everyStyles.male.find((element) => element.id === id)

    const already = selectedStyles.male.find((element) => element.id === id)

    if (already) {
      setSelectedStyles(({
        male, ...props
      }) => ({ ...props, male: male.filter((element) => element.id !== id) }))
      return
    }

    if (selectedStyles.male.length > 5) {
      return
    }

    setSelectedStyles(({ male, ...props }) => ({ ...props, male: [...male, style] }))
  }

  const onFemaleOpen = () => {
    setFemaleOpen((value) => {
      if (value) {
        return selectedStyles.female.length !== 0
      }
      return true
    })
  }

  const onMaleOpen = () => {
    setMaleOpen((value) => {
      if (value) {
        return selectedStyles.male.length !== 0
      }
      return true
    })
  }

  useEffect(() => {
    initializeStyles()
    setOnEdit(onEdit)
  }, [])

  useEffect(() => {
    selectedStylesRef.current = selectedStyles
  }, [selectedStyles])

  return (
    <section>
      {state === 'edit' ? (
        <>
          <button type="button" onClick={onFemaleOpen} className={cn(styles.row, isFemaleOpen && styles.active)}>
            <Icon src={`check-circle-${isFemaleOpen ? 'black' : 'gray'}.png`} />
            <span>여자 스타일</span>
          </button>
          {isFemaleOpen && (
            <>
              <p className={styles.maximum}>최대 6개 선택</p>
              <section className={styles.selection}>
                {everyStyles?.female?.map(({ id, value }) => (
                  <button key={id} type="button" onClick={() => onFemaleStyleClick(id)} className={cn(styles.style, selectedStyles.female.some((element) => element.id === id) && styles.active)}>
                    {value}
                  </button>
                ))}
              </section>
            </>
          )}
          <button type="button" onClick={onMaleOpen} className={cn(styles.row, isMaleOpen && styles.active)}>
            <Icon src={`check-circle-${isMaleOpen ? 'black' : 'gray'}.png`} />
            <span>남자 스타일</span>
          </button>
          {isMaleOpen && (
            <>
              <p className={styles.maximum}>최대 6개 선택</p>
              <section className={styles.selection}>
                {everyStyles?.male?.map(({ id, value }) => (
                  <button type="button" onClick={() => onMaleStyleClick(id)} key={id} className={cn(styles.style, selectedStyles.male.some((element) => element.id === id) && styles.active)}>
                    {value}
                  </button>
                ))}
              </section>
            </>
          )}
        </>
      ) : (
        <>
          {femaleStyles && femaleStyles.length > 0 && (
            <section className={styles.container}>
              <div className={styles.label}>여자: </div>
              <div className={styles.selectionView}>
                {femaleStyles.map(({ id, value }) => (
                  <div key={id} className={styles.style}>
                    {value}
                  </div>
                ))}
              </div>
            </section>
          )}
          {maleStyles && maleStyles.length > 0 && (
            <section className={styles.container}>
              <div className={styles.label}>남자: </div>
              <div className={styles.selectionView}>
                {maleStyles.map(({ id, value }) => (
                  <div key={id} className={styles.style}>
                    {value}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </section>
  )
}
