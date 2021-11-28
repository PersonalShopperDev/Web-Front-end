import callApplication from 'lib/util/application'
import React, {
  useContext,
  createContext,
  useState,
  MutableRefObject,
  useRef,
  useEffect,
} from 'react'

interface SuggestionProps {
  productNum: number
  selectedProduct: number
  step: number
  onClickPlus: (value: void) => void
  onClickProducts: (value: number) => void
  setStep: (value: number) => void
  productRef: MutableRefObject<productsProps[]>
  descriptionRef: MutableRefObject<descriptionProps>
  coordRef: MutableRefObject<coordProps[]>
  detailType: number
  setDetailType: (value: number) => void
  filterEmptyProducts: (value: void) => void
}

type productsProps = {
  price: string
  img: string
  purchaseUrl: string
}

type descriptionProps = {
  title: string
  content: string
}

type coordProps = {
  img: string
}

const CodySuggestionContext = createContext<SuggestionProps>(null)

export const useCodySuggestion = () => useContext(CodySuggestionContext)

export default function CodySuggestionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [productNum, setProductNum] = useState(1)
  const [step, setStep] = useState(1)
  const [detailType, setDetailType] = useState(0)
  const productRef = useRef<productsProps[]>([
    {
      price: '',
      img: '',
      purchaseUrl: '',
    },
  ])
  const descriptionRef = useRef<descriptionProps>({
    title: '',
    content: '',
  })
  const coordRef = useRef<coordProps[]>([
    {
      img: '',
    },
  ])

  const onClickPlus = () => {
    if (productNum < 9) {
      setProductNum((prev) => prev + 1)
      productRef.current.push({
        price: '',
        purchaseUrl: '',
        img: '',
      })
    }
  }

  const onClickProducts = (index: number) => {
    if (selectedProduct !== index) {
      setSelectedProduct(index)
    }
  }

  const filterEmptyProducts = () => {
    productRef.current = productRef.current.filter(
      (item) => item.price !== '' || item.purchaseUrl !== '' || item.img !== '',
    )
    coordRef.current = coordRef.current.filter((item) => item.img !== '')
    setProductNum(productRef.current.length)
  }

  useEffect(() => {
    setProductNum(productRef.current.length)
  }, [productRef])

  const value = {
    productNum,
    selectedProduct,
    productRef,
    descriptionRef,
    coordRef,
    onClickPlus,
    onClickProducts,
    step,
    setStep: (state: React.SetStateAction<number>) => {
      callApplication({ action: 'setStep', data: String(state) })
      setStep(state)
    },
    detailType,
    setDetailType,
    filterEmptyProducts,
  }

  return (
    <CodySuggestionContext.Provider value={value}>
      {children}
    </CodySuggestionContext.Provider>
  )
}
