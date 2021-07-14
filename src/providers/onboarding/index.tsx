import communicate from 'lib/api'
import React, {
  createContext, useContext, useEffect, useState, Dispatch, SetStateAction, useRef,
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
    setEdit: (key: string) => void
    setStylePicture: Dispatch<SetStateAction<any>>
    putOnboardingInfo: () => Promise<void>
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
  const informationRef = useRef<any>()

  const setData = (key: string, value: string | number | boolean,
    min?: boolean, max?: boolean) => {
    if (informationRef.current[key] === undefined && informationRef.current.userType === 'D') {
      if (informationRef.current.gender === 'M') {
        informationRef.current.topPrice = { max: 100000, min: 5000 }
        informationRef.current.bottomPrice = { max: 70000, min: 5000 }
        informationRef.current.shoesPrice = { max: 100000, min: 10000 }
        informationRef.current.bagPrice = { max: 100000, min: 10000 }
        informationRef.current.hatPrice = { max: 50000, min: 5000 }
      } else {
        informationRef.current.topPrice = { max: 100000, min: 5000 }
        informationRef.current.bottomPrice = { max: 70000, min: 5000 }
        informationRef.current.dressPrice = { max: 100000, min: 5000 }
        informationRef.current.shoesPrice = { max: 100000, min: 10000 }
        informationRef.current.bagPrice = { max: 100000, min: 10000 }
        informationRef.current.accessoryPrice = { max: 50000, min: 5000 }
      }
    }
    if (max) {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: { ...prevInfo[key], max: value } }))
      informationRef.current[key].max = value
    } else if (min) {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: { ...prevInfo[key], min: value } }))
      informationRef.current[key].min = value
    } else {
      setInformation((prevInfo) => ({ ...prevInfo, [key]: value }))
      informationRef.current[key] = value
    }
  }
  const setEdit = async (key:string) => {
    const payload: any = {}
    if (key === 'body' || key === 'skin' || key === 'career') {
      payload[key] = informationRef.current[key]
    } else if (key === 'size') {
      payload.topSize = informationRef.current.topSize
      payload.bottomSize = informationRef.current.bottomSize
      payload.shoulderSize = informationRef.current.shoulderSize
      payload.waistSize = informationRef.current.waistSize
      payload.bellySize = informationRef.current.bellySize
      payload.hipSize = informationRef.current.hipSize
    } else if (key === 'price') {
      payload.topPrice = informationRef.current.topPrice
      payload.bottomPrice = informationRef.current.bottomPrice
      payload.shoesPrice = informationRef.current.shoesPrice
      payload.bagPrice = informationRef.current.bagPrice
      if (information.accessoryPrice !== undefined) {
        payload.accessoryPrice = informationRef.current.accessoryPrice
      }
      if (information.dressPrice !== undefined) {
        payload.dressPrice = informationRef.current.dressPrice
      }
      if (information.hatPrice !== undefined) payload.hatPrice = informationRef.current.hatPrice
    } else if (key === 'codyGender') {
      payload.supplyMale = informationRef.current.supplyMale
      payload.supplyFemale = informationRef.current.supplyFemale
    } else {
      payload.list = stylePicture
      await communicate({ url: '/style/img', payload, method: 'PUT' })
      fetchInformationData()
      return
    }
    communicate({ url: '/onboard', payload, method: 'PATCH' })
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
  const putOnboardingInfo = async () => {
    const payload = { list: stylePicture }
    await communicate({ url: '/onboard', payload: information, method: 'PUT' })
    if (information.userType === 'D') {
      await communicate({ url: '/style/img', payload, method: 'PUT' })
    }
  }

  useEffect(() => {
    fetchInformationData()
  }, [])
  useEffect(() => {
    informationRef.current = information
    if (informationRef.current === null) informationRef.current = { userType: 'N' }
  }, [information])
  const value = {
    information,
    stylePicture,
    setData,
    setEdit,
    setStylePicture,
    putOnboardingInfo,
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}
