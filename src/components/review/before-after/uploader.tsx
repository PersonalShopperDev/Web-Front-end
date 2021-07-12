import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from 'sass/components/review/before-after.module.scss'
import Icon from 'widgets/icon'
import { ImageData } from '.'
import Wrapper from './wrapper'

export default function Uploader({
  name,
  setImages,
} : {
  name: string,
  setImages: Dispatch<SetStateAction<ImageData[]>>
}) {
  const { createAlert } = useAlert()

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]

    const imageURI = await getImageURI(file)
    setImages((array) => [...array, {
      uri: imageURI,
      file,
    }])
  }

  const getImageURI = (file: File) => new Promise<string | ArrayBuffer>((resolve, reject) => {
    if (!window.FileReader) {
      createAlert({ text: '브라우저가 미리보기를 지원하지 않습니다.' })
      return
    }

    const fileReader = new FileReader()
    fileReader.onloadend = (img) => resolve(img.target.result)
    fileReader.onerror = (error) => reject(error)
    fileReader.readAsDataURL(file)
  })

  return (
    <Wrapper which={name}>
      <label className={styles.addButton} htmlFor={`${name}-picker`}>
        <Icon src="add-gray.png" size={24} />
        <input
          id={`${name}-picker`}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={upload}
          style={{ display: 'none' }}
        />
      </label>
    </Wrapper>
  )
}
