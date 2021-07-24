import React, {
  ChangeEvent, useRef, useState, useCallback, useEffect, SetStateAction,
  Dispatch,
} from 'react'
import styles from 'sass/components/product.module.scss'
import Icon from 'widgets/icon'
import Cropper from 'react-easy-crop'
import loadImage from 'blueimp-load-image'
import { useAlert } from 'providers/dialog/alert/inner'
import { ProductInformation } from 'templates/cody-suggestion/index'

interface Cropped {
  width: number,
  height: number,
  x: number,
  y: number,
}

export default function Product({
  id,
  index,
  item,
  setProducts,
}: {
  id: number
  index: number
  item?: ProductInformation
  setProducts: Dispatch<SetStateAction<any>>
}) {
  const { createAlert } = useAlert()
  const NameRef = useRef<HTMLInputElement>()
  const PriceRef = useRef<HTMLInputElement>()
  const UrlRef = useRef<HTMLInputElement>()
  const [name, setName] = useState<string>()
  const [price, setPrice] = useState<string>()
  const [buyLink, setBuyLink] = useState<string>()
  const [imageUrl, setImageUrl] = useState(null)
  const [cropModal, setCropModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [removedImage, setRemovedImage] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const onModalClose = () => {
    setImageUrl(null)
    setCropModal(false)
  }
  const onClickCamera = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.addEventListener('load', () => onLoadEventListner(reader.result))
  }
  const onClickBack = () => {
    setCroppedImage(null)
    setRemovedImage(null)
  }
  const onLoadEventListner = (url: string| ArrayBuffer) => {
    setImageUrl(url)
    setCropModal(true)
  }
  const onLoadRemovedEventListener = (url: string| ArrayBuffer) => {
    setRemovedImage(url)
  }
  const onClickDelete = async () => {
    const resizedImage = await loadImage(croppedImage, {
      maxWidth: 1500,
      maxHeight: 1500,
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
  const onClickComplete = async () => {
    if (NameRef.current.value === '' || PriceRef.current.value === '' || UrlRef.current.value === '') {
      await createAlert({ text: '항목을 채워주세요' })
      return
    }
    setName(NameRef.current.value)
    setPrice(PriceRef.current.value)
    setBuyLink(UrlRef.current.value)
    const cookieData: ProductInformation = {
      url: removedImage,
      name: NameRef.current.value,
      price: PriceRef.current.value,
      buyLink: UrlRef.current.value,
    }
    setIsEdit(true)
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData = JSON.parse(currentTempData)
    if (!parsedData) {
      setProducts([cookieData])
      localStorage.setItem(`cody${id}`, JSON.stringify({ products: [cookieData] }))
      return
    }
    if (parsedData.products === undefined) {
      localStorage.setItem(`cody${id}`, JSON.stringify({ products: [cookieData], description: parsedData.description }))
    } else {
      if (parsedData.products[index] === undefined) setProducts((prev) => [...prev, cookieData])
      parsedData.products[index] = cookieData
      localStorage.setItem(`cody${id}`, JSON.stringify({ products: parsedData.products, description: parsedData.description }))
    }
  }
  const onClickEdit = () => {
    setIsEdit(false)
  }
  const onCropComplete = useCallback((Area, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])
  const showCroppedImage = async () => {
    const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels)
    setCroppedImage(croppedImg)
  }
  const checkDeleteImage = () => {
    setCropModal(false)
  }
  const getCroppedImg = async (imageSrc: string, pixelCrop: Cropped) => {
    const image = new Image()
    // image.setAttribute('crossOrigin', 'anonymous')
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
  useEffect(() => {
    if (item !== null && NameRef.current && PriceRef.current && UrlRef.current) {
      NameRef.current.value = item.name
      PriceRef.current.value = item.price
      UrlRef.current.value = item.buyLink
      setRemovedImage(item.url)
    }
  }, [item])

  useEffect(() => {
    if (name !== undefined && NameRef.current) NameRef.current.value = name
    if (price !== undefined && PriceRef.current) PriceRef.current.value = price
    if (buyLink !== undefined && UrlRef.current) UrlRef.current.value = buyLink
  }, [name, price, buyLink, isEdit])
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === `name${index}`) {
      setName(e.target.value)
    } else if (e.target.id === `price${index}`) {
      setPrice(e.target.value)
    } else if (e.target.id === `buylink${index}`) {
      setBuyLink(e.target.value)
    }
  }
  return (
    <>
      <div className={styles.container}>
        <label className={styles.cameraBox} htmlFor="productPicker">
          {removedImage ? <img src={removedImage} width={73} height={73} alt="removed" className={styles.removed} />
            : (
              <>
                <Icon src="product-camera.png" size={27} />
                <input
                  id="productPicker"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onClickCamera}
                  style={{ display: 'none' }}
                />
              </>
            ) }
        </label>
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            {!isEdit ? (
              <input
                type="text"
                placeholder="상품이름"
                ref={NameRef}
                autoComplete="off"
                value={name}
                onChange={onChangeInput}
                id={`name${index}`}
                className={styles.input}
              />
            ) : <p className={styles.input}>{name}</p> }
            <div className={styles.flexContainer}>
              ₩
              {!isEdit ? (
                <input
                  type="number"
                  placeholder="가격"
                  ref={PriceRef}
                  autoComplete="off"
                  value={price}
                  onChange={onChangeInput}
                  id={`price${index}`}
                  className={styles.input}
                />
              ) : <p className={styles.input}>{price}</p> }
            </div>
            {!isEdit ? (
              <input
                type="url"
                placeholder="구매링크"
                ref={UrlRef}
                autoComplete="off"
                value={buyLink}
                onChange={onChangeInput}
                id={`buylink${index}`}
                className={styles.input}
              />
            ) : <p className={styles.input}>{buyLink}</p> }
          </div>
          <button type="button" className={styles.confirm} onClick={isEdit ? onClickEdit : onClickComplete}>
            <span>{isEdit ? '수정' : '확정'}</span>
          </button>
        </div>
      </div>
      {cropModal && (
      <div className={styles.modalContainer}>
        <div className={styles.modalBox}>
          <div className={styles.modalHeader}>
            {!croppedImage
              ? <Icon src="cropExit.png" size={20} onClick={onModalClose} />
              : <Icon src="cropBack.png" size={14} onClick={onClickBack} /> }
            <span>크롭하기</span>
            <Icon src="cropCheck.png" size={20} onClick={() => (removedImage ? checkDeleteImage() : showCroppedImage())} />
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
                {removedImage
                && (
                <div>
                  <span className={styles.removedText}>배경제거</span>
                  <img src={removedImage} width={341} height={341} alt="removedImg" className={styles.removedImg} />
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

Product.defaultProps = {
  item: null,
}
