import React, { useState, useEffect } from 'react'
import styles from 'sass/templates/information.module.scss'
import parseJwt from 'lib/util/jwt'
import { getCookie } from 'lib/util/cookie'
import { ACCESS_TOKEN } from 'providers/auth'
import { useOnboarding } from 'providers/onboarding'
import Icon from 'widgets/icon'
import Style from 'components/information/style'
import Body from 'components/information/body'
import Size from 'components/information/size'
import Skin from 'components/information/skin'
import Price from 'components/information/price'
import CodyGender from 'components/information/cody-gender'
import Career from 'components/information/career'

export default function Information() {
  const { information, setEdit } = useOnboarding()
  const [tokenInfo, setTokenInfo] = useState(null)
  const [eachBoxLists, setEachBoxLists] = useState([])
  const onClickEdit = (key) => {
    setEdit(key)
  }
  useEffect(() => {
    setTokenInfo(parseJwt(getCookie(ACCESS_TOKEN)))
  }, [])
  useEffect(() => {
    if (tokenInfo !== null) {
      if (tokenInfo.userType === 'W' && tokenInfo.gender === 'F') {
        setEachBoxLists([{
          title: '선호스타일',
          information: <Style />,
        }, {
          title: '내 체형',
          information: <Body />,
          key: 'body',
        }, {
          title: '피부톤',
          information: <Skin isEdit />,
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
      } else if (tokenInfo.userType === 'W' && tokenInfo.gender === 'M') {
        setEachBoxLists([{
          title: '선호스타일',
          information: <Style />,
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
  }, [tokenInfo])
  return (
    <section className={styles.container}>
      {information !== null && eachBoxLists.map((value, index) => (
        <div className={styles.eachContainer} key={value.key}>
          <div className={styles.flexContainer}>
            <span className={styles.title}>{value.title}</span>
            <Icon src="edit.png" size={17} onClick={() => onClickEdit(value.key)} />
          </div>
          {value.information}
        </div>
      ))}
    </section>
  )
}
