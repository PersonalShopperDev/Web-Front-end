import { useState, useEffect } from 'react'
import Switch from 'widgets/switch'
import styles from 'sass/components/review/ask-public.module.scss'
import { useReviewEditor } from 'templates/review-editor'
import Section from './section'

export default function AskPublic() {
  const { dataRef } = useReviewEditor()

  const [active, setActive] = useState(false)

  const onSwitchClick = () => {
    setActive((state) => !state)
  }

  useEffect(() => {
    dataRef.current.public = active
  }, [active])

  return (
    <Section
      head="체형공개 여부"
    >
      <p className={styles.notice}>공개에 동의해주실 경우 다른 유저들에게 큰도움이 됩니다</p>
      <section className={styles.container}>
        <Switch
          active={active}
          onClick={onSwitchClick}
        />
      </section>
    </Section>
  )
}
