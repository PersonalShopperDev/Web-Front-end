import { useState } from "react"; 
import styles from '../../sass/templates/stylelistView.module.scss'
import Header from '../components/stylelistViewHeader'
import Stylist, { StyleListInfo } from '../components/stylist'

export default function StylelistView() {
    const [isRanking, setIsRanking] = useState(false);

    return (
        <section className={styles.main}>
            <Header isRanking={isRanking} setIsRanking={setIsRanking}/>
            {
                !isRanking 
                    ? person.map((item, index) => <Stylist key={index} info={item}/> ) 
                    : null
            }
        </section>
    )
}

const person: StyleListInfo[] = [{
    profileImg: '/images/blackSooooo/blackSooooo.jpeg',
    name: '흑수',
    grade: 4.3,
    review: 127,
    hired: 32,
    style: ['Trendy', 'Street', 'Nomcore'],
    introduction: '안녕하세요. 신입 스타일리스트 흑수입니다. 서울에 거주하고 있고, 캐쥬얼한 패션부터 스트릿까지 모두 코디 가능합니다. 트렌디하게 입고 싶기를 원하는 사람은 저에게 연락주세요!!',
    photoList: ["/images/blackSooooo/1.jpeg", "/images/blackSooooo/2.jpeg", "/images/blackSooooo/3.jpeg", "/images/blackSooooo/4.jpeg", "/images/blackSooooo/5.jpeg", "/images/blackSooooo/6.jpeg", "/images/blackSooooo/7.jpeg", "/images/blackSooooo/8.jpeg", "/images/blackSooooo/9.jpeg", "/images/blackSooooo/10.jpeg", "/images/blackSooooo/11.jpeg", "/images/blackSooooo/12.jpeg", "/images/blackSooooo/13.jpeg"]
  }, {
    profileImg: '/images/drboy/drboy.jpg',
    name: '대릭',
    grade: 4.7,
    review: 167,
    hired: 44,
    style: ['Casual', 'Sporty', 'Natural'],
    introduction: '안녕하세요. 대릭이에요. 저는 인천에 살고 있고 학교 다니면서 스토어 운영하고 있답니다:) 제 착장들 둘러보시고 마음에 드시면 연락주세요,, 제가 패션왕 만들어드릴게요!! @2c4s',
    photoList: ['/images/drboy/1.jpeg','/images/drboy/2.jpeg','/images/drboy/3.jpeg','/images/drboy/4.jpeg','/images/drboy/5.jpeg','/images/drboy/6.jpeg','/images/drboy/7.jpeg','/images/drboy/8.jpeg','/images/drboy/9.jpeg', '/images/drboy/10.jpeg','/images/drboy/11.jpeg','/images/drboy/12.jpeg','/images/drboy/13.jpeg','/images/drboy/14.jpeg']
  },
  {
    profileImg: '/images/d.on.gh/d.on.gh.jpg',
    name: '혁우',
    grade: 4.4,
    review: 222,
    hired: 37,
    style: ['Monotone', 'Vintage', 'American'],
    introduction: '안녕하세요 전 혁우에요. 느낌 아니까.',
    photoList: ['/images/d.on.gh/1.jpeg','/images/d.on.gh/2.jpeg','/images/d.on.gh/3.jpeg','/images/d.on.gh/4.jpeg']
}];