/* eslint-disable no-param-reassign */
import React, {
  useRef, ChangeEvent, useEffect, useState,
} from 'react'
import styles from 'sass/components/tmp.module.scss'
import { useCodySuggestion } from 'providers/cody-suggestion'
import Icon from 'widgets/icon'
import resizeImageFile from 'lib/util/image'

export default function Product() {
  const [refTok, setRefTok] = useState(false)
  const { selectedProduct, productRef, coordRef } = useCodySuggestion()
  const priceRef = useRef<HTMLInputElement>()
  const purchaseUrlRef = useRef<HTMLInputElement>()

  const update = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    productRef.current[selectedProduct][key] = e.target.value
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === `price${selectedProduct}`) {
      update(e, 'price')
    } else if (e.target.id === `purchaseUrl${selectedProduct}`) {
      update(e, 'purchaseUrl')
    }
  }

  const onClickPlus = () => {
    if (coordRef.current.length < 9) {
      setRefTok(!refTok)
      coordRef.current.push({
        img: '',
      })
    }
  }

  const onClickCamera = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files[0]) {
      return
    }
    const img = await resizeImageFile(e.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load', () => onLoadEventListner(reader.result, index))
  }

  const onLoadEventListner = (url: string| ArrayBuffer, index: number) => {
    coordRef.current[index].img = url as string
    setRefTok(!refTok)
  }

  const onClickRefDelete = (index: number) => {
    coordRef.current[index].img = ''
    setRefTok(!refTok)
  }

  useEffect(() => {
    priceRef.current.value = productRef.current[selectedProduct].price
    purchaseUrlRef.current.value = productRef.current[selectedProduct].purchaseUrl
  }, [productRef.current, selectedProduct])

  useEffect(() => {
    setRefTok(!refTok)
  }, [coordRef.current])

  return (
    <>
      <span className={styles.header}>
        코디
        {' '}
        {selectedProduct + 1}
      </span>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="가격:"
          ref={priceRef}
          autoComplete="off"
          onChange={onChangeInput}
          id={`price${selectedProduct}`}
        />
        <input
          type="text"
          placeholder="구매링크"
          ref={purchaseUrlRef}
          autoComplete="off"
          onChange={onChangeInput}
          id={`purchaseUrl${selectedProduct}`}
        />
        <span className={styles.pictureText}>참고 사진</span>
        <div className={styles.flexContainer}>
          <button type="button" className={styles.box} onClick={onClickPlus}>
            <Icon src="gridPlus.png" size={24} key="plus" />
          </button>
          {coordRef.current.map((value, index) => {
            const { img } = value
            return (
              <div key={Math.random()}>
                {img
                  ? (
                    <div className={styles.imgBox}>
                      <img src={img} alt="coord" className={styles.img} />
                      <Icon src="refDelete.png" size={24} key="refDelete" className={styles.delete} onClick={() => onClickRefDelete(index)} />
                    </div>
                  ) : (
                    <label className={styles.box} htmlFor={`refCoord${index}`}>
                      <input
                        id={`refCoord${index}`}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => onClickCamera(e, index)}
                        style={{ display: 'none' }}
                      />
                      <Icon src="product-camera.png" size={26} key="camera" />
                    </label>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
