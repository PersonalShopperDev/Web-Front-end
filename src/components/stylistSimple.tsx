import styles from '../../sass/profile.module.scss';
import Image from 'next/image';
import { StylistInfo } from './stylist';

export default function StylistSimple({ info } : { info : StylistInfo }) {
    return (
        <div>
            <div className={styles.name}>
                <Image src={info.profileImg} width="125" height="125" className={styles.image}/>
                <div>
                  Stylist<br />{info.name}&nbsp;
                  <Image src="/images/icons/badge.png" width="23" height="23"/>
                </div>
            </div>
            <div className={styles.category}>
              {info.style.map(item => <div className={styles.styleBox}>{item}</div>)}
            </div>
        </div>
    )
}