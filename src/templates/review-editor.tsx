import AskPublic from 'components/review/ask-public'
import BeforeAfter from 'components/review/before-after'
import Satisfaction from 'components/review/satisfaction'
import Submit from 'components/review/submit'
import Textarea from 'components/review/textarea'
import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
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

export default function ReviewEditor({
  id,
} : {
  id: number
}) {
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

    const formData = new FormData()

    formData.append('rating', dataRef.current.statisfaction.toString())
    formData.append('content', dataRef.current.textarea)
    formData.append('publicBody', dataRef.current.public === true ? 'true' : 'false')
    dataRef.current.beforeAfter.beforeImages.forEach((image) => {
      formData.append('beforeImg', image)
    })
    dataRef.current.beforeAfter.afterImages.forEach((image) => {
      formData.append('afterImg', image)
    })

    await communicate({
      url: `/review/${id}`,
      options: {
        body: formData,
      },
      method: 'PUT',
    }).then((res) => {
      if (!res.ok) {
        throw new Error()
      }
    }).catch(async () => {
      await createAlert({ text: ERROR_MESSAGE })
    })
  }

  return (
    <ReviewEditorContext.Provider value={value}>
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
