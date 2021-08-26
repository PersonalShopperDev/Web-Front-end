import React, { useEffect } from 'react'
import 'swiper/swiper-bundle.css'
import { useCodySuggestion } from 'providers/cody-suggestion'
import CompleteDetail from 'components/cody-suggestion/complete-detail'
import CompleteAll from 'components/cody-suggestion/complete-all'

export interface Clothes {
  img: string
  price: number
  purchaseUrl: string
  rgba: Array<number>
}

interface Supplier {
  id: number,
  name: string,
  img: string,
}

export interface CompleteSuggestionData {
  title: string,
  comment: string,
  clothes: Clothes[],
  referenceImgList: Array<string>,
  needRequest: boolean
  supplier: Supplier
}

export default function CompleteSuggestion({
  id,
  data,
}: {
  id: string,
  data: CompleteSuggestionData
}) {
  const { detailType } = useCodySuggestion()
  const { clothes } = data
  const getRgba = () => {
    for (let i = 0; i < clothes.length; i++) {
      const rgba = [0, 0, 0, 0]
      const { img } = clothes[i]
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = img
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 180
        canvas.height = 333
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, 180, 333)
        const d = ctx.getImageData(0, 0, 180, 333)
        // eslint-disable-next-line no-shadow
        const { data } = d
        for (let j = 0; j < data.length; j++) {
          if (j % 4 === 0) {
            rgba[0] += data[j]
          } else if (j % 4 === 1) {
            rgba[1] += data[j]
          } else if (j % 4 === 2) {
            rgba[2] += data[j]
          } else if (j % 4 === 3) {
            rgba[3] += (data[j] / 255)
          }
        }
        rgba[0] /= data.length
        rgba[1] /= data.length
        rgba[2] /= data.length
        rgba[3] /= data.length
        clothes[i].rgba = rgba
      }
    }
  }
  useEffect(() => {
    getRgba()
  }, [])
  return (
    <>
      {detailType === 0
        ? <CompleteDetail id={id} data={data} /> : <CompleteAll clothes={clothes} /> }
    </>
  )
}
