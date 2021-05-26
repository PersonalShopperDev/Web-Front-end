import Layout from 'layouts/default'
import { GetServerSideProps } from 'next'

export default function Error({ statusCode } : { statusCode : number }) {
  return (
    <Layout>
      <p>
        {
          statusCode
            ? `An error ${statusCode} occured on server`
            : 'An error occured on client'
        }
      </p>
    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async ({ res }) => {
  const statusCode = res ? res.statusCode : 404
  return {
    props: {
      statusCode,
    },
  }
}
