import StatefulSection, { useStatefulSection } from 'components/profile/stateful-section'
import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent, useState, useEffect } from 'react'
import styles from 'sass/templates/profile/look-book.module.scss'
import Icon from 'widgets/icon'

export interface LookBookData {
    list: {
      id: number
      img: string
    }[]
}

export default function ProfileLookBook(props : { userId: number, data : LookBookData}) {
  return (
    <StatefulSection head="코디룩북">
      <Inner {...props} />
    </StatefulSection>
  )
}

function Inner({ userId, data } : { userId: number, data : LookBookData}) {
  const { state, setState, setOnEdit } = useStatefulSection()
  const { user: myUser } = useAuth()
  const { createAlert } = useAlert()
  const [list, setList] = useState(data.list)

  const upload = async (e : ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      return
    }

    const file = await resizeImageFile(e.target.files[0])

    const formData = new FormData()

    formData.append('img', file)

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

  const onDelete = async (id: number) => {
    const res = await communicate({
      url: `/profile/lookbook/${id}`,
      method: 'DELETE',
    })

    if (!res.ok) {
      await createAlert({ text: ERROR_MESSAGE })
    }

    fetchData()
  }

  const fetchData = async () => {
    const res = await communicate({
      url: `/profile/${userId}/lookbook`,
    })

    if (res.status !== 200) {
      await createAlert({ text: ERROR_MESSAGE })
    }

    const newData = await res.json()

    setList(newData.list)
  }

  useEffect(() => {
    setOnEdit(async () => {
      setState('default')
    })
  }, [])

  if (state !== 'edit' && list.length === 0) {
    return (
      <section className={styles.empty}>
        <Icon src="background-photo.png" size={72} />
        { myUser.userId === userId ? (
          <p>
            나의 패션을 잘 나타내
            <br />
            사진을 올려주세요.
          </p>
        ) : (
          <p>
            아직 등록된 패션이 없어요.
          </p>
        )}
      </section>
    )
  }

  return (
    <section className={styles.container}>
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
      {list.map(({ id, img }) => (
        <div key={id} className={styles.figure}>
          <img
            className={styles.image}
            src={img}
            alt=""
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
    </section>
  )
}
