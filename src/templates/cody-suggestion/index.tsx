/* eslint-disable no-return-await */
import React, { useEffect } from 'react'
import styles from 'sass/templates/cody-suggestion/cody-suggestion.module.scss'
import BottomButton from 'components/bottom-button'
import { useRouter } from 'next/router'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import { useCodySuggestion } from 'providers/cody-suggestion'
import Step1 from 'components/cody-suggestion/step1'
import Step2 from 'components/cody-suggestion/step2'
import convertDataURLToBlob from 'lib/util/file'

interface ProductInformation {
  img: string,
  price: string,
  purchaseUrl: string,
}

interface ProductDescription {
  title: string,
  content: string,
}

interface ProductCoord {
  img: string
}

interface TempData {
  products: ProductInformation[],
  description: ProductDescription,
  coord: ProductCoord[]
}

interface CodySuggestion {
  roomId: number,
  title: string,
  comment: string,
  clothes: ProductInformation[],
  referenceImgList: Array<string>,
}

export default function CodySuggetsion({
  id,
}: {
  id: string
}) {
  const {
    descriptionRef, productRef, coordRef, step, setStep, filterEmptyProducts,
  } = useCodySuggestion()
  const { createAlert } = useAlert()
  const router = useRouter()
  const ClickEventListener = () => {
    localStorage.removeItem(`cody${id}`)
    const descriptionCookie: ProductDescription = {
      title: descriptionRef.current.title,
      content: descriptionRef.current.content,
    }
    const productsCookie: ProductInformation[] = productRef.current
    const coordCookie = coordRef.current
    localStorage.setItem(`cody${id}`, JSON.stringify({ products: productsCookie, description: descriptionCookie, coord: coordCookie }))
  }

  useEffect(() => {
    const currentTempData = localStorage.getItem(`cody${id}`)
    const parsedData: TempData = JSON.parse(currentTempData)
    if (parsedData) {
      descriptionRef.current = parsedData.description
      productRef.current = parsedData.products
      coordRef.current = parsedData.coord
    }
    document.getElementById('storage').addEventListener('click', ClickEventListener)
    return () => {
      document.getElementById('storage')?.removeEventListener('click', ClickEventListener)
    }
  }, [])

  const getRoomId = async () => {
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
    // eslint-disable-next-line consistent-return
    return roomId
  }

  const redirect = async () => {
    const roomId = await getRoomId()
    router.push(`/chat/${roomId}`)
  }

  const onClickSend = async () => {
    filterEmptyProducts()
    for (let i = 0; i < productRef.current.length; i++) {
      const { price, img, purchaseUrl } = productRef.current[i]
      if (price === '' || img === '' || purchaseUrl === '') {
        // eslint-disable-next-line no-await-in-loop
        await createAlert({ text: '항목을 전부 채워주세요' })
        return
      }
    }
    if (descriptionRef.current.title === '' || descriptionRef.current.content === '') {
      await createAlert({ text: '항목을 전부 채워주세요' })
      return
    }
    const roomId = await getRoomId()
    const payload: CodySuggestion = {
      roomId,
      title: descriptionRef.current.title,
      comment: descriptionRef.current.content,
      clothes: productRef.current,
      referenceImgList: [],
    }
    const coordPromise = coordRef.current.map(({ img }) => {
      const refForm = new FormData()
      const imgBlob = convertDataURLToBlob(img)
      refForm.append('img', imgBlob)
      return communicate({
        url: '/coord/img',
        options: {
          body: refForm,
        },
        method: 'POST',
      }).then(async (res) => {
        if (res.status !== 200) {
          throw new Error()
        }
        return await res.json()
      })
    })
    const clothPromise = productRef.current.map((item, index) => {
      const { img } = item
      const clothForm = new FormData()
      const imgBlob = convertDataURLToBlob(img)
      clothForm.append('img', imgBlob)
      return communicate({
        url: '/coord/img',
        options: {
          body: clothForm,
        },
        method: 'POST',
      }).then(async (res) => {
        if (res.status !== 200) {
          throw new Error()
        }
        return await res.json()
      })
    })
    await Promise.all([Promise.all(coordPromise), Promise.all(clothPromise)]).then((value) => {
      const coord = value[0]
      const cloth = value[1]
      coord.forEach(({ path }) => {
        payload.referenceImgList.push(path)
      })
      cloth.forEach((item, index) => {
        const { path } = item
        payload.clothes[index].img = path
      })
    })
    await communicate({
      url: '/coord',
      payload,
      method: 'POST',
    }).catch((error) => {
      createAlert({ text: ERROR_MESSAGE })
    })
    localStorage.removeItem(`cody${id}`)
    await redirect()
  }

  const onClickBottomBtn = () => {
    if (step === 1) {
      setStep(2)
    } else {
      onClickSend()
    }
  }

  return (
    <>
      <div className={styles.container}>
        {step === 1 ? <Step1 /> : <Step2 /> }
      </div>
      <div className={styles.gradient}>
        <BottomButton text={step === 1 ? '다음' : '보내기'} onClick={onClickBottomBtn} />
      </div>
    </>
  )
}
