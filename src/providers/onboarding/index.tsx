import communicate from 'lib/api'
import React, {
  createContext, useContext, useEffect, useState, Dispatch, SetStateAction,
} from 'react'

interface Information {
    userType: 'N' | 'D' | 'S' | 'W'
    gender: 'M' | 'F'
    body?: number
    skin?: number
    topSize?: number
    bottomSize?: number
    shoulderSize?: number
    waistSize?: number
    bellySize?: number
    hipSize?: number
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
    styles: Array<any>
    supplyMale?: boolean
    supplyFemale?: boolean
    career?: number
}

interface IsEdit {
  body: boolean
  skin: boolean
  size: boolean
  price: boolean
  codyGender: boolean
  career: boolean
}

interface OnboardingProps {
    information: Information
    stylePicture: Array<any>
    editCheck: IsEdit
    setData: (key: string, value: string | number | boolean,
        min?: boolean, max?: boolean) => void
    setEdit: (key: string) => void
    setStylePicture: Dispatch<SetStateAction<any>>
    putOnboardingInfo: () => void
    editOnboardingInfo: (key:string, value: string | number | boolean) => void
}

const OnboardingContext = createContext<OnboardingProps>(null)

export const useOnboarding = () => useContext(OnboardingContext)

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [information, setInformation] = useState<Information>(null)
  const [stylePicture, setStylePicture] = useState([])
  const [editCheck, setEditCheck] = useState<IsEdit>({
    body: false,
    skin: false,
    size: false,
    price: false,
    codyGender: false,
    career: false,
  })
  console.log(information)
  const setData = (key: string, value: string | number | boolean,
    min?: boolean, max?: boolean) => {
    if (max) {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: { ...prevInfo[key], max: value } }))
    } else if (min) {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: { ...prevInfo[key], min: value } }))
    } else {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: value }))
    }
  }
  const setEdit = (key:string) => {
    if (editCheck[key]) {
      const payload: any = {}
      if (key === 'body' || key === 'skin' || key === 'career') {
        payload[key] = information[key]
      } else if (key === 'size') {
        payload.topSize = information.topSize
        payload.bottomSize = information.bottomSize
        payload.shoulderSize = information.shoulderSize
        payload.waistSize = information.waistSize
        payload.bellySize = information.bellySize
        payload.hipSize = information.hipSize
      } else if (key === 'price') {
        payload.topPrice = information.topPrice
        payload.bottomPrice = information.bottomPrice
        payload.shoesPrice = information.shoesPrice
        payload.bagPrice = information.bagPrice
        if (information.accessoryPrice !== undefined) {
          payload.accessoryPrice = information.accessoryPrice
        }
        if (information.dressPrice !== undefined) payload.dressPrice = information.dressPrice
        if (information.hatPrice !== undefined)payload.hatPrice = information.hatPrice
      } else if (key === 'codyGender') {
        payload.supplyMale = information.supplyMale
        payload.supplyFemale = information.supplyFemale
      }
      communicate({ url: '/onboard', payload, method: 'PATCH' })
    }
    setEditCheck((prevInfo) => ({ ...prevInfo, [key]: !prevInfo[key] }))
  }
  const fetchInformationData = async () : Promise<void> => {
    const res = await communicate({
      url: '/onboard',
    })
    if (res.status === 200) {
      const data = await res.json()
      setInformation(data)
    }
  }
  const putOnboardingInfo = () => {
    communicate({ url: '/onboard', payload: information, method: 'PUT' })
    if (information.userType === 'D') communicate({ url: '/style/img', payload: stylePicture, method: 'PUT' })
  }
  const editOnboardingInfo = (key: string, value: string | number | boolean) => {

  }
  useEffect(() => {
    fetchInformationData()
  }, [])

  const value = {
    information,
    editCheck,
    stylePicture,
    setData,
    setEdit,
    setStylePicture,
    putOnboardingInfo,
    editOnboardingInfo,
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}
