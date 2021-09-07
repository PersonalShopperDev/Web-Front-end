import SectionHeader from 'widgets/section-header'
import styles from 'sass/components/stylist-grid-view.module.scss'
import { ReactNode, useState } from 'react'
import { cn } from 'lib/util'
import Link from 'next/link'
import { useAuth } from 'providers/auth'

type State = 'supplier' | 'demander'

export interface SupplierData {
  id: number
  img: string
  name: string
  hire: number
  review: number
}

export interface DemanderData {
  id: number
  img: string
  name: string
  styles: string[]
}

export default function StylistGridView({
  suppliers,
  demanders,
}: {
  suppliers?: SupplierData[]
  demanders?: DemanderData[]
}) {
  const { user } = useAuth()
  const { userType } = user || {}

  const getInitialState = (): State => {
    if (userType !== 'D') {
      return 'demander'
    }

    return 'supplier'
  }

  const [state, setState] = useState<State>(getInitialState())

  const hasOption = () => suppliers?.length > 0 && demanders?.length > 0

  // const isSelected = (self: State) => {
  //   if (self === 'demander') {
  //     return state === 'demander' && demanders?.length > 0
  //   }
  //   return state === 'supplier' && suppliers?.length > 0
  // }

  const select = (selected: State) => {
    setState(selected)
  }

  const isEmpty = (array: any[]) => {
    if (!array) {
      return true
    }
    if (array.length === 0) {
      return true
    }
    return false
  }

  if (isEmpty(suppliers) && isEmpty(demanders)) {
    return <></>
  }

  const isStylist = userType === 'S' || userType === 'W'

  return (
    <section className={styles.container}>
      <SectionHeader
        title={(
          <>
            {!isStylist && (
              <button
                className={cn(styles.title, styles.active)}
                type="button"
                style={{ cursor: hasOption() ? 'pointer' : 'text' }}
                onClick={() => select('supplier')}
              >
                나에게 맞는 추천 스타일리스트
              </button>
            )}
            {isStylist && (
              <button
                className={cn(styles.title, styles.active)}
                type="button"
                style={{ cursor: hasOption() ? 'pointer' : 'text' }}
                onClick={() => select('demander')}
              >
                코디가 필요한 쇼퍼
              </button>
            )}
          </>
        )}
        moreHref={state === 'supplier' ? '/users/stylist' : '/users/shopper'}
      />
      <section className={styles.grid}>
        {!isStylist && suppliers.map(({
          id, img, name, hire = 0, review = 0,
        }) => (
          <LinkWrapper key={id} id={id}>
            <div className={styles.imageWrapper}>
              <img src={img} alt="stylist" />
            </div>
            <figcaption className={styles.figcaption}>
              <h4 className={styles.stylist}>{`${name} 스타일리스트`}</h4>
              <span
                className={styles.info}
              >
                {`고용 ${hire}회 | 리뷰 ${review}`}
              </span>
            </figcaption>
          </LinkWrapper>
        ))}
        {isStylist && demanders.map(({
          id, img, name, styles: demanderStyles,
        }) => (
          <LinkWrapper key={id} id={id}>
            <div className={styles.imageWrapper}>
              <img src={img} alt="stylist" />
            </div>
            <figcaption className={styles.figcaption}>
              <h4 className={styles.stylist}>{`${name}`}</h4>
              {demanderStyles?.map((value, index) => (
                <span key={value} className={styles.info}>{`${index > 0 ? '/' : ''}${value}`}</span>
              ))}
            </figcaption>
          </LinkWrapper>
        ))}
      </section>
    </section>
  )
}

function LinkWrapper({
  children, id,
} : {
  children : ReactNode, id : number,
}) {
  return (
    <Link href={`/profile/${id}`}>
      <a href={`/profile/${id}`} className={styles.figure}>
        {children}
      </a>
    </Link>
  )
}

StylistGridView.defaultProps = {
  suppliers: null,
  demanders: null,
}
