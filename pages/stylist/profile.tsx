import styles from '../../sass/listup.module.scss';
import Image from 'next/image';
import Link from 'next/link'
import { withRouter } from 'next/router';

const profile = ({ router: { query } }) => {
  const stylist = JSON.parse(query.stylist);
  const company: string = "1초 코디에서 근무 중";
  const career: string = "신입 스타일리스트";

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.header}>
            <Link href="/">
              <button>
                <Image src="/images/icons/Back.png" width="8.5" height="17" />
              </button>
            </Link>
            <Image src="/images/icons/menu.png" width="17.5" height="13"/>
          </div>
          <div className={styles.name}>
            <Image src={stylist.profileImg} width="125" height="125" className={styles.image}/>
            <div>
              Stylist<br />{stylist.name}&nbsp;
              <Image src="/images/icons/badge.png" width="23" height="23"/>
            </div>
          </div>
          <div className={styles.category}>
            {stylist.style.map(item => <div className={styles.styleBox}>{item}</div>)}
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.division}>
            <span className={styles.name}>{stylist.name}</span>Stylist
            <div className={styles.text}>
              <Image src="/images/icons/company.png" width="12.02" height="12.07"/>
              &nbsp;&nbsp;&nbsp;{company}
            </div>
            <div className={styles.text}>
              <Image src="/images/icons/career.png" width="12" height="12"/>
              &nbsp;&nbsp;&nbsp;{career}
            </div>
          </div>
          <div className={styles.scrollBox}>
            <div className={styles.division}>
              <span className={styles.title}>자기소개</span><br />{stylist.introduction}
            </div>
            <div className={styles.division}>
              <span className={styles.title}>Photo {stylist.photoList.length}</span><br/>
              {stylist.photoList.map(item => <Image src={item} width="110" height="110" className={styles.clothImage} />)}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(profile);