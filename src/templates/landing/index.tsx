import ScrollProvider from 'providers/scrollProvider'
import Section0 from './sections/0'
import Section1 from './sections/1'
import Section2 from './sections/2'
import Section3 from './sections/3'
import Section4 from './sections/4'
import Section5 from './sections/5'

export default function Landing() {
  return (
    <ScrollProvider>
      <Section0 />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </ScrollProvider>
  )
}
