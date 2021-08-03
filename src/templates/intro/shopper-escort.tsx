import styles from 'sass/templates/intro/shopper-escort.module.scss'

export default function ShopperEscort() {
  return (
    <ol>
      <li className={styles.step}>
        <p>
          1.&nbsp;
          <b>만족스러운 코디</b>
          를 위해&nbsp;
          <b>정성껏 질문</b>
          에 답해주세요!
        </p>
        <img className={styles.firstImage} src="/images/shopper-escort-0.png" alt="" />
      </li>
      <li className={styles.step}>
        <p>
          2. 나를&nbsp;
          <b>변신시켜줄 스타일리스트</b>
          를 살펴보세요!
        </p>
        <img className={styles.secondImage} src="/images/shopper-escort-1.png" alt="" />
      </li>
      <li className={styles.step}>
        <p>
          3. 맘에 드는 스타일리스트에게&nbsp;
          <b>채팅</b>
          을 걸어
          <br />
          <b>패션상담</b>
          과&nbsp;
          <b>코디북</b>
          을 받아보세요!
        </p>
        <img className={styles.thirdImage} src="/images/shopper-escort-2.png" alt="" />
      </li>
    </ol>
  )
}
