/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import styles from 'sass/components/complete-all.module.scss'
import { Clothes } from 'templates/cody-suggestion/complete-suggestion'

export default function CompleteAll({
  clothes,
}: {
  clothes: Clothes[]
}) {
  const [rgba, setRgba] = useState([])
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
        setRgba((prev) => [...prev, rgba])
      }
    }
  }
  useEffect(() => {
    getRgba()
  }, [])

  return (
    <div className={styles.container}>
      {clothes.map((value, index) => {
        const { img } = value
        return (
          <>
            {rgba[index]
          && <img src={img} alt={img} className={styles.img} id={`product${index}`} key={img} style={{ backgroundColor: `rgba(${rgba[index][0]},${rgba[index][1]},${rgba[index][2]},${rgba[index][3]})` }} />}
          </>
        )
      })}
    </div>
  )
}
