import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { useProfile } from 'providers/profile'
import { ChangeEvent, useEffect } from 'react'
import styles from 'sass/components/profile/represents.module.scss'
import Icon from 'widgets/icon'
import StatefulSection, { useStatefulSection } from './stateful-section'

export default function Represent() {
  return (
    <StatefulSection head="대표 코디">
      <Inner />
    </StatefulSection>
  )
}

function Inner() {
  const { state, setState, setOnEdit } = useStatefulSection()
  const { user } = useProfile()
  const { fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const { coord } = user

  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const file = await resizeImageFile(e.target.files[0])

    const formData = new FormData()
    formData.append('img', file)
    formData.append('represent', 'true')

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
        return fetchUser()
      })
      .catch(async () => {
        await createAlert({ text: ERROR_MESSAGE })
      })

    setState('default')
  }

  const onDelete = () => {
    console.log('삭제 로직 => template/wardrobe')
  }

  useEffect(() => {
    setOnEdit(async () => {
      setState('default')
    })
  }, [])

  return (
    <section className={styles.container}>
      {(coord && coord.length > 0) ? (
        <>
          {(state === 'edit' && coord.length < 4) && (
            <div className={styles.figure}>
              <label htmlFor="image-picker" className={styles.addButton}>
                <Icon src="add-circle.png" size={24} />
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
          {coord.map(({ id, img }) => (
            <div
              key={id}
              className={styles.figure}
            >
              <img
                className={styles.image}
                src={img}
                alt=""
              />
              {state === 'edit' && (
                <Icon
                  className={styles.deleteButton}
                  src="delete-circle.png"
                  size={16}
                  onClick={onDelete}
                />
              )}
            </div>
          ))}
        </>
      ) : (
        <p className={styles.placeholder}>쇼퍼가 볼 수 있는 대표코디를 올려보세요.</p>
      )}
    </section>
  )
}
