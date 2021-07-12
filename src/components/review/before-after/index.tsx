import HorizontalList from 'components/horizontal-list'
import { useState } from 'react'
import styles from 'sass/components/review/before-after.module.scss'
import Section from '../section'
import Uploader from './uploader'
import Wrapper from './wrapper'

type ImageURI = string | ArrayBuffer

export interface ImageData {
  uri: ImageURI
  file: File
}

export default function BeforeAfter() {
  const [beforeImages, setBeforeImages] = useState<ImageData[]>([])
  const [afterImages, setAfterImages] = useState<ImageData[]>([])

  const mapping = (key: string, uri: ImageURI, name: string) => (
    <Wrapper key={key} name={name}>
      <img className={styles.image} src={uri.toString()} alt="after" />
      <div className={styles.screen}>수정</div>
    </Wrapper>
  )

  return (
    <Section head="Before&After 사진">
      <p className={styles.notice}>
        사진을 업로드해주실 경우 다른 유저들에게 큰도움이 됩니다.
      </p>
      <HorizontalList className={styles.container} gap={9}>
        {[
          afterImages.length < 3 && <Uploader name="After" setImages={setAfterImages} />,
          ...afterImages.map(({ uri }) => mapping(uri.slice(10, 20).toString(), uri, 'After')),
          beforeImages.length < 1 && <Uploader name="Before" setImages={setBeforeImages} />,
          ...beforeImages.map(({ uri }) => mapping(uri.slice(10, 20).toString(), uri, 'Before')),
        ]}
      </HorizontalList>
    </Section>
  )
}
