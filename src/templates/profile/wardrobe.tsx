import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'
import { useAlert } from 'providers/dialog/alert/inner'
import { useProfile } from 'providers/profile'
import { useState, ChangeEvent, useEffect } from 'react'
import styles from 'sass/templates/profile/wardrobe.module.scss'
import Icon from 'widgets/icon'

type State = 'default' | 'edit'

export default function ProfileWardrobe() {
  const [state, setState] = useState<State>('default')
  const { userId } = useProfile().user
  const { createAlert } = useAlert()

  const [closet, setCloset] = useState<{id: number, img: string}[]>([])

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
      return initialize()
    }).catch(async () => {
      await createAlert({ text: ERROR_MESSAGE })
    })
  }

  const onDelete = async (id: number) => {
    const res = await communicate({
      url: `/profile/closet/${id}`,
      method: 'DELETE',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
    }

    initialize()
  }

  const onEditClick = () => {
    setState((value) => (
      value === 'edit' ? 'default' : 'edit'
    ))
  }

  const initialize = async () => {
    const res = await communicate({
      url: `/profile/${userId}/closet`,
    })

    if (res.status !== 200) {
      return
    }

    const { list } = await res.json()
    setCloset(list)
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h4>내 옷장</h4>
        <button
          type="button"
          onClick={onEditClick}
          className={styles.button}
        >
          {state === 'edit' ? '확인' : '수정'}
        </button>
      </div>
      <div className={styles.grid}>
        {state === 'edit' && (
          <div className={styles.figure}>
            <label htmlFor="image-picker" className={styles.addButton}>
              <Icon src="add-circle.png" size={32} />
              <input
                id="image-picker"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => upload(e)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        )}
        {closet?.map(({ id, img }) => (
          <div className={styles.figure}>
            <img
              key={id}
              className={styles.image}
              src={img}
              alt=""
              draggable="false"
            />
            {state === 'edit' && (
              <Icon
                onClick={() => onDelete(id)}
                className={styles.deleteButton}
                src="delete-circle.png"
                size={27}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
