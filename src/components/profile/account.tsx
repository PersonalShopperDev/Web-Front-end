import Link from 'next/link'
import { useAuth } from 'providers/auth'
import styles from 'sass/components/profile/account.module.scss'
import Icon from 'widgets/icon'
import Section from './section'

interface AccountData {
  account: string,
  bank: string,
  accountUser: string,
}

export default function Account({ data } : { data: AccountData }) {
  const { user } = useAuth()
  const { account, bank } = user || data || {}

  return (
    <Section
      head="계좌 정보"
      action={(
        <Link href="/profile/account">
          <a href="/profile/account">
            <Icon src="edit.png" size={17} />
          </a>
        </Link>
      )}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <span className={styles.label}>은행</span>
          <span className={styles.value}>{bank}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>계좌 번호</span>
          <span className={styles.value}>{account}</span>
        </div>
      </div>
    </Section>
  )
}
