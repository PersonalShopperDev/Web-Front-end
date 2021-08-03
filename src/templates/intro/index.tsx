import { cn } from 'lib/util'
import { useState } from 'react'
import styles from 'sass/templates/intro/index.module.scss'
import IntroHeader from './header'
import ShopperEscort from './shopper-escort'
import StylistEscort from './stylist-escort'

type State = 'shopper' | 'stylist'

export default function Intro() {
  const [state, setState] = useState<State>('shopper')

  const onClickShopper = () => {
    setState('shopper')
  }

  const onClickStylist = () => {
    setState('stylist')
  }

  return (
    <section className={styles.container}>
      <IntroHeader />
      <div className={styles.title}>
        <hr className={styles.hr} />
        <h2 className={styles.ourService}>Our Service</h2>
        <div className={styles.selection}>
          <button
            type="button"
            className={cn(styles.option, state === 'shopper' && styles.active)}
            onClick={onClickShopper}
          >
            쇼퍼
            <hr className={cn(styles.underline, styles.left)} />
          </button>
          <button
            type="button"
            className={cn(styles.option, state === 'stylist' && styles.active)}
            onClick={onClickStylist}
          >
            스타일리스트
            <hr className={cn(styles.underline, styles.right)} />
          </button>
        </div>
      </div>
      <div className={cn(styles.escort, state === 'stylist' && styles.stylist)}>
        <ShopperEscort />
        <StylistEscort />
      </div>
    </section>
  )
}
