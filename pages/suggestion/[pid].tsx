import Layout from 'layouts/default'
import CodySuggestionAppBar from 'components/app-bar/cody-suggestion'
import CodySuggetsion from 'templates/cody-suggestion'
import { GetServerSideProps } from 'next'

export default function Page({ id }) {
  return (
    <Layout
      header={<CodySuggestionAppBar />}
    >
      <CodySuggetsion id={id} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.params
  return {
    props: {
      id: pid,
    },
  }
}
