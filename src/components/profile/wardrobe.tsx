import HorizontalList from 'components/horizontal-list'
import communicate from 'lib/api'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/wardrobe.module.scss'
import ProfileImagePicker from './image-picker'
import Section from './section'

export default function Wardrobe() {
  const images = ['/a', '/b', '/c', '/d', '/e', '/f']

  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const upload = async (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const formData = new FormData()
    formData.append('img', e.target.files[0])

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
        {images.map((value) => (
          <img
            key={value}
            className={styles.figure}
            src={value}
            alt=""
            draggable="false"
          />
        ))}
      </HorizontalList>
    </Section>
  )
}
