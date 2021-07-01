import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/avatar-input.module.scss'
import Avatar from 'widgets/avatar'
import Icon from 'widgets/icon'
import communicate from 'lib/api'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'

export default function AvatarInput({
  src,
  name,
} : {
  src: string,
  name: string,
}) {
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }
    const formData = new FormData()
    formData.append('img', e.target.files[0])

    await communicate({
      url: '/profile/img',
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
    <section className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar src={src} size={96} />
        <label className={styles.input} htmlFor="profilePicker">
          <Icon src="camera.png" size={17} />
          <input
            id="profilePicker"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={upload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <h2 className={styles.name}>{name}</h2>
    </section>
  )
}