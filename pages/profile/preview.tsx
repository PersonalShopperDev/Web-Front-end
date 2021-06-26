import Layout from 'layouts/default'
import ProfilePreviewAppBar from 'components/app-bar/profile-preview'
import PreviewSlide from 'components/profile-preview/slide'
import PreviewName from 'components/profile-preview/name'
import TagList from 'components/profile-preview/tag-list'
import Description from 'components/profile-preview/description'
import Divider from 'widgets/divider'
import StyleInfo from 'components/profile-preview/style-info'

export default function Page() {
  return (
    <Layout
      header={<ProfilePreviewAppBar />}
    >
      <PreviewSlide />
      <PreviewName name="오진수" />
      <TagList />
      <Description head="자기소개" content="어어어어어어어어ㅓㅇㄴㅁ" />
      <Divider />
      <Description head="스타일르스트에게 바라는 점" content="어어어어어어어어ㅓㅇㄴㅁ" />
      <Divider />
      <StyleInfo data={{
        height: 162,
        weight: 50,
        shape: '사각형 체형',
      }}
      />
    </Layout>
  )
}
