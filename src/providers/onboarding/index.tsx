import communicate from 'lib/api'
import React, {
  createContext, useContext, useEffect, useState, Dispatch, SetStateAction, useRef,
} from 'react'

type OnEditCallback = () => Promise<void>

interface Skin {
  id: number,
  value: string
}

interface ClothSize {
  topSize?: number
  bottomSize?: number
  shoulderSize?: number
  waistSize?: number
  bellySize?: number
  hipSize?: number
}

interface ClothPrice {
  topPrice?: {
    min: number
    max: number
  }
  bottomPrice?: {
    min: number
    max: number
  }
  dressPrice?: {
    min: number
    max: number
  }
  shoesPrice?: {
    min: number
    max: number
  }
  bagPrice?: {
    min: number
    max: number
  }
  accessoryPrice?: {
    min: number
    max: number
  }
  hatPrice?: {
    min: number
    max: number
  }
}

interface Information {
    userType: 'N' | 'D' | 'S' | 'W'
    gender: 'M' | 'F' | ''
    body?: number
    skin?: Skin
    clothSize?: ClothSize
    clothPrice? : ClothPrice
    styles?: Array<any>
    supplyMale?: boolean
    supplyFemale?: boolean
    career?: number
}

interface OnboardingProps {
    information: Information
    stylePicture: Array<any>
    setData: (key: string, value: string | number | boolean,
        min?: boolean, max?: boolean) => void
    setStylePicture: Dispatch<SetStateAction<any>>
    putOnboardingInfo: () => Promise<void>
    setOnEdit: (callback: OnEditCallback) => void
    onClickEdit: () => void
    fetchInformationData: () => Promise<void>
}

const OnboardingContext = createContext<OnboardingProps>(null)

export const useOnboarding = () => useContext(OnboardingContext)

export default function OnboardingProvider({
  children,
  userId,
}: {
  children: React.ReactNode
  userId? : number
}) {
  const [information, setInformation] = useState<Information>({
    userType: 'N',
    gender: '',
    clothSize: {},
    clothPrice: {},
  })
  const [stylePicture, setStylePicture] = useState([])
  const informationRef = useRef<any>()
  const onEdit = useRef<OnEditCallback>()

  const setOnEdit = (callback: OnEditCallback) => {
    onEdit.current = callback
  }

  const onClickEdit = () => {
    onEdit.current?.call(null)
  }

  const setData = (key: string, value: string | number | boolean,
    min?: boolean, max?: boolean) => {
    if (key === 'gender' && information.userType === 'D') {
      if (value === 'M') {
        setInformation((prevInfo) => ({
          ...prevInfo,
          clothPrice: {
            topPrice: { max: 100000, min: 5000 },
            bottomPrice: { max: 70000, min: 5000 },
            shoesPrice: { max: 100000, min: 10000 },
            bagPrice: { max: 100000, min: 10000 },
            hatPrice: { max: 50000, min: 5000 },
          },
        }))
      } else {
        setInformation((prevInfo) => ({
          ...prevInfo,
          clothPrice: {
            topPrice: { max: 100000, min: 5000 },
            bottomPrice: { max: 70000, min: 5000 },
            dressPrice: { max: 100000, min: 5000 },
            shoesPrice: { max: 100000, min: 10000 },
            bagPrice: { max: 100000, min: 10000 },
            accessoryPrice: { max: 50000, min: 5000 },
          },
        }))
      }
    }
    if (max) {
      setInformation((prevInfo) => ({
        ...prevInfo,
        clothPrice: { ...prevInfo.clothPrice, max: value },
      }))
    } else if (min) {
      setInformation((prevInfo) => ({
        ...prevInfo,
        clothPrice: { ...prevInfo.clothPrice, min: value },
      }))
    } else if (key.substr(key.length - 4) === 'Size') {
      setInformation((prevInfo) => ({
        ...prevInfo,
        clothSize: { ...prevInfo.clothSize, [key]: value },
      }))
    } else {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: value }))
    }
  }

  const fetchInformationData = async () : Promise<void> => {
    const res = await communicate({
      url: `/profile${userId ? `/${userId}` : ''}`,
    })
    if (res.status === 200) {
      const data = await res.json()
      setInformation(data)
    }
  }

  const putOnboardingInfo = async () => {
    await communicate({ url: '/onboard', payload: information, method: 'PUT' }).then(async (res) => {
      if (!res.ok) {
        throw new Error()
      }
      if (information.userType === 'D') {
        await communicate({ url: '/style/img', payload: { list: stylePicture }, method: 'PUT' })
      }
    })
  }

  useEffect(() => {
    fetchInformationData()
  }, [])

  useEffect(() => {
    informationRef.current = information
  }, [information])

  const value = {
    information,
    stylePicture,
    setData,
    setStylePicture,
    putOnboardingInfo,
    setOnEdit,
    onClickEdit,
    fetchInformationData,
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

OnboardingProvider.defaultProps = {
  userId: null,
}
