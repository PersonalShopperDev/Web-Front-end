import HorizontalList from 'components/horizontal-list'
import { useState, useEffect } from 'react'
import styles from 'sass/components/review/before-after.module.scss'
import { useReviewEditor } from 'templates/review-editor'
import Section from '../section'
import Uploader from './uploader'
import Wrapper from './wrapper'

type ImageURI = string | ArrayBuffer

export interface ImageData {
  uri: ImageURI
  file: File
}

export default function BeforeAfter() {
  const { dataRef } = useReviewEditor()

  const [beforeImages, setBeforeImages] = useState<ImageData[]>([])
  const [afterImages, setAfterImages] = useState<ImageData[]>([])

  const mapping = (key: string, uri: ImageURI, which: string) => (
    <Wrapper key={key} which={which}>
      <img className={styles.image} src={uri.toString()} alt="after" />
      <div className={styles.screen}>수정</div>
    </Wrapper>
  )

  useEffect(() => {
    dataRef.current.beforeAfter.beforeImages = beforeImages.map(({ file }) => file)
  }, [beforeImages])

  useEffect(() => {
    dataRef.current.beforeAfter.afterImages = afterImages.map(({ file }) => file)
  }, [afterImages])

  return (
    <Section head="Before&After 사진">
      <p className={styles.notice}>
        사진을 업로드해주실 경우 다른 유저들에게 큰도움이 됩니다.
      </p>
      <HorizontalList className={styles.container} gap={9}>
        {[
          afterImages.length < 3 && <Uploader key="after-uploader" name="After" setImages={setAfterImages} />,
          ...afterImages.map(({ uri }) => mapping(uri.slice(10, 20).toString(), uri, 'After')),
          beforeImages.length < 1 && <Uploader key="before-uploader" name="Before" setImages={setBeforeImages} />,
          ...beforeImages.map(({ uri }) => mapping(uri.slice(10, 20).toString(), uri, 'Before')),
        ]}
      </HorizontalList>
    </Section>
  )
}
