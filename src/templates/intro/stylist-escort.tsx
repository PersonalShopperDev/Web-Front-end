import styles from 'sass/templates/intro/stylist-escort.module.scss'

export default function StylistEscort() {
  return (
    <ol>
      <li className={styles.step}>
        <p>
          1.&nbsp;
          <b>MY프로필</b>
          을 정성껏 작성해 내&nbsp;
          <b>코디실력</b>
          을 보여줘요!
        </p>
        <div className={styles.firstImageWrapper}>
          <img className={styles.firstImage} src="/images/stylist-escort-0.png" alt="" />
        </div>
      </li>
      <li className={styles.step}>
        <p>
          2.&nbsp;
          <b>견적서</b>
          를 보내 쇼퍼에게&nbsp;
          <b>패션상담</b>
          을 제안해보세요!
        </p>
        <img className={styles.secondImage} src="/images/stylist-escort-1.png" alt="" />
      </li>
      <li className={styles.step}>
        <p>
          3. 채팅을 통해&nbsp;
          <b>패션고민을 상담해주고,</b>
          <br />
          <b>쉽게 코디북을 제공</b>
          하여 쇼퍼에게 전달해보세요!
        </p>
        <img className={styles.thirdImage} src="/images/stylist-escort-2.png" alt="" />
      </li>
    </ol>
  )
}
