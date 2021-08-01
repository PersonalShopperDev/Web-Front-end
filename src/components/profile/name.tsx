import { useAuth } from 'providers/auth'
import styles from 'sass/components/profile/input-field.module.scss'
import Icon from 'widgets/icon'
import InputField from './input-field'

interface NameData {
  name: string
}

export default function Name({ data }: { data: NameData }) {
  const { user } = useAuth()

  const { name } = user || data || {}

  const warningMessage = (
    <div className={styles.warning}>
      <Icon src="warning.png" size={10} />
      <span>필수 항목입니다.</span>
    </div>
  )

  return (
    <InputField
      head={
        name ? (
          '이름'
        ) : (
          <div className={styles.headerContainer}>
            이름
            {warningMessage}
          </div>
        )
      }
      name="name"
      content={name}
    />
  )
}
