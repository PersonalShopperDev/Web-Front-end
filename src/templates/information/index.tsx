import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/information/information.module.scss'
import { useOnboarding } from 'providers/onboarding'
import StyleText from 'components/information/style-text'
import Body from 'components/information/body'
import Size from 'components/information/size'
import Skin from 'components/information/skin'
import Price from 'components/information/price'
import CodyGender from 'components/information/cody-gender'
import Career from 'components/information/career'
import { useRouter } from 'next/router'
import { useAuth } from 'providers/auth'

export default function Information() {
  const { information, setEdit } = useOnboarding()
  const [eachBoxLists, setEachBoxLists] = useState([])
  const { user } = useAuth()
  const { userType } = user
  const router = useRouter()

  const onClickEdit = (key) => {
    setEdit(key)
    if (key === 'style') router.push('/profile/information/style')
  }
  useEffect(() => {
    if (information !== null) {
      if (userType === 'D' && information.gender === 'F') {
        setEachBoxLists([{
          title: '선호스타일',
          information: <StyleText />,
          key: 'style',
        }, {
          title: '내 체형',
          information: <Body />,
          key: 'body',
        }, {
          title: '피부톤',
          information: <Skin />,
          key: 'skin',
        }, {
          title: '내 체형',
          information: <Size />,
          key: 'size',
        }, {
          title: '원하는 가격대',
          information: <Price />,
          key: 'price',
        }])
      } else if (userType === 'D' && information.gender === 'M') {
        setEachBoxLists([{
          title: '선호스타일',
          information: <StyleText />,
          key: 'style',
        }, {
          title: '내 체형',
          information: <Body />,
          key: 'body',
        }, {
          title: '내 체형',
          information: <Size />,
          key: 'size',
        }, {
          title: '원하는 가격대',
          information: <Price />,
          key: 'price',
        }])
      } else {
        setEachBoxLists([{
          title: '코디 가능한 성별',
          information: <CodyGender />,
          key: 'codyGender',
        }, {
          title: '코디경력',
          information: <Career />,
          key: 'career',
        }])
      }
    }
  }, [information])
  return (
    <section className={styles.container} id="info_container">
      {information !== null && eachBoxLists.map((value, index) => (
        <div className={styles.eachContainer} key={value.key}>
          <div className={styles.flexContainer}>
            <span className={styles.title}>{value.title}</span>
            {(userType === 'D' && index === 0)
                && (
                <button type="button" onClick={() => onClickEdit(value.key)}>
                  <span className={styles.pictureText}>사진으로찾기</span>
                </button>
                )}
          </div>
          {value.information}
        </div>
      ))}
    </section>
  )
}
