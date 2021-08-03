import styles from 'sass/templates/intro/index.module.scss'

export default function IntroHeader() {
  return (
    <>
      <h2 className={styles.why}>왜 퍼스널쇼퍼?</h2>
      <div className={styles.introMessage}>
        <p>오늘 뭐 입지? 어떤 옷 사지? 고민해봐도</p>
        <p>
          모르겠고&nbsp;
          <b>누가 나 좀 코디해줬으면...</b>
        </p>
      </div>
      <img className={styles.introImage} src="/images/service-intro.png" alt="" />
    </>
  )
}
