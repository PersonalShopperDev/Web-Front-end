import React, { useState, useEffect, useRef } from 'react'
import styles from 'sass/templates/cody-suggestion/cody-suggestion.module.scss'
import Icon from 'widgets/icon'
import Product from 'components/cody-suggestion/product'
import Description from 'components/cody-suggestion/description'
import BottomButton from 'components/bottom-button'
import StyleBoardItem from 'components/cody-suggestion/style-board-item'
import { useRouter } from 'next/router'
import * as htmlToImage from 'html-to-image'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'

export interface ProductInformation {
  url: string,
  name: string,
  price: string,
  buyLink: string,
}

export interface ProductDescription {
  title: string,
  content: string,
}

export interface TempData {
  products: Array<ProductInformation>,
  description: ProductDescription
}

export interface CodySuggestion {
  products?: Array<ProductInformation>,
  description?: ProductDescription,
  styleBoardImg?: string,
}

const convertDataURLToBlob = (dataURL: string) => {
  const base64Marker = ';base64,'

  if (!dataURL.includes(base64Marker)) {
    const parts = dataURL.split(',')
    const contentType = parts[0].split(':')[1]
    const raw = parts[1]
    return new Blob([raw], {
      type: contentType,
    })
  }

  const parts = dataURL.split(base64Marker)
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])

  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], {
    type: contentType,
  })
}

const resizeAndBlob = async (url: string): Promise<Blob> => new Promise((resolve, reject) => {
  const image = new Image()
  image.src = url
  image.onload = () => {
    const canvas = document.createElement('canvas')
    const maxSize = 512
    let { width, height } = image

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width
        width = maxSize
      }
    } else if (height > maxSize) {
      width *= maxSize / height
      height = maxSize
    }

    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(image, 0, 0, width, height)
    const CanvasUrl = canvas.toDataURL()
    const blob = convertDataURLToBlob(CanvasUrl)
    resolve(blob)
  }
  image.onerror = () => reject()
})

export default function CodySuggetsion({
  id,
}: {
  id: string
}) {
  const [productCount, setProductCount] = useState(1)

  const [products, setProducts] = useState<Array<ProductInformation>>()

  const [description, setDescription] = useState<ProductDescription>()

  const { createAlert } = useAlert()

  const router = useRouter()

  const styleBoardRef = useRef<HTMLDivElement>()

  const onClickPlus = () => {
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData: TempData = JSON.parse(currentTempData)
    if (parsedData) {
      setProducts(parsedData.products)
      setDescription(parsedData.description)
    }
    setProductCount((prevCount) => prevCount + 1)
  }

  const onClickSend = async () => {
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData = JSON.parse(currentTempData)
    const formData = new FormData()

    await htmlToImage.toPng(styleBoardRef.current)
      .then(async (dataUrl) => {
        const img = await resizeAndBlob(dataUrl)
        formData.append('mainImg', img)
        formData.append('demanderId', id.toString())
        formData.append('title', parsedData.description.title)
        formData.append('comment', parsedData.description.content)
        const res = await communicate({
          url: '/coord',
          options: {
            body: formData,
          },
          method: 'POST',
        })
        if (res.status !== 200) {
          return
        }
        const data = await res.json()
        const { coordId } = data
        parsedData.products.forEach(async (item) => {
          const clothForm = new FormData()
          const clothImg = await resizeAndBlob(item.url)
          clothForm.append('coordId', coordId)
          clothForm.append('img', clothImg)
          clothForm.append('name', item.name)
          clothForm.append('price', item.price)
          clothForm.append('purchaseUrl', item.buyLink)
          await communicate({
            url: '/coord/cloth',
            options: {
              body: clothForm,
            },
            method: 'POST',
          }).then((response) => {
            if (!response.ok) {
              throw new Error()
            }
          })
        })
      })
      .catch((error) => {
        createAlert({ text: ERROR_MESSAGE })
      })

    localStorage.removeItem(`cody${id}`)

    await redirect()
  }

  const redirect = async () => {
    const res = await communicate({
      url: '/chat',
      payload: {
        targetId: parseInt(id, 10),
      },
      method: 'POST',
    })

    if (res.status !== 200) {
      return
    }

    const { roomId } = await res.json()

    router.push(`/chat/${roomId}`)
  }

  useEffect(() => {
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData: TempData = JSON.parse(currentTempData)
    if (parsedData) {
      setProducts(parsedData.products)
      setDescription(parsedData.description)
      if (parsedData.products !== undefined) setProductCount(parsedData.products.length)
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.styleBoard} ref={styleBoardRef}>
          {products === undefined
            ? <span className={styles.boardText}>STYLE BOARD</span>
            : (
              <div className={styles.removedBox}>
                {products.map((value, index) => (
                  <StyleBoardItem url={value.url} key={value.url} />
                ))}
              </div>
            ) }
          <img src="/icons/photoroom.png" alt="photo_room" width="89" height="26" className={styles.photoRoom} />
        </div>
        <section>
          <div className={styles.section_header}>
            <span>이 코디의 상품</span>
            <Icon src="cody-suggestion-plus.png" size={14} onClick={onClickPlus} />
          </div>
          {[...Array(productCount)].map((value, index) => (
            <Product
              id={parseInt(id, 10)}
              index={index}
              item={products !== undefined ? products[index] : null}
              setProducts={setProducts}
              key={Math.random()}
            />
          ))}
        </section>
        <section>
          <div className={styles.section_header}>
            <span>코디설명</span>
          </div>
          <Description id={parseInt(id, 10)} description={description} />
        </section>
      </div>
      <div className={styles.gradient}>
        <BottomButton text="보내기" onClick={onClickSend} />
      </div>
    </>
  )
}
