import SectionHeader from 'widgets/section-header'
import styles from 'sass/components/stylist-grid-view.module.scss'
import { useState } from 'react'
import { cn } from 'lib/util'

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
  const getInitialState = (): State => {
    if (suppliers?.length) {
      return 'supplier'
    }
    if (demanders?.length) {
      return 'demander'
    }
    return 'supplier'
  }

  const [state, setState] = useState<State>(getInitialState())

  const hasOption = () => suppliers?.length > 0 && demanders?.length > 0

  const isSelected = (self: State) => {
    if (self === 'demander') {
      return state === 'demander' && demanders?.length > 0
    }
    return state === 'supplier' && suppliers?.length > 0
  }

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

  return (
    <section className={styles.container}>
      <SectionHeader
        title={(
          <>
            {suppliers?.length > 0 && (
              <button
                className={cn(styles.title, isSelected('supplier') && styles.active)}
                type="button"
                style={{ cursor: hasOption() ? 'pointer' : 'text' }}
                onClick={() => select('supplier')}
              >
                스타일리스트
              </button>
            )}
            {demanders?.length > 0 && (
              <button
                className={cn(styles.title, isSelected('demander') && styles.active)}
                type="button"
                style={{ cursor: hasOption() ? 'pointer' : 'text' }}
                onClick={() => select('demander')}
              >
                코디수요자
              </button>
            )}
          </>
        )}
        moreHref="/"
      />
      <section className={styles.grid}>
        {isSelected('supplier') && suppliers.map(({
          id, img, name, hire = 0, review = 0,
        }) => (
          <figure key={id} className={styles.figure}>
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
          </figure>
        ))}
        {isSelected('demander') && demanders.map(({
          id, img, name, styles: demanderStyles,
        }) => (
          <figure key={id} className={styles.figure}>
            <div className={styles.imageWrapper}>
              <img src={img} alt="stylist" />
            </div>
            <figcaption className={styles.figcaption}>
              <h4 className={styles.stylist}>{`${name} 스타일리스트`}</h4>
              {demanderStyles?.map((value, index) => (
                <span key={value} className={styles.info}>{`${index > 0 ? '/' : ''}${value}`}</span>
              ))}
            </figcaption>
          </figure>
        ))}
      </section>
    </section>
  )
}

StylistGridView.defaultProps = {
  suppliers: null,
  demanders: null,
}
