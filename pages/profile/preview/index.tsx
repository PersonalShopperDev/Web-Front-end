import Layout from 'layouts/default'
import ProfilePreviewAppBar from 'components/app-bar/profile-preview'
import PreviewSlide from 'components/profile-preview/slide'
import PreviewName from 'components/profile-preview/name'
import TagList from 'components/profile-preview/tag-list'
import Description from 'components/profile-preview/description'
import Divider from 'widgets/divider'
import StyleInfo from 'components/profile-preview/style-info'
import parseJwt from 'lib/util/jwt'
import { GetServerSideProps } from 'next'
import { ACCESS_TOKEN } from 'providers/auth'
import { communicateWithContext } from 'lib/api'

export default function Page({ data } : any) {
  const {
    closet, styles, name, introduction, hopeToSupplier, bodyStat,
  } = data

  return (
    <Layout
      header={<ProfilePreviewAppBar />}
    >
      <PreviewSlide data={closet} />
      <PreviewName name={name} />
      <TagList data={styles} />
      <Description head="자기소개" content={introduction} />
      <Divider />
      <Description head="스타일리스트에게 바라는 점" content={hopeToSupplier} />
      <Divider />
      <StyleInfo data={bodyStat} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[ACCESS_TOKEN]
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { userId } = parseJwt(token)

  const res = await communicateWithContext({
    url: `/profile/${userId}`,
    context,
  })

  if (res.status !== 200) {
    if (context.res) {
      context.res.statusCode = res.status
    }
    throw new Error(`Api server responsed ${res.status} :: /profile/:id`)
  }

  const data = await res.json()

  return {
    props: {
      data: {
        ...data,
      },
    },
  }
}
