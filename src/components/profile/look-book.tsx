import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent, useState } from 'react'
import styles from 'sass/components/profile/look-book.module.scss'
import ProfileImagePicker from './image-picker'
import Section from './section'

export interface LookBookData {
  list: {
    id: number
    img: string
  }[]
}

export default function LookBook({ userId, data } : { userId: string, data: LookBookData}) {
  const { createAlert } = useAlert()

  if (!data) {
    return <></>
  }

  const [list, setList] = useState(data.list)

  const upload = async (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const formData = new FormData()
    formData.append('img', e.target.files[0])

    await communicate({
      url: '/profile/lookbook',
      options: {
        body: formData,
      },
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return communicate({
          url: `/profile/${userId}/lookbook`,
        })
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error()
        }
        return res.json()
      })
      .then((updatedData) => setList(updatedData.list))
      .catch(() => {
        createAlert({ text: ERROR_MESSAGE })
      })
  }

  return (
    <Section
      head="코디룩북"
      action={(
        <ProfileImagePicker
          id="lookbook-picker"
          upload={upload}
        />
      )}
    >
      {list?.length > 0 && (
      <section className={styles.container}>
        {list.map(({ id, img }) => (
          <img
            key={id}
            className={styles.figure}
            src={img}
            alt=""
          />
        ))}
      </section>
      )}
    </Section>
  )
}
