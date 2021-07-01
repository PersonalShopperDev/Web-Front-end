import communicate from 'lib/api'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/represents.module.scss'
import ProfileImagePicker from './image-picker'
import Section from './section'

export default function Represents() {
  const images = ['/images/sample-avatar.jpg', '/images/sample-avatar.jpg', '/images/sample-avatar.jpg']

  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const upload = async (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const formData = new FormData()
    formData.append('img', e.target.files[0])
    formData.append('represent', 'true')

    await communicate({
      url: '/profile/lookbook',
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
      await createAlert({ text: '에러가 발생했습니다' })
    })
  }

  return (
    <Section
      head="대표 코디"
      action={(
        <ProfileImagePicker
          id="represents-picker"
          upload={upload}
        />
      )}
    >
      <section className={styles.container}>
        {images.map((value) => (
          <img
            key={Math.random()}
            className={styles.figure}
            src={value}
            alt=""
          />
        ))}
      </section>
    </Section>
  )
}
