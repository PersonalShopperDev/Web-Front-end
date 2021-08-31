import { cn } from 'lib/util'
import {
  useState, MouseEventHandler, ReactNode,
} from 'react'
import styles from 'sass/components/profile/tab-bar.module.scss'

export default function ProfileTabBar({
  tabLabels,
  children,
} : {
  tabLabels: string[]
  children: ReactNode[]
}) {
  const [tabIndex, setTabIndex] = useState(0)

  if (tabLabels.length !== children.length) {
    throw new Error('the length of children must be equal with the length of tabLebels.')
  }

  return (
    <section className={styles.container}>
      <div className={styles.bar}>
        {tabLabels.map((label, index) => (
          <Tab
            key={label}
            label={label}
            active={tabIndex === index}
            onClick={() => setTabIndex(index)}
          />
        ))}
      </div>
      <div className={styles.inner}>
        {children[tabIndex]}
      </div>
    </section>
  )
}

function Tab({
  label,
  active,
  onClick,
} : {
  label: string,
  active: boolean,
  onClick: MouseEventHandler
}) {
  return (
    <button
      type="button"
      className={cn(styles.tab, active && styles.active)}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
