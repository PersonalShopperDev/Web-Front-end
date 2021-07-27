import styles from 'sass/components/progress/steps/first.module.scss'

export default function FirstStepForDemander() {
  return (
    <>
      <p>안전거래를 위해 아래 계좌로 코디 가격을 이체해주세요.</p>
      <p>이체전까지 채팅 기능은 비활성화됩니다.</p>
      <p className={styles.underline}>계좌:카카오뱅크 서유빈 3333-20-4598961</p>
      <br />
      <p>입금을 하셨다면 입금자명을 작성하시고’ 확인하기’ 버튼을 눌러주세요.</p>
      <form className={styles.form}>
        <input className={styles.input} type="text" placeholder="입금자명" />
        <input className={styles.submit} type="submit" value="확인하기" />
      </form>
    </>
  )
}
