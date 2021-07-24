import communicate from 'lib/api'
import ERROR_MESSAGE from 'lib/constants/error'
import resizeImageFile from 'lib/util/image'
import { useAuth } from 'providers/auth'
import { useAlert } from 'providers/dialog/alert/inner'
import { ChangeEvent } from 'react'
import styles from 'sass/components/profile/represents.module.scss'
import ProfileImagePicker from './image-picker'
import Section from './section'

interface RepresentData {
  coord: {
    id: number,
    img: string,
  }[]
}

export default function Represent({ data }: { data: RepresentData }) {
  const { user, fetchUser } = useAuth()
  const { createAlert } = useAlert()

  const { coord } = user || data || {}

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
        fetchUser()
      })
      .catch(async () => {
        await createAlert({ text: ERROR_MESSAGE })
      })
  }

  return (
    <Section
      head="대표 코디"
      action={(!coord || coord.length < 4) && (
        <ProfileImagePicker id="represents-picker" upload={upload} />
      )}
    >
      {(coord && coord.length > 0) && (
        <section className={styles.container}>
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
            </div>
          ))}
        </section>
      )}
    </Section>
  )
}
