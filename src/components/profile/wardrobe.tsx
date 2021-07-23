import HorizontalList from 'components/horizontal-list'
import communicate from 'lib/api'
import resizeImageFile from 'lib/util/image'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/wardrobe.module.scss'
import ProfileImagePicker from './image-picker'
import Section from './section'

interface WardrobeData {
  closet: {
    id: number,
    img: string
  }[]
}

export default function Wardrobe({ data } : { data: WardrobeData }) {
  const { user, fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const { closet } = user || data || {}

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const file = await resizeImageFile(e.target.files[0])

    const formData = new FormData()
    formData.append('img', file)

    await communicate({
      url: '/profile/closet',
      options: {
        body: formData,
      },
      method: 'POST',
    }).then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      fetchUser()
    }).catch(async () => {
      await createAlert({ text: 'error' })
    })
  }

  return (
    <Section
      head="내 옷장"
      action={(
        <ProfileImagePicker
          id="wardrobe-picker"
          upload={upload}
        />
      )}
    >
      <HorizontalList
        className={styles.container}
        gap={12}
      >
        {closet?.map(({ id, img }) => (
          <img
            key={id}
            className={styles.figure}
            src={img}
            alt=""
            draggable="false"
          />
        ))}
      </HorizontalList>
    </Section>
  )
}
