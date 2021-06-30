import AskPublic from 'components/review/ask-public'
import BeforeAfter from 'components/review/before-after'
import Preview from 'components/review/preview'
import Satisfaction from 'components/review/satisfaction'
import Submit from 'components/review/submit'
import Textarea from 'components/review/textarea'
// import Divider from 'widgets/divider'

export default function ReviewEditor() {
  return (
    <>
      <Preview />
      <Satisfaction />
      {/* <Divider /> */}
      <Textarea />
      {/* <Divider /> */}
      <BeforeAfter />
      {/* <Divider /> */}
      <AskPublic />
      <Submit onClick={() => {}} />
    </>
  )
}
