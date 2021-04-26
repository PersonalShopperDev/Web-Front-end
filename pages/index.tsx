import Layout from "../src/layouts/default";
import styles from '../src/styles/profile.module.scss';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const styleList: string[] = ['Trendy', 'Street', 'Nomcore', 'Grunge'];
  const company: string = "1초 코디에서 근무 중";
  const career: string = "신입 스타일리스트";
  const introduction: string = "안녕하세요. 신입 스타일리스트 흑수입니다. 서울에 거주하고 있고, 캐쥬얼한 패션부터 스트릿까지 모두 코디 가능합니다. 트렌디하게 입고 싶기를 원하는 사람은 저에게 연락주세요!!"
  const imageList: string[] = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg", "/6.jpeg", "/7.jpeg", "/8.jpeg", "/9.jpeg", "/10.jpeg", "/11.jpeg", "/12.jpeg", "/13.jpeg"]
  const [selectedImg, setSelectedImg] = useState('');
  console.log(selectedImg);
  const ImageClick = (item: string) => {
    selectedImg != item ? setSelectedImg(item) : setSelectedImg('');
  }
  return (
    <Layout> 
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <div className={styles.header}>
              <Image src="/Back.png" width="8.5" height="17" />
              <Image src="/menu.png" width="17.5" height="13"/>
            </div>
            <div className={styles.name}>
              <Image src="/profile.jpeg" width="150" height="150" className={styles.image}/>
              <div style={{marginLeft: 20}}> 
                Stylist<br />흑수&nbsp;
                <Image src="/badge.png" width="23" height="23"/>
              </div>
            </div>
            <div className={styles.category}>
            {styleList.map(item => {
                return (
                  <div className={styles.styleBox}>{item}</div>
                )
              })}
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.division}>
              <span style={{fontSize: 25, fontWeight: 'bold', marginRight: 10}}>흑수</span>
              Stylist
              <div className={styles.text}>
                <Image src="/company.png" width="12.02" height="12.07"/>
                &nbsp;&nbsp;&nbsp;{company}
              </div>
              <div className={styles.text}>
                <Image src="/career.png" width="12" height="12"/>
                &nbsp;&nbsp;&nbsp;{career}
              </div>
            </div>
            <div className={styles.scrollBox}>
            <div className={styles.division}>
              <span style={{fontSize:20, fontWeight: 'bold'}}>자기소개</span><br />
              <span style={{color: 'rgb(61,61,61)', fontSize: 12}}>{introduction}</span>
            </div>
            <span style={{fontSize:20, fontWeight: 'bold'}}>Photo {imageList.length}</span>
            <div>
              {imageList.map(item => {
                return (
                  <button onClick={() => ImageClick(item)}>
                  <Image src={item} width="112" height="112" className={styles.clothImage} />
                  </button>
                )
              })}
            </div>
            </div>
          </div>
        </div>
        <div className={styles.largeImage}>
          {selectedImg != '' ? <Image src={selectedImg} width="600" height="600" /> : null}
        </div>
      </div>
    </Layout>
  )
}