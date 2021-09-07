/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/avatar-input.module.scss'
import Avatar from 'widgets/avatar'
import Icon from 'widgets/icon'
import communicate from 'lib/api'
import { useAlert } from 'providers/dialog/alert/inner'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'

import { useAuth } from 'providers/auth'
import { useProfile } from 'providers/profile'

export default function AvatarInput() {
  const { user, editable } = useProfile()
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const { profileImg: img } = user

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const file = await resizeImageFile(e.target.files[0])

    const formData = new FormData()

    formData.append('img', file)

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
      return fetchUser()
    }).catch(async () => {
      await createAlert({ text: ERROR_MESSAGE })
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar src={img} size={96} />
        {editable && (
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
        )}
      </div>
    </section>
  )
}
