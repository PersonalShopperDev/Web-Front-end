import { cn } from 'lib/util'
import { useState } from 'react'
import styles from 'sass/components/profile/height-weight.module.scss'
import Section from './section'

export default function Wardrobe() {
  const [active, setActive] = useState(false)

  const onSwitch = () => {
    setActive((state) => !state)
  }

  return (
    <Section
      head="키·몸무게"
      action={(
        <button
          className={cn(
            styles.switchWrapper,
            active && styles.active,
          )}
          type="button"
          onClick={onSwitch}
        >
          <div className={styles.switch} />
        </button>
      )}
    >
      <p className={styles.notice}>공개에 동의해주실 경우, 더 만족스러운 코디를 제안받을 수 있어요.</p>
      <div className={styles.container}>
        <table>
          <tbody>
            <tr>
              <th className={styles.head}>키</th>
              <td className={styles.cell}>
                <div className={styles.inputWrapper}>
                  <input className={styles.input} id="weight" type="text" />
                  kg
                </div>
              </td>
            </tr>
            <tr>
              <th className={styles.head}>몸무게</th>
              <td className={styles.cell}>
                <div className={styles.inputWrapper}>
                  <input className={styles.input} id="weight" type="text" />
                  kg
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}
