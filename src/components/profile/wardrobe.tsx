import HorizontalList from 'components/horizontal-list'
import communicate from 'lib/api'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEventHandler } from 'react'
import styles from 'sass/components/profile/wardrobe.module.scss'
import Icon from 'widgets/icon'
import Section from './section'

export default function Wardrobe() {
  const images = ['/a', '/b', '/c', '/d', '/e', '/f']

  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const upload : ChangeEventHandler<HTMLInputElement> = async (e) => {
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
        <label className={styles.button} htmlFor="wardrobePicker">
          <Icon src="add.png" size={14} />
          <input
            id="wardrobePicker"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={upload}
          />
        </label>
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
