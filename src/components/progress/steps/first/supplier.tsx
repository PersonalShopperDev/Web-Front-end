import Link from 'next/link'
import styles from 'sass/components/progress/steps/first.module.scss'

export default function FirstStepForSupplier() {
  return (
    <p>
      코디제안을 수락하셨습니다! 입금 확정 안내 후 코디 진행을 권장드립니다. 코디 제안이 완료된 이후 스타일리스트님께&nbsp;
      <span className={styles.charge}>8% 수수료</span>
      를 제외한 코디가격이 입금됩니다. 코디 전&nbsp;
      <Link href="/">
        <a className={styles.link} href="/">코디매뉴얼</a>
      </Link>
      을 꼭 확인해주세요
    </p>
  )
}
