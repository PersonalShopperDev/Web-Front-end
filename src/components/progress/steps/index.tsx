import FirstStep from './first'
import FourthStep from './fourth'
import SecondStep from './second'
import ThirdStep from './third'

export default function Steps({ index } : { index: number }) {
  switch (index) {
    case 0:
      return <FirstStep />
    case 1:
      return <SecondStep />
    case 2:
      return <ThirdStep />
    case 3:
      return <FourthStep />
    default:
      return <></>
  }
}
