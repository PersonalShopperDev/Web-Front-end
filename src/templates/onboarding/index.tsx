import React, { useEffect, useState } from 'react'
import TopBar from 'src/components/onboarding/top-bar'
import BottomBar from 'src/components/onboarding/bottom-bar'
// import communicate from 'lib/api/index'
import Step1 from './steps/step1'
import Step2 from './steps/step2'
import Step3 from './steps/step3'
import Step4 from './steps/step4'
import Step5 from './steps/step5'
import Step6 from './steps/step6'

export type User = 'D' | 'S'
export type Gender = 'M' | 'F'
export interface PriceLists {
  title: string
  minPrice: number
  maxPrice: number
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

interface Payload {
  userType: User
  gender: Gender
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
  stylePicture?: Array<number>
  supplyMale?: boolean
  supplyFemale?: boolean
  career?: number
}

export default function Onboarding() {
  const [stepIndex, setStepIndex] = useState(1)
  const [nextStep, setNextStep] = useState(false)
  const [user, setUser] = useState<User>(null)
  const [gender, setGender] = useState<Gender>(null)
  const [body, setBody] = useState(-1)
  const [skin, setSkin] = useState(-1)
  const [topSize, setTopSize] = useState(-1)
  const [bottomSize, setBottomSize] = useState(-1)
  const [shoulderSize, setShoulderSize] = useState(-1)
  const [waistSize, setWaistSize] = useState(-1)
  const [bellySize, setBellySize] = useState(-1)
  const [hipSize, setHipSize] = useState(-1)
  const [topMinPrice, setTopMinPrice] = useState(5000)
  const [topMaxPrice, setTopMaxPrice] = useState(100000)
  const [bottomMinPrice, setBottomMinPrice] = useState(5000)
  const [bottomMaxPrice, setBottomMaxPrice] = useState(70000)
  const [dressMinPrice, setDressMinPrice] = useState(5000)
  const [dressMaxPrice, setDressMaxPrice] = useState(10000)
  const [shoesMinPrice, setShoesMinPrice] = useState(10000)
  const [shoesMaxPrice, setShoesMaxPrice] = useState(100000)
  const [bagMinPrice, setBagMinPrice] = useState(10000)
  const [bagMaxPrice, setBagMaxPrice] = useState(100000)
  const [accessoryMinPrice, setAccessoryMinPrice] = useState(5000)
  const [accessoryMaxPrice, setAccessoryMaxPrice] = useState(50000)
  const [hatMinPrice, setHatMinPrice] = useState(5000)
  const [hatMaxPrice, setHatMaxPrice] = useState(50000)
  const [codyLists, setCodyLists] = useState([])
  const [career, setCareer] = useState(-1)
  const [stylePictureLists, setStylePictureLists] = useState([])

  const putOnboardingInfo = () => {
    const userOnboardingInfo: Payload = {
      userType: user,
      gender,
    }
    if (user === 'D') {
      userOnboardingInfo.body = body
      userOnboardingInfo.topSize = topSize
      userOnboardingInfo.bottomSize = bottomSize
      userOnboardingInfo.shoulderSize = shoulderSize
      userOnboardingInfo.waistSize = waistSize
      userOnboardingInfo.bellySize = bellySize
      userOnboardingInfo.hipSize = hipSize
      userOnboardingInfo.topPrice = { min: topMinPrice, max: topMaxPrice }
      userOnboardingInfo.bottomPrice = { min: bottomMinPrice, max: bottomMaxPrice }
      userOnboardingInfo.shoesPrice = { min: shoesMinPrice, max: shoesMaxPrice }
      userOnboardingInfo.bagPrice = { min: bagMinPrice, max: bagMaxPrice }
      if (gender === 'M') {
        userOnboardingInfo.hatPrice = { min: hatMinPrice, max: hatMaxPrice }
      } else {
        userOnboardingInfo.skin = skin
        userOnboardingInfo.dressPrice = { min: dressMinPrice, max: dressMaxPrice }
        userOnboardingInfo.accessoryPrice = { min: accessoryMinPrice, max: accessoryMaxPrice }
      }
      // communicate({ url: '/style/img', payload: stylePictureLists, method: 'PUT' })
    } else {
      userOnboardingInfo.supplyMale = codyLists.includes('M')
      userOnboardingInfo.supplyFemale = codyLists.includes('F')
      userOnboardingInfo.career = career
    }
    // communicate({ url: '/onboard', payload: userOnboardingInfo, method: 'PUT' })
  }
  const topPriceLists: PriceLists = {
    title: '상의',
    minPrice: 5000,
    maxPrice: 100000,
    setMinPrice: setTopMinPrice,
    setMaxPrice: setTopMaxPrice,
  }
  const bottomPriceLists: PriceLists = {
    title: '하의',
    minPrice: 5000,
    maxPrice: 70000,
    setMinPrice: setBottomMinPrice,
    setMaxPrice: setBottomMaxPrice,
  }
  const dressPriceLists: PriceLists = {
    title: '원피스/세트',
    minPrice: 5000,
    maxPrice: 100000,
    setMinPrice: setDressMinPrice,
    setMaxPrice: setDressMaxPrice,
  }
  const shoesPriceLists: PriceLists = {
    title: '신발',
    minPrice: 10000,
    maxPrice: 100000,
    setMinPrice: setShoesMinPrice,
    setMaxPrice: setShoesMaxPrice,
  }
  const bagPriceLists: PriceLists = {
    title: '가방',
    minPrice: 10000,
    maxPrice: 100000,
    setMinPrice: setBagMinPrice,
    setMaxPrice: setBagMaxPrice,
  }
  const accessoryPriceLists: PriceLists = {
    title: '악세사리',
    minPrice: 5000,
    maxPrice: 50000,
    setMinPrice: setAccessoryMinPrice,
    setMaxPrice: setAccessoryMaxPrice,
  }
  const hatPriceLists: PriceLists = {
    title: '모자/잡화',
    minPrice: 5000,
    maxPrice: 50000,
    setMinPrice: setHatMinPrice,
    setMaxPrice: setHatMaxPrice,
  }
  const [indexNum, setIndexNum] = useState(6)
  const step3 = 3
  const stepComponents = [<Step1 user={user} setUser={setUser} />,
    <Step2 gender={gender} setGender={setGender} />,
    <Step3
      user={user}
      nextStep={nextStep}
      body={body}
      setBody={setBody}
      skin={skin}
      setSkin={setSkin}
      gender={gender}
      codyLists={codyLists}
      setCodyLists={setCodyLists}
    />,
    <Step4
      user={user}
      gender={gender}
      topSize={topSize}
      bottomSize={bottomSize}
      shoulderSize={shoulderSize}
      waistSize={waistSize}
      bellySize={bellySize}
      hipSize={hipSize}
      career={career}
      setTopSize={setTopSize}
      setBottomSize={setBottomSize}
      setShoulderSize={setShoulderSize}
      setWaistSize={setWaistSize}
      setBellySize={setBellySize}
      setHipSize={setHipSize}
      setCareer={setCareer}
    />, <Step5
      user={user}
      gender={gender}
      topPriceLists={topPriceLists}
      bottomPriceLists={bottomPriceLists}
      dressPriceLists={dressPriceLists}
      shoesPriceLists={shoesPriceLists}
      bagPriceLists={bagPriceLists}
      accessoryPriceLists={accessoryPriceLists}
      hatPriceLists={hatPriceLists}
    />, <Step6
      gender={gender}
      stylePictureLists={stylePictureLists}
      setStylePictureLists={setStylePictureLists}
    />]
  const onPrevButtonClick = () => {
    if (stepIndex > 1 && !nextStep) {
      setStepIndex(+stepIndex - 1)
    } else if (nextStep) {
      setNextStep(!nextStep)
    }
  }
  const onNextButtonClick = () => {
    if (stepIndex < indexNum) {
      if (stepIndex === step3 && !nextStep && user === 'D' && gender === 'F') {
        setNextStep(true)
      } else {
        setStepIndex(+stepIndex + 1)
      }
    } else if (stepIndex === indexNum) {
      putOnboardingInfo()
      console.log('welcome personal Shopper')
    }
  }
  useEffect(() => {
    if (user === 'D') {
      setIndexNum(6)
    } else {
      setIndexNum(5)
    }
  }, [user])
  return (
    <>
      <header>
        <TopBar index={stepIndex} totalIndexNum={indexNum} user={user} />
      </header>
      {stepComponents[stepIndex - 1]}
      <section>
        <BottomBar
          onPrevButtonClick={onPrevButtonClick}
          onNextButtonClick={onNextButtonClick}
          stepIndex={stepIndex}
          totalIndexNum={indexNum}
          user={user}
        />
      </section>
    </>
  )
}
