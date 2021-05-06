import styles from '../../sass/profile.module.scss';
import Image from 'next/image';
import { StylistInfo } from './stylist';

export default function StylistDetail({ info } : { info : StylistInfo }) {
    const company: string = "1초 코디에서 근무 중";
    const career: string = "신입 스타일리스트";

    return (
        <div className={styles.infoContainer}>
          <div className={styles.division}>
            <span className={styles.name}>{info.name}</span>Stylist
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
              <span className={styles.title}>자기소개</span><br />{info.introduction}
            </div>
            <div className={styles.division}>
              <span className={styles.title}>Photo {info.photoList.length}</span><br/>
              {info.photoList.map(item => <Image src={item} width="110" height="110" className={styles.clothImage} />)}
              </div>
          </div>
        </div>
    )   
}