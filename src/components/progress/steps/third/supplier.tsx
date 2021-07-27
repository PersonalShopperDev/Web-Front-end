import Link from 'next/link'
import styles from 'sass/components/progress/steps/third.module.scss'

export default function ThirdStepForSupplier() {
  return (
    <>
      <p>
        입금 확인 완료! 이제 스타일리스트님의 센스를 마음껏 발휘해볼까요? 쇼퍼님께 코디를 위해 필요한 정보를 물어보시면서 최고의 코디를 보여주세요!
      </p>
      <br />
      <p>
        다시 한 번,&nbsp;
        <Link href="/">
          <a className={styles.link} href="/">
            코디매뉴얼
          </a>
        </Link>
        을 꼭 참고해주세요!
      </p>
      <br />
      <p>
        코디가 완료되었다면 꼭! 진행사항에서 코디 확정 버튼을 눌러달라고 요청해주세요.
      </p>
      <p>
        쇼퍼가 코디 확정 버튼을 누르지 않으면 서비스가 완료되지 않는답니다:&#40;
      </p>
    </>
  )
}
