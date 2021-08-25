/* eslint-disable no-nested-ternary */
import React, {
  useState, ChangeEvent, useCallback, useEffect,
} from 'react'
import styles from 'sass/components/cody-grid.module.scss'
import Icon from 'widgets/icon'
import { useCodySuggestion } from 'providers/cody-suggestion'
import Cropper from 'react-easy-crop'
import loadImage from 'blueimp-load-image'

interface Cropped {
    width: number,
    height: number,
    x: number,
    y: number,
  }

export default function CodyGrid({
  index,
  isBigGrid,
}: {
  index: number,
  isBigGrid: boolean
}) {
  const { onClickProducts, selectedProduct, productRef } = useCodySuggestion()
  const isFocus = selectedProduct === index - 1
  const [removedImage, setRemovedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [cropModal, setCropModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState(1)

  const [croppedImage, setCroppedImage] = useState(null)
  const [tmpRemovedImage, setTmpRemovedImage] = useState(null)

  // eslint-disable-next-line no-shadow
  const onClickCamera = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.addEventListener('load', () => onLoadEventListner(reader.result))
  }

  const onLoadEventListner = (url: string| ArrayBuffer) => {
    setImageUrl(url as string)
    setCropModal(true)
  }

  const onModalClose = () => {
    setImageUrl(null)
    setCropModal(false)
  }

  const onClickBack = () => {
    setCroppedImage(null)
    setTmpRemovedImage(null)
  }

  const onCropComplete = useCallback((Area, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const onClickDelete = async () => {
    const resizedImage = await loadImage(croppedImage, {
      maxWidth: 512,
      maxHeight: 512,
      canvas: true,
    })
    resizedImage.image.toBlob(async (inputBlob) => {
      const formData = new FormData()
      formData.append('image_file', inputBlob)
      const response = await fetch('https://sdk.photoroom.com/v1/segment', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.PHOTOROOM_KEY,
        },
        body: formData,
      })
      const outputBlob = await response.blob()
      const reader = new FileReader()
      reader.readAsDataURL(outputBlob)
      reader.addEventListener('load', () => onLoadRemovedEventListener(reader.result))
    })
  }

  const onLoadRemovedEventListener = (url: string| ArrayBuffer) => {
    productRef.current[selectedProduct].img = url as string
    setRemovedImage(url as string)
    setTmpRemovedImage(url as string)
  }

  const showCroppedImage = async () => {
    const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels)
    setCroppedImage(croppedImg)
  }
  const checkDeleteImage = () => {
    setCropModal(false)
    setCroppedImage(null)
    setTmpRemovedImage(null)
  }

  const getCroppedImg = async (imageSrc: string, pixelCrop: Cropped) => {
    const image = new Image()
    image.src = imageSrc

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

    const maxSize = Math.min(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea
    canvas.height = safeArea

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.translate(-safeArea / 2, -safeArea / 2)

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5,
    )
    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    )
    return new Promise((resolve) => {
      resolve(canvas.toDataURL())
    })
  }

  const onClickRemoveImage = () => {
    productRef.current[index - 1].img = ''
    setRemovedImage('')
  }

  useEffect(() => {
    setRemovedImage(productRef.current[index - 1].img)
  }, [productRef.current])

  return (
    <>
      <button
        type="button"
        onClick={() => onClickProducts(index - 1)}
      >
        {removedImage
          ? (
            <div className={styles.removedImg}>
              <label
                className={styles.removeBtn}
                htmlFor={`removeBtn${index - 1}`}
              >
                <input
                  id={`removeBtn${index - 1}`}
                  type="button"
                  onClick={onClickRemoveImage}
                />
                삭제
              </label>
              <img
                className={isBigGrid ? (isFocus ? styles.activeBig : styles.big)
                  : (isFocus ? styles.activeSmall : styles.small)}
                src={removedImage}
                alt="removed"
              />
            </div>
          ) : (
            <label
              className={isBigGrid ? (isFocus ? styles.activeBig : styles.big)
                : (isFocus ? styles.activeSmall : styles.small)}
              htmlFor={`productPicker${index - 1}`}
            >
              <input
                id={`productPicker${index - 1}`}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => onClickCamera(e)}
                style={{ display: 'none' }}
              />
              <Icon src="product-camera.png" size={31} key="camera" />
              코디
              {index}
            </label>
          ) }
      </button>
      {cropModal && (
      <div className={styles.modalContainer}>
        <div className={styles.modalBox}>
          <div className={styles.modalHeader}>
            {!croppedImage
              ? <Icon src="cropExit.png" size={20} onClick={onModalClose} />
              : <Icon src="cropBack.png" size={14} onClick={onClickBack} /> }
            <span>크롭하기</span>
            <Icon src="cropCheck.png" size={20} onClick={() => (croppedImage ? checkDeleteImage() : showCroppedImage())} />
          </div>
          {!croppedImage
            ? (
              <>
                <div className={styles.img}>
                  <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className={styles.crop}>
                  <span className={styles.cropText}>
                    제안 의류를 최대한 확대하여 사진을 크롭해주세요.
                    제안 의류 외에 다른 부분이 크롭 된 사진에 포함되면
                    깔끔한 배경제거가 어렵습니다.
                  </span>
                </div>
              </>
            ) : (
              <>
                <img src={croppedImage} width={339} height={339} alt="croppedImg" className={styles.croppedImg} />
                <button className={styles.deleteBox} type="button" onClick={onClickDelete}>
                  <span className={styles.deleteText}>배경제거</span>
                </button>
                {tmpRemovedImage
                && (
                <div>
                  <span className={styles.removedText}>배경제거</span>
                  <img src={tmpRemovedImage} width={341} height={341} alt="removedImg" className={styles.removedImg} />
                </div>
                )}
              </>
            ) }
        </div>
      </div>
      )}
    </>
  )
}
