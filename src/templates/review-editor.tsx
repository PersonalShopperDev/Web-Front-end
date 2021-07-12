import AskPublic from 'components/review/ask-public'
import BeforeAfter from 'components/review/before-after'
import Preview from 'components/review/preview'
import Satisfaction from 'components/review/satisfaction'
import Submit from 'components/review/submit'
import Textarea from 'components/review/textarea'
import { useAlert } from 'providers/dialog/alert/inner'
import {
  createContext, useContext, useRef, MutableRefObject,
} from 'react'
import Divider from 'widgets/divider'

interface Data {
  statisfaction: number
  textarea: string
  beforeAfter: {
    beforeImages: File[],
    afterImages: File[],
  }
  public: boolean,
}

interface ReviewEditorContextProps {
  dataRef: MutableRefObject<Data>
}

const ReviewEditorContext = createContext<ReviewEditorContextProps>(null)

export const useReviewEditor = () => useContext(ReviewEditorContext)

export default function ReviewEditor() {
  const dataRef = useRef<Data>({
    statisfaction: undefined,
    textarea: null,
    beforeAfter: {
      beforeImages: null,
      afterImages: null,
    },
    public: false,
  })

  const { createAlert } = useAlert()

  const value = {
    dataRef,
  }

  const onSubmit = async () => {
    if (!dataRef.current.textarea) {
      await createAlert({ text: '리뷰를 작성해주세요' })
      return
    }

    console.log(dataRef.current)

    const formData = new FormData()

    // await communicate({
    //   url: '/profile/img',
    //   options: {
    //     body: formData,
    //   },
    //   method: 'POST',
    // }).then((res) => {
    //   if (!res.ok) {
    //     throw new Error()
    //   }
    // }).catch(async () => {
    //   await createAlert({ text: '에러가 발생했습니다' })
    // })
  }

  return (
    <ReviewEditorContext.Provider value={value}>
      <Preview />
      <Satisfaction />
      <Divider />
      <Textarea />
      <Divider />
      <BeforeAfter />
      <Divider />
      <AskPublic />
      <Submit onClick={onSubmit} />
    </ReviewEditorContext.Provider>
  )
}
